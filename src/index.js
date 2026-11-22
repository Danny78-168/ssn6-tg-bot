const SERVICES = {
  REV_PHONE_4: {
    name: "Phone 背調所有機主",
    price: "$0.25",
    mode: "sync",
    pollSec: 0,
    fields: ["phone"],
    prompt: "請輸入 10 位美國手機號（純數字，例如 `2125551234`）：",
  },
  EMAIL_LOOK: {
    name: "EMAIL 背調所有持有人",
    price: "$0.25",
    mode: "sync",
    pollSec: 0,
    fields: ["email"],
    prompt: "請輸入電子信箱（例如 `jane@example.com`）：",
  },
  S99_ADDRESS: {
    name: "姓名+地址",
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "address", "city", "state", "zip"],
    prompt:
      "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編**（半形逗號分隔）：\n" +
      "範例：`John, Smith, 123 Main St, New York, NY, 10001`\n" +
      "（名勿帶中間名，地址勿帶公寓號）",
  },
  S99_NAME_PHONE: {
    name: "姓名+手機",
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "phone"],
    prompt:
      "請依序輸入 **名, 姓, 10位美國手機號**（半形逗號分隔）：\n" +
      "範例：`John, Smith, 2125551234`",
  },
  S99_NAME_DOB: {
    name: "姓名+生日",
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "dob"],
    prompt:
      "請依序輸入 **名, 姓, 生日(MM/DD/YYYY)**（半形逗號分隔）：\n" +
      "範例：`John, Smith, 01/15/1990`",
  },
  S99_NAME_ZIP: {
    name: "姓名+郵編",
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "zip"],
    prompt:
      "請依序輸入 **名, 姓, 5位郵編**（半形逗號分隔）：\n" +
      "範例：`John, Smith, 10001`",
  },
  DL: {
    name: "DL 駕駛執照查詢",
    price: "$2.00",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "address", "city", "state", "zip"],
    prompt:
      "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編**（半形逗號分隔）：\n" +
      "範例：`John, Smith, 123 Main St, New York, NY, 10001`",
  },
  CREDIT_SCORE_2: {
    name: "信用分 2",
    price: "$1.00",
    mode: "async",
    pollSec: 5,
    fields: ["first_name", "last_name", "address", "city", "state", "zip", "dob"],
    prompt:
      "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編, 生日(MM/DD/YYYY)**（半形逗號分隔）：\n" +
      "範例：`John, Smith, 123 Main St, New York, NY, 10001, 01/15/1990`",
  },
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("SSN6 Telegram Bot Worker is running.", { status: 200 });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (env.TG_WEBHOOK_SECRET) {
      const secretHeader = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
      if (secretHeader !== env.TG_WEBHOOK_SECRET) {
        return new Response("Unauthorized", { status: 401 });
      }
    }

    let update;
    try {
      update = await request.json();
    } catch {
      return new Response("Bad JSON", { status: 400 });
    }

    ctx.waitUntil(handleUpdate(update, env));
    return new Response("OK", { status: 200 });
  },
};

function isAuthorized(userId, env) {
  const raw = (env.ALLOWED_USER_IDS || "").trim();
  if (!raw) return true;
  const allowed = new Set(
    raw.split(",").map((s) => s.trim()).filter(Boolean)
  );
  return allowed.has(String(userId));
}

function sessionCacheKey(userId) {
  return new Request(`https://cache.local/ssn6-session/${userId}`);
}

async function setUserService(userId, serviceCode) {
  const cache = caches.default;
  await cache.put(
    sessionCacheKey(userId),
    new Response(JSON.stringify({ service_code: serviceCode }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=600",
      },
    })
  );
}

async function getUserService(userId) {
  const cache = caches.default;
  const res = await cache.match(sessionCacheKey(userId));
  if (!res) return null;
  const data = await res.json();
  return data.service_code || null;
}

async function clearUserService(userId) {
  const cache = caches.default;
  await cache.delete(sessionCacheKey(userId));
}

async function ssn6Api(env, method, path, body = null) {
  const baseUrl = (env.SSN6_BASE_URL || "https://ssn6.com").replace(/\/+$/, "");
  const headers = {
    Authorization: `Bearer ${env.SSN6_API_TOKEN}`,
  };
  const init = { method, headers };
  if (body !== null) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }
  const resp = await fetch(`${baseUrl}${path}`, init);
  let data;
  try {
    data = await resp.json();
  } catch {
    data = { error: true, message: await resp.text() };
  }
  return { status: resp.status, data };
}

async function tgApi(env, method, payload) {
  const resp = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  return resp.json();
}

async function sendMessage(env, chatId, text, replyMarkup = null) {
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  return tgApi(env, "sendMessage", payload);
}

async function editMessage(env, chatId, messageId, text, replyMarkup = null) {
  const payload = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "Markdown",
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  return tgApi(env, "editMessageText", payload);
}

function formatResult(data, fallbackQueryId = null) {
  const status = data.status || "unknown";
  const qid = fallbackQueryId ?? data.query_id;
  const lines = [`*查詢狀態*：\`${status}\``];

  if (qid !== undefined && qid !== null) lines.push(`*Query ID*：\`${qid}\``);
  if (data.task_id) lines.push(`*Task ID*：\`${data.task_id}\``);
  if (data.reused) lines.push("♻️ 60 秒內命中已完成結果（`reused: true`）");

  if (status === "completed") {
    const reply =
      typeof data.result === "object" && data.result !== null
        ? data.result.reply
        : data.reply;
    if (data.balance_after !== undefined) {
      lines.push(`*扣款後餘額*：\`$${data.balance_after}\``);
    }
    lines.push(`\n*查詢結果*：\n\`\`\`\n${reply || "(無內容)"}\n\`\`\``);
  } else if (status === "failed") {
    const reply =
      typeof data.result === "object" && data.result !== null
        ? data.result.reply
        : data.reply;
    const refunded =
      Boolean(data.refunded) ||
      Boolean(
        typeof data.result === "object" &&
          data.result !== null &&
          data.result.data_not_found
      );
    lines.push(`*說明*：${reply || "查詢失敗"}`);
    if (refunded) lines.push("💰 *退款狀態*：已退回費用");
    if (data.balance_after !== undefined) {
      lines.push(`*目前餘額*：\`$${data.balance_after}\``);
    }
  } else if (status === "pending") {
    lines.push("⏳ 仍在處理中，請稍後再查。");
  } else {
    lines.push(`\`\`\`\n${JSON.stringify(data, null, 2)}\n\`\`\``);
  }

  return lines.join("\n");
}

async function handleUpdate(update, env) {
  if (update.callback_query) {
    await handleCallback(update.callback_query, env);
    return;
  }

  const msg = update.message;
  if (!msg || !msg.text) return;

  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const text = msg.text.trim();

  if (!isAuthorized(userId, env)) {
    await sendMessage(env, chatId, "⛔ 你沒有權限使用此 Bot。");
    return;
  }

  if (text === "/start" || text === "/help") {
    await sendMessage(
      env,
      chatId,
      "*SSN6 查詢 Bot（Cloudflare Workers）*\n\n" +
        "• `/balance` — 查詢帳戶餘額\n" +
        "• `/services` — 查看 8 個在售服務與單價\n" +
        "• `/query` — 選擇服務並下單查詢\n" +
        "• `/result <query_id>` — 查詢非同步結果\n" +
        "• `/cancel` — 取消目前輸入狀態"
    );
    return;
  }

  if (text === "/cancel") {
    await clearUserService(userId);
    await sendMessage(env, chatId, "已取消目前查詢流程。");
    return;
  }

  if (text === "/balance") {
    const { status, data } = await ssn6Api(env, "GET", "/api/wallet/balance");
    if (status === 200 && !data.error) {
      await sendMessage(env, chatId, `💳 目前帳戶餘額：\`$${data.balance}\``);
    } else if (status === 403) {
      await sendMessage(
        env,
        chatId,
        `🚨 *403 錯誤*：${data.message}（60 秒內超過 200 次請求會停用帳號，需後台啟用）`
      );
    } else {
      await sendMessage(
        env,
        chatId,
        `❌ 查餘額失敗（HTTP ${status}）：\`${data.message || JSON.stringify(data)}\``
      );
    }
    return;
  }

  if (text === "/services") {
    const lines = ["*目前在售服務（共 8 項）*\n"];
    for (const [code, s] of Object.entries(SERVICES)) {
      const modeText =
        s.mode === "sync" ? "同步" : `非同步(建議每 ${s.pollSec}s 查一次)`;
      lines.push(`• *${s.name}* (\`${code}\`) — \`${s.price}\` | ${modeText}`);
    }
    await sendMessage(env, chatId, lines.join("\n"));
    return;
  }

  if (text.startsWith("/result")) {
    const parts = text.split(/\s+/);
    const qid = parts[1];
    if (!qid || !/^\d+$/.test(qid)) {
      await sendMessage(env, chatId, "用法：`/result 100861`");
      return;
    }
    await replyQueryResult(env, chatId, qid);
    return;
  }

  if (text === "/query") {
    const rows = Object.entries(SERVICES).map(([code, s]) => [
      { text: `${s.name} (${s.price})`, callback_data: `svc:${code}` },
    ]);
    await sendMessage(env, chatId, "請選擇要查詢的服務：", {
      inline_keyboard: rows,
    });
    return;
  }

  const activeCode = await getUserService(userId);
  if (activeCode && SERVICES[activeCode]) {
    await handleQuerySubmit(env, chatId, userId, activeCode, text);
    return;
  }

  await sendMessage(
    env,
    chatId,
    "請使用 `/query` 開始查詢，或輸入 `/help` 查看指令。"
  );
}

async function handleCallback(cb, env) {
  const chatId = cb.message?.chat?.id;
  const messageId = cb.message?.message_id;
  const userId = cb.from?.id;
  const data = cb.data || "";

  await tgApi(env, "answerCallbackQuery", { callback_query_id: cb.id });

  if (!isAuthorized(userId, env)) {
    if (chatId) await sendMessage(env, chatId, "⛔ 你沒有權限使用此 Bot。");
    return;
  }

  if (data.startsWith("svc:")) {
    const code = data.slice(4);
    const svc = SERVICES[code];
    if (!svc || !chatId) return;

    await setUserService(userId, code);
    const text =
      `已選擇：*${svc.name}* (\`${code}\`，單價 \`${svc.price}\`)\n\n` +
      `${svc.prompt}\n\n輸入 \`/cancel\` 可取消。`;

    if (messageId) {
      await editMessage(env, chatId, messageId, text);
    } else {
      await sendMessage(env, chatId, text);
    }
    return;
  }

  if (data.startsWith("res:")) {
    const qid = data.slice(4);
    if (!chatId || !/^\d+$/.test(qid)) return;
    await replyQueryResult(env, chatId, qid);
  }
}

async function handleQuerySubmit(env, chatId, userId, code, rawText) {
  const svc = SERVICES[code];
  const parts = rawText.split(",").map((s) => s.trim());

  if (parts.length !== svc.fields.length) {
    await sendMessage(
      env,
      chatId,
      `⚠️ 欄位數量不符：需要 ${svc.fields.length} 個欄位（\`${svc.fields.join(", ")}\`），你輸入了 ${parts.length} 個。\n` +
        "請重新輸入，或輸入 `/cancel` 取消。"
    );
    return;
  }

  await clearUserService(userId);

  const queryParams = {};
  svc.fields.forEach((field, idx) => {
    queryParams[field] = parts[idx];
  });

  const sent = await sendMessage(env, chatId, "📤 正在送出查詢...");
  const msgId = sent?.result?.message_id;

  const { status, data } = await ssn6Api(env, "POST", "/api/query/create", {
    service_code: code,
    query_params: queryParams,
  });

  if (status === 429) {
    const qid = data.query_id;
    const tip = qid
      ? `\n請使用 \`/result ${qid}\` 查詢進度，**切勿重複下單**。`
      : "\n請稍後再查，**切勿重複下單**。";
    const keyboard = qid
      ? { inline_keyboard: [[{ text: `🔄 查結果 (${qid})`, callback_data: `res:${qid}` }]] }
      : null;
    await editOrSend(
      env,
      chatId,
      msgId,
      `⚠️ *429 查詢處理中*：${data.message || "請勿重複提交"}${tip}`,
      keyboard
    );
    return;
  }

  if (status === 403) {
    await editOrSend(
      env,
      chatId,
      msgId,
      `🚨 *403 帳號停用*：${data.message || "Account disabled due to abuse"}`
    );
    return;
  }

  if (status !== 200 || data.error) {
    await editOrSend(
      env,
      chatId,
      msgId,
      `❌ 下單失敗（HTTP ${status}）：\`${data.message || JSON.stringify(data)}\``
    );
    return;
  }

  if (svc.mode === "sync" || data.status === "completed" || data.status === "failed") {
    await editOrSend(env, chatId, msgId, formatResult(data));
    return;
  }

  const qid = data.query_id;
  if (qid && svc.pollSec > 0) {
    await sleep(svc.pollSec * 1000);
    const polled = await ssn6Api(env, "GET", `/api/query/result/${qid}`);
    if (
      polled.status === 200 &&
      !polled.data.error &&
      (polled.data.status === "completed" || polled.data.status === "failed")
    ) {
      await editOrSend(env, chatId, msgId, formatResult(polled.data, qid));
      return;
    }
  }

  const keyboard = qid
    ? {
        inline_keyboard: [
          [{ text: `🔄 立即查詢 (${qid})`, callback_data: `res:${qid}` }],
        ],
      }
    : null;

  await editOrSend(
    env,
    chatId,
    msgId,
    `⏳ 已建立非同步任務\n` +
      `*Query ID*：\`${qid}\`\n` +
      (data.task_id ? `*Task ID*：\`${data.task_id}\`\n` : "") +
      `建議每 ${svc.pollSec || 3} 秒點擊下方按鈕或執行 \`/result ${qid}\` 查詢。`,
    keyboard
  );
}

async function replyQueryResult(env, chatId, qid) {
  const { status, data } = await ssn6Api(env, "GET", `/api/query/result/${qid}`);
  if (status === 404) {
    await sendMessage(env, chatId, `⚠️ 找不到 Query ID \`${qid}\`。`);
    return;
  }
  if (status !== 200 || data.error) {
    await sendMessage(
      env,
      chatId,
      `❌ 查結果失敗（HTTP ${status}）：\`${data.message || JSON.stringify(data)}\``
    );
    return;
  }

  const keyboard =
    data.status === "pending"
      ? {
          inline_keyboard: [
            [{ text: `🔄 再查一次 (${qid})`, callback_data: `res:${qid}` }],
          ],
        }
      : null;

  await sendMessage(env, chatId, formatResult(data, qid), keyboard);
}

async function editOrSend(env, chatId, messageId, text, replyMarkup = null) {
  if (messageId) {
    const res = await editMessage(env, chatId, messageId, text, replyMarkup);
    if (res?.ok) return;
  }
  await sendMessage(env, chatId, text, replyMarkup);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

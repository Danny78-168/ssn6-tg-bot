const SERVICES = {
  REV_PHONE_4: {
    name: { zh: "Phone 4（背調所有機主）", en: "Phone 4 (Reverse Phone)" },
    price: "$0.25",
    mode: "sync",
    pollSec: 0,
    fields: ["phone"],
    prompt: {
      zh: "請輸入 10 位美國手機號（純數字，例如 `2125551234`）：",
      en: "Enter a 10-digit US phone number (digits only, e.g. `2125551234`):",
    },
  },
  EMAIL_LOOK: {
    name: { zh: "EMAIL LOOK（背調所有持有人）", en: "Email Lookup (All Holders)" },
    price: "$0.25",
    mode: "sync",
    pollSec: 0,
    fields: ["email"],
    prompt: {
      zh: "請輸入電子信箱（例如 `jane@example.com`）：",
      en: "Enter an email address (e.g. `jane@example.com`):",
    },
  },
  S99_ADDRESS: {
    name: { zh: "姓名+地址", en: "Name + Address" },
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "address", "city", "state", "zip"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編**（半形逗號分隔）：\n範例：`John, Smith, 123 Main St, New York, NY, 10001`",
      en: "Enter **First, Last, Street, City, 2-letter State, 5-digit ZIP** (comma-separated):\nExample: `John, Smith, 123 Main St, New York, NY, 10001`",
    },
  },
  S99_NAME_PHONE: {
    name: { zh: "姓名+手機", en: "Name + Phone" },
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "phone"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 10位美國手機號**（半形逗號分隔）：\n範例：`John, Smith, 2125551234`",
      en: "Enter **First, Last, 10-digit US Phone** (comma-separated):\nExample: `John, Smith, 2125551234`",
    },
  },
  S99_NAME_DOB: {
    name: { zh: "姓名+生日", en: "Name + DOB" },
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "dob"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 生日(MM/DD/YYYY)**（半形逗號分隔）：\n範例：`John, Smith, 01/15/1990`",
      en: "Enter **First, Last, DOB (MM/DD/YYYY)** (comma-separated):\nExample: `John, Smith, 01/15/1990`",
    },
  },
  S99_NAME_ZIP: {
    name: { zh: "姓名+郵編", en: "Name + ZIP" },
    price: "$1.50",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "zip"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 5位郵編**（半形逗號分隔）：\n範例：`John, Smith, 10001`",
      en: "Enter **First, Last, 5-digit ZIP** (comma-separated):\nExample: `John, Smith, 10001`",
    },
  },
  DL: {
    name: { zh: "DL 駕駛執照查詢", en: "Driver License (DL)" },
    price: "$2.00",
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "address", "city", "state", "zip"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編**（半形逗號分隔）：\n範例：`John, Smith, 123 Main St, New York, NY, 10001`",
      en: "Enter **First, Last, Street, City, 2-letter State, 5-digit ZIP** (comma-separated):\nExample: `John, Smith, 123 Main St, New York, NY, 10001`",
    },
  },
  CREDIT_SCORE_2: {
    name: { zh: "信用分 2", en: "Credit Score 2" },
    price: "$1.00",
    mode: "async",
    pollSec: 5,
    fields: ["first_name", "last_name", "address", "city", "state", "zip", "dob"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編, 生日(MM/DD/YYYY)**（半形逗號分隔）：\n範例：`John, Smith, 123 Main St, New York, NY, 10001, 01/15/1990`",
      en: "Enter **First, Last, Street, City, 2-letter State, 5-digit ZIP, DOB (MM/DD/YYYY)** (comma-separated):\nExample: `John, Smith, 123 Main St, New York, NY, 10001, 01/15/1990`",
    },
  },
};

const I18N = {
  zh: {
    welcomeTitle: "🎉 歡迎使用 SSN6 查詢機器人（新戶已自動註冊）",
    userLabel: "用戶名稱",
    balanceLabel: "帳戶餘額",
    langLabel: "目前語言",
    langName: "中文",
    unboundTip: "尚未綁定憑證（可點「綁定憑證」貼上 Token 或 Cookie）",
    boundTip: "已綁定憑證",
    btnQuery: "🔍 下單查詢",
    btnBalance: "💳 餘額",
    btnLang: "🌐 中英切換",
    btnTopup: "💰 充值",
    btnOrders: "📜 歷史訂單",
    btnLogin: "🔐 綁定憑證",
    btnSite: "🌐 網站儀表板",
    chooseService: "請選擇要查詢的服務：",
    needAuth: "⚠️ 請先點「🔐 綁定憑證」設定你的 Token 或 Cookie，再進行查詢。",
    topupText:
      "💰 *帳戶充值說明*\n\n" +
      "1. 請前往網站儀表板或錢包頁面查看最新充值方式與 USDT 公告。\n" +
      "2. 充值前請務必核對站內公告之唯一收款地址，避免假地址。\n" +
      "3. 充值完成後可點「💳 餘額」刷新餘額。",
    noOrders: "📜 目前尚無歷史訂單紀錄。",
    ordersTitle: "📜 *最近歷史訂單*",
    cancelled: "✅ 已取消目前操作。",
  },
  en: {
    welcomeTitle: "🎉 Welcome to SSN6 Query Bot (New account registered)",
    userLabel: "Username",
    balanceLabel: "Balance",
    langLabel: "Language",
    langName: "English",
    unboundTip: "No credential bound (tap 'Bind Token/Cookie' to connect)",
    boundTip: "Credential bound",
    btnQuery: "🔍 New Query",
    btnBalance: "💳 Balance",
    btnLang: "🌐 中文 / EN",
    btnTopup: "💰 Top-up",
    btnOrders: "📜 Order History",
    btnLogin: "🔐 Bind Token/Cookie",
    btnSite: "🌐 Dashboard",
    chooseService: "Select a query service:",
    needAuth: "⚠️ Please tap '🔐 Bind Token/Cookie' first before querying.",
    topupText:
      "💰 *Top-up Guide*\n\n" +
      "1. Visit the web dashboard/wallet page to check deposit methods and USDT notices.\n" +
      "2. Always verify the official deposit address announced in-site before sending funds.\n" +
      "3. Tap '💳 Balance' after top-up to refresh your balance.",
    noOrders: "📜 No order history found yet.",
    ordersTitle: "📜 *Recent Order History*",
    cancelled: "✅ Current action cancelled.",
  },
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("SSN6 Public Telegram Bot Worker is running.", { status: 200 });
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

function cacheReq(key) {
  return new Request(`https://cache.local/ssn6/${encodeURIComponent(key)}`);
}

async function putCache(key, obj, ttlSec = 86400 * 7) {
  await caches.default.put(
    cacheReq(key),
    new Response(JSON.stringify(obj), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `max-age=${ttlSec}`,
      },
    })
  );
}

async function getCache(key) {
  const res = await caches.default.match(cacheReq(key));
  if (!res) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function delCache(key) {
  await caches.default.delete(cacheReq(key));
}

function getDisplayName(from) {
  if (!from) return "User";
  if (from.username) return `@${from.username}`;
  const full = [from.first_name, from.last_name].filter(Boolean).join(" ").trim();
  return full || `User_${from.id}`;
}

async function ensureUserProfile(from) {
  const userId = from?.id;
  if (!userId) return { username: "User", lang: "zh", balance: null, isNew: false };

  let profile = await getCache(`profile:${userId}`);
  let isNew = false;
  if (!profile) {
    isNew = true;
    profile = {
      user_id: userId,
      username: getDisplayName(from),
      lang: "zh",
      balance: null,
      created_at: new Date().toISOString(),
    };
    await putCache(`profile:${userId}`, profile);
  } else {
    const latestName = getDisplayName(from);
    if (latestName && profile.username !== latestName) {
      profile.username = latestName;
      await putCache(`profile:${userId}`, profile);
    }
  }
  return { ...profile, isNew };
}

async function updateUserProfile(userId, patch) {
  const current = (await getCache(`profile:${userId}`)) || {
    user_id: userId,
    username: `User_${userId}`,
    lang: "zh",
    balance: null,
  };
  const next = { ...current, ...patch };
  await putCache(`profile:${userId}`, next);
  return next;
}

async function getUserAuth(userId) {
  return getCache(`auth:${userId}`);
}

async function setUserAuth(userId, authObj) {
  return putCache(`auth:${userId}`, authObj);
}

async function clearUserAuth(userId) {
  return delCache(`auth:${userId}`);
}

async function setUserState(userId, stateObj) {
  return putCache(`state:${userId}`, stateObj, 900);
}

async function getUserState(userId) {
  return getCache(`state:${userId}`);
}

async function clearUserState(userId) {
  return delCache(`state:${userId}`);
}

async function addOrderRecord(userId, record) {
  const list = (await getCache(`orders:${userId}`)) || [];
  list.unshift({
    ...record,
    time: new Date().toISOString().replace("T", " ").slice(0, 19),
  });
  await putCache(`orders:${userId}`, list.slice(0, 15));
}

async function getOrderRecords(userId) {
  return (await getCache(`orders:${userId}`)) || [];
}

async function ssn6Api(env, auth, method, path, body = null) {
  const baseUrl = (env.SSN6_BASE_URL || "https://ssn6.com").replace(/\/+$/, "");
  const headers = {};

  if (auth?.type === "cookie") {
    headers.Cookie = auth.value;
  } else if (auth?.type === "token") {
    headers.Authorization = `Bearer ${auth.value}`;
  }

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
  const payload = { chat_id: chatId, text, parse_mode: "Markdown" };
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

function mainMenuKeyboard(lang) {
  const t = I18N[lang] || I18N.zh;
  return {
    inline_keyboard: [
      [
        { text: t.btnQuery, callback_data: "menu:query" },
        { text: t.btnBalance, callback_data: "menu:balance" },
      ],
      [
        { text: t.btnTopup, callback_data: "menu:topup" },
        { text: t.btnOrders, callback_data: "menu:orders" },
      ],
      [
        { text: t.btnLang, callback_data: "menu:lang" },
        { text: t.btnLogin, callback_data: "menu:login" },
      ],
      [{ text: t.btnSite, url: "https://ssn6.com/dashboard" }],
    ],
  };
}

async function sendHomePanel(env, chatId, from, messageId = null) {
  const profile = await ensureUserProfile(from);
  const lang = profile.lang || "zh";
  const t = I18N[lang] || I18N.zh;
  const auth = await getUserAuth(from.id);

  let balText = profile.balance !== null && profile.balance !== undefined ? `$${profile.balance}` : "—";
  if (auth) {
    const { status, data } = await ssn6Api(env, auth, "GET", "/api/wallet/balance");
    if (status === 200 && !data.error && data.balance !== undefined) {
      balText = `$${data.balance}`;
      await updateUserProfile(from.id, { balance: data.balance });
    }
  }

  const text =
    `*${t.welcomeTitle}*\n\n` +
    `• *${t.userLabel}*：\`${profile.username}\`\n` +
    `• *${t.balanceLabel}*：\`${balText}\`\n` +
    `• *${t.langLabel}*：${t.langName}\n` +
    `• *${auth ? t.boundTip : t.unboundTip}*`;

  const kb = mainMenuKeyboard(lang);
  if (messageId) {
    const res = await editMessage(env, chatId, messageId, text, kb);
    if (res?.ok) return;
  }
  await sendMessage(env, chatId, text, kb);
}

function formatResult(data, fallbackQueryId = null, lang = "zh") {
  const isEn = lang === "en";
  const status = data.status || "unknown";
  const qid = fallbackQueryId ?? data.query_id;
  const lines = [`*${isEn ? "Status" : "查詢狀態"}*：\`${status}\``];

  if (qid !== undefined && qid !== null) lines.push(`*Query ID*：\`${qid}\``);
  if (data.task_id) lines.push(`*Task ID*：\`${data.task_id}\``);
  if (data.reused) {
    lines.push(isEn ? "♻️ Reused completed result within 60s" : "♻️ 60 秒內命中已完成結果（`reused: true`）");
  }

  if (status === "completed") {
    const reply =
      typeof data.result === "object" && data.result !== null
        ? data.result.reply
        : data.reply;
    if (data.balance_after !== undefined) {
      lines.push(`*${isEn ? "Balance After" : "扣款後餘額"}*：\`$${data.balance_after}\``);
    }
    lines.push(`\n*${isEn ? "Result" : "查詢結果"}*：\n\`\`\`\n${reply || "(empty)"}\n\`\`\``);
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
    lines.push(`*${isEn ? "Message" : "說明"}*：${reply || "Failed"}`);
    if (refunded) {
      lines.push(isEn ? "💰 *Refund*: Refunded" : "💰 *退款狀態*：已退回費用");
    }
    if (data.balance_after !== undefined) {
      lines.push(`*${isEn ? "Balance" : "目前餘額"}*：\`$${data.balance_after}\``);
    }
  } else if (status === "pending") {
    lines.push(isEn ? "⏳ Still processing, check again later." : "⏳ 仍在處理中，請稍後再查。");
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
  const from = msg.from;
  const userId = from?.id;
  const text = msg.text.trim();
  const profile = await ensureUserProfile(from);
  const lang = profile.lang || "zh";
  const t = I18N[lang] || I18N.zh;

  if (text === "/start" || text === "/help" || text === "/menu") {
    await sendHomePanel(env, chatId, from);
    return;
  }

  if (text === "/cancel") {
    await clearUserState(userId);
    await sendMessage(env, chatId, t.cancelled, mainMenuKeyboard(lang));
    return;
  }

  const state = await getUserState(userId);
  if (state?.step === "await_auth") {
    await handleAuthInput(env, chatId, userId, state.authType, text, lang);
    return;
  }
  if (state?.step === "await_params" && state.serviceCode) {
    await handleQuerySubmit(env, chatId, userId, state.serviceCode, text, lang);
    return;
  }

  if (text === "/balance") {
    await handleBalanceAction(env, chatId, userId, lang);
    return;
  }

  if (text === "/query") {
    await sendServicePicker(env, chatId, lang);
    return;
  }

  if (text.startsWith("/result")) {
    const qid = text.split(/\s+/)[1];
    if (!qid || !/^\d+$/.test(qid)) {
      await sendMessage(env, chatId, lang === "en" ? "Usage: `/result 100861`" : "用法：`/result 100861`");
      return;
    }
    await replyQueryResult(env, chatId, userId, qid, lang);
    return;
  }

  await sendHomePanel(env, chatId, from);
}

async function handleBalanceAction(env, chatId, userId, lang, messageId = null) {
  const t = I18N[lang] || I18N.zh;
  const auth = await getUserAuth(userId);
  if (!auth) {
    await sendMessage(env, chatId, t.needAuth, mainMenuKeyboard(lang));
    return;
  }

  const { status, data } = await ssn6Api(env, auth, "GET", "/api/wallet/balance");
  if (status === 200 && !data.error && data.balance !== undefined) {
    await updateUserProfile(userId, { balance: data.balance });
    const txt = `💳 *${t.balanceLabel}*：\`$${data.balance}\``;
    if (messageId) {
      const ok = await editMessage(env, chatId, messageId, txt, mainMenuKeyboard(lang));
      if (ok?.ok) return;
    }
    await sendMessage(env, chatId, txt, mainMenuKeyboard(lang));
    return;
  }

  const errTxt =
    status === 403
      ? `🚨 403：${data.message}`
      : `❌ HTTP ${status}：\`${data.message || JSON.stringify(data)}\``;
  await sendMessage(env, chatId, errTxt, mainMenuKeyboard(lang));
}

async function sendOrdersAction(env, chatId, userId, lang, messageId = null) {
  const t = I18N[lang] || I18N.zh;
  const orders = await getOrderRecords(userId);
  if (!orders.length) {
    await sendMessage(env, chatId, t.noOrders, mainMenuKeyboard(lang));
    return;
  }

  const lines = [t.ordersTitle, ""];
  const buttons = [];
  for (const item of orders.slice(0, 8)) {
    const svcName = SERVICES[item.service_code]?.name?.[lang] || item.service_code;
    lines.push(
      `• \`#${item.query_id || "-"}\` | *${svcName}* | \`${item.status}\` | ${item.time}`
    );
    if (item.query_id) {
      buttons.push([{ text: `🔄 ${item.query_id} (${svcName})`, callback_data: `res:${item.query_id}` }]);
    }
  }
  buttons.push([{ text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }]);

  const txt = lines.join("\n");
  const kb = { inline_keyboard: buttons };
  if (messageId) {
    const ok = await editMessage(env, chatId, messageId, txt, kb);
    if (ok?.ok) return;
  }
  await sendMessage(env, chatId, txt, kb);
}

async function sendServicePicker(env, chatId, lang, messageId = null) {
  const t = I18N[lang] || I18N.zh;
  const rows = Object.entries(SERVICES).map(([code, s]) => [
    { text: `${s.name[lang] || s.name.zh} (${s.price})`, callback_data: `svc:${code}` },
  ]);
  rows.push([{ text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }]);
  const kb = { inline_keyboard: rows };

  if (messageId) {
    const ok = await editMessage(env, chatId, messageId, t.chooseService, kb);
    if (ok?.ok) return;
  }
  await sendMessage(env, chatId, t.chooseService, kb);
}

async function startLoginFlow(env, chatId, userId, lang, messageId = null) {
  const txt =
    lang === "en"
      ? "Choose credential type to bind:\n• *API Token*\n• *Browser Cookie*"
      : "請選擇要綁定的憑證類型：\n• *API Token*\n• *瀏覽器 Cookie*";
  const kb = {
    inline_keyboard: [
      [
        { text: "🔑 API Token", callback_data: "authmode:token" },
        { text: "🍪 Cookie", callback_data: "authmode:cookie" },
      ],
      [{ text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }],
    ],
  };
  if (messageId) {
    const ok = await editMessage(env, chatId, messageId, txt, kb);
    if (ok?.ok) return;
  }
  await sendMessage(env, chatId, txt, kb);
}

async function handleAuthInput(env, chatId, userId, authType, rawText, lang) {
  const cleaned = rawText.replace(/^Bearer\s+/i, "").trim();
  if (!cleaned || cleaned.length < 6) {
    await sendMessage(
      env,
      chatId,
      lang === "en" ? "⚠️ Invalid credential, try again or `/cancel`." : "⚠️ 憑證內容太短，請重新輸入或 `/cancel`。"
    );
    return;
  }

  await setUserAuth(userId, { type: authType, value: cleaned });
  await clearUserState(userId);

  const { status, data } = await ssn6Api(
    env,
    { type: authType, value: cleaned },
    "GET",
    "/api/wallet/balance"
  );

  if (status === 200 && !data.error && data.balance !== undefined) {
    await updateUserProfile(userId, { balance: data.balance });
    await sendMessage(
      env,
      chatId,
      lang === "en"
        ? `✅ Bound! Current balance: \`$${data.balance}\``
        : `✅ 綁定成功！目前餘額：\`$${data.balance}\``,
      mainMenuKeyboard(lang)
    );
  } else {
    await sendMessage(
      env,
      chatId,
      lang === "en"
        ? `✅ Saved (\`${authType}\`), balance check returned HTTP ${status}.`
        : `✅ 已儲存憑證（\`${authType}\`），查餘額回傳 HTTP ${status}。`,
      mainMenuKeyboard(lang)
    );
  }
}

async function handleCallback(cb, env) {
  const chatId = cb.message?.chat?.id;
  const messageId = cb.message?.message_id;
  const from = cb.from;
  const userId = from?.id;
  const data = cb.data || "";

  await tgApi(env, "answerCallbackQuery", { callback_query_id: cb.id });
  if (!chatId) return;

  const profile = await ensureUserProfile(from);
  let lang = profile.lang || "zh";
  const t = I18N[lang] || I18N.zh;

  if (data === "menu:home") {
    await sendHomePanel(env, chatId, from, messageId);
    return;
  }

  if (data === "menu:lang") {
    lang = lang === "zh" ? "en" : "zh";
    await updateUserProfile(userId, { lang });
    await sendHomePanel(env, chatId, from, messageId);
    return;
  }

  if (data === "menu:topup") {
    const kb = {
      inline_keyboard: [
        [{ text: t.btnSite, url: "https://ssn6.com/dashboard" }],
        [{ text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }],
      ],
    };
    await sendMessage(env, chatId, t.topupText, kb);
    return;
  }

  if (data === "menu:orders") {
    await sendOrdersAction(env, chatId, userId, lang, messageId);
    return;
  }

  if (data === "menu:balance") {
    await handleBalanceAction(env, chatId, userId, lang, messageId);
    return;
  }

  if (data === "menu:query") {
    await sendServicePicker(env, chatId, lang, messageId);
    return;
  }

  if (data === "menu:login") {
    await startLoginFlow(env, chatId, userId, lang, messageId);
    return;
  }

  if (data.startsWith("authmode:")) {
    const authType = data.slice(9);
    await setUserState(userId, { step: "await_auth", authType });
    const tip =
      authType === "token"
        ? lang === "en"
          ? "Send your **API Token** (or `/cancel`):"
          : "請貼上你的 **API Token**（或 `/cancel` 取消）："
        : lang === "en"
          ? "Send your **Cookie** string from ssn6.com (or `/cancel`):"
          : "請貼上登入 `ssn6.com` 後的 **Cookie** 字串（或 `/cancel` 取消）：";
    if (messageId) {
      const ok = await editMessage(env, chatId, messageId, tip);
      if (ok?.ok) return;
    }
    await sendMessage(env, chatId, tip);
    return;
  }

  if (data.startsWith("svc:")) {
    const code = data.slice(4);
    const svc = SERVICES[code];
    if (!svc) return;

    const auth = await getUserAuth(userId);
    if (!auth) {
      await sendMessage(env, chatId, t.needAuth, mainMenuKeyboard(lang));
      return;
    }

    await setUserState(userId, { step: "await_params", serviceCode: code });
    const svcName = svc.name[lang] || svc.name.zh;
    const promptTxt = svc.prompt[lang] || svc.prompt.zh;
    const txt =
      `*${svcName}* (\`${code}\` · \`${svc.price}\`)\n\n` +
      `${promptTxt}\n\n` +
      (lang === "en" ? "Send `/cancel` to abort." : "輸入 `/cancel` 可取消。");

    if (messageId) {
      const ok = await editMessage(env, chatId, messageId, txt);
      if (ok?.ok) return;
    }
    await sendMessage(env, chatId, txt);
    return;
  }

  if (data.startsWith("res:")) {
    const qid = data.slice(4);
    if (!/^\d+$/.test(qid)) return;
    await replyQueryResult(env, chatId, userId, qid, lang);
  }
}

async function handleQuerySubmit(env, chatId, userId, code, rawText, lang) {
  const t = I18N[lang] || I18N.zh;
  const auth = await getUserAuth(userId);
  if (!auth) {
    await clearUserState(userId);
    await sendMessage(env, chatId, t.needAuth, mainMenuKeyboard(lang));
    return;
  }

  const svc = SERVICES[code];
  const parts = rawText.split(",").map((s) => s.trim());

  if (parts.length !== svc.fields.length) {
    await sendMessage(
      env,
      chatId,
      lang === "en"
        ? `⚠️ Expected ${svc.fields.length} fields (\`${svc.fields.join(", ")}\`), got ${parts.length}. Try again or \`/cancel\`.`
        : `⚠️ 需要 ${svc.fields.length} 個欄位（\`${svc.fields.join(", ")}\`），你輸入了 ${parts.length} 個。請重試或 \`/cancel\`。`
    );
    return;
  }

  await clearUserState(userId);

  const queryParams = {};
  svc.fields.forEach((field, idx) => {
    queryParams[field] = parts[idx];
  });

  const sent = await sendMessage(env, chatId, lang === "en" ? "📤 Submitting..." : "📤 正在送出查詢...");
  const msgId = sent?.result?.message_id;

  const { status, data } = await ssn6Api(env, auth, "POST", "/api/query/create", {
    service_code: code,
    query_params: queryParams,
  });

  if (data?.balance_after !== undefined) {
    await updateUserProfile(userId, { balance: data.balance_after });
  }

  if (status === 429) {
    const qid = data.query_id;
    if (qid) {
      await addOrderRecord(userId, { query_id: qid, service_code: code, status: "pending" });
    }
    const kb = qid
      ? { inline_keyboard: [[{ text: `🔄 ${qid}`, callback_data: `res:${qid}` }]] }
      : mainMenuKeyboard(lang);
    await editOrSend(
      env,
      chatId,
      msgId,
      `⚠️ 429：${data.message || "Please do not resubmit"}` + (qid ? `\nQuery ID: \`${qid}\`` : ""),
      kb
    );
    return;
  }

  if (status === 403) {
    await editOrSend(env, chatId, msgId, `🚨 403：${data.message || "Account disabled"}`, mainMenuKeyboard(lang));
    return;
  }

  if (status !== 200 || data.error) {
    await editOrSend(
      env,
      chatId,
      msgId,
      `❌ HTTP ${status}：\`${data.message || JSON.stringify(data)}\``,
      mainMenuKeyboard(lang)
    );
    return;
  }

  if (data.query_id) {
    await addOrderRecord(userId, {
      query_id: data.query_id,
      service_code: code,
      status: data.status || (svc.mode === "sync" ? "completed" : "pending"),
    });
  }

  if (svc.mode === "sync" || data.status === "completed" || data.status === "failed") {
    await editOrSend(env, chatId, msgId, formatResult(data, data.query_id, lang), mainMenuKeyboard(lang));
    return;
  }

  const qid = data.query_id;
  if (qid && svc.pollSec > 0) {
    await sleep(svc.pollSec * 1000);
    const polled = await ssn6Api(env, auth, "GET", `/api/query/result/${qid}`);
    if (
      polled.status === 200 &&
      !polled.data.error &&
      (polled.data.status === "completed" || polled.data.status === "failed")
    ) {
      if (polled.data.balance_after !== undefined) {
        await updateUserProfile(userId, { balance: polled.data.balance_after });
      }
      await addOrderRecord(userId, {
        query_id: qid,
        service_code: code,
        status: polled.data.status,
      });
      await editOrSend(env, chatId, msgId, formatResult(polled.data, qid, lang), mainMenuKeyboard(lang));
      return;
    }
  }

  const kb = {
    inline_keyboard: [
      ...(qid ? [[{ text: `🔄 ${qid}`, callback_data: `res:${qid}` }]] : []),
      [{ text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }],
    ],
  };

  await editOrSend(
    env,
    chatId,
    msgId,
    (lang === "en" ? "⏳ Async task created\nQuery ID: " : "⏳ 已建立非同步任務\nQuery ID：") +
      `\`${qid}\``,
    kb
  );
}

async function replyQueryResult(env, chatId, userId, qid, lang) {
  const t = I18N[lang] || I18N.zh;
  const auth = await getUserAuth(userId);
  if (!auth) {
    await sendMessage(env, chatId, t.needAuth, mainMenuKeyboard(lang));
    return;
  }

  const { status, data } = await ssn6Api(env, auth, "GET", `/api/query/result/${qid}`);
  if (status === 404) {
    await sendMessage(env, chatId, `⚠️ Not found: \`${qid}\``, mainMenuKeyboard(lang));
    return;
  }
  if (status !== 200 || data.error) {
    await sendMessage(env, chatId, `❌ HTTP ${status}：\`${data.message || JSON.stringify(data)}\``, mainMenuKeyboard(lang));
    return;
  }

  if (data.balance_after !== undefined) {
    await updateUserProfile(userId, { balance: data.balance_after });
  }
  if (data.status) {
    await addOrderRecord(userId, {
      query_id: qid,
      service_code: data.service_code || "QUERY",
      status: data.status,
    });
  }

  const kb =
    data.status === "pending"
      ? {
          inline_keyboard: [
            [{ text: `🔄 ${qid}`, callback_data: `res:${qid}` }],
            [{ text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }],
          ],
        }
      : mainMenuKeyboard(lang);

  await sendMessage(env, chatId, formatResult(data, qid, lang), kb);
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

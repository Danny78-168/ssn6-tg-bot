const DEFAULT_BOT_USERNAME = "SSN699_bot";

const SERVICES = {
  REV_PHONE_4: {
    name: { zh: "Phone 4（背調所有機主）", en: "Phone 4 (Reverse Phone)" },
    defaultPrice: 0.25,
    mode: "sync",
    pollSec: 0,
    fields: ["phone"],
    prompt: {
      zh: "請輸入 10 位美國手機號（純數字，區號勿以 0 或 1 開頭，例如 `2125551234`）：",
      en: "Enter 10-digit US phone (digits only, area code not starting with 0/1, e.g. `2125551234`):",
    },
  },
  EMAIL_LOOK: {
    name: { zh: "EMAIL LOOK（背調所有持有人）", en: "Email Lookup (All Holders)" },
    defaultPrice: 0.25,
    mode: "sync",
    pollSec: 0,
    fields: ["email"],
    prompt: {
      zh: "請輸入電子信箱（例如 `jane@example.com`）：",
      en: "Enter email address (e.g. `jane@example.com`):",
    },
  },
  S99_ADDRESS: {
    name: { zh: "姓名+地址", en: "Name + Address" },
    defaultPrice: 1.5,
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "address", "city", "state", "zip"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編**（半形逗號分隔，名勿帶中間名，地址勿帶公寓號）：\n範例：`John, Smith, 123 Main St, New York, NY, 10001`",
      en: "Enter **First, Last, Street, City, 2-letter State, 5-digit ZIP** (no middle name, no apt):\nExample: `John, Smith, 123 Main St, New York, NY, 10001`",
    },
  },
  S99_NAME_PHONE: {
    name: { zh: "姓名+手機", en: "Name + Phone" },
    defaultPrice: 1.5,
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
    defaultPrice: 1.5,
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
    defaultPrice: 1.5,
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "zip"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 5位郵編**（半形逗號分隔，免填城市與州）：\n範例：`John, Smith, 10001`",
      en: "Enter **First, Last, 5-digit ZIP** (city/state not required):\nExample: `John, Smith, 10001`",
    },
  },
  DL: {
    name: { zh: "DL 駕駛執照查詢", en: "Driver License (DL)" },
    defaultPrice: 2.0,
    mode: "async",
    pollSec: 3,
    fields: ["first_name", "last_name", "address", "city", "state", "zip"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編**（回傳生日與駕照號）：\n範例：`John, Smith, 123 Main St, New York, NY, 10001`",
      en: "Enter **First, Last, Street, City, 2-letter State, 5-digit ZIP** (returns DOB & DL#):\nExample: `John, Smith, 123 Main St, New York, NY, 10001`",
    },
  },
  CREDIT_SCORE_2: {
    name: { zh: "信用分 2", en: "Credit Score 2" },
    defaultPrice: 1.0,
    mode: "async",
    pollSec: 5,
    fields: ["first_name", "last_name", "address", "city", "state", "zip", "dob"],
    prompt: {
      zh: "請依序輸入 **名, 姓, 街道門牌, 城市, 兩位州縮寫, 5位郵編, 生日(MM/DD/YYYY)**（間隔 5 秒輪詢，最長約 3 分鐘）：\n範例：`John, Smith, 123 Main St, New York, NY, 10001, 01/15/1990`",
      en: "Enter **First, Last, Street, City, 2-letter State, 5-digit ZIP, DOB (MM/DD/YYYY)** (5s poll, up to ~3m):\nExample: `John, Smith, 123 Main St, New York, NY, 10001, 01/15/1990`",
    },
  },
};

const I18N = {
  zh: {
    welcomeTitle: "🎉 SSN6 查詢中心（已自動註冊帳戶）",
    userLabel: "TG 用戶",
    siteUserLabel: "網站帳號",
    balanceLabel: "帳戶餘額",
    langLabel: "目前語言",
    langName: "中文",
    unboundTip: "⚠️ 尚未綁定帳號（請點下方「🔐 自動登入/綁定」）",
    boundTip: "✅ 已連接 SSN6 帳號",
    btnQuery: "🔍 下單查詢",
    btnBalance: "💳 刷新餘額",
    btnTopup: "💰 充值",
    btnOrders: "📜 歷史訂單",
    btnLang: "🌐 中英切換",
    btnLogin: "🔐 自動登入/綁定",
    btnSite: "🌐 網站儀表板",
    chooseService: "請選擇查詢服務（價格已同步帳號等級價）：",
    needAuth: "⚠️ 尚未登入或 Token 已過期，請先點「🔐 自動登入/綁定」。",
    topupText:
      "💰 *帳戶充值說明*\n\n" +
      "1. 點下方按鈕開啟網站儀表板進入「錢包」頁面進行 USDT 充值。\n" +
      "2. 充值前請務必核對站內公告之唯一收款地址，避免假地址。\n" +
      "3. 充值完成後點「💳 刷新餘額」即可同步最新餘額。",
    noOrders: "📜 目前尚無歷史訂單紀錄。",
    ordersTitle: "📜 *最近歷史訂單*",
    cancelled: "✅ 已取消目前操作。",
  },
  en: {
    welcomeTitle: "🎉 SSN6 Query Hub (Account Registered)",
    userLabel: "TG User",
    siteUserLabel: "Site Account",
    balanceLabel: "Balance",
    langLabel: "Language",
    langName: "English",
    unboundTip: "⚠️ Not connected (tap '🔐 Auto Login / Bind' below)",
    boundTip: "✅ Connected to SSN6",
    btnQuery: "🔍 New Query",
    btnBalance: "💳 Refresh Balance",
    btnTopup: "💰 Top-up",
    btnOrders: "📜 Order History",
    btnLang: "🌐 中文 / EN",
    btnLogin: "🔐 Auto Login / Bind",
    btnSite: "🌐 Dashboard",
    chooseService: "Select a service (prices synced to your tier):",
    needAuth: "⚠️ Not logged in or token expired. Tap '🔐 Auto Login / Bind' first.",
    topupText:
      "💰 *Top-up Guide*\n\n" +
      "1. Open the Dashboard below and go to Wallet for USDT top-up.\n" +
      "2. Always verify the single official address announced in-site.\n" +
      "3. Tap '💳 Refresh Balance' after deposit to sync.",
    noOrders: "📜 No order history yet.",
    ordersTitle: "📜 *Recent Order History*",
    cancelled: "✅ Action cancelled.",
  },
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("SSN6 Telegram Bot Worker is active.", { status: 200 });
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
  return new Request(`https://cache.local/ssn6-v2/${encodeURIComponent(key)}`);
}

async function putCache(key, obj, ttlSec = 86400 * 30) {
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
  if (!userId) return { username: "User", site_username: null, lang: "zh", balance: null };

  let profile = await getCache(`profile:${userId}`);
  if (!profile) {
    profile = {
      user_id: userId,
      username: getDisplayName(from),
      site_username: null,
      lang: "zh",
      balance: null,
      tier_prices: {},
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
  return profile;
}

async function updateUserProfile(userId, patch) {
  const current = (await getCache(`profile:${userId}`)) || {
    user_id: userId,
    username: `User_${userId}`,
    site_username: null,
    lang: "zh",
    balance: null,
    tier_prices: {},
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
  const idx = record.query_id ? list.findIndex((x) => String(x.query_id) === String(record.query_id)) : -1;
  const entry = {
    ...record,
    time: new Date().toISOString().replace("T", " ").slice(0, 19),
  };
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...entry };
  } else {
    list.unshift(entry);
  }
  await putCache(`orders:${userId}`, list.slice(0, 20));
}

async function getOrderRecords(userId) {
  return (await getCache(`orders:${userId}`)) || [];
}

function normalizeToken(raw) {
  const s = (raw || "").trim();
  const bearer = s.match(/Bearer\s+([A-Za-z0-9._\-~+/=]+)/i);
  if (bearer) return bearer[1];
  try {
    const parsed = JSON.parse(s);
    if (parsed && typeof parsed === "object") {
      return parsed.token || parsed.token_enc || s;
    }
  } catch {
    // 非 JSON
  }
  return s;
}

async function ssn6Api(env, auth, method, path, body = null) {
  const baseUrl = (env.SSN6_BASE_URL || "https://ssn6.com").replace(/\/+$/, "");
  const headers = {};

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
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

async function syncAccountInfo(env, userId, auth) {
  const result = { ok: false, status: 0, balance: null, tierPrices: {}, errorData: null };

  // 1. 同步餘額：GET /api/wallet/balance
  const balRes = await ssn6Api(env, auth, "GET", "/api/wallet/balance");
  result.status = balRes.status;
  if (balRes.status === 200 && !balRes.data.error && balRes.data.balance !== undefined) {
    result.ok = true;
    result.balance = balRes.data.balance;
  } else {
    result.errorData = balRes.data;
    return result;
  }

  // 2. 同步帳號等級單價：GET /api/query/services
  const svcRes = await ssn6Api(env, auth, "GET", "/api/query/services");
  if (svcRes.status === 200 && !svcRes.data.error) {
    const list = Array.isArray(svcRes.data)
      ? svcRes.data
      : Array.isArray(svcRes.data.services)
        ? svcRes.data.services
        : [];
    for (const item of list) {
      const code = item.service_code || item.code;
      if (code && item.price !== undefined) {
        result.tierPrices[code] = item.price;
      }
    }
  }

  await updateUserProfile(userId, {
    balance: result.balance,
    tier_prices: result.tierPrices,
  });

  return result;
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

function buildBookmarkletCode(botUsername) {
  const cleanBot = (botUsername || DEFAULT_BOT_USERNAME).replace(/^@/, "");
  return (
    `javascript:(()=>{const t=localStorage.getItem("token");` +
    `if(!t){alert("未偵測到登入 token，請先在網頁完成登入");return;}` +
    `if(t.length<=58&&/^[A-Za-z0-9_-]+$/.test(t)){location.href="https://t.me/${cleanBot}?start=bind_"+encodeURIComponent(t);}` +
    `else{navigator.clipboard?.writeText(t);alert("已自動複製 Token，請切回 Telegram Bot 貼上完成綁定");location.href="https://t.me/${cleanBot}";}})();`
  );
}

async function sendHomePanel(env, chatId, from, messageId = null) {
  const profile = await ensureUserProfile(from);
  const lang = profile.lang || "zh";
  const t = I18N[lang] || I18N.zh;
  const auth = await getUserAuth(from.id);

  let balText =
    profile.balance !== null && profile.balance !== undefined ? `$${profile.balance}` : "—";
  let isBound = Boolean(auth);

  if (auth) {
    const sync = await syncAccountInfo(env, from.id, auth);
    if (sync.ok) {
      balText = `$${sync.balance}`;
    } else if (sync.status === 401) {
      await clearUserAuth(from.id);
      isBound = false;
      balText = "—";
    }
  }

  const lines = [
    `*${t.welcomeTitle}*`,
    "",
    `• *${t.userLabel}*：\`${profile.username}\``,
  ];
  if (profile.site_username) {
    lines.push(`• *${t.siteUserLabel}*：\`${profile.site_username}\``);
  }
  lines.push(`• *${t.balanceLabel}*：\`${balText}\``);
  lines.push(`• *${t.langLabel}*：${t.langName}`);
  lines.push(`• ${isBound ? t.boundTip : t.unboundTip}`);

  const text = lines.join("\n");
  const kb = mainMenuKeyboard(lang);

  if (messageId) {
    const res = await editMessage(env, chatId, messageId, text, kb);
    if (res?.ok) return;
  }
  await sendMessage(env, chatId, text, kb);
}

function formatHttpError(status, data, lang = "zh") {
  const isEn = lang === "en";
  if (status === 401) {
    const code = data?.code || "TOKEN_EXPIRED";
    return isEn
      ? `🔑 *401 Unauthorized* (\`${code}\`): Token expired or invalid. Please tap '🔐 Auto Login / Bind' again.`
      : `🔑 *401 未授權*（\`${code}\`）：Token 無效、過期或未帶入，請重新點擊「🔐 自動登入/綁定」。`;
  }
  if (status === 403) {
    return isEn
      ? `🚨 *403 Account Disabled* (\`ACCOUNT_DISABLED\`): Rate limit (200 req/60s) exceeded. Contact support to re-enable.`
      : `🚨 *403 帳號已停用*（\`ACCOUNT_DISABLED\`）：觸發 60 秒 200 次請求上限，帳號已停用且不會自動恢復，需聯絡後台啟用。`;
  }
  if (status === 429) {
    const qid = data?.query_id;
    const tid = data?.task_id;
    return isEn
      ? `⚠️ *429 Processing*: Do NOT resubmit.${qid ? ` Poll Query ID: \`${qid}\`` : ""}${tid ? ` (\`${tid}\`)` : ""}`
      : `⚠️ *429 查詢處理中*：請勿重複下單！${qid ? `請改查 Query ID：\`${qid}\`` : ""}${tid ? `（\`${tid}\`）` : ""}`;
  }
  return `❌ HTTP ${status}：\`${data?.message || JSON.stringify(data)}\``;
}

function formatResult(data, fallbackQueryId = null, lang = "zh") {
  const isEn = lang === "en";
  const status = data.status || "unknown";
  const qid = fallbackQueryId ?? data.query_id;
  const lines = [`*${isEn ? "Status" : "查詢狀態"}*：\`${status}\``];

  if (qid !== undefined && qid !== null) lines.push(`*Query ID*：\`${qid}\``);
  if (data.task_id) lines.push(`*Task ID*：\`${data.task_id}\``);
  if (data.reused) {
    lines.push(
      isEn
        ? "♻️ Reused completed result within 60s (`reused: true`)"
        : "♻️ 60 秒內同一查詢已命中快取（`reused: true`）"
    );
  }

  if (status === "completed") {
    const reply =
      typeof data.result === "object" && data.result !== null
        ? data.result.reply
        : data.reply;
    if (data.cost !== undefined) {
      lines.push(`*${isEn ? "Cost" : "本次扣款"}*：\`$${data.cost}\``);
    }
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
    lines.push(`*${isEn ? "Reason" : "說明"}*：${reply || "Failed"}`);
    if (refunded) {
      const refAmt = data.refund_amount !== undefined ? ` ($${data.refund_amount})` : "";
      lines.push(
        isEn
          ? `💰 *Refunded*: Yes${refAmt}`
          : `💰 *退款狀態*：未查到相關資料，費用已退回${refAmt}`
      );
    }
    if (data.balance_after !== undefined) {
      lines.push(`*${isEn ? "Balance" : "目前餘額"}*：\`$${data.balance_after}\``);
    }
  } else if (status === "pending") {
    lines.push(
      isEn
        ? "⏳ Still pending, tap the button below to poll again."
        : "⏳ 仍在處理中，請點擊下方按鈕輪詢結果。"
    );
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

  if (text.startsWith("/start")) {
    const param = text.split(/\s+/)[1] || "";
    if (param.startsWith("bind_")) {
      const rawToken = decodeURIComponent(param.slice(5)).trim();
      if (rawToken.length >= 6) {
        await bindTokenAndReply(env, chatId, from, rawToken, lang);
        return;
      }
    }
    await sendHomePanel(env, chatId, from);
    return;
  }

  if (text === "/help" || text === "/menu") {
    await sendHomePanel(env, chatId, from);
    return;
  }

  if (text === "/cancel") {
    await clearUserState(userId);
    await sendMessage(env, chatId, t.cancelled, mainMenuKeyboard(lang));
    return;
  }

  const state = await getUserState(userId);

  if (state?.step === "await_login_user") {
    await setUserState(userId, { step: "await_login_pass", username: text });
    await sendMessage(
      env,
      chatId,
      lang === "en"
        ? `Account: \`${text}\`\nNow enter your **Password** (not stored after login, or \`/cancel\`):`
        : `帳號：\`${text}\`\n請輸入網站 **密碼**（僅用於當下換取 Token，不會保存密碼；輸入 \`/cancel\` 可取消）：`
    );
    return;
  }

  if (state?.step === "await_login_pass") {
    await handleCredentialLogin(env, chatId, from, state.username, text, lang);
    return;
  }

  if (state?.step === "await_token") {
    await bindTokenAndReply(env, chatId, from, text, lang);
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
    await sendServicePicker(env, chatId, userId, lang);
    return;
  }

  if (text.startsWith("/result")) {
    const qid = text.split(/\s+/)[1];
    if (!qid || !/^\d+$/.test(qid)) {
      await sendMessage(
        env,
        chatId,
        lang === "en" ? "Usage: `/result 100861`" : "用法：`/result 100861`"
      );
      return;
    }
    await replyQueryResult(env, chatId, userId, qid, lang);
    return;
  }

  await sendHomePanel(env, chatId, from);
}

async function handleCredentialLogin(env, chatId, from, siteUsername, password, lang) {
  const userId = from.id;
  await clearUserState(userId);

  const sent = await sendMessage(
    env,
    chatId,
    lang === "en" ? "🔐 Logging into ssn6.com..." : "🔐 正在自動登入 ssn6.com 並取得 Token..."
  );
  const msgId = sent?.result?.message_id;

  const { status, data } = await ssn6Api(env, null, "POST", "/api/login", {
    username: siteUsername,
    password,
    turnstile_token: null,
    vip_token: null,
  });

  if (status === 200 && !data.error && data.token) {
    const siteUser = data.user?.username || siteUsername;
    await updateUserProfile(userId, { site_username: siteUser });
    await bindTokenAndReply(env, chatId, from, data.token, lang, msgId);
    return;
  }

  // 若後台開啟 Turnstile 人機驗證或帳密有誤，引導使用一鍵書籤自動讀取 localStorage.token
  const bookmarklet = buildBookmarkletCode(env.BOT_USERNAME || DEFAULT_BOT_USERNAME);
  await setUserState(userId, { step: "await_token" });

  const errMsg = data?.message || `HTTP ${status}`;
  const fallbackText =
    lang === "en"
      ? `⚠️ Direct login returned: \`${errMsg}\` (Cloudflare Turnstile may be active).\n\n` +
        "Use the one-click bookmarklet after browser login to auto-bind `localStorage.token`:\n" +
        `\`${bookmarklet}\`\n\nOr paste your Token directly below:`
      : `⚠️ 直接帳密登入回傳：\`${errMsg}\`（站點目前開啟了 Cloudflare 人機驗證）。\n\n` +
        "請在網頁完成登入後點擊下方一鍵書籤，系統會自動抓取 `localStorage.token` 並跳回完成綁定：\n" +
        `\`${bookmarklet}\`\n\n或直接在此貼上你的 Token：`;

  const kb = {
    inline_keyboard: [
      [{ text: "🌐 開啟 ssn6.com 登入", url: "https://ssn6.com" }],
      [{ text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }],
    ],
  };

  await editOrSend(env, chatId, msgId, fallbackText, kb);
}

async function bindTokenAndReply(env, chatId, from, rawInput, lang, editMsgId = null) {
  const userId = from.id;
  const token = normalizeToken(rawInput);
  if (!token || token.length < 6) {
    await sendMessage(
      env,
      chatId,
      lang === "en"
        ? "⚠️ Invalid or too short Token. Try again or `/cancel`."
        : "⚠️ Token 格式無效或太短，請重新輸入或 `/cancel`。"
    );
    return;
  }

  const auth = { token };
  await setUserAuth(userId, auth);
  await clearUserState(userId);

  const sync = await syncAccountInfo(env, userId, auth);
  if (sync.ok) {
    const txt =
      lang === "en"
        ? `✅ *Auto-Bind Successful!*\n• Balance: \`$${sync.balance}\`\n• Service prices synced.`
        : `✅ *自動登入綁定成功！*\n• 目前餘額：\`$${sync.balance}\`\n• 已同步帳號等級價與在售服務列表。`;
    await editOrSend(env, chatId, editMsgId, txt, mainMenuKeyboard(lang));
    return;
  }

  if (sync.status === 401) {
    await clearUserAuth(userId);
  }
  await editOrSend(
    env,
    chatId,
    editMsgId,
    formatHttpError(sync.status, sync.errorData, lang),
    mainMenuKeyboard(lang)
  );
}

async function handleBalanceAction(env, chatId, userId, lang, messageId = null) {
  const t = I18N[lang] || I18N.zh;
  const auth = await getUserAuth(userId);
  if (!auth) {
    await sendMessage(env, chatId, t.needAuth, mainMenuKeyboard(lang));
    return;
  }

  const sync = await syncAccountInfo(env, userId, auth);
  if (sync.ok) {
    const txt = `💳 *${t.balanceLabel}*：\`$${sync.balance}\``;
    if (messageId) {
      const ok = await editMessage(env, chatId, messageId, txt, mainMenuKeyboard(lang));
      if (ok?.ok) return;
    }
    await sendMessage(env, chatId, txt, mainMenuKeyboard(lang));
    return;
  }

  if (sync.status === 401) {
    await clearUserAuth(userId);
  }
  await sendMessage(env, chatId, formatHttpError(sync.status, sync.errorData, lang), mainMenuKeyboard(lang));
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
  for (const item of orders.slice(0, 10)) {
    const svcName = SERVICES[item.service_code]?.name?.[lang] || item.service_code;
    lines.push(
      `• \`#${item.query_id || "-"}\` | *${svcName}* | \`${item.status}\` | ${item.time}`
    );
    if (item.query_id) {
      buttons.push([
        { text: `🔄 ${item.query_id} (${svcName})`, callback_data: `res:${item.query_id}` },
      ]);
    }
  }
  buttons.push([
    { text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" },
  ]);

  const txt = lines.join("\n");
  const kb = { inline_keyboard: buttons };
  if (messageId) {
    const ok = await editMessage(env, chatId, messageId, txt, kb);
    if (ok?.ok) return;
  }
  await sendMessage(env, chatId, txt, kb);
}

async function sendServicePicker(env, chatId, userId, lang, messageId = null) {
  const t = I18N[lang] || I18N.zh;
  const profile = await getCache(`profile:${userId}`);
  const tierPrices = profile?.tier_prices || {};

  const rows = Object.entries(SERVICES).map(([code, s]) => {
    const price = tierPrices[code] !== undefined ? tierPrices[code] : s.defaultPrice;
    return [
      {
        text: `${s.name[lang] || s.name.zh} ($${Number(price).toFixed(2)})`,
        callback_data: `svc:${code}`,
      },
    ];
  });
  rows.push([
    { text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" },
  ]);
  const kb = { inline_keyboard: rows };

  if (messageId) {
    const ok = await editMessage(env, chatId, messageId, t.chooseService, kb);
    if (ok?.ok) return;
  }
  await sendMessage(env, chatId, t.chooseService, kb);
}

async function startAutoBindFlow(env, chatId, userId, lang, messageId = null) {
  await setUserState(userId, { step: "await_token" });
  const bookmarklet = buildBookmarkletCode(env.BOT_USERNAME || DEFAULT_BOT_USERNAME);

  const txt =
    lang === "en"
      ? "🔐 *Auto Login / Bind Account*\n\n" +
        "• **Option 1 (Credential Login)**: Tap '🔑 Username & Password' below.\n" +
        "• **Option 2 (One-Click Bookmarklet)**: Log in at `ssn6.com`, then run this bookmarklet to auto-bind `localStorage.token`:\n" +
        `\`${bookmarklet}\`\n\n` +
        "• **Option 3 (Direct Paste)**: Paste your Token right now:"
      : "🔐 *自動登入 / 綁定帳號*\n\n" +
        "• **方式一（帳密自動登入）**：點擊下方「🔑 帳密自動登入」輸入網站帳密。\n" +
        "• **方式二（網頁一鍵書籤）**：登入 `ssn6.com` 後點擊下方書籤，自動抓 `localStorage.token` 跳回綁定：\n" +
        `\`${bookmarklet}\`\n\n` +
        "• **方式三（直接貼上）**：直接在此貼上 Token 即可自動綁定：";

  const kb = {
    inline_keyboard: [
      [
        {
          text: lang === "en" ? "🔑 Username & Password" : "🔑 帳密自動登入",
          callback_data: "auth:cred",
        },
        { text: "🌐 ssn6.com", url: "https://ssn6.com" },
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
        [
          { text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" },
        ],
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
    await sendServicePicker(env, chatId, userId, lang, messageId);
    return;
  }

  if (data === "menu:login") {
    await startAutoBindFlow(env, chatId, userId, lang, messageId);
    return;
  }

  if (data === "auth:cred") {
    await setUserState(userId, { step: "await_login_user" });
    const tip =
      lang === "en"
        ? "Enter your `ssn6.com` **Username** (or `/cancel`):"
        : "請輸入你的 `ssn6.com` **用戶名**（輸入 `/cancel` 可取消）：";
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

    const tierPrices = profile?.tier_prices || {};
    const price = tierPrices[code] !== undefined ? tierPrices[code] : svc.defaultPrice;

    await setUserState(userId, { step: "await_params", serviceCode: code });
    const svcName = svc.name[lang] || svc.name.zh;
    const promptTxt = svc.prompt[lang] || svc.prompt.zh;
    const txt =
      `*${svcName}* (\`${code}\` · \`$${Number(price).toFixed(2)}\`)\n\n` +
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

  const sent = await sendMessage(
    env,
    chatId,
    lang === "en" ? "📤 Submitting to /api/query/create..." : "📤 正在送出查詢..."
  );
  const msgId = sent?.result?.message_id;

  const { status, data } = await ssn6Api(env, auth, "POST", "/api/query/create", {
    service_code: code,
    query_params: queryParams,
  });

  if (data?.balance_after !== undefined) {
    await updateUserProfile(userId, { balance: data.balance_after });
  }

  if (status === 401) {
    await clearUserAuth(userId);
    await editOrSend(env, chatId, msgId, formatHttpError(401, data, lang), mainMenuKeyboard(lang));
    return;
  }

  if (status === 429) {
    const qid = data.query_id;
    if (qid) {
      await addOrderRecord(userId, {
        query_id: qid,
        service_code: code,
        status: "pending",
      });
    }
    const kb = qid
      ? {
          inline_keyboard: [
            [{ text: `🔄 ${qid}`, callback_data: `res:${qid}` }],
            [{ text: lang === "en" ? "⬅️ Menu" : "⬅️ 返回主選單", callback_data: "menu:home" }],
          ],
        }
      : mainMenuKeyboard(lang);
    await editOrSend(env, chatId, msgId, formatHttpError(429, data, lang), kb);
    return;
  }

  if (status !== 200 || data.error) {
    await editOrSend(env, chatId, msgId, formatHttpError(status, data, lang), mainMenuKeyboard(lang));
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
    await editOrSend(
      env,
      chatId,
      msgId,
      formatResult(data, data.query_id, lang),
      mainMenuKeyboard(lang)
    );
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
      await editOrSend(
        env,
        chatId,
        msgId,
        formatResult(polled.data, qid, lang),
        mainMenuKeyboard(lang)
      );
      return;
    }
  }

  const kb = {
    inline_keyboard: [
      ...(qid ? [[{ text: `🔄 ${qid}`, callback_data: `res:${qid}` }]] : []),
      [
        { text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單", callback_data: "menu:home" },
      ],
    ],
  };

  await editOrSend(
    env,
    chatId,
    msgId,
    (lang === "en" ? "⏳ Async task created\nQuery ID: " : "⏳ 已建立非同步任務\nQuery ID：") +
      `\`${qid}\`\n` +
      (data.task_id ? `Task ID: \`${data.task_id}\`` : ""),
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
  if (status === 401) {
    await clearUserAuth(userId);
    await sendMessage(env, chatId, formatHttpError(401, data, lang), mainMenuKeyboard(lang));
    return;
  }
  if (status === 404) {
    await sendMessage(
      env,
      chatId,
      lang === "en" ? `⚠️ Query record not found: \`${qid}\`` : `⚠️ 找不到查詢紀錄（404）：\`${qid}\``,
      mainMenuKeyboard(lang)
    );
    return;
  }
  if (status !== 200 || data.error) {
    await sendMessage(env, chatId, formatHttpError(status, data, lang), mainMenuKeyboard(lang));
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
            [
              {
                text: lang === "en" ? "⬅️ Back to Menu" : "⬅️ 返回主選單",
                callback_data: "menu:home",
              },
            ],
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

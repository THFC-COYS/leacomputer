// Simple A/B classroom polling server — no accounts, no database, no build step.
// Run: node server.js   (optionally: PORT=3000 POLL_PIN=1234 node server.js)
//
// Students open http://<this-machine's-IP>:<port>/  and tap A or B.
// The teacher projects http://<this-machine's-IP>:<port>/present — that
// page shows live results and has the controls to launch a new question.

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const PIN = process.env.POLL_PIN || "1234";
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

// All state lives in memory for the lifetime of the process — a class
// period, not a persistent record. Restarting the server clears it.
let state = {
  round: 1,
  question: "Which do you prefer?",
  optionA: "Option A",
  optionB: "Option B",
  open: true,
  votes: { A: 0, B: 0 },
};

// voterId (a cookie) -> round they last voted in, so a refresh or a
// re-tap can't double-count, without requiring any sign-in.
const votedRound = new Map();

const sseClients = new Set();

function broadcast() {
  const payload = `data: ${JSON.stringify(state)}\n\n`;
  for (const res of sseClients) res.write(payload);
}

function getCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

function sendJSON(res, status, body, extraHeaders) {
  res.writeHead(status, { "Content-Type": "application/json", ...extraHeaders });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1e5) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error("bad json"));
      }
    });
    req.on("error", reject);
  });
}

function serveStatic(req, res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Every visitor gets a stable anonymous id via cookie so we can tell
  // "already voted this round" apart from "new tap" without any login.
  let voterId = getCookie(req, "voterId");
  const cookieHeaders = {};
  if (!voterId) {
    voterId = crypto.randomUUID();
    cookieHeaders["Set-Cookie"] = `voterId=${voterId}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  if (url.pathname === "/" && req.method === "GET") {
    if (Object.keys(cookieHeaders).length) res.setHeader("Set-Cookie", cookieHeaders["Set-Cookie"]);
    return serveStatic(req, res, path.join(PUBLIC_DIR, "vote.html"));
  }

  if (url.pathname === "/present" && req.method === "GET") {
    return serveStatic(req, res, path.join(PUBLIC_DIR, "present.html"));
  }

  if (url.pathname === "/style.css" && req.method === "GET") {
    return serveStatic(req, res, path.join(PUBLIC_DIR, "style.css"));
  }

  if (url.pathname === "/qrcode.min.js" && req.method === "GET") {
    return serveStatic(req, res, path.join(PUBLIC_DIR, "qrcode.min.js"));
  }

  if (url.pathname === "/state" && req.method === "GET") {
    const hasVoted = votedRound.get(voterId) === state.round;
    return sendJSON(res, 200, { ...state, hasVoted }, cookieHeaders);
  }

  if (url.pathname === "/events" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write(`data: ${JSON.stringify(state)}\n\n`);
    sseClients.add(res);
    const heartbeat = setInterval(() => res.write(":\n\n"), 25000);
    req.on("close", () => {
      clearInterval(heartbeat);
      sseClients.delete(res);
    });
    return;
  }

  if (url.pathname === "/vote" && req.method === "POST") {
    if (!state.open) return sendJSON(res, 409, { error: "Voting is closed." });
    if (votedRound.get(voterId) === state.round) {
      return sendJSON(res, 409, { error: "Already voted." }, cookieHeaders);
    }
    let body;
    try {
      body = await readBody(req);
    } catch {
      return sendJSON(res, 400, { error: "Bad request." });
    }
    if (body.choice !== "A" && body.choice !== "B") {
      return sendJSON(res, 400, { error: "Choice must be A or B." });
    }
    votedRound.set(voterId, state.round);
    state.votes[body.choice] += 1;
    broadcast();
    return sendJSON(res, 200, { ok: true }, cookieHeaders);
  }

  if (url.pathname === "/admin/question" && req.method === "POST") {
    let body;
    try {
      body = await readBody(req);
    } catch {
      return sendJSON(res, 400, { error: "Bad request." });
    }
    if (body.pin !== PIN) return sendJSON(res, 403, { error: "Wrong PIN." });
    state = {
      round: state.round + 1,
      question: String(body.question || "Which do you prefer?").slice(0, 200),
      optionA: String(body.optionA || "Option A").slice(0, 60),
      optionB: String(body.optionB || "Option B").slice(0, 60),
      open: true,
      votes: { A: 0, B: 0 },
    };
    broadcast();
    return sendJSON(res, 200, { ok: true });
  }

  if (url.pathname === "/admin/toggle" && req.method === "POST") {
    let body;
    try {
      body = await readBody(req);
    } catch {
      return sendJSON(res, 400, { error: "Bad request." });
    }
    if (body.pin !== PIN) return sendJSON(res, 403, { error: "Wrong PIN." });
    state.open = !state.open;
    broadcast();
    return sendJSON(res, 200, { ok: true, open: state.open });
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Polling server running:`);
  console.log(`  Students vote at:  http://<this-machine-IP>:${PORT}/`);
  console.log(`  Present results at: http://<this-machine-IP>:${PORT}/present  (PIN: ${PIN})`);
});

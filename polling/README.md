# Classroom A/B Poll

A tiny live polling tool for presenting a question to a room of students
and watching results come in on their phones — no app to install, no
accounts, no database. Built with plain Node.js (no dependencies).

## Running it

```
cd polling
node server.js
```

Then find this machine's local IP address (e.g. `ipconfig getifaddr en0`
on a Mac, or `hostname -I` on Linux) and share two links on the same
Wi-Fi network:

- **Students vote at:** `http://<your-ip>:3000/`
- **You present at:** `http://<your-ip>:3000/present`

Put the second link on the projector — it shows the live bar chart and
has the controls to launch each question.

Optional environment variables:

- `PORT` — port to listen on (default `3000`)
- `POLL_PIN` — PIN required to launch a question or open/close voting
  (default `1234`) — keeps students from touching the presenter controls
  if they find the URL

## How it works

- The presenter page types in a question and two options, hits **Launch
  new question**, and every open student page updates instantly.
- Each student's phone gets a small anonymous cookie so it can only vote
  once per question — no login needed.
- Results update live on the presenter page as votes come in, via
  server-sent events.
- Everything lives in memory for the life of the process; restarting the
  server clears results, which is normal for a class period.

## Deploying beyond one Wi-Fi network

If students aren't on the same network as your laptop, deploy `polling/`
to any Node host (Render, Railway, Fly.io, a school server) and share
its public URL instead of a local IP — the code doesn't change.

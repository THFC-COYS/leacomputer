# LEA Launchpad

A self-paced, one-week "get tech ready" experience for students starting at Leading Edge Academy. Built for kids who are fluent on a phone but new to a laptop/Chromebook — it turns device basics, browser use, the LMS, and video-class etiquette into short daily activities so day one of real class isn't also day one of using a computer.

## UX approach

- **Three tracks, one framework** — Explorers (K–2), Builders (3–5), Innovators (6–12) share the same 5-day map and activity shell, but content, reading level, and interaction complexity scale by age: picture matching and one-tap quizzes for the youngest, sequencing and scenario troubleshooting for the oldest.
- **Self-paced, lightly structured** — each day unlocks after the previous one is finished, with an explicit "already know this, skip ahead" escape hatch so it never blocks a confident kid.
- **Short and repeatable** — every day is exactly 3 activities (learn → practice → check), so a session is 10–15 minutes and progress is always visible.
- **Play, not test-prep** — flashcards flip, matches celebrate, quizzes give a warm explanation either way. No scores are exposed to compare kids against each other.
- **A reason to finish** — completing all 5 days unlocks a printable certificate, giving the week a clear finish line for students (and something to show a parent or teacher).
- **No install, no login** — a static site that runs from a link, embeds in an iframe inside the LMS, or opens directly; progress is saved locally per device via `localStorage`.

## Structure

- `index.html` — entry point
- `css/style.css` — visual design (light/dark aware, mobile friendly)
- `js/content.js` — all curriculum content (bands × days × activities)
- `js/app.js` — state, routing, and the four interactive components (flashcards, match, sequence, quiz)

## Running it

Just open `index.html`, or serve the folder statically:

```
python3 -m http.server 8000
```

## Extending the curriculum

Add or edit activities in `js/content.js` under `CONTENT.activities`, keyed as `{band}_{day}` (e.g. `builders_3`). Each activity is `{ id, type, title, icon, data }` where `type` is one of `flashcards`, `match`, `sequence`, or `quiz` — the renderer in `js/app.js` handles the rest automatically.

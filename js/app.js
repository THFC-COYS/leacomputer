/* LEA Launchpad — app shell, state, and interactive components */
(function () {
  "use strict";

  const STORAGE_KEY = "lea_launchpad_state_v1";
  const root = document.getElementById("app");

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore corrupt/unavailable storage */ }
    return { name: "", band: "", progress: {}, day1BonusSkip: {} };
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* private mode etc. */ }
  }
  let state = loadState();

  function activityKey(day, id) { return `d${day}_${id}`; }
  function isActivityDone(day, id) { return !!state.progress[activityKey(day, id)]; }
  function markActivityDone(day, id) {
    state.progress[activityKey(day, id)] = true;
    saveState();
  }
  function dayActivities(band, day) { return CONTENT.activities[`${band}_${day}`] || []; }
  function dayProgress(band, day) {
    const acts = dayActivities(band, day);
    const done = acts.filter(a => isActivityDone(day, a.id)).length;
    return { done, total: acts.length, complete: acts.length > 0 && done === acts.length };
  }
  function isDayUnlocked(band, day) {
    if (day === 1) return true;
    return dayProgress(band, day - 1).complete || !!state.day1BonusSkip[day];
  }
  function weekComplete(band) {
    return CONTENT.days.every(d => dayProgress(band, d.n).complete);
  }

  // ---------- routing ----------
  window.addEventListener("hashchange", render);
  window.addEventListener("DOMContentLoaded", render);

  function go(hash) { window.location.hash = hash; }

  function render() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (!state.name || !state.band) { renderOnboarding(); return; }
    if (hash.startsWith("day/")) {
      const day = parseInt(hash.split("/")[1], 10);
      if (day && CONTENT.days.find(d => d.n === day)) { renderDay(day); return; }
    }
    if (hash === "certificate") { renderCertificate(); return; }
    if (hash === "switch") { renderOnboarding(true); return; }
    renderDashboard();
  }

  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null) continue;
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null) continue;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return e;
  }

  function clear() { root.innerHTML = ""; }

  // ---------- onboarding ----------
  function renderOnboarding(isSwitch) {
    clear();
    const nameInput = el("input", { type: "text", id: "nameInput", placeholder: "Type your first name", maxlength: "30", value: isSwitch ? state.name : "" });
    let chosenBand = isSwitch ? state.band : "";

    const bandCards = el("div", { class: "band-grid" },
      ...Object.entries(CONTENT.bands).map(([key, b]) => {
        const card = el("button", { class: "band-card", type: "button", style: `--band-color:${b.color}` },
          el("div", { class: "band-emoji" }, key === "explorers" ? "🧒" : key === "builders" ? "🧑" : "🧑‍🎓"),
          el("div", { class: "band-label" }, b.label),
          el("div", { class: "band-grades" }, b.grades),
          el("div", { class: "band-blurb" }, b.blurb)
        );
        card.addEventListener("click", () => {
          chosenBand = key;
          [...bandCards.children].forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
        });
        if (chosenBand === key) card.classList.add("selected");
        return card;
      })
    );

    const startBtn = el("button", { class: "btn btn-primary btn-big", type: "button" }, isSwitch ? "Save" : "Let's Go! 🚀");
    startBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (!name) { nameInput.focus(); nameInput.classList.add("shake"); setTimeout(() => nameInput.classList.remove("shake"), 400); return; }
      if (!chosenBand) { return; }
      state.name = name;
      state.band = chosenBand;
      saveState();
      go("");
      render();
    });

    root.appendChild(
      el("div", { class: "screen onboarding" },
        el("div", { class: "logo" }, "🚀 LEA Launchpad"),
        el("h1", null, isSwitch ? "Update your info" : "Welcome! Let's get you Tech Ready."),
        el("p", { class: "sub" }, "A fun, one-week warm-up before your first day of class."),
        el("label", { class: "field-label", for: "nameInput" }, "What's your name?"),
        nameInput,
        el("label", { class: "field-label" }, "Pick your group:"),
        bandCards,
        startBtn
      )
    );
  }

  // ---------- dashboard ----------
  function renderDashboard() {
    clear();
    const band = CONTENT.bands[state.band];
    const complete = weekComplete(state.band);

    const dayCards = el("div", { class: "day-grid" },
      ...CONTENT.days.map(d => {
        const prog = dayProgress(state.band, d.n);
        const unlocked = isDayUnlocked(state.band, d.n);
        const pct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
        const card = el("div", { class: `day-card ${unlocked ? "" : "locked"} ${prog.complete ? "done" : ""}` },
          el("div", { class: "day-icon" }, unlocked ? d.icon : "🔒"),
          el("div", { class: "day-title" }, `Day ${d.n}: ${d.title}`),
          el("div", { class: "progress-bar" }, el("div", { class: "progress-fill", style: `width:${pct}%` })),
          el("div", { class: "day-status" }, prog.complete ? "Complete! ⭐" : unlocked ? `${prog.done}/${prog.total} activities` : "Complete the day before to unlock")
        );
        if (unlocked) {
          card.classList.add("clickable");
          card.addEventListener("click", () => go(`day/${d.n}`));
        } else {
          const skip = el("button", { class: "btn btn-link", type: "button" }, "Already know this? Skip ahead");
          skip.addEventListener("click", (ev) => { ev.stopPropagation(); state.day1BonusSkip[d.n] = true; saveState(); render(); });
          card.appendChild(skip);
        }
        return card;
      })
    );

    root.appendChild(
      el("div", { class: "screen dashboard" },
        el("div", { class: "top-bar" },
          el("div", { class: "logo" }, "🚀 LEA Launchpad"),
          el("button", { class: "btn btn-link", type: "button", onclick: () => go("switch") }, `${state.name} · ${band.label} ✏️`)
        ),
        el("h1", null, `Hi ${state.name}! 👋`),
        el("p", { class: "sub" }, "Work through the week at your own pace. A little each day is perfect."),
        dayCards,
        complete
          ? el("button", { class: "btn btn-primary btn-big", type: "button", onclick: () => go("certificate") }, "🎉 See Your Certificate!")
          : null
      )
    );
  }

  // ---------- day / activity player ----------
  function renderDay(day) {
    clear();
    const acts = dayActivities(state.band, day);
    const dayMeta = CONTENT.days.find(d => d.n === day);
    let idx = acts.findIndex(a => !isActivityDone(day, a.id));
    if (idx === -1) idx = 0;

    const shell = el("div", { class: "screen day-screen" });
    root.appendChild(shell);

    function renderStep() {
      shell.innerHTML = "";
      const act = acts[idx];
      const stepper = el("div", { class: "stepper" },
        ...acts.map((a, i) => el("div", { class: `step-dot ${isActivityDone(day, a.id) ? "done" : ""} ${i === idx ? "active" : ""}` }))
      );
      const header = el("div", { class: "activity-header" },
        el("button", { class: "btn btn-link", type: "button", onclick: () => go("") }, "← Back to Map"),
        el("h2", null, `${dayMeta.icon} Day ${day}: ${dayMeta.title}`),
        stepper,
        el("h3", { class: "activity-title" }, `${act.icon} ${act.title}`)
      );
      shell.appendChild(header);

      const body = el("div", { class: "activity-body" });
      shell.appendChild(body);

      const onDone = () => {
        markActivityDone(day, act.id);
        if (idx < acts.length - 1) {
          idx++;
          renderStep();
        } else {
          renderDayComplete();
        }
      };

      if (act.type === "flashcards") renderFlashcards(body, act.data, onDone);
      else if (act.type === "match") renderMatch(body, act.data, onDone);
      else if (act.type === "sequence") renderSequence(body, act.data, onDone);
      else if (act.type === "quiz") renderQuiz(body, act.data, onDone);
    }

    function renderDayComplete() {
      shell.innerHTML = "";
      const nextDay = CONTENT.days.find(d => d.n === day + 1);
      shell.appendChild(
        el("div", { class: "celebrate" },
          el("div", { class: "confetti" }, "🎉🎊✨"),
          el("h2", null, `Day ${day} Complete!`),
          el("p", null, "Great work — you're one day closer to being Tech Ready."),
          el("div", { class: "actions" },
            nextDay
              ? el("button", { class: "btn btn-primary btn-big", type: "button", onclick: () => go(`day/${day + 1}`) }, `Start Day ${day + 1} →`)
              : el("button", { class: "btn btn-primary btn-big", type: "button", onclick: () => go("certificate") }, "🎓 Get Your Certificate!"),
            el("button", { class: "btn btn-link", type: "button", onclick: () => go("") }, "Back to Map")
          )
        )
      );
    }

    renderStep();
  }

  // ---------- component: flashcards ----------
  function renderFlashcards(container, data, onDone) {
    let i = 0, flipped = false;
    const wrap = el("div", { class: "flashcard-wrap" });
    container.appendChild(wrap);
    function draw() {
      wrap.innerHTML = "";
      const item = data.items[i];
      const card = el("div", { class: `flashcard ${flipped ? "flipped" : ""}` },
        el("div", { class: "flashcard-face front" }, item.front),
        el("div", { class: "flashcard-face back" }, item.back)
      );
      card.addEventListener("click", () => { flipped = !flipped; draw(); });
      const nextBtn = el("button", { class: "btn btn-primary", type: "button" }, i < data.items.length - 1 ? "Next Card →" : "Done ✓");
      nextBtn.addEventListener("click", () => {
        if (i < data.items.length - 1) { i++; flipped = false; draw(); }
        else onDone();
      });
      wrap.appendChild(el("p", { class: "hint" }, "Tap the card to flip it and learn more."));
      wrap.appendChild(card);
      wrap.appendChild(el("div", { class: "counter" }, `${i + 1} / ${data.items.length}`));
      wrap.appendChild(nextBtn);
    }
    draw();
  }

  // ---------- component: match ----------
  function renderMatch(container, data, onDone) {
    const pairs = data.pairs.map((p, i) => ({ ...p, id: i, matched: false }));
    const rightShuffled = [...pairs].sort(() => Math.random() - 0.5);
    let selectedLeft = null, selectedRight = null;

    const wrap = el("div", { class: "match-wrap" });
    const leftCol = el("div", { class: "match-col" });
    const rightCol = el("div", { class: "match-col" });
    wrap.appendChild(el("p", { class: "hint" }, "Tap one item on each side to match them."));
    const grid = el("div", { class: "match-grid" }, leftCol, rightCol);
    wrap.appendChild(grid);
    const doneBtn = el("button", { class: "btn btn-primary", type: "button", style: "display:none" }, "Continue →");
    doneBtn.addEventListener("click", onDone);
    wrap.appendChild(doneBtn);
    container.appendChild(wrap);

    function checkAllDone() {
      if (pairs.every(p => p.matched)) doneBtn.style.display = "";
    }

    function draw() {
      leftCol.innerHTML = "";
      rightCol.innerHTML = "";
      pairs.forEach(p => {
        const btn = el("button", { class: `match-item ${p.matched ? "matched" : ""} ${selectedLeft === p.id ? "selected" : ""}`, type: "button", disabled: p.matched ? "disabled" : null }, p.left);
        if (!p.matched) btn.addEventListener("click", () => { selectedLeft = p.id; tryMatch(); draw(); });
        leftCol.appendChild(btn);
      });
      rightShuffled.forEach(p => {
        const btn = el("button", { class: `match-item ${p.matched ? "matched" : ""} ${selectedRight === p.id ? "selected" : ""}`, type: "button", disabled: p.matched ? "disabled" : null }, p.right);
        if (!p.matched) btn.addEventListener("click", () => { selectedRight = p.id; tryMatch(); draw(); });
        rightCol.appendChild(btn);
      });
    }

    function tryMatch() {
      if (selectedLeft == null || selectedRight == null) return;
      if (selectedLeft === selectedRight) {
        const p = pairs.find(x => x.id === selectedLeft);
        p.matched = true;
        selectedLeft = null; selectedRight = null;
        checkAllDone();
      } else {
        const l = selectedLeft, r = selectedRight;
        setTimeout(() => { selectedLeft = null; selectedRight = null; draw(); }, 500);
      }
    }
    draw();
  }

  // ---------- component: sequence ----------
  function renderSequence(container, data, onDone) {
    const correct = data.steps;
    let pool = [...correct].sort(() => Math.random() - 0.5);
    let chosen = [];

    const wrap = el("div", { class: "sequence-wrap" });
    wrap.appendChild(el("p", { class: "hint" }, "Tap the steps in the order they should happen."));
    const chosenList = el("ol", { class: "sequence-chosen" });
    const poolList = el("div", { class: "sequence-pool" });
    const feedback = el("div", { class: "feedback" });
    const checkBtn = el("button", { class: "btn btn-primary", type: "button" }, "Check My Order");
    const resetBtn = el("button", { class: "btn btn-link", type: "button" }, "Start Over");
    const nextBtn = el("button", { class: "btn btn-primary", type: "button", style: "display:none" }, "Continue →");
    nextBtn.addEventListener("click", onDone);

    function draw() {
      chosenList.innerHTML = "";
      chosen.forEach(step => chosenList.appendChild(el("li", null, step)));
      poolList.innerHTML = "";
      pool.forEach(step => {
        const btn = el("button", { class: "sequence-item", type: "button" }, step);
        btn.addEventListener("click", () => {
          chosen.push(step);
          pool = pool.filter(s => s !== step);
          draw();
        });
        poolList.appendChild(btn);
      });
    }
    checkBtn.addEventListener("click", () => {
      const isCorrect = chosen.length === correct.length && chosen.every((s, i) => s === correct[i]);
      feedback.textContent = isCorrect ? "✅ Perfect order!" : "Not quite the right order yet — try again!";
      feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
      if (isCorrect) { nextBtn.style.display = ""; checkBtn.style.display = "none"; }
    });
    resetBtn.addEventListener("click", () => {
      pool = [...correct].sort(() => Math.random() - 0.5);
      chosen = [];
      feedback.textContent = "";
      feedback.className = "feedback";
      draw();
    });

    wrap.appendChild(el("div", null, el("strong", null, "Your order:")));
    wrap.appendChild(chosenList);
    wrap.appendChild(el("div", null, el("strong", null, "Steps to arrange:")));
    wrap.appendChild(poolList);
    wrap.appendChild(feedback);
    wrap.appendChild(el("div", { class: "actions" }, checkBtn, resetBtn, nextBtn));
    container.appendChild(wrap);
    draw();
  }

  // ---------- component: quiz ----------
  function renderQuiz(container, data, onDone) {
    let qi = 0;
    const wrap = el("div", { class: "quiz-wrap" });
    container.appendChild(wrap);

    function draw() {
      wrap.innerHTML = "";
      const q = data.questions[qi];
      const choicesEl = el("div", { class: "quiz-choices" });
      const feedback = el("div", { class: "feedback" });
      let answered = false;

      q.choices.forEach((choice, i) => {
        const btn = el("button", { class: "quiz-choice", type: "button" }, choice);
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const isCorrect = i === q.correct;
          [...choicesEl.children].forEach((c, ci) => {
            c.classList.add("disabled");
            if (ci === q.correct) c.classList.add("correct");
            else if (ci === i) c.classList.add("incorrect");
          });
          feedback.textContent = isCorrect ? (q.correctMsg || "Correct! ✅") : (q.incorrectMsg || "Not quite — check the highlighted answer.");
          feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
          nextBtn.style.display = "";
        });
        choicesEl.appendChild(btn);
      });

      const nextBtn = el("button", { class: "btn btn-primary", type: "button", style: "display:none" }, qi < data.questions.length - 1 ? "Next Question →" : "Continue →");
      nextBtn.addEventListener("click", () => {
        if (qi < data.questions.length - 1) { qi++; draw(); }
        else onDone();
      });

      wrap.appendChild(el("div", { class: "counter" }, `Question ${qi + 1} / ${data.questions.length}`));
      wrap.appendChild(el("p", { class: "quiz-prompt" }, q.prompt));
      wrap.appendChild(choicesEl);
      wrap.appendChild(feedback);
      wrap.appendChild(nextBtn);
    }
    draw();
  }

  // ---------- certificate ----------
  function renderCertificate() {
    clear();
    const band = CONTENT.bands[state.band];
    const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    root.appendChild(
      el("div", { class: "screen certificate-screen" },
        el("div", { class: "certificate", id: "certificate" },
          el("div", { class: "cert-inner" },
            el("div", { class: "cert-logo" }, "🚀 LEA Launchpad"),
            el("div", { class: "cert-heading" }, "Certificate of Tech Readiness"),
            el("div", { class: "cert-sub" }, "This certifies that"),
            el("div", { class: "cert-name" }, state.name),
            el("div", { class: "cert-sub" }, `has completed the one-week Launchpad experience as a`),
            el("div", { class: "cert-band" }, band.label),
            el("div", { class: "cert-date" }, today),
            el("div", { class: "cert-seal" }, "🏅")
          )
        ),
        el("div", { class: "actions no-print" },
          el("button", { class: "btn btn-primary btn-big", type: "button", onclick: () => window.print() }, "🖨️ Print / Save as PDF"),
          el("button", { class: "btn btn-link", type: "button", onclick: () => go("") }, "Back to Map")
        )
      )
    );
  }

  render();
})();

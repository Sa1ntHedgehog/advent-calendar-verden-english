import { DAYS, TYPE_INFO } from "./tasks.js";

const STORAGE_KEY = "verden-advent-v1";
const PREVIEW = new URLSearchParams(location.search).has("preview");

// Doors are scrambled like a real advent calendar. Some doors are bigger.
const DOOR_ORDER = [7, 22, 1, 15, 28, 10, 3, 19, 25, 12, 30, 5, 17, 9, 26, 2, 21, 14, 6, 29, 11, 18, 4, 24, 13, 27, 8, 20, 16, 23];
const DOOR_SIZE = { 30: "big", 1: "wide", 13: "wide", 25: "wide", 16: "wide", 4: "wide", 7: "tall", 19: "tall", 10: "tall", 22: "tall" };

const ICONS = {
  meaning: '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5z"/>',
  blanks: '<path d="M4 18h6M14 18h6M15 4l4 4-8 8H7v-4z"/>',
  phrases: '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2z"/>',
  listening: '<path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15a2 2 0 0 1 2-2h1v7H6a2 2 0 0 1-2-2zM20 15a2 2 0 0 0-2-2h-1v7h1a2 2 0 0 0 2-2z"/>',
  quiz: '<path d="M4 5h3v3H4zM4 11h3v3H4zM4 17h3v3H4zM10 6.5h10M10 12.5h10M10 18.5h7"/>',
};
const icon = (type) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[type]}</svg>`;

// ---------- state ----------
function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (s && s.start && s.results) return s;
  } catch {}
  const fresh = { start: todayKey(), results: {} };
  saveState(fresh);
  return fresh;
}

function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

const state = loadState();

function unlockedCount() {
  if (PREVIEW) return 30;
  const [y, m, d] = state.start.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((today - start) / 86400000);
  return Math.max(1, Math.min(30, days + 1));
}

const starsFor = (score, total) => (score === total ? 3 : score / total >= 0.6 ? 2 : 1);

// ---------- helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, attrs = {}, html = "") => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else n.setAttribute(k, v);
  }
  if (html) n.innerHTML = html;
  return n;
};
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// ---------- calendar ----------
function renderCalendar() {
  const cal = $("#calendar");
  const open = unlockedCount();
  cal.innerHTML = "";

  DOOR_ORDER.forEach((n, idx) => {
    const day = DAYS[n - 1];
    const result = state.results[n];
    const locked = n > open;
    const door = el("button", {
      class: `door ${DOOR_SIZE[n] || ""} ${locked ? "locked" : "open"} ${result ? "done" : ""} ${n === open && !result && !PREVIEW ? "today" : ""}`,
      "data-type": day.type,
      style: `--i:${idx}`,
      "aria-label": locked
        ? `Day ${n}, locked`
        : `Day ${n}, ${TYPE_INFO[day.type].label}${result ? `, done: ${result.score} of ${result.total}` : ""}`,
    });

    const stars = result ? "★".repeat(starsFor(result.score, result.total)) + "☆".repeat(3 - starsFor(result.score, result.total)) : "";
    door.innerHTML = `
      <span class="door-inside">
        ${icon(day.type)}
        <span class="door-type">${TYPE_INFO[day.type].label}</span>
        <span class="door-title">${escapeHtml(day.title)}</span>
        ${result ? `<span class="door-score"><span class="stars" aria-hidden="true">${stars}</span>${result.score}/${result.total}</span>` : ""}
      </span>
      <span class="door-leaf">
        <span class="door-num">${n}</span>
        ${locked ? '<svg class="lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>' : ""}
      </span>`;

    door.addEventListener("click", () => {
      if (locked) {
        const wait = n - open;
        door.classList.remove("shake");
        void door.offsetWidth;
        door.classList.add("shake");
        toast(wait === 1 ? `Door ${n} opens tomorrow.` : `Door ${n} opens in ${wait} days. Be patient!`);
        return;
      }
      door.classList.add("opening");
      setTimeout(() => openTask(n), 380);
    });
    cal.appendChild(door);
  });

  // progress card
  const done = Object.keys(state.results).length;
  const stars = Object.values(state.results).reduce((s, r) => s + starsFor(r.score, r.total), 0);
  $("#doneCount").textContent = done;
  $("#starCount").textContent = `${stars} / 90`;
  $(".ring").style.setProperty("--p", done / 30);
  const next = DAYS.find((d) => d.day <= open && !state.results[d.day]);
  $("#nextDoor").textContent = next ? `Day ${next.day}` : open < 30 ? "Tomorrow" : "All done!";
}

// ---------- task dialog ----------
const dialog = $("#taskDialog");
let current = null; // { day, check(): {score,total}, reset() }

function openTask(n) {
  const day = DAYS[n - 1];
  const info = TYPE_INFO[day.type];
  dialog.dataset.type = day.type;
  $("#taskMeta").innerHTML = `${icon(day.type)} Day ${n} · ${info.label}${day.note ? ` · ${escapeHtml(day.note)}` : ""}`;
  $("#taskTitle").textContent = day.title;
  $("#taskInstruction").innerHTML = `${escapeHtml(info.instruction)} <span class="ru">${escapeHtml(info.ru)}</span>`;
  startTask(day);
  dialog.showModal();
  $(".task-body", dialog).scrollTop = 0;
}

function startTask(day) {
  const body = $("#taskBody");
  body.innerHTML = "";
  $("#taskFeedback").textContent = "";
  $("#taskFeedback").className = "task-feedback";
  $("#checkTask").hidden = false;
  $("#retryTask").hidden = true;
  dialog.classList.remove("checked");
  const renderer = RENDERERS[day.type];
  current = { day, ...renderer(day, body) };
}

function closeTask() {
  if (window.speechSynthesis) speechSynthesis.cancel();
  dialog.close();
}

$("#closeTask").addEventListener("click", closeTask);
dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeTask(); });
dialog.addEventListener("click", (e) => { if (e.target === dialog) closeTask(); });
dialog.addEventListener("close", renderCalendar);

$("#checkTask").addEventListener("click", () => {
  if (!current) return;
  const res = current.check();
  if (!res) return; // incomplete — renderer showed a message
  const { score, total } = res;
  const prev = state.results[current.day.day];
  if (!prev || score > prev.score) {
    state.results[current.day.day] = { score, total };
    saveState(state);
  }
  dialog.classList.add("checked");
  const fb = $("#taskFeedback");
  const s = starsFor(score, total);
  fb.className = `task-feedback result s${s}`;
  fb.innerHTML = `<span class="stars">${"★".repeat(s)}${"☆".repeat(3 - s)}</span> ${score} / ${total} — ${
    s === 3 ? "Perfect! Well done!" : s === 2 ? "Good job! Look at the red answers." : "Nice try! Look at the answers and try again."
  }`;
  $("#checkTask").hidden = true;
  $("#retryTask").hidden = score === total;
  if (Object.keys(state.results).length === 30 && !prev) setTimeout(() => toast("You opened all 30 doors. Congratulations!"), 600);
});

$("#retryTask").addEventListener("click", () => current && startTask(current.day));

function needMore(msg) {
  const fb = $("#taskFeedback");
  fb.className = "task-feedback warn";
  fb.textContent = msg;
  return null;
}

// ---------- multiple choice (meanings, listening, test) ----------
function multipleChoice(questions, body, { prompt, sub } = {}) {
  const chosen = new Array(questions.length).fill(null);
  const list = el("ol", { class: "mc-list" });

  questions.forEach((q, qi) => {
    const li = el("li", { class: "mc-item", style: `--i:${qi}` });
    li.innerHTML = `<div class="mc-prompt">${prompt(q)}${sub ? `<span class="mc-sub">${sub(q)}</span>` : ""}</div>`;
    const opts = el("div", { class: "mc-options", role: "radiogroup" });
    shuffle(q.options.map((text, oi) => ({ text, correct: oi === 0 }))).forEach((o) => {
      const b = el("button", { class: "opt", role: "radio", "aria-checked": "false", type: "button" });
      b.textContent = o.text;
      b.dataset.correct = o.correct;
      b.addEventListener("click", () => {
        if (dialog.classList.contains("checked")) return;
        opts.querySelectorAll(".opt").forEach((x) => { x.classList.remove("picked"); x.setAttribute("aria-checked", "false"); });
        b.classList.add("picked");
        b.setAttribute("aria-checked", "true");
        chosen[qi] = o.correct;
        li.classList.add("answered");
      });
      opts.appendChild(b);
    });
    li.appendChild(opts);
    list.appendChild(li);
  });
  body.appendChild(list);

  return {
    check() {
      if (chosen.includes(null)) return needMore("Please answer every question first.");
      list.querySelectorAll(".mc-item").forEach((li, qi) => {
        li.classList.add(chosen[qi] ? "right" : "wrong");
        li.querySelectorAll(".opt").forEach((b) => {
          if (b.dataset.correct === "true") b.classList.add("is-correct");
          else if (b.classList.contains("picked")) b.classList.add("is-wrong");
        });
      });
      return { score: chosen.filter(Boolean).length, total: questions.length };
    },
  };
}

// ---------- fill the gaps ----------
function renderBlanks(day, body) {
  const bank = el("div", { class: "bank", "aria-label": "Word box" });
  let selected = null;
  const filled = new Array(day.items.length).fill(null); // chip element per gap

  const chips = shuffle(day.bank).map((w) => {
    const c = el("button", { class: "bank-chip", type: "button" });
    c.textContent = w;
    c.addEventListener("click", () => {
      if (dialog.classList.contains("checked") || c.classList.contains("used")) return;
      const empty = gaps.findIndex((_, i) => !filled[i] && gaps[i].classList.contains("armed"));
      if (empty >= 0) return place(c, empty);
      selected = selected === c ? null : c;
      chips.forEach((x) => x.classList.toggle("selected", x === selected));
    });
    bank.appendChild(c);
    return c;
  });

  const list = el("ol", { class: "gap-list" });
  const gaps = day.items.map((item, i) => {
    const [before, after] = item.text.split("___");
    const li = el("li", { class: "gap-item", style: `--i:${i}` });
    const gap = el("button", { class: "gap", type: "button", "aria-label": `Gap ${i + 1}` });
    gap.textContent = " ";
    li.append(document.createTextNode(before), gap, document.createTextNode(after));
    gap.addEventListener("click", () => {
      if (dialog.classList.contains("checked")) return;
      if (filled[i]) {
        filled[i].classList.remove("used");
        filled[i] = null;
        gap.textContent = " ";
        gap.classList.remove("filled");
        return;
      }
      if (selected) return place(selected, i);
      gaps.forEach((g) => g.classList.toggle("armed", g === gap && !g.classList.contains("armed")));
    });
    list.appendChild(li);
    return gap;
  });

  function place(chip, i) {
    filled[i] = chip;
    chip.classList.add("used");
    chip.classList.remove("selected");
    selected = null;
    gaps[i].textContent = chip.textContent;
    gaps[i].classList.add("filled");
    gaps.forEach((g) => g.classList.remove("armed"));
  }

  body.append(bank, list);

  return {
    check() {
      if (filled.includes(null)) return needMore("Please fill every gap first.");
      let score = 0;
      day.items.forEach((item, i) => {
        const ok = filled[i].textContent === item.answer;
        if (ok) score++;
        gaps[i].classList.add(ok ? "is-correct" : "is-wrong");
        if (!ok) gaps[i].insertAdjacentHTML("afterend", `<span class="fix">${escapeHtml(item.answer)}</span>`);
      });
      return { score, total: day.items.length };
    },
  };
}

// ---------- phrases (matching) ----------
function renderPhrases(day, body) {
  const wrap = el("div", { class: "match" });
  const left = el("div", { class: "match-col" });
  const right = el("div", { class: "match-col right" });
  const firstTry = new Array(day.pairs.length).fill(true);
  const matched = new Set();
  let active = null;

  const mkCard = (text, idx, side) => {
    const b = el("button", { class: `match-card ${side}`, type: "button" });
    b.textContent = text;
    b.dataset.idx = idx;
    return b;
  };

  const leftCards = shuffle(day.pairs.map((p, i) => mkCard(p[0], i, "phrase")));
  const rightCards = shuffle(day.pairs.map((p, i) => mkCard(p[1], i, "meaning")));
  leftCards.forEach((c, i) => { c.style.setProperty("--i", i); left.appendChild(c); });
  rightCards.forEach((c, i) => { c.style.setProperty("--i", i); right.appendChild(c); });

  const handle = (card) => {
    if (dialog.classList.contains("checked") || card.classList.contains("paired")) return;
    if (!active || active.classList.contains(card.classList.contains("phrase") ? "phrase" : "meaning")) {
      [...leftCards, ...rightCards].forEach((c) => c.classList.remove("active"));
      active = active === card ? null : card;
      if (active) active.classList.add("active");
      return;
    }
    const phrase = active.classList.contains("phrase") ? active : card;
    const meaning = phrase === active ? card : active;
    active.classList.remove("active");
    active = null;
    if (phrase.dataset.idx === meaning.dataset.idx) {
      const n = matched.size + 1;
      matched.add(+phrase.dataset.idx);
      [phrase, meaning].forEach((c) => { c.classList.add("paired"); c.dataset.pair = n; });
      if (matched.size === day.pairs.length) $("#checkTask").click();
    } else {
      firstTry[+phrase.dataset.idx] = false;
      [phrase, meaning].forEach((c) => {
        c.classList.remove("nope");
        void c.offsetWidth;
        c.classList.add("nope");
      });
    }
  };
  [...leftCards, ...rightCards].forEach((c) => c.addEventListener("click", () => handle(c)));

  wrap.append(left, right);
  body.append(wrap, el("p", { class: "hint", text: "A wrong match costs a point, but you can try again until all pairs are found." }));

  return {
    check() {
      if (matched.size < day.pairs.length) return needMore("Please match all the pairs first.");
      return { score: firstTry.filter(Boolean).length, total: day.pairs.length };
    },
  };
}

// ---------- listening ----------
let voice = null;
function pickVoice() {
  if (!window.speechSynthesis) return;
  const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  voice =
    vs.find((v) => /en[-_]GB/i.test(v.lang) && /natural|google|female|serena|kate|libby|sonia/i.test(v.name)) ||
    vs.find((v) => /en[-_]GB/i.test(v.lang)) ||
    vs.find((v) => /en[-_]US/i.test(v.lang)) ||
    vs[0] || null;
}
if (window.speechSynthesis) {
  pickVoice();
  speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
}

function renderListening(day, body) {
  const player = el("div", { class: "player" });
  const supported = !!window.speechSynthesis;
  player.innerHTML = `
    <button class="play" type="button" aria-label="Play recording" ${supported ? "" : "disabled"}>
      <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
      <svg class="i-stop" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
    </button>
    <div class="wave" aria-hidden="true">${"<i></i>".repeat(28)}</div>
    <div class="speed" role="group" aria-label="Speed">
      <button type="button" class="sp" data-rate="0.75">Slow</button>
      <button type="button" class="sp on" data-rate="0.92">Normal</button>
    </div>
    <p class="plays"><span>0</span> plays</p>`;
  body.appendChild(player);

  if (!supported) {
    body.appendChild(el("p", { class: "hint warn", text: "Your browser cannot play the recording. Please open the transcript below and read it." }));
  }

  let rate = 0.92;
  let plays = 0;
  const playBtn = $(".play", player);
  player.querySelectorAll(".sp").forEach((b) =>
    b.addEventListener("click", () => {
      rate = +b.dataset.rate;
      player.querySelectorAll(".sp").forEach((x) => x.classList.toggle("on", x === b));
    })
  );

  playBtn.addEventListener("click", () => {
    if (player.classList.contains("playing")) {
      speechSynthesis.cancel();
      player.classList.remove("playing");
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(day.text);
    if (voice) u.voice = voice;
    u.lang = voice?.lang || "en-GB";
    u.rate = rate;
    u.onend = u.onerror = () => player.classList.remove("playing");
    player.classList.add("playing");
    plays++;
    $(".plays span", player).textContent = plays;
    speechSynthesis.speak(u);
  });

  const mc = multipleChoice(day.questions, body, { prompt: (q) => escapeHtml(q.q) });

  const transcript = el("details", { class: "transcript" });
  transcript.innerHTML = `<summary>Transcript</summary><p>${escapeHtml(day.text).replace(/(Shop assistant:|Customer:)/g, "<br><b>$1</b>").replace(/^<br>/, "")}</p>`;
  if (supported) transcript.hidden = true;
  body.appendChild(transcript);

  return {
    check() {
      const res = mc.check();
      if (res) transcript.hidden = false;
      return res;
    },
  };
}

const RENDERERS = {
  meaning: (day, body) =>
    multipleChoice(day.items, body, {
      prompt: (it) => `<span class="word">${escapeHtml(it.word)}</span>`,
      sub: (it) => escapeHtml(it.hint),
    }),
  blanks: renderBlanks,
  phrases: renderPhrases,
  listening: renderListening,
  quiz: (day, body) =>
    multipleChoice(day.questions, body, {
      prompt: (q) => escapeHtml(q.q).replace("___", '<span class="blank">_____</span>'),
    }),
};

// ---------- snow ----------
(function snow() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = $(".snow");
  for (let i = 0; i < 46; i++) {
    const f = el("i");
    const size = 2 + Math.random() * 4;
    f.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${9 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s;opacity:${0.25 + Math.random() * 0.55};--drift:${(Math.random() - 0.5) * 80}px`;
    box.appendChild(f);
  }
})();

if (PREVIEW) toast("Preview mode: all doors are open.");
renderCalendar();

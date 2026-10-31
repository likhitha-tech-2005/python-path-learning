const STORAGE_KEYS = {
  completed: "python-path.completed",
  bookmarks: "python-path.bookmarks",
};

const state = {
  activeId: 1,
  query: "",
  topic: "all",
  savedOnly: false,
  completed: loadSet(STORAGE_KEYS.completed),
  bookmarks: loadSet(STORAGE_KEYS.bookmarks),
};

const elements = {
  headerProgress: document.querySelector("#header-progress"),
  progressRing: document.querySelector("#progress-ring"),
  courseCount: document.querySelector("#course-count"),
  search: document.querySelector("#question-search"),
  topicFilter: document.querySelector("#topic-filter"),
  savedFilter: document.querySelector("#saved-filter"),
  questionList: document.querySelector("#question-list"),
  visibleCount: document.querySelector("#visible-count"),
  emptyList: document.querySelector("#empty-list"),
  lesson: document.querySelector("#lesson-content"),
  breadcrumb: document.querySelector("#breadcrumb-topic"),
  bookmarkButton: document.querySelector("#bookmark-button"),
  bookmarkIcon: document.querySelector("#bookmark-icon"),
  bookmarkLabel: document.querySelector("#bookmark-label"),
};

function loadSet(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch (error) {
    console.warn(`Could not read saved course data (${key}).`, error);
    return new Set();
  }
}

function saveSet(key, values) {
  try {
    localStorage.setItem(key, JSON.stringify([...values]));
  } catch (error) {
    console.warn(`Could not save course data (${key}).`, error);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function getVisibleQuestions() {
  const query = state.query.trim().toLowerCase();
  return QUESTIONS.filter((question) => {
    const matchesTopic = state.topic === "all" || question.topic === state.topic;
    const matchesSaved = !state.savedOnly || state.bookmarks.has(question.id);
    const searchText = `${question.title} ${question.topic} ${question.prompt} ${question.tags.join(" ")}`.toLowerCase();
    return matchesTopic && matchesSaved && (!query || searchText.includes(query));
  });
}

function renderTopicOptions() {
  const topics = [...new Set(QUESTIONS.map((question) => question.topic))];
  elements.topicFilter.innerHTML = [
    '<option value="all">All topics</option>',
    ...topics.map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`),
  ].join("");
}

function renderList() {
  const visible = getVisibleQuestions();
  const groups = new Map();
  visible.forEach((question) => {
    if (!groups.has(question.topic)) groups.set(question.topic, []);
    groups.get(question.topic).push(question);
  });

  elements.questionList.innerHTML = [...groups.entries()].map(([topic, questions]) => `
    <section class="topic-group">
      <h3 class="topic-group-title">${escapeHtml(topic)}</h3>
      ${questions.map((question) => `
        <button class="question-link" type="button" data-question-id="${question.id}"
          ${question.id === state.activeId ? 'aria-current="page"' : ""}>
          <span class="question-number">${String(question.id).padStart(2, "0")}</span>
          <span class="question-link-title">${escapeHtml(question.title)}</span>
          <span class="question-status" aria-label="${state.completed.has(question.id) ? "Completed" : ""}">
            ${state.completed.has(question.id) ? "✓" : ""}
          </span>
        </button>
      `).join("")}
    </section>
  `).join("");
  elements.emptyList.hidden = visible.length > 0;
  elements.questionList.hidden = visible.length === 0;
  elements.visibleCount.textContent = `${visible.length} QUESTION${visible.length === 1 ? "" : "S"}`;
  elements.courseCount.textContent = String(QUESTIONS.length);
  elements.questionList.querySelectorAll("[data-question-id]").forEach((button) => {
    button.addEventListener("click", () => selectQuestion(Number(button.dataset.questionId)));
  });

  if (visible.length && !visible.some((question) => question.id === state.activeId)) {
    selectQuestion(visible[0].id, false);
  }
}

function renderLesson() {
  const question = QUESTIONS.find((item) => item.id === state.activeId);
  if (!question) return;
  const visible = getVisibleQuestions();
  const position = visible.findIndex((item) => item.id === question.id);
  const levelClass = question.level.toLowerCase();
  const isBookmarked = state.bookmarks.has(question.id);
  const isCompleted = state.completed.has(question.id);

  elements.breadcrumb.textContent = question.topic.toUpperCase();
  elements.bookmarkButton.setAttribute("aria-pressed", String(isBookmarked));
  elements.bookmarkIcon.textContent = isBookmarked ? "★" : "☆";
  elements.bookmarkLabel.textContent = isBookmarked ? "Saved" : "Save question";
  elements.lesson.innerHTML = `
    <div class="lesson-body">
      <div class="lesson-eyebrow">
        <span class="level-dot ${levelClass}"></span>
        <span>${escapeHtml(question.level)}</span>
        <span aria-hidden="true">·</span>
        <span>${escapeHtml(question.topic)}</span>
        <span aria-hidden="true">·</span>
        <span>QUESTION ${String(question.id).padStart(2, "0")}</span>
      </div>
      <div class="lesson-title-row">
        <h2 class="lesson-title">${escapeHtml(question.title)}</h2>
        <span class="lesson-number" aria-hidden="true">${String(question.id).padStart(2, "0")}</span>
      </div>
      <p class="lesson-lead">${escapeHtml(question.intro)}</p>
      <h3 class="lesson-section-heading"><span class="heading-icon">?</span> The challenge</h3>
      <p class="question-prompt">${escapeHtml(question.prompt)}</p>
      <div class="example-grid">
        <div class="example-box"><span>EXAMPLE INPUT</span><code>${escapeHtml(question.input || "No input required")}</code></div>
        <div class="example-box"><span>EXPECTED RESULT</span><code>${escapeHtml(question.output)}</code></div>
      </div>
      <div class="code-heading">
        <h3 class="lesson-section-heading"><span class="heading-icon">&lt;/&gt;</span> Python 3 solution</h3>
        <button class="copy-button" id="copy-code" type="button">Copy code</button>
      </div>
      <div class="code-panel"><pre><code id="solution-code">${escapeHtml(question.code)}</code></pre></div>
      <h3 class="lesson-section-heading"><span class="heading-icon">i</span> How it works</h3>
      <ol class="explanation-list">
        ${question.explanation.map((step, index) => `<li data-step="${String(index + 1).padStart(2, "0")}">${escapeHtml(step)}</li>`).join("")}
      </ol>
      <div class="concept-tags">${question.tags.map((tag) => `<span class="concept-tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="lesson-actions">
        <div class="lesson-nav">
          <button class="nav-button" id="previous-question" type="button" ${position <= 0 ? "disabled" : ""}>← Previous</button>
          <button class="nav-button" id="next-question" type="button" ${position === -1 || position >= visible.length - 1 ? "disabled" : ""}>Next question →</button>
        </div>
        <button class="complete-button ${isCompleted ? "is-done" : ""}" id="complete-question" type="button" aria-pressed="${isCompleted}">
          ${isCompleted ? "✓ Completed" : "Mark as complete"}
        </button>
      </div>
    </div>
  `;

  document.querySelector("#copy-code").addEventListener("click", copyCode);
  document.querySelector("#previous-question").addEventListener("click", () => moveQuestion(-1));
  document.querySelector("#next-question").addEventListener("click", () => moveQuestion(1));
  document.querySelector("#complete-question").addEventListener("click", toggleCompleted);
}

async function copyCode(event) {
  const button = event.currentTarget;
  const code = document.querySelector("#solution-code").textContent;
  try {
    await navigator.clipboard.writeText(code);
    button.textContent = "Copied!";
  } catch (error) {
    console.error("Could not copy the solution to the clipboard.", error);
    button.textContent = "Select code to copy";
  }
  window.setTimeout(() => { button.textContent = "Copy code"; }, 1800);
}

function selectQuestion(id, updateList = true) {
  state.activeId = id;
  renderLesson();
  if (updateList) renderList();
}

function moveQuestion(direction) {
  const visible = getVisibleQuestions();
  const position = visible.findIndex((question) => question.id === state.activeId);
  const next = visible[position + direction];
  if (next) selectQuestion(next.id);
}

function toggleCompleted() {
  if (state.completed.has(state.activeId)) state.completed.delete(state.activeId);
  else state.completed.add(state.activeId);
  saveSet(STORAGE_KEYS.completed, state.completed);
  renderProgress();
  renderLesson();
  renderList();
}

function toggleBookmark() {
  if (state.bookmarks.has(state.activeId)) state.bookmarks.delete(state.activeId);
  else state.bookmarks.add(state.activeId);
  saveSet(STORAGE_KEYS.bookmarks, state.bookmarks);
  renderLesson();
  renderList();
}

function renderProgress() {
  const percent = Math.round((state.completed.size / QUESTIONS.length) * 100);
  elements.headerProgress.textContent = `${percent}%`;
  elements.progressRing.style.background = `conic-gradient(var(--green) ${percent * 3.6}deg, #dfe8df ${percent * 3.6}deg)`;
}

function updateFilters() {
  state.query = elements.search.value;
  state.topic = elements.topicFilter.value;
  elements.questionList.scrollTop = 0;
  renderList();
  renderLesson();
}

elements.search.addEventListener("input", updateFilters);
elements.topicFilter.addEventListener("change", updateFilters);
elements.savedFilter.addEventListener("click", () => {
  state.savedOnly = !state.savedOnly;
  elements.savedFilter.setAttribute("aria-pressed", String(state.savedOnly));
  elements.savedFilter.innerHTML = `<span aria-hidden="true">${state.savedOnly ? "★" : "☆"}</span> Saved`;
  elements.questionList.scrollTop = 0;
  renderList();
  renderLesson();
});
elements.bookmarkButton.addEventListener("click", toggleBookmark);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    elements.search.focus();
  }
});

renderTopicOptions();
renderProgress();
renderList();
renderLesson();

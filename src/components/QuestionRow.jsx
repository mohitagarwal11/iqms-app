import { useState } from "react";
import { isQuestionDone } from "../utils/questionUtils";
import { getDifficultyClass } from "../utils/themeClasses";

export default function QuestionRow({
  question,
  topicId,
  themeClasses,
  isDark,
  onToggleDone,
  onToggleReview,
  onEditQuestion,
  // onDeleteQuestion,
  onUpdateNotes,
}) {
  const [showPatterns, setShowPatterns] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState(question.notes || "");

  const handleNotesBlur = () => {
    if (noteText !== question.notes) {
      onUpdateNotes(topicId, question.id, noteText);
    }
  };

  const formatLastSolved = (date) => {
    if (!date) return "Never";
    const lastDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="space-y-2">
      <div className={themeClasses.questionRow}>
        <label className="flex items-center gap-1 rounded-md px-1 py-1">
          <input
            type="checkbox"
            checked={isQuestionDone(question)}
            onChange={(e) =>
              onToggleDone(topicId, question.id, e.target.checked)
            }
            className="h-4 w-4 accent-sky-600"
          />
        </label>

        <span className="min-w-0 flex-1 truncate font-medium">
          {question.name}
        </span>

        {question.needsReview && (
          <span
            className={
              isDark
                ? "rounded-full bg-yellow-500/20 px-2 py-1 text-[10px] font-bold text-yellow-300"
                : "rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold text-yellow-700"
            }
          >
            ⭐ REVIEW
          </span>
        )}

        <span className={getDifficultyClass(question.difficulty, isDark)}>
          {question.difficulty}
        </span>

        {question.link ? (
          <a
            href={question.link}
            target="_blank"
            rel="noreferrer"
            className={
              isDark
                ? "rounded-full bg-violet-500/20 px-2 py-1 text-[11px] font-semibold text-violet-300 hover:bg-violet-500/30 transition"
                : "rounded-full bg-violet-100 px-2 py-1 text-[11px] font-semibold text-violet-700 hover:bg-violet-200 transition"
            }
          >
            {question.platform}
          </a>
        ) : (
          <span
            className={
              isDark
                ? "rounded-full bg-slate-700 px-2 py-1 text-[11px] font-semibold text-slate-400"
                : "rounded-full bg-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-500"
            }
          >
            {question.platform}
          </span>
        )}

        {question.pattern && question.pattern.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPatterns(!showPatterns)}
            className={themeClasses.tinyButton}
            title="Show/hide patterns"
          >
            {showPatterns ? "🏷️" : "🏷️"}
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className={themeClasses.tinyButton}
          title="Show/hide notes"
        >
          📝
        </button>

        <button
          type="button"
          onClick={() =>
            onToggleReview(topicId, question.id, !question.needsReview)
          }
          className={themeClasses.tinyButton}
          title="Mark for review"
        >
          {question.needsReview ? "⭐" : "☆"}
        </button>

        <button
          type="button"
          onClick={() => {
            const name = window.prompt("Question name", question.name);
            if (name === null) return;

            const difficulty = window.prompt(
              "Difficulty: Easy / Medium / Hard",
              question.difficulty,
            );
            if (difficulty === null) return;

            const link = window.prompt("Question link", question.link);
            if (link === null) return;

            onEditQuestion(topicId, question.id, {
              name,
              difficulty,
              link,
            });
          }}
          className={themeClasses.tinySecondaryButton}
        >
          Edit
        </button>

        {/* <button
          type="button"
          onClick={() => {
            if (window.confirm(`Delete "${question.name}"?`)) {
              onDeleteQuestion(topicId, question.id);
            }
          }}
          className={themeClasses.dangerTinyButton}
        >
          Del
        </button> */}
      </div>

      {/* Last solved info */}
      {question.lastSolvedDate && (
        <div className="pl-8 text-[10px] opacity-60">
          Last solved: {formatLastSolved(question.lastSolvedDate)}
        </div>
      )}

      {/* Pattern tags */}
      {showPatterns && question.pattern && question.pattern.length > 0 && (
        <div className="flex flex-wrap gap-1 pl-8">
          {question.pattern.map((p, idx) => (
            <span
              key={idx}
              className={
                isDark
                  ? "rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-300"
                  : "rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700"
              }
            >
              {p}
            </span>
          ))}
        </div>
      )}

      {/* Notes section */}
      {showNotes && (
        <div className="pl-8">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onBlur={handleNotesBlur}
            placeholder="Add your notes here... (tips, approach, gotchas)"
            className={
              isDark
                ? "w-full rounded-lg border border-slate-600 bg-slate-800 p-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                : "w-full rounded-lg border border-slate-300 bg-white p-2 text-xs placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
            }
            rows={3}
          />
        </div>
      )}
    </div>
  );
}

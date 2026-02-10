import { isQuestionDone } from "./utils/questionUtils";
import { getDifficultyClass } from "./utils/themeClasses";

export default function QuestionRow({
  question,
  topicId,
  subTopicId,
  themeClasses,
  isDark,
  onToggleDone,
  onEditQuestion,
  onDeleteQuestion,
}) {
  return (
    <div className={themeClasses.questionRow}>
      <label className="flex items-center gap-1 rounded-md px-1 py-1">
        <input
          type="checkbox"
          checked={isQuestionDone(question)}
          onChange={(e) => onToggleDone(topicId, subTopicId, question.id, e.target.checked)}
          className="h-4 w-4 accent-sky-600"
        />
        <span className={themeClasses.checkLabel}></span>
      </label>

      <span className="min-w-0 flex-1 truncate font-medium">{question.name}</span>

      <span className={getDifficultyClass(question.difficulty, isDark)}>
        {question.difficulty}
      </span>

      {question.link ? (
        <a href={question.link} target="_blank" rel="noreferrer" className={themeClasses.link}>
          Link
        </a>
      ) : (
        <span className={themeClasses.noLink}>No link</span>
      )}

      <button
        type="button"
        onClick={() => {
          const name = window.prompt("Question name", question.name);
          if (name === null) return;

          const difficulty = window.prompt(
            "Difficulty: Easy / Medium / Hard",
            question.difficulty
          );
          if (difficulty === null) return;

          const link = window.prompt("Question link", question.link);
          if (link === null) return;

          onEditQuestion(topicId, subTopicId, question.id, {
            name,
            difficulty,
            link,
          });
        }}
        className={themeClasses.tinySecondaryButton}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => onDeleteQuestion(topicId, subTopicId, question.id)}
        className={themeClasses.dangerTinyButton}
      >
        Delete
      </button>
    </div>
  );
}

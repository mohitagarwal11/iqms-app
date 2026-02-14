import { getProgressPercent, getTopicProgress } from "../utils/progressUtils";
import QuestionRow from "./QuestionRow";
import { makeQuestionFromLink } from "../utils/questionUtils";

export default function TopicCard({
  topic,
  isOpen,
  themeClasses,
  isDark,
  onToggleTopic,
  onRenameTopic,
  // onDeleteTopic,
  onAddQuestion,
  onToggleQuestionDone,
  onToggleQuestionReview,
  onEditQuestion,
  // onDeleteQuestion,
  onUpdateNotes,
}) {
  const topicProgress = getTopicProgress(topic);
  const topicPercent = getProgressPercent(
    topicProgress.done,
    topicProgress.total,
  );

  return (
    <article className={themeClasses.topicCard} id={`topic-${topic.id}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleTopic(topic.id)}
          className={themeClasses.iconButton}
        >
          {isOpen ? "▼" : "▶"}
        </button>

        <button
          type="button"
          onClick={() => onToggleTopic(topic.id)}
          className={themeClasses.topicTitleButton}
        >
          <div className="flex items-center justify-between gap-2">
            <span className={themeClasses.topicTitleMain}>{topic.name}</span>
            <span className={themeClasses.topicMeta}>
              {topicProgress.done}/{topicProgress.total}
            </span>
          </div>
          <div className={themeClasses.topicProgressTrack}>
            <div
              className={themeClasses.topicProgressFill}
              style={{ width: `${topicPercent}%` }}
            />
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            const nextName = window.prompt("Enter new topic name", topic.name);
            if (nextName !== null) onRenameTopic(topic.id, nextName);
          }}
          className={themeClasses.secondaryButton}
        >
          Rename
        </button>

        {/* <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                `Delete topic "${topic.name}" and all its questions?`,
              )
            ) {
              onDeleteTopic(topic.id);
            }
          }}
          className={themeClasses.dangerButton}
        >
          Delete
        </button> */}
      </div>

      {isOpen && (
        <div className={themeClasses.sectionDivider}>
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                const link = window.prompt("Paste question link");
                if (link === null) return;

                const parsed = makeQuestionFromLink(link);
                if (!parsed) {
                  window.alert("Invalid link format");
                  return;
                }

                onAddQuestion(topic.id, parsed);
              }}
              className={themeClasses.addQuestionButton}
            >
              + Add Question
            </button>
          </div>

          {topic.questions.length === 0 && (
            <p className={themeClasses.emptyText}>
              No questions yet. Click "+ Add Question" to get started!
            </p>
          )}

          <div className="space-y-2">
            {topic.questions.map((question) => (
              <QuestionRow
                key={question.id}
                question={question}
                topicId={topic.id}
                themeClasses={themeClasses}
                isDark={isDark}
                onToggleDone={onToggleQuestionDone}
                onToggleReview={onToggleQuestionReview}
                onEditQuestion={onEditQuestion}
                // onDeleteQuestion={onDeleteQuestion}
                onUpdateNotes={onUpdateNotes}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

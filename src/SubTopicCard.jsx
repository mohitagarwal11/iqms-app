import { makeQuestionFromLink } from "./utils/questionUtils";
import { getSubTopicProgress } from "./utils/progressUtils";
import QuestionRow from "./QuestionRow";

export default function SubTopicCard({
  topicId,
  subTopic,
  isOpen,
  themeClasses,
  isDark,
  onToggleSubTopic,
  onRenameSubTopic,
  onAddQuestion,
  onDeleteSubTopic,
  onToggleQuestionDone,
  onEditQuestion,
  onDeleteQuestion,
}) {
  const subTopicProgress = getSubTopicProgress(subTopic);

  return (
    <div className={themeClasses.subTopicCard}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleSubTopic(topicId, subTopic.id)}
          className={themeClasses.iconButton}
        >
          {isOpen ? "v" : ">"}
        </button>

        <button
          type="button"
          onClick={() => onToggleSubTopic(topicId, subTopic.id)}
          className={themeClasses.subTopicTitleButton}
        >
          <span className={themeClasses.subTopicTitleMain}>{subTopic.name}</span>
          <span className={themeClasses.subTopicMeta}>
            {subTopicProgress.done}/{subTopicProgress.total}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            const nextName = window.prompt("Rename sub-topic", subTopic.name);
            if (nextName !== null) {
              onRenameSubTopic(topicId, subTopic.id, nextName);
            }
          }}
          className={themeClasses.tinySecondaryButton}
        >
          Rename
        </button>

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

            onAddQuestion(topicId, subTopic.id, parsed);
          }}
          className={themeClasses.addQuestionButton}
        >
          Add Question
        </button>

        <button
          type="button"
          onClick={() => onDeleteSubTopic(topicId, subTopic.id)}
          className={themeClasses.dangerTinyButton}
        >
          Delete
        </button>
      </div>

      {isOpen && (
        <div className={themeClasses.subSectionDivider}>
          {subTopic.questions.length === 0 && (
            <p className={themeClasses.emptyText}>No questions yet</p>
          )}

          {subTopic.questions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
              topicId={topicId}
              subTopicId={subTopic.id}
              themeClasses={themeClasses}
              isDark={isDark}
              onToggleDone={onToggleQuestionDone}
              onEditQuestion={onEditQuestion}
              onDeleteQuestion={onDeleteQuestion}
            />
          ))}
        </div>
      )}
    </div>
  );
}

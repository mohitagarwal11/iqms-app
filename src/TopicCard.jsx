import { getProgressPercent, getTopicProgress } from "./utils/progressUtils";
import SubTopicCard from "./SubTopicCard";

export default function TopicCard({
  topic,
  isOpen,
  subTopicInput,
  openSubTopicKeys,
  themeClasses,
  isDark,
  onToggleTopic,
  onRenameTopic,
  onDeleteTopic,
  onSubTopicInputChange,
  onAddSubTopic,
  onToggleSubTopic,
  onRenameSubTopic,
  onAddQuestion,
  onDeleteSubTopic,
  onToggleQuestionDone,
  onEditQuestion,
  onDeleteQuestion,
}) {
  const topicProgress = getTopicProgress(topic);
  const topicPercent = getProgressPercent(topicProgress.done, topicProgress.total);

  return (
    <article className={themeClasses.topicCard}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleTopic(topic.id)}
          className={themeClasses.iconButton}
        >
          {isOpen ? "v" : ">"}
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
            <div className={themeClasses.topicProgressFill} style={{ width: `${topicPercent}%` }} />
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

        <button
          type="button"
          onClick={() => onDeleteTopic(topic.id)}
          className={themeClasses.dangerButton}
        >
          Delete
        </button>
      </div>

      {isOpen && (
        <div className={themeClasses.sectionDivider}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddSubTopic(topic.id);
            }}
            className="flex flex-wrap gap-2"
          >
            <input
              value={subTopicInput}
              onChange={(e) => onSubTopicInputChange(topic.id, e.target.value)}
              placeholder="Sub-topic name"
              className={themeClasses.subTopicInput}
            />
            <button type="submit" className={themeClasses.addSubTopicButton}>
              + Add Sub-topic
            </button>
          </form>

          {topic.subTopics.map((subTopic) => {
            const subTopicKey = `${topic.id}::${subTopic.id}`;
            const isSubTopicOpen = openSubTopicKeys.includes(subTopicKey);

            return (
              <SubTopicCard
                key={subTopic.id}
                topicId={topic.id}
                subTopic={subTopic}
                isOpen={isSubTopicOpen}
                themeClasses={themeClasses}
                isDark={isDark}
                onToggleSubTopic={onToggleSubTopic}
                onRenameSubTopic={onRenameSubTopic}
                onAddQuestion={onAddQuestion}
                onDeleteSubTopic={onDeleteSubTopic}
                onToggleQuestionDone={onToggleQuestionDone}
                onEditQuestion={onEditQuestion}
                onDeleteQuestion={onDeleteQuestion}
              />
            );
          })}
        </div>
      )}
    </article>
  );
}

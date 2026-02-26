export default function AddTopicForm({
  themeClasses,
  topicInput,
  onTopicInputChange,
  onSubmit,
}) {
  return (
    <div className={themeClasses.topicFormCard}>
      <form onSubmit={onSubmit} className="flex flex-wrap gap-2">
        <input
          value={topicInput}
          onChange={(e) => onTopicInputChange(e.target.value)}
          placeholder="Enter topic name:"
          className={themeClasses.input}
        />
        <button type="submit" className={themeClasses.addTopicButton}>
          Add Topic 
        </button>
      </form>
    </div>
  );
}

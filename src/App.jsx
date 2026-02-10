import { useEffect, useState } from "react";
import { useSheetStore } from "./store/useSheetStore";
import AddTopicForm from "./AddTopicForm";
import HeaderBar from "./HeaderBar";
import TopicCard from "./TopicCard";
import { getSheetProgress } from "./utils/progressUtils";
import { getThemeClasses } from "./utils/themeClasses";

const THEME_STORAGE_KEY = "iqms-theme";

export default function App() {
  const [topicInput, setTopicInput] = useState("");
  const [subTopicInputs, setSubTopicInputs] = useState({});
  const [openTopicIds, setOpenTopicIds] = useState([]);
  const [openSubTopicKeys, setOpenSubTopicKeys] = useState([]);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark"
      ? "dark"
      : "light";
  });

  const isDark = theme === "dark";
  const themeClasses = getThemeClasses(isDark);

  const {
    sheet,
    loading,
    error,
    loadSheet,
    addTopic,
    deleteTopic,
    renameTopic,
    addSubTopic,
    renameSubTopic,
    deleteSubTopic,
    addQuestion,
    editQuestion,
    deleteQuestion,
    toggleQuestionDone,
  } = useSheetStore();

  useEffect(() => {
    loadSheet();
  }, [loadSheet]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  async function handleAddTopic(e) {
    e.preventDefault();
    await addTopic(topicInput);
    setTopicInput("");
  }

  function handleTopicInputChange(value) {
    setTopicInput(value);
  }

  function toggleTopic(topicId) {
    setOpenTopicIds((prev) => {
      if (prev.includes(topicId)) {
        setOpenSubTopicKeys((prevSubTopics) =>
          prevSubTopics.filter((key) => !key.startsWith(`${topicId}::`))
        );
        return prev.filter((id) => id !== topicId);
      }

      return [...prev, topicId];
    });
  }

  function toggleSubTopic(topicId, subTopicId) {
    const key = `${topicId}::${subTopicId}`;
    setOpenSubTopicKeys((prev) =>
      prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key]
    );
  }

  function handleSubTopicInputChange(topicId, value) {
    setSubTopicInputs((prev) => ({
      ...prev,
      [topicId]: value,
    }));
  }

  async function handleAddSubTopic(topicId) {
    const value = (subTopicInputs[topicId] || "").trim();
    if (!value) return;

    await addSubTopic(topicId, value);
    setSubTopicInputs((prev) => ({ ...prev, [topicId]: "" }));
  }

  const overallProgress = getSheetProgress(sheet);

  return (
    <main className={themeClasses.app}>
      <div className={themeClasses.pageWrap}>
        <HeaderBar
          themeClasses={themeClasses}
          overallProgress={overallProgress}
          isDark={isDark}
          onToggleTheme={() =>
            setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
          }
        />

        <AddTopicForm
          themeClasses={themeClasses}
          topicInput={topicInput}
          onTopicInputChange={handleTopicInputChange}
          onSubmit={handleAddTopic}
        />

        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className={themeClasses.errorText}>{error}</p>}

        <section className={themeClasses.topicsSection}>
          {sheet.topics.length === 0 && (
            <div className={themeClasses.emptyState}>
              No topics yet. Add your first topic above to get started.
            </div>
          )}

          {sheet.topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isOpen={openTopicIds.includes(topic.id)}
              subTopicInput={subTopicInputs[topic.id] || ""}
              openSubTopicKeys={openSubTopicKeys}
              themeClasses={themeClasses}
              isDark={isDark}
              onToggleTopic={toggleTopic}
              onRenameTopic={renameTopic}
              onDeleteTopic={deleteTopic}
              onSubTopicInputChange={handleSubTopicInputChange}
              onAddSubTopic={handleAddSubTopic}
              onToggleSubTopic={toggleSubTopic}
              onRenameSubTopic={renameSubTopic}
              onAddQuestion={addQuestion}
              onDeleteSubTopic={deleteSubTopic}
              onToggleQuestionDone={toggleQuestionDone}
              onEditQuestion={editQuestion}
              onDeleteQuestion={deleteQuestion}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

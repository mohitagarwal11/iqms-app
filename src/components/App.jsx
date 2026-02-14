import { useEffect, useState } from "react";
import { useSheetStore } from "../store/useSheetStore";
import AddTopicForm from "./AddTopicForm";
import HeaderBar from "./HeaderBar";
import TopicCard from "./TopicCard";
import ReminderBanner from "./ReminderBanner";
import RandomPicker from "./RandomPicker";
import { getSheetProgress } from "../utils/progressUtils";
import { getThemeClasses } from "../utils/themeClasses";
import { getReminders } from "../utils/reminderUtils";

const THEME_STORAGE_KEY = "iqms-theme";

export default function App() {
  const [topicInput, setTopicInput] = useState("");
  const [openTopicIds, setOpenTopicIds] = useState([]);
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
    // deleteTopic,
    renameTopic,
    addQuestion,
    editQuestion,
    // deleteQuestion,
    toggleQuestionDone,
    toggleQuestionReview,
    updateQuestionNotes,
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
        return prev.filter((id) => id !== topicId);
      }
      return [...prev, topicId];
    });
  }

  function handleQuestionPicked(topicId) {
    // Open the topic if not already open
    setOpenTopicIds((prev) => {
      if (!prev.includes(topicId)) {
        return [...prev, topicId];
      }
      return prev;
    });

    // Scroll to topic after a brief delay
    setTimeout(() => {
      const element = document.getElementById(`topic-${topicId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }

  const overallProgress = getSheetProgress(sheet);
  const reminders = getReminders(sheet);

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

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <AddTopicForm
              themeClasses={themeClasses}
              topicInput={topicInput}
              onTopicInputChange={handleTopicInputChange}
              onSubmit={handleAddTopic}
            />
          </div>
          <RandomPicker
            sheet={sheet}
            themeClasses={themeClasses}
            isDark={isDark}
            onQuestionPicked={handleQuestionPicked}
          />
        </div>

        <ReminderBanner
          reminders={reminders}
          themeClasses={themeClasses}
          isDark={isDark}
          onQuestionClick={handleQuestionPicked}
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
              themeClasses={themeClasses}
              isDark={isDark}
              onToggleTopic={toggleTopic}
              onRenameTopic={renameTopic}
              // onDeleteTopic={deleteTopic}
              onAddQuestion={addQuestion}
              onToggleQuestionDone={toggleQuestionDone}
              onToggleQuestionReview={toggleQuestionReview}
              onEditQuestion={editQuestion}
              // onDeleteQuestion={deleteQuestion}
              onUpdateNotes={updateQuestionNotes}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

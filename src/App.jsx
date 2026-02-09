import { useEffect, useState } from "react";
import { useSheetStore } from "../sheets/useSheetStore";

// takes URL slugs like "two-sum" and turns them into "Two Sum"
function slugToTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function makeQuestionFromLink(rawLink) {
  // parse a link and extract the question name from the URL path
  const input = (rawLink || "").trim();
  if (!input) return null;

  let normalizedLink = input;
  if (!/^https?:\/\//i.test(normalizedLink)) {
    normalizedLink = `https://${normalizedLink}`;
  }

  try {
    const url = new URL(normalizedLink);
    const parts = url.pathname.split("/").filter(Boolean);

    let questionName = "Untitled Question";

    const problemsIndex = parts.indexOf("problems");
    if (problemsIndex !== -1 && parts[problemsIndex + 1]) {
      questionName = slugToTitle(parts[problemsIndex + 1]);
    } else if (parts.length > 0) {
      questionName = slugToTitle(parts[parts.length - 1]);
    }

    return {
      name: questionName,
      difficulty: "Easy",
      done: false,
      link: normalizedLink,
    };
  } catch {
    return null;
  }
}

export default function App() {
  const [topicInput, setTopicInput] = useState("");
  const [subTopicInputs, setSubTopicInputs] = useState({});
  const [openTopicId, setOpenTopicId] = useState(null);
  const [openSubTopicKey, setOpenSubTopicKey] = useState(null);

  const {
    sheet,
    loading,
    error,
    loadSheet,
    addTopic,
    deleteTopic,
    renameTopic,
    addSubTopic, renameSubTopic, deleteSubTopic,
    addQuestion, editQuestion, deleteQuestion, toggleQuestionDone
  } = useSheetStore();

  useEffect(() => {
    loadSheet();
  }, [loadSheet]);

  async function handleAddTopic(e) {
    e.preventDefault();
    await addTopic(topicInput);
    setTopicInput("");
  }

  function toggleTopic(topicId) {
    if (openTopicId === topicId) {
      setOpenTopicId(null);
      setOpenSubTopicKey(null);
      return;
    }

    setOpenTopicId(topicId);
    setOpenSubTopicKey(null);
  }

  function toggleSubTopic(topicId, subTopicId) {
    const key = `${topicId}::${subTopicId}`;
    setOpenSubTopicKey((prev) => (prev === key ? null : key));
  }

  async function handleAddSubTopic(topicId) {
    const value = (subTopicInputs[topicId] || "").trim();
    if (!value) return;

    await addSubTopic(topicId, value);
    setSubTopicInputs((prev) => ({ ...prev, [topicId]: "" }));
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold">Interactive Question Manager</h1>

        {/* form to add new topics  */}
        <form onSubmit={handleAddTopic} className="mt-6 flex gap-2">
          <input
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Enter topic name"
            className="flex-1 rounded border border-slate-300 px-3 py-2"
          />
          <button
            type="submit"
            className="rounded bg-slate-900 px-4 py-2 text-white"
          >
            Add Topic
          </button>
        </form>

        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* display all topics */}
        <section className="mt-6 space-y-3">
          {sheet.topics.map((topic, topicIndex) => (
            <article
              key={topic.id}
              className="rounded border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="rounded border px-2 py-1 text-xs"
                >
                  {openTopicId === topic.id ? "v" : ">"}
                </button>

                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="flex-1 text-left text-lg font-semibold"
                >
                  {topic.name}
                  <span className="ml-2 text-sm text-slate-500">
                    ({topic.subTopics.length} sub-topics)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextName = window.prompt("Enter new topic name", topic.name);
                    if (nextName !== null) renameTopic(topic.id, nextName);
                  }}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Rename
                </button>

                <button
                  type="button"
                  onClick={() => deleteTopic(topic.id)}
                  className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                >
                  Delete
                </button>
              </div>

              {openTopicId === topic.id && (
                <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                  <div className="flex gap-2">
                    <input
                      value={subTopicInputs[topic.id] || ""}
                      onChange={(e) =>
                        setSubTopicInputs((prev) => ({
                          ...prev,
                          [topic.id]: e.target.value,
                        }))
                      }
                      placeholder="Sub-topic name"
                      className="flex-1 rounded border border-slate-300 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSubTopic(topic.id)}
                      className="rounded bg-slate-800 px-3 py-2 text-sm text-white"
                    >
                      + Add Sub-topic
                    </button>
                  </div>

                  {topic.subTopics.map((subTopic, subTopicIndex) => {
                    const subTopicKey = `${topic.id}::${subTopic.id}`;
                    const isSubTopicOpen = openSubTopicKey === subTopicKey;

                    return (
                      <div
                        key={subTopic.id}
                        className="rounded border border-slate-200 bg-slate-50 p-2"
                      >
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleSubTopic(topic.id, subTopic.id)}
                            className="rounded border px-2 py-1 text-xs"
                          >
                            {isSubTopicOpen ? "v" : ">"}
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleSubTopic(topic.id, subTopic.id)}
                            className="flex-1 text-left text-sm font-medium"
                          >
                            {subTopic.name}
                            <span className="ml-2 text-xs text-slate-500">
                              ({subTopic.questions.length} questions)
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const nextName = window.prompt(
                                "Rename sub-topic",
                                subTopic.name
                              );
                              if (nextName !== null) {
                                renameSubTopic(topic.id, subTopic.id, nextName);
                              }
                            }}
                            className="rounded border px-2 py-1 text-xs"
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

                              addQuestion(topic.id, subTopic.id, parsed);
                            }}
                            className="rounded bg-slate-700 px-2 py-1 text-xs text-white"
                          >
                            Add Question
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteSubTopic(topic.id, subTopic.id)}
                            className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                          >
                            Delete
                          </button>
                        </div>

                        {isSubTopicOpen && (
                          <div className="mt-2 space-y-2 border-t border-slate-200 pt-2">
                            {subTopic.questions.length === 0 && (
                              <p className="text-xs text-slate-500">
                                No questions yet
                              </p>
                            )}

                            {subTopic.questions.map((question) => (
                              <div
                                key={question.id}
                                className="flex items-center gap-2 rounded border bg-white px-2 py-2 text-xs"
                              >
                                <label className="flex w-20 items-center justify-center gap-1">
                                  <input
                                    type="checkbox"
                                    checked={
                                      typeof question.done === "boolean"
                                        ? question.done
                                        : question.status === "completed"
                                    }
                                    onChange={(e) =>
                                      toggleQuestionDone(
                                        topic.id,
                                        subTopic.id,
                                        question.id,
                                        e.target.checked
                                      )
                                    }
                                  />
                                </label>

                                <span className="min-w-0 flex-1 truncate font-medium">
                                  {question.name}
                                </span>

                                <span className="w-14 text-center">
                                  {question.difficulty}
                                </span>

                                {question.link ? (
                                  <a
                                    href={question.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-24 truncate text-blue-600 underline"
                                  >
                                    Link
                                  </a>
                                ) : (
                                  <span className="w-24 text-slate-400">No link</span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    const name = window.prompt(
                                      "Question name",
                                      question.name
                                    );
                                    if (name === null) return;

                                    const difficulty = window.prompt(
                                      "Difficulty: Easy / Medium / Hard",
                                      question.difficulty
                                    );
                                    if (difficulty === null) return;

                                    const link = window.prompt(
                                      "Question link",
                                      question.link
                                    );
                                    if (link === null) return;

                                    editQuestion(
                                      topic.id,
                                      subTopic.id,
                                      question.id,
                                      { name, difficulty, link }
                                    );
                                  }}
                                  className="rounded border px-2 py-1"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteQuestion(topic.id, subTopic.id, question.id)
                                  }
                                  className="rounded bg-red-600 px-2 py-1 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default function RandomPicker({
  sheet,
  themeClasses,
  isDark,
  onQuestionPicked,
}) {
  const pickRandom = () => {
    // Check if sheet exists and has topics
    if (!sheet || !sheet.topics || !Array.isArray(sheet.topics)) {
      alert("No questions available yet!");
      return;
    }

    // Get all unsolved questions
    const allUnsolved = [];

    sheet.topics.forEach((topic) => {
      if (!topic.questions || !Array.isArray(topic.questions)) {
        return;
      }

      topic.questions.forEach((question) => {
        if (!question.done) {
          allUnsolved.push({
            question,
            topicId: topic.id,
            topicName: topic.name,
          });
        }
      });
    });

    if (allUnsolved.length === 0) {
      alert("🎉 Congratulations! All questions completed!");
      return;
    }

    // Pick random
    const random = allUnsolved[Math.floor(Math.random() * allUnsolved.length)];

    // Notify parent to scroll to it
    onQuestionPicked(random.topicId);

    // Show popup
    alert(
      `🎲 Random Question:\n\n` +
        `Topic: ${random.topicName}\n` +
        `Question: ${random.question.name}\n` +
        `Difficulty: ${random.question.difficulty}\n\n` +
        `Good luck! 🚀`,
    );

    // Open link if available
    if (random.question.link) {
      window.open(random.question.link, "_blank");
    }
  };

  return (
    <button
      type="button"
      onClick={pickRandom}
      className={
        isDark
          ? "rounded-lg border border-emerald-500/50 bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          : "rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
      }
    >
      🎲 Random Question
    </button>
  );
}

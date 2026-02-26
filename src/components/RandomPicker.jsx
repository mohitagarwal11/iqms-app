export default function RandomPicker({ sheet, isDark }) {
  const pickRandom = () => {
    if (!sheet || !sheet.topics || !Array.isArray(sheet.topics)) {
      alert("No questions available yet!");
      return;
    }

    const qns = [];

    sheet.topics.forEach((topic) => {
      if (!topic.questions || !Array.isArray(topic.questions)) {
        return;
      }

      topic.questions.forEach((question) => {
        qns.push({
          question,
          topicId: topic.id,
          topicName: topic.name,
        });
      });
    });

    const random = qns[Math.floor(Math.random() * qns.length)];

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
          ? "rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/30"
          : "rounded-lg border border-emerald-300 bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200"
      }
    >
      Random Question
    </button>
  );
}

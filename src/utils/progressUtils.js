import { isQuestionDone } from "./questionUtils";

export function getTopicProgress(topic) {
  if (!topic || !topic.questions) {
    return { total: 0, done: 0 };
  }
  const total = topic.questions.length;
  const done = topic.questions.filter(isQuestionDone).length;
  return { total, done };
}

export function getSheetProgress(sheet) {
  if (!sheet || !sheet.topics || !Array.isArray(sheet.topics)) {
    return { total: 0, done: 0 };
  }

  return sheet.topics.reduce(
    (acc, topic) => {
      const { total, done } = getTopicProgress(topic);
      return {
        total: acc.total + total,
        done: acc.done + done,
      };
    },
    { total: 0, done: 0 }
  );
}

export function getProgressPercent(done, total) {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}
import { createId } from "./id";

export function transformSheetJsonToAppFormat(sheetJsonData) {
  if (!sheetJsonData?.revision_sheet || !Array.isArray(sheetJsonData.revision_sheet)) {
    console.warn("Invalid sheet.json format, using empty sheet");
    return { topics: [] };
  }

  const questions = sheetJsonData.revision_sheet;

  const topicsMap = new Map();

  questions.forEach((q) => {
    const topicName = q.topic || "Uncategorized";

    if (!topicsMap.has(topicName)) {
      topicsMap.set(topicName, []);
    }

    topicsMap.get(topicName).push({
      id: createId("question"),
      originalId: q.id,
      name: q.name || "Untitled Question",
      difficulty: q.difficulty || "Easy",
      link: q.link || "",
      done: false,
      platform: q.platform || "Unknown",
      pattern: q.pattern || [],
      lastSolvedDate: null,
      needsReview: false,
      notes: "",
    });
  });

  const topics = Array.from(topicsMap.entries()).map(([topicName, questions], topicIndex) => {
    const sortedQuestions = questions
      .sort((a, b) => (a.originalId || 0) - (b.originalId || 0))
      .map((q, index) => ({
        ...q,
        order: index,
      }));

    return {
      id: createId("topic"),
      name: topicName,
      order: topicIndex,
      questions: sortedQuestions,
    };
  });

  return { topics };
}
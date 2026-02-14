import { createId } from "./id";

export function transformSheetJsonToAppFormat(sheetJsonData) {
  // Handle new format with revision_sheet array
  if (!sheetJsonData?.revision_sheet || !Array.isArray(sheetJsonData.revision_sheet)) {
    console.warn("Invalid sheet.json format, using empty sheet");
    return { topics: [] };
  }

  const questions = sheetJsonData.revision_sheet;

  // Map structure: Topic -> Questions (no subtopics)
  const topicsMap = new Map();

  questions.forEach((q) => {
    const topicName = q.topic || "Uncategorized";

    if (!topicsMap.has(topicName)) {
      topicsMap.set(topicName, []);
    }

    // Add question directly to topic with new fields
    topicsMap.get(topicName).push({
      id: createId("question"),
      originalId: q.id, // Keep original ID for sorting
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

  // Convert map to array and sort questions by original ID
  const topics = Array.from(topicsMap.entries()).map(([topicName, questions], topicIndex) => {
    // Sort questions by their original ID to maintain solve order
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
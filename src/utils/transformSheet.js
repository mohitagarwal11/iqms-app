import { createId } from "./id";

export function transformSheetJsonToAppFormat(sheetJsonData) {
  if (!sheetJsonData?.data?.questions) {
    console.warn("Invalid sheet.json format, using empty sheet");
    return { topics: [] };
  }

  const questions = sheetJsonData.data.questions;

  const topicsMap = new Map();

  questions.forEach((q) => {
    const topicName = q.topic || "Uncategorized";
    const subTopicName = q.subTopic || "General";

    if (!topicsMap.has(topicName)) {
      topicsMap.set(topicName, {
        name: topicName,
        subTopics: new Map()
      });
    }

    const topic = topicsMap.get(topicName);

    if (!topic.subTopics.has(subTopicName)) {
      topic.subTopics.set(subTopicName, []);
    }

    const questionData = q.questionId || {};
    topic.subTopics.get(subTopicName).push({
      id: createId("question"),
      name: questionData.name || "Untitled Question",
      difficulty: questionData.difficulty || "Easy",
      link: questionData.problemUrl || questionData.link || "",
      done: false,
      order: topic.subTopics.get(subTopicName).length,
      _original: {
        title: q.title,
        resource: q.resource
      }
    });
  });

  const topics = Array.from(topicsMap.entries()).map(([topicName, topicData], topicIndex) => {
    const subTopics = Array.from(topicData.subTopics.entries()).map(([subTopicName, questions], subTopicIndex) => ({
      id: createId("subtopic"),
      name: subTopicName,
      order: subTopicIndex,
      questions: questions
    }));

    return {
      id: createId("topic"),
      name: topicName,
      order: topicIndex,
      subTopics: subTopics
    };
  });

  return { topics };
}

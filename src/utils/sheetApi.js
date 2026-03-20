import sheetJsonData from "../data/sheet.json";
import { createId } from "./id";

const STORAGE_KEY = "default-sheet";

// to add a small delay to simulate network request
const wait = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// Transform sheet.json into the app's internal format on first load
function transformSheetJsonToAppFormat(sheetJsonData) {
  const questions = sheetJsonData.revision_sheet;
  const topicsMap = new Map();

  questions.forEach((q) => {
    const topicName = q.topic;

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
const initialSheet = transformSheetJsonToAppFormat(sheetJsonData);

// get sheet from localStorage
// returns transformed sheet.json data if nothing saved yet
export async function getSheet() {
  await wait();

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    console.log("loaded from storage");
    return JSON.parse(saved);
  }

  console.log("loaded default sheet");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSheet));
  return initialSheet;
}

// save sheet to localStorage
// this runs every time we make any change to sheet structure in frontend
export async function saveSheet(sheet) {
  await wait();
  console.log("Saving sheet...");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sheet));
  return sheet;
}
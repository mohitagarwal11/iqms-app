import { transformSheetJsonToAppFormat } from "../utils/transformSheet";
import sheetJsonData from "../data/sheet.json";

const STORAGE_KEY = "iqms-sheet-v1";

// to add a small delay to simulate network request
const wait = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// Transform sheet.json into the app's internal format on first load
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

  console.log("loaded initial sheet from sheet.json");
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
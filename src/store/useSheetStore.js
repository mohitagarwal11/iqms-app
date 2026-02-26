import { create } from "zustand";
import { getSheet, saveSheet } from "../utils/sheetApi";
import { createId } from "../utils/id";

export const useSheetStore = create((set, get) => ({
  sheet: { topics: [] },
  loading: false,
  error: null,

  // loads the current saved sheet from storage on startup
  async loadSheet() {
    set({ loading: true, error: null });
    try {
      const sheet = await getSheet();
      set({ sheet, loading: false });
    } catch (err) {
      console.error("Failed to load:", err);
      set({ error: "Failed to load sheet", loading: false });
    }
  },

  // add a new topic to the list
  async addTopic(topicName) {
    const name = topicName.trim();
    if (!name) return;

    const { sheet } = get();

    const newTopic = {
      id: createId("topic"),
      name,
      order: sheet.topics.length,
      questions: [],
    };

    const updatedSheet = {
      ...sheet,
      topics: [...sheet.topics, newTopic],
    };

    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // deletes a topic and reorders the rest
  async deleteTopic(topicId) {
    const { sheet } = get();

    const topics = sheet.topics
      .filter((topic) => topic.id !== topicId)
      .map((topic, index) => ({ ...topic, order: index }));

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // to rename a topic
  async renameTopic(topicId, newName) {
    const name = newName.trim();
    if (!name) return;

    const { sheet } = get();
    const topics = sheet.topics.map((topic) =>
      topic.id === topicId ? { ...topic, name } : topic
    );

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // add a question directly to a topic
  async addQuestion(topicId, questionInput) {
    const name = questionInput.name?.trim();
    if (!name) return;

    const validDifficulties = ["Easy", "Medium", "Hard"];

    const question = {
      id: createId("question"),
      name,
      difficulty: validDifficulties.includes(questionInput.difficulty)
        ? questionInput.difficulty
        : "--",
      link: questionInput.link?.trim() || "",
      done: Boolean(questionInput.done),
      platform: questionInput.platform || "--",
      pattern: questionInput.pattern || [],
      lastSolvedDate: null,
      needsReview: false,
      notes: "",
    };

    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const newQuestion = {
        ...question,
        order: topic.questions.length,
      };

      return {
        ...topic,
        questions: [...topic.questions, newQuestion],
      };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // edit question details
  async editQuestion(topicId, questionId, updates) {
    const validDifficulties = ["Easy", "Medium", "Hard"];

    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const questions = topic.questions.map((question) => {
        if (question.id !== questionId) return question;

        const name = updates.name?.trim();
        if (!name) return question;

        return {
          ...question,
          name,
          difficulty: validDifficulties.includes(updates.difficulty)
            ? updates.difficulty
            : question.difficulty,
          link: updates.link?.trim() ?? question.link,
        };
      });

      return { ...topic, questions };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // toggle question complete status and update lastSolvedDate
  async toggleQuestionDone(topicId, questionId, nextDone) {
    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const questions = topic.questions.map((question) => {
        if (question.id !== questionId) return question;

        const currentDone =
          typeof question.done === "boolean"
            ? question.done
            : question.status === "completed";

        const willBeDone = typeof nextDone === "boolean" ? nextDone : !currentDone;

        return {
          ...question,
          done: willBeDone,
          lastSolvedDate: willBeDone ? new Date().toISOString() : question.lastSolvedDate,
        };
      });

      return { ...topic, questions };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // toggle review status
  async toggleQuestionReview(topicId, questionId, needsReview) {
    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const questions = topic.questions.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          needsReview: Boolean(needsReview),
        };
      });

      return { ...topic, questions };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // update question notes
  async updateQuestionNotes(topicId, questionId, notes) {
    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const questions = topic.questions.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          notes: notes || "",
        };
      });

      return { ...topic, questions };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // delete a question
  async deleteQuestion(topicId, questionId) {
    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const questions = topic.questions
        .filter((question) => question.id !== questionId)
        .map((question, index) => ({ ...question, order: index }));

      return { ...topic, questions };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },
}));
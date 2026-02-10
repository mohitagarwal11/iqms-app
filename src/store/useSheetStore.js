import { create } from "zustand";
import { getSheet, saveSheet } from "../api/sheetApi";
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
      subTopics: [],
    };

    const updatedSheet = {
      ...sheet,
      topics: [...sheet.topics, newTopic],
    };

    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // deletes a topic and reorders the rest
  // should add a confirmation so user doesn't delete by accident
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

  // this creates a subtopic under a specific topic
  async addSubTopic(topicId, subTopicName) {
    const name = subTopicName.trim();
    if (!name) return;

    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const newSubTopic = {
        id: createId("subtopic"),
        name,
        order: topic.subTopics.length,
        questions: [],
      };

      return {
        ...topic,
        subTopics: [...topic.subTopics, newSubTopic],
      };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // rename subtopic
  async renameSubTopic(topicId, subTopicId, newName) {
    const name = newName.trim();
    if (!name) return;

    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const subTopics = topic.subTopics.map((subTopic) =>
        subTopic.id === subTopicId ? { ...subTopic, name } : subTopic
      );

      return { ...topic, subTopics };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // delete a subtopic (also deletes all questions in it)
  async deleteSubTopic(topicId, subTopicId) {
    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const subTopics = topic.subTopics
        .filter((subTopic) => subTopic.id !== subTopicId)
        .map((subTopic, index) => ({ ...subTopic, order: index }));

      return { ...topic, subTopics };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // add a question to a subtopic
  // default is easy for all links added user needs to edit manually for now
  async addQuestion(topicId, subTopicId, questionInput) {
    const name = questionInput.name?.trim();
    if (!name) return;

    const validDifficulties = ["Easy", "Medium", "Hard"];

    const question = {
      id: createId("question"),
      name,
      difficulty: validDifficulties.includes(questionInput.difficulty)
        ? questionInput.difficulty
        : "Easy",
      link: questionInput.link?.trim() || "",
      done: Boolean(questionInput.done),
    };

    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const subTopics = topic.subTopics.map((subTopic) => {
        if (subTopic.id !== subTopicId) return subTopic;

        const newQuestion = {
          ...question,
          order: subTopic.questions.length,
        };

        return {
          ...subTopic,
          questions: [...subTopic.questions, newQuestion],
        };
      });

      return { ...topic, subTopics };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // edit question details like name, difficulty and the link
  async editQuestion(topicId, subTopicId, questionId, updates) {
    const validDifficulties = ["Easy", "Medium", "Hard"];

    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const subTopics = topic.subTopics.map((subTopic) => {
        if (subTopic.id !== subTopicId) return subTopic;

        const questions = subTopic.questions.map((question) => {
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

        return { ...subTopic, questions };
      });

      return { ...topic, subTopics };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // toggle question complete status
  async toggleQuestionDone(topicId, subTopicId, questionId, nextDone) {
    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const subTopics = topic.subTopics.map((subTopic) => {
        if (subTopic.id !== subTopicId) return subTopic;

        const questions = subTopic.questions.map((question) => {
          if (question.id !== questionId) return question;

          const currentDone =
            typeof question.done === "boolean"
              ? question.done
              : question.status === "completed";

          return {
            ...question,
            done:
              typeof nextDone === "boolean"
                ? nextDone
                : !currentDone,
          };
        });

        return { ...subTopic, questions };
      });

      return { ...topic, subTopics };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

  // delete a question
  async deleteQuestion(topicId, subTopicId, questionId) {
    const { sheet } = get();

    const topics = sheet.topics.map((topic) => {
      if (topic.id !== topicId) return topic;

      const subTopics = topic.subTopics.map((subTopic) => {
        if (subTopic.id !== subTopicId) return subTopic;

        const questions = subTopic.questions
          .filter((question) => question.id !== questionId)
          .map((question, index) => ({ ...question, order: index }));

        return { ...subTopic, questions };
      });

      return { ...topic, subTopics };
    });

    const updatedSheet = { ...sheet, topics };
    set({ sheet: updatedSheet });
    await saveSheet(updatedSheet);
  },

}));

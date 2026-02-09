// default sheet with some sample data to start with
// so the app doesn't look empty on first load
export const defaultSheet = {
  topics: [
    {
      id: "topic-1",
      name: "Arrays",
      order: 0,
      subTopics: [
        {
          id: "sub-topic-1",
          name: "Two Pointers",
          order: 0,
          questions: [
            {
              id: "question-1",
              name: "Valid Palindrome",
              difficulty: "Easy",
              link: "https://leetcode.com/problems/valid-palindrome/",
              status: "completed",
              order: 0,
            },
          ],
        },
      ],
    },
  ],
};

// generates unique IDs for different entities (topics, subtopics, questions)
// just adds a prefix so we can tell what type it is when we see the ID
export function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function slugToTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function makeQuestionFromLink(rawLink) {
  const input = (rawLink || "").trim();
  if (!input) return null;

  let normalizedLink = input;
  if (!/^https?:\/\//i.test(normalizedLink)) {
    normalizedLink = `https://${normalizedLink}`;
  }

  try {
    const url = new URL(normalizedLink);
    const parts = url.pathname.split("/").filter(Boolean);

    let questionName = "Untitled Question";

    const problemsIndex = parts.indexOf("problems");
    if (problemsIndex !== -1 && parts[problemsIndex + 1]) {
      questionName = slugToTitle(parts[problemsIndex + 1]);
    } else if (parts.length > 0) {
      questionName = slugToTitle(parts[parts.length - 1]);
    }

    return {
      name: questionName,
      difficulty: "Easy",
      done: false,
      link: normalizedLink,
    };
  } catch {
    return null;
  }
}

export function isQuestionDone(question) {
  return typeof question.done === "boolean"
    ? question.done
    : question.status === "completed";
}
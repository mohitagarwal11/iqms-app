export function slugToTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function detectPlatform(url) {
  const hostname = url.hostname.toLowerCase();

  if (hostname.includes('leetcode')) return 'LeetCode';
  if (hostname.includes('codeforces')) return 'Codeforces';
  if (hostname.includes('atcoder')) return 'AtCoder';
  if (hostname.includes('codechef')) return 'CodeChef';

  return '--';
}

export function parseQuestionName(url, platform) {
  const parts = url.pathname.split("/").filter(Boolean);

  try {
    // LeetCode: /problems/two-sum/
    if (platform === 'LeetCode') {
      const problemsIndex = parts.indexOf("problems");
      if (problemsIndex !== -1 && parts[problemsIndex + 1]) {
        return slugToTitle(parts[problemsIndex + 1]);
      }
    }

    // Codeforces: /contest/1234/problem/A
    if (platform === 'Codeforces') {
      const problemIndex = parts.indexOf("problem");
      if (problemIndex !== -1 && problemIndex === 2) {
        const contestId = parts[problemIndex - 1];
        const problemLetter = parts[problemIndex + 1];

        if (contestId && problemLetter) {
          return `${contestId}${problemLetter.toUpperCase()}`;
        }
      } else if (problemIndex !== -1 && problemIndex === 1) {
        // /problemset/problem/1234/A
        const contestId = parts[problemIndex + 1];
        const problemLetter = parts[problemIndex + 2];

        if (contestId && problemLetter) {
          return `${contestId}${problemLetter.toUpperCase()}`;
        }
      }
    }

    // AtCoder:
    if (platform === 'AtCoder') {
      const tasksIndex = parts.indexOf("tasks");
      if (tasksIndex !== -1 && parts[tasksIndex + 1]) {
        const taskId = parts[tasksIndex + 1];
        return taskId.toUpperCase().replace(/_/g, ' ');
      }
    }

    // CodeChef:
    if (platform === 'CodeChef') {
      const problemsIndex = parts.indexOf("problems");
      if (problemsIndex !== -1 && parts[problemsIndex + 1]) {
        return parts[problemsIndex + 1].toUpperCase();
      }

      if (parts.length > 0) {
        return parts[parts.length - 1].toUpperCase();
      }
    }

    return "Untitled Question";
  } catch (error) {
    console.error("Error parsing question name:", error);
    return "Untitled Question";
  }
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

    const platform = detectPlatform(url);

    const questionName = parseQuestionName(url, platform);

    let defaultDifficulty = "--";
    if (platform === 'Codeforces') {
      defaultDifficulty = "--";
    }

    return {
      name: questionName,
      difficulty: defaultDifficulty,
      done: false,
      link: rawLink,
      platform: platform,
      pattern: [],
    };
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

export function isQuestionDone(question) {
  return typeof question.done === "boolean"
    ? question.done
    : question.status === "completed";
}
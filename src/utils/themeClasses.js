export function getDifficultyClass(difficulty, isDark) {
  // Handle numeric difficulty (Codeforces style)
  if (typeof difficulty === 'number' || /^\d+$/.test(difficulty)) {
    const numDiff = typeof difficulty === 'number' ? difficulty : parseInt(difficulty);

    // Codeforces rating-based coloring
    if (numDiff <= 1000) {
      // Easy (gray/green for beginner)
      return isDark
        ? "rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm font-semibold text-emerald-300"
        : "rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700";
    } else if (numDiff <= 1400) {
      // Medium (cyan/blue)
      return isDark
        ? "rounded-full bg-cyan-500/20 px-3 py-1.5 text-sm font-semibold text-cyan-300"
        : "rounded-full bg-cyan-100 px-3 py-1.5 text-sm font-semibold text-cyan-700";
    } else if (numDiff <= 1900) {
      // Medium-Hard (purple)
      return isDark
        ? "rounded-full bg-purple-500/20 px-3 py-1.5 text-sm font-semibold text-purple-300"
        : "rounded-full bg-purple-100 px-3 py-1.5 text-sm font-semibold text-purple-700";
    } else {
      // Hard (red/orange)
      return isDark
        ? "rounded-full bg-rose-500/20 px-3 py-1.5 text-sm font-semibold text-rose-300"
        : "rounded-full bg-rose-100 px-3 py-1.5 text-sm font-semibold text-rose-700";
    }
  }

  // Handle text difficulty (LeetCode style)
  if (difficulty === "Medium") {
    return isDark
      ? "rounded-full bg-amber-500/20 px-3 py-1.5 text-sm font-semibold text-amber-300"
      : "rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700";
  }

  if (difficulty === "Hard") {
    return isDark
      ? "rounded-full bg-rose-500/20 px-3 py-1.5 text-sm font-semibold text-rose-300"
      : "rounded-full bg-rose-100 px-3 py-1.5 text-sm font-semibold text-rose-700";
  }

  // Default to Easy/Green
  return isDark
    ? "rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm font-semibold text-emerald-300"
    : "rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700";
}

export function getThemeClasses(isDark) {
  return {
    app: isDark
      ? "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 text-lg"
      : "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 text-lg",
    pageWrap: "mx-auto w-full max-w-6xl p-6 sm:p-8",
    headerCard: isDark
      ? "rounded-2xl border border-slate-700/70 bg-slate-900/90 p-6 shadow-xl shadow-black/50 backdrop-blur sm:p-8"
      : "rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-300/50 backdrop-blur sm:p-8",
    headerTitle: "text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent",
    headerActions: "mt-4 flex flex-wrap items-center gap-3 sm:mt-0",
    overallBadge: isDark
      ? "rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300"
      : "rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700",
    topicFormCard: isDark
      ? "rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 shadow-lg shadow-black/30"
      : "rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50",
    topicsSection: "mt-8 space-y-5",
    emptyState: isDark
      ? "rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center text-base text-slate-400"
      : "rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-base text-slate-600",
    toggleThemeButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-base text-slate-100 transition hover:bg-slate-700 hover:border-slate-500"
      : "rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 transition hover:bg-slate-50 hover:border-slate-400",
    input: isDark
      ? "flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 transition"
      : "flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 transition",
    primaryButton: isDark
      ? "rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-base font-medium text-white transition hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-900/50"
      : "rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-3 text-base font-medium text-white transition hover:from-slate-700 hover:to-slate-800 shadow-lg shadow-slate-900/30",
    addQuestionButton: isDark
      ? "rounded-lg bg-sky-600 px-4 py-3 text-base font-medium text-white transition hover:bg-sky-500 shadow-md"
      : "rounded-lg bg-sky-600 px-4 py-3 text-base font-medium text-white transition hover:bg-sky-700 shadow-md",
    topicCard: isDark
      ? "rounded-2xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-lg shadow-black/30 backdrop-blur"
      : "rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/40 backdrop-blur",
    questionRow: isDark
      ? "flex flex-wrap items-center gap-3 rounded-lg border border-slate-700/70 bg-slate-800/60 px-4 py-3 text-sm backdrop-blur transition hover:bg-slate-800/80"
      : "flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm backdrop-blur transition hover:bg-white",
    sectionDivider: isDark
      ? "mt-6 space-y-4 border-t border-slate-700/50 pt-6"
      : "mt-6 space-y-4 border-t border-slate-200 pt-6",
    iconButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-base text-slate-100 transition hover:bg-slate-700 hover:border-slate-500"
      : "rounded-lg border border-slate-300 bg-white px-3 py-2 text-base transition hover:bg-slate-50 hover:border-slate-400",
    secondaryButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-base text-slate-100 transition hover:bg-slate-700"
      : "rounded-lg border border-slate-300 bg-white px-4 py-2 text-base text-slate-700 transition hover:bg-slate-50",
    tinySecondaryButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-700"
      : "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50",
    tinyButton: isDark
      ? "rounded-md bg-slate-700 px-3 py-2 text-sm transition hover:bg-slate-600"
      : "rounded-md bg-slate-200 px-3 py-2 text-sm transition hover:bg-slate-300",
    dangerButton: isDark
      ? "rounded-lg bg-rose-700 px-4 py-2 text-base text-white transition hover:bg-rose-600 shadow-md"
      : "rounded-lg bg-rose-600 px-4 py-2 text-base text-white transition hover:bg-rose-500 shadow-md",
    dangerTinyButton: isDark
      ? "rounded-lg bg-rose-700/90 px-3 py-1.5 text-sm text-white transition hover:bg-rose-600"
      : "rounded-lg bg-rose-600 px-3 py-1.5 text-sm text-white transition hover:bg-rose-500",
    topicTitleButton: "flex-1 text-left",
    topicTitleMain: "text-xl font-semibold",
    topicProgressTrack: isDark
      ? "mt-2 h-3 rounded-full bg-slate-800"
      : "mt-2 h-3 rounded-full bg-slate-200",
    topicProgressFill: isDark
      ? "h-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all shadow-sm shadow-sky-500/50"
      : "h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all shadow-sm shadow-sky-600/30",
    topicMeta: isDark ? "ml-3 text-base text-slate-400 font-medium" : "ml-3 text-base text-slate-500 font-medium",
    emptyText: isDark ? "text-sm text-slate-500 italic" : "text-sm text-slate-400 italic",
    errorText: isDark ? "mt-4 text-red-400 text-sm font-medium" : "mt-4 text-red-600 text-sm font-medium",
  };
}

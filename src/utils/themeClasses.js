export function getDifficultyClass(difficulty, isDark) {
  if (typeof difficulty === 'number' || /^\d+$/.test(difficulty)) {
    const numDiff = typeof difficulty === 'number' ? difficulty : parseInt(difficulty);

    if (numDiff <= 1000) {
      // Easy (gray/green)
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
    topicsSection: "mt-5 space-y-3",
    emptyState: isDark
      ? "rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center text-base text-slate-400"
      : "rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-base text-slate-600",
    toggleThemeButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700 hover:border-slate-500"
      : "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 transition hover:bg-slate-50 hover:border-slate-400",
    input: isDark
      ? "flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 transition"
      : "flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 transition",
    addTopicButton: isDark
      ? "rounded-lg bg-sky-500/25 px-4 py-2 text-sm font-medium text-sky-200 transition hover:bg-sky-500/35"
      : "rounded-lg bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-200",
    addQuestionButton: isDark
      ? "rounded-lg bg-sky-500/25 px-4 py-2 text-sm font-medium text-sky-200 transition hover:bg-sky-500/35"
      : "rounded-lg bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-200",
    topicCard: isDark
      ? "rounded-2xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-lg shadow-black/30 backdrop-blur"
      : "rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/40 backdrop-blur",
    questionRow: isDark
      ? "flex flex-wrap items-center gap-4 rounded-lg border border-slate-700/70 bg-slate-800/60 px-4 py-3 text-sm backdrop-blur transition hover:bg-slate-800/80"
      : "flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm backdrop-blur transition hover:bg-white",
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
    delTopicButton: isDark
      ? "rounded-lg bg-rose-500/40 border border-rose-400/30 px-4 py-2 text-base text-rose-200 transition hover:bg-rose-500/55"
      : "rounded-lg bg-rose-100 border border-rose-200 px-4 py-2 text-base text-rose-700 transition hover:bg-rose-200",
    delQuestionButton: isDark
      ? "rounded-lg bg-rose-500/35 border border-rose-400/25 px-3 py-1.5 text-sm text-rose-200 transition hover:bg-rose-500/50"
      : "rounded-lg bg-rose-100 border border-rose-200 px-3 py-1.5 text-sm text-rose-700 transition hover:bg-rose-200",
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

export function getDifficultyClass(difficulty, isDark) {
  if (difficulty === "Medium") {
    return isDark
      ? "rounded-full bg-amber-500/20 px-2 py-1 text-[11px] font-semibold text-amber-300"
      : "rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700";
  }

  if (difficulty === "Hard") {
    return isDark
      ? "rounded-full bg-rose-500/20 px-2 py-1 text-[11px] font-semibold text-rose-300"
      : "rounded-full bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-700";
  }

  return isDark
    ? "rounded-full bg-emerald-500/20 px-2 py-1 text-[11px] font-semibold text-emerald-300"
    : "rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700";
}

export function getThemeClasses(isDark) {
  return {
    app: isDark
      ? "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100"
      : "min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-900",
    pageWrap: "mx-auto w-full max-w-6xl p-4 sm:p-6",
    headerCard: isDark
      ? "rounded-2xl border border-slate-700/70 bg-slate-900/80 p-5 shadow-lg shadow-black/30 backdrop-blur sm:p-6"
      : "rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur sm:p-6",
    headerTitle: "text-2xl font-bold sm:text-3xl",
    headerActions: "mt-4 flex flex-wrap items-center gap-2 sm:mt-0",
    overallBadge: isDark
      ? "rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300"
      : "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700",
    topicFormCard: isDark
      ? "mt-4 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-md shadow-black/20"
      : "mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/40",
    topicsSection: "mt-6 space-y-4",
    emptyState: isDark
      ? "rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center text-sm text-slate-300"
      : "rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600",
    toggleThemeButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-700"
      : "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 transition hover:bg-slate-100",
    input: isDark
      ? "flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
      : "flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25",
    subTopicInput: isDark
      ? "flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
      : "flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25",
    primaryButton: isDark
      ? "rounded-lg bg-sky-400 px-4 py-2 font-medium text-slate-900 transition hover:bg-sky-300"
      : "rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700",
    addSubTopicButton: isDark
      ? "rounded-lg bg-sky-400 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-sky-300"
      : "rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700",
    topicCard: isDark
      ? "rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-md shadow-black/20"
      : "rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/50",
    subTopicCard: isDark
      ? "rounded-xl border border-slate-700 bg-slate-800/80 p-3"
      : "rounded-xl border border-slate-200 bg-slate-50 p-3",
    questionRow: isDark
      ? "flex flex-wrap items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-xs"
      : "flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs",
    sectionDivider: isDark
      ? "mt-4 space-y-3 border-t border-slate-700 pt-3"
      : "mt-4 space-y-3 border-t border-slate-200 pt-3",
    subSectionDivider: isDark
      ? "mt-3 space-y-2 border-t border-slate-700 pt-2"
      : "mt-3 space-y-2 border-t border-slate-200 pt-2",
    iconButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-100 transition hover:bg-slate-700"
      : "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs transition hover:bg-slate-100",
    secondaryButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-3 py-1 text-sm text-slate-100 transition hover:bg-slate-700"
      : "rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100",
    tinySecondaryButton: isDark
      ? "rounded-lg border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-100 transition hover:bg-slate-700"
      : "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-100",
    addQuestionButton: isDark
      ? "rounded-lg bg-sky-500 px-2 py-1 text-xs font-medium text-white transition hover:bg-sky-400"
      : "rounded-lg bg-sky-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-sky-500",
    dangerButton: isDark
      ? "rounded-lg bg-rose-700 px-3 py-1 text-sm text-white transition hover:bg-rose-600"
      : "rounded-lg bg-rose-600 px-3 py-1 text-sm text-white transition hover:bg-rose-500",
    dangerTinyButton: isDark
      ? "rounded-lg bg-rose-700 px-2 py-1 text-xs text-white transition hover:bg-rose-600"
      : "rounded-lg bg-rose-600 px-2 py-1 text-xs text-white transition hover:bg-rose-500",
    topicTitleButton: "flex-1 text-left",
    topicTitleMain: "text-lg font-semibold",
    topicProgressTrack: isDark
      ? "mt-1 h-1.5 rounded-full bg-slate-800"
      : "mt-1 h-1.5 rounded-full bg-slate-200",
    topicProgressFill: isDark
      ? "h-1.5 rounded-full bg-sky-400 transition-all"
      : "h-1.5 rounded-full bg-sky-600 transition-all",
    subTopicTitleButton: "flex flex-1 items-center text-left",
    subTopicTitleMain: "text-sm font-medium",
    topicMeta: isDark ? "ml-2 text-sm text-slate-400" : "ml-2 text-sm text-slate-500",
    subTopicMeta: isDark
      ? "ml-2 text-xs text-slate-400"
      : "ml-2 text-xs text-slate-500",
    checkLabel: isDark
      ? "text-[11px] font-medium text-slate-300"
      : "text-[11px] font-medium text-slate-600",
    emptyText: isDark ? "text-xs text-slate-400" : "text-xs text-slate-500",
    link: isDark
      ? "w-24 truncate text-sky-400 underline"
      : "w-24 truncate text-blue-600 underline",
    noLink: isDark ? "w-24 text-slate-500" : "w-24 text-slate-400",
    errorText: isDark ? "mt-4 text-red-400" : "mt-4 text-red-600",
  };
}

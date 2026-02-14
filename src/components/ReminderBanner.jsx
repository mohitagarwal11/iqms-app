export default function ReminderBanner({
  reminders,
  themeClasses,
  isDark,
  onQuestionClick,
}) {
  if (reminders.length === 0) return null;

  return (
    <div
      className={
        isDark
          ? "mt-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-900/30 to-orange-900/30 p-4 shadow-md"
          : "mt-4 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-md"
      }
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">⏰</span>
        <div className="flex-1">
          <h3
            className={
              isDark ? "font-bold text-amber-300" : "font-bold text-amber-900"
            }
          >
            Time to Practice!
          </h3>
          <p
            className={
              isDark
                ? "mt-1 text-sm text-amber-200/80"
                : "mt-1 text-sm text-amber-800/80"
            }
          >
            {reminders.length} question{reminders.length > 1 ? "s" : ""} need
            {reminders.length === 1 ? "s" : ""} your attention
          </p>

          <div className="mt-3 space-y-2">
            {reminders.slice(0, 5).map((reminder) => (
              <button
                key={reminder.questionId}
                onClick={() => onQuestionClick(reminder.topicId)}
                className={
                  isDark
                    ? "flex w-full items-center justify-between rounded-lg border border-amber-700/50 bg-slate-900/50 px-3 py-2 text-left text-sm transition hover:bg-slate-800/80"
                    : "flex w-full items-center justify-between rounded-lg border border-amber-200 bg-white/80 px-3 py-2 text-left text-sm transition hover:bg-white"
                }
              >
                <span className="flex-1 truncate font-medium">
                  {reminder.questionName}
                </span>
                <span
                  className={
                    isDark ? "text-xs text-slate-400" : "text-xs text-slate-600"
                  }
                >
                  {reminder.reason}
                </span>
              </button>
            ))}
          </div>

          {reminders.length > 5 && (
            <p
              className={
                isDark
                  ? "mt-2 text-xs text-amber-300/60"
                  : "mt-2 text-xs text-amber-700/60"
              }
            >
              + {reminders.length - 5} more questions
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HeaderBar({
  themeClasses,
  overallProgress,
  isDark,
  onToggleTheme,
}) {
  return (
    <div className={themeClasses.headerCard}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className={themeClasses.headerTitle}>Interactive Question Manager</h1>
        </div>

        <div className={themeClasses.headerActions}>
          <span className={themeClasses.overallBadge}>
            Overall: {overallProgress.done}/{overallProgress.total}
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            className={themeClasses.toggleThemeButton}
          >
            {isDark ? "Light Theme" : "Dark Theme"}
          </button>
        </div>
      </div>
    </div>
  );
}

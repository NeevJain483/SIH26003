export function getDifficulty(sessions: any[]) {
  if (!sessions.length) {
    return "EASY";
  }

  const recent = sessions.slice(-3);

  const accuracy =
    recent.reduce((sum, item) => sum + item.accuracy, 0) /
    recent.length;

  const speed =
    recent.reduce((sum, item) => sum + item.responseTime, 0) /
    recent.length;

  if (accuracy > 80 && speed < 12) {
    return "HARD";
  }

  if (accuracy < 50 || speed > 25) {
    return "EASY";
  }

  return "MEDIUM";
}
// Get questions that need practice (not solved in 7+ days or marked for review)
export function getReminders(sheet) {
  if (!sheet || !sheet.topics || !Array.isArray(sheet.topics)) {
    return [];
  }

  const reminders = [];
  const now = new Date();
  // this also needs a revamp!!!
  // i want to make it work liek this in future
  // const DAYS_THRESHOLD = [1,7,15,30,60,... and so on];
  // this is proper revision tech but it is harder to implement for me rn 
  // needs first time solved storage and stuff
  const DAYS_THRESHOLD = 7;
  
  sheet.topics.forEach(topic => {
    if (!topic.questions || !Array.isArray(topic.questions)) {
      return;
    }

    topic.questions.forEach(question => {
      let reason = null;

      // Check if marked for review
      if (question.needsReview) {
        reason = "Marked for review";
      }
      // Check if not practiced in a while
      else if (question.lastSolvedDate) {
        const lastDate = new Date(question.lastSolvedDate);
        const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays >= DAYS_THRESHOLD) {
          reason = `Not practiced in ${diffDays} days`;
        }
      }
      // Check if never solved but done is checked (edge case)
      else if (question.done && !question.lastSolvedDate) {
        reason = "No practice date recorded";
      }

      if (reason) {
        reminders.push({
          topicId: topic.id,
          topicName: topic.name,
          questionId: question.id,
          questionName: question.name,
          reason: reason,
          priority: question.needsReview ? 1 : 2 // Review items first
        });
      }
    });
  });

  // Sort by priority
  return reminders.sort((a, b) => a.priority - b.priority);
}
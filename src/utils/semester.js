export function getCurrentSemester() {
  const now = new Date();
  const month = now.getMonth(); // 0–11

  if (month <= 4) return "Spring"; // Jan–May
  if (month <= 7) return "Summer"; // Jun–Aug
  return "Fall"; // Sep–Dec
}

export function getCurrentSemesterKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let semester;
  if (month <= 4) semester = "Spring";
  else if (month <= 7) semester = "Summer";
  else semester = "Fall";

  return `${semester} ${year}`;
}
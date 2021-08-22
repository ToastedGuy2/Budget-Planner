// #4caf50 #ff3d00 #ff1744 #000

const getBudgetStatus = (budget) => {
  if (budget >= budget * 0.75) return "Excellent";
  if (budget >= budget * 0.5) return "Good";
  if (budget >= budget * 0.25) return "Warning";
  if (budget > 0) return "Danger";
  if (budget === 0) return "Nothing";
  return "Bad";
};
export { getBudgetStatus };

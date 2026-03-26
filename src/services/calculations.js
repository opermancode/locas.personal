export const calculateSafeToSpend = (balance) => {
  const today = new Date();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const daysLeft = lastDay - today.getDate();
  if (daysLeft <= 0) return balance;

  return balance / daysLeft;
};
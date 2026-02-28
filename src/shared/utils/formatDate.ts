export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Unknown";
  
  // Розбиваємо рядок "2022-01-10" по дефісу
  const [year, month, day] = dateString.split("-");
  
  // Повертаємо у форматі DD.MM.YYYY
  return `${day}.${month}.${year}`;
};
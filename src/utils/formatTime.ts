export const formatTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };
  
  return new Date(date).toLocaleString("id", options);
}
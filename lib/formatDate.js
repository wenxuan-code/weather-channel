export function formatDate(unixTime, timezone) {
  const currentDateTime = new Date(unixTime * 1000);
  const datetime = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  }).format(currentDateTime);

  return datetime;
}

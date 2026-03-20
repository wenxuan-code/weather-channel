export function formatDate(unixTime, timezone) {
  const currentDateTime = new Date(unixTime * 1000);
  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: timezone,
  }).format(currentDateTime);

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    timeZone: timezone,
  }).format(currentDateTime);

  return `${date} ${time}`;
}

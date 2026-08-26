export function getNextBusinessDay(referenceDate: Date = new Date()): Date {
  const shipDate = new Date(referenceDate);
  shipDate.setHours(12, 0, 0, 0);

  do {
    shipDate.setDate(shipDate.getDate() + 1);
  } while (shipDate.getDay() === 0 || shipDate.getDay() === 6);

  return shipDate;
}

export function formatShipByDate(referenceDate: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(getNextBusinessDay(referenceDate));
}

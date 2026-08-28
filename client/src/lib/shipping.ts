export function getNextCalendarDay(referenceDate: Date): Date {
  const shipDate = new Date(referenceDate);
  shipDate.setHours(12, 0, 0, 0);

  shipDate.setDate(shipDate.getDate() + 1);

  return shipDate;
}

export function formatShipByDate(referenceDate: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(getNextCalendarDay(referenceDate));
}

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  formatShipByDate,
  getNextCalendarDay,
} from "../client/src/lib/shipping";

const stickPackSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/StickPack.tsx"),
  "utf8",
);

describe("stick-pack ship-by date", () => {
  it("uses the next calendar day for weekday orders", () => {
    const monday = new Date(2026, 7, 24, 9, 0, 0);
    const shipDate = getNextCalendarDay(monday);

    expect(shipDate.getFullYear()).toBe(2026);
    expect(shipDate.getMonth()).toBe(7);
    expect(shipDate.getDate()).toBe(25);
  });

  it("includes weekend ship-by dates for Friday and Saturday orders", () => {
    const friday = new Date(2026, 7, 28, 9, 0, 0);
    const saturday = new Date(2026, 7, 29, 9, 0, 0);

    expect(getNextCalendarDay(friday).getDate()).toBe(29);
    expect(getNextCalendarDay(saturday).getDate()).toBe(30);
    expect(formatShipByDate(friday)).toBe("Sat, Aug 29");
  });

  it("renders the dynamic message in both stick-pack offers", () => {
    expect(stickPackSource.match(/Order now and ships by:/g)).toHaveLength(2);
    expect(stickPackSource.match(/flex flex-col sm:flex-row sm:items-center/g)).toHaveLength(2);
    expect(stickPackSource.match(/hidden sm:inline text-emerald-600/g)).toHaveLength(2);
    expect(stickPackSource).toContain('className="whitespace-nowrap text-emerald-900">{shipByDate}</strong>');
    expect(stickPackSource).not.toContain("Available for <strong>Next-Day Dispatch</strong>");
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  formatShipByDate,
  getNextBusinessDay,
} from "../client/src/lib/shipping";

const stickPackSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/StickPack.tsx"),
  "utf8",
);

describe("stick-pack ship-by date", () => {
  it("uses the next weekday for weekday orders", () => {
    const monday = new Date(2026, 7, 24, 9, 0, 0);
    const shipDate = getNextBusinessDay(monday);

    expect(shipDate.getFullYear()).toBe(2026);
    expect(shipDate.getMonth()).toBe(7);
    expect(shipDate.getDate()).toBe(25);
  });

  it("skips the weekend for Friday and Saturday orders", () => {
    const friday = new Date(2026, 7, 28, 9, 0, 0);
    const saturday = new Date(2026, 7, 29, 9, 0, 0);

    expect(getNextBusinessDay(friday).getDate()).toBe(31);
    expect(getNextBusinessDay(saturday).getDate()).toBe(31);
    expect(formatShipByDate(friday)).toBe("Mon, Aug 31");
  });

  it("renders the dynamic message in both stick-pack offers", () => {
    expect(stickPackSource.match(/Order now and ships by:/g)).toHaveLength(2);
    expect(stickPackSource).toContain("<strong>{shipByDate}</strong>");
    expect(stickPackSource).not.toContain("Available for <strong>Next-Day Dispatch</strong>");
  });
});

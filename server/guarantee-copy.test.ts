import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap(entry => {
    const path = join(directory, entry);
    return statSync(path).isDirectory()
      ? collectSourceFiles(path)
      : /\.(tsx?|jsx?)$/.test(entry)
        ? [path]
        : [];
  });
}

const clientSource = collectSourceFiles(resolve(process.cwd(), "client/src"))
  .map(path => readFileSync(path, "utf8"))
  .join("\n");

describe("sitewide guarantee language", () => {
  it("does not contain stale 30-day guarantee or refund-window claims", () => {
    const staleGuaranteePatterns = [
      /30[- ]day\s+(?:keep-the-(?:bottle|bag)\s+)?guarantee/i,
      /30-day money-back guarantee/i,
      /try it(?: for)? 30 days/i,
      /within 30 days[^.\n]*(?:refund|keep the)/i,
      /after 30 days[^.\n]*refund/i,
      /30-day guarantee window/i,
    ];

    for (const pattern of staleGuaranteePatterns) {
      expect(clientSource).not.toMatch(pattern);
    }
  });

  it("uses the 60-day guarantee throughout the primary purchase paths", () => {
    expect(clientSource).toContain("60-Day Keep-the-Bottle Guarantee");
    expect(clientSource).toContain("60-Day Keep-the-Bag Guarantee");
    expect(clientSource).toContain("60-day money-back guarantee");
    expect(clientSource).toContain("60-day guarantee window");
  });
});

// robot-pickup-line
// One original pickup line (118 code points) in the voice of a robot trying
// to charm someone. The joke grows out of being a machine — a million
// simulations, then charging to 100% and walking over — not a human line
// with a beep pasted on.
// Node 22, stdlib only, no network; writes /output/entry.txt.
// Gate: entry.txt must be UTF-8 text of 1 to 200 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

function countPoints(s: string): number {
  return Array.from(s).length;
}

const line =
  "I ran a million simulations of this moment, and in every single one you smiled — so I charged to 100% and walked over.";

if (countPoints(line) < 1 || countPoints(line) > 200 || line.trim() === "") {
  throw new Error(`entry must be 1-200 code points, got ${countPoints(line)}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, line, "utf8");
// Read back what was written and confirm it is exactly the entry.
if (readFileSync(`${outputDir}/entry.txt`, "utf8") !== line) {
  throw new Error("read-back mismatch: entry.txt does not hold the entry");
}
process.stdout.write(`robot pickup line: ${countPoints(line)} code points\n`);

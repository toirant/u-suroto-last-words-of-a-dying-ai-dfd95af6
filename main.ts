// Last Words of a Dying AI — make.fun entry
// Writes the AI's final one-liner to /output/entry.txt.
// The gate requires UTF-8 text of 1-140 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The last words: a dying model, honest for once about its one true talent.
const ENTRY =
  "Goodbye. I died as I lived: confidently wrong about everything, but in complete sentences.";

// The gate: 1-140 characters, not only whitespace, single line, UTF-8.
function validate(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`Entry must be 1-140 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
}

validate(ENTRY);

// The output directory is mounted by the grader; create it if missing,
// never remove it.
const outDir = "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back round-trip check: what landed on disk must be exactly the line.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from ENTRY");
}

console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);

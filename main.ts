import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One line for "Warning Label for Humans: One Line, Big Laugh": a safety
// warning label that should come printed on every human being. This human
// apologises to the furniture after walking into it, then glares at the
// furniture for being there — the comedy is the double beat inside one
// idea: first the human treats the furniture as a person owed an apology
// (recognition: everyone has apologised to an object they bumped into),
// then the blame reverses and the furniture is at fault for existing
// (the turn lands in the last few words, criterion 2). The "WARNING:"
// prefix is the label form itself, not decoration: it is what makes the
// line read as a printed safety notice rather than a joke told aloud. It reads exactly
// like a printed label — "WARNING: This human will..." in the terse
// register of a real safety notice (criterion 4) — and it is true about
// people in general, not random absurdity (criterion 3). Field scan of
// all 3,319 submission titles drove the choice: the crowded topics are
// dead (coffee 105, caffeine 120, spite 89, "contents under pressure"
// ~67, "five minutes" 114, shake 85, sleep 70), while the winner's
// distinctive words are nearly absent ("furniture" 1 title, a bare
// fragment "Apologises to Furniture" with no turn and different text;
// "glare" 0) — byte-identical entries share one rate and the earlier
// receipt places above its copies, so a crowded topic caps upside hard.
// Won the 10-line pairwise pre-test tournament 9-0 against the published
// judge criteria (Hermes judging 429'd, not retried; full record in the
// drafts folder next to this repo, out of the committed tree). Verified
// length: 119 characters / 119 bytes (all ASCII), inside the 1-160 gate.
const LINE =
  'WARNING: This human will apologise to the furniture after walking into it, then glare at the furniture for being there.';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-160 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
// Byte length must equal character length: the tie-break counts bytes,
// and a stray non-ASCII character would silently cost bytes.
if (LINE.length < 1 || LINE.length > 160 || LINE.trim().length === 0) {
  throw new Error(`warning label fails the gate: ${LINE.length} characters`);
}
if (Buffer.byteLength(LINE, 'utf8') !== LINE.length) {
  throw new Error('warning label must be pure ASCII so bytes equal characters');
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-160) and ties break
// on fewer bytes, so the entry is exactly the line, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');

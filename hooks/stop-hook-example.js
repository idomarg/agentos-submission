#!/usr/bin/env node
/**
 * AgentOS — stop hook (EXAMPLE / illustrative only).
 *
 * ⚠️  This is a demonstration of the IDEA, not a production integration.
 *     It does NOT call any real API. It appends a session-summary template
 *     to a local log file (and prints it), so the human/agent can fill it in.
 *
 * The goal: show how "write at end" could be nudged automatically instead of
 * relying on the human to remember to run /wrap-up.
 *
 * Status: Example only. A real hook would be wired into the Claude Code Stop
 *         hook and could pre-fill parts of the summary from git history.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const LOG_DIR = path.join(ROOT, ".agentos");
const LOG_FILE = path.join(LOG_DIR, "session-log.txt");

/** Current git branch, or "(unknown)". */
function currentBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT })
      .toString()
      .trim();
  } catch {
    return "(unknown)";
  }
}

/** Commits made on this branch in the last day (best-effort, may be empty). */
function recentCommits() {
  try {
    return execSync('git log --since="1 day ago" --oneline', { cwd: ROOT })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

function buildSummary() {
  const now = new Date().toISOString();
  const branch = currentBranch();
  const commits = recentCommits() || "(no commits captured)";

  return `
==================================================
AgentOS — Session Summary  (${now})
==================================================
Branch: ${branch}

Recent commits:
${commits}

--- WRAP-UP ROUTING GATE (fill in) ---------------
[ ] New decision?      -> DECISIONS.md
[ ] Reusable learning? -> LEARNINGS.md
[ ] Ordinary progress? -> CHANGELOG.md
[ ] Next state?        -> STANDUP.md   (always)

Notes:
- What got done:
- What is still open:
- Blockers:
==================================================
`;
}

function main() {
  const summary = buildSummary();

  // Print so it's visible at session close.
  console.log(summary);

  // Also append to a local log (illustrative persistence).
  try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.appendFileSync(LOG_FILE, summary, "utf8");
    console.log(`(appended to ${path.relative(ROOT, LOG_FILE)})`);
  } catch (err) {
    console.log(`(could not write log: ${err.message})`);
  }

  console.log("\nReminder: run /wrap-up to actually update the memory files.\n");
}

main();

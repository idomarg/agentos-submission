#!/usr/bin/env node
/**
 * AgentOS — session-start hook (EXAMPLE / illustrative only).
 *
 * ⚠️  This is a demonstration of the IDEA, not a production integration.
 *     It does NOT call any real API. It only reads local project files and
 *     prints a context summary that an agent could ingest at session start.
 *
 * The goal: show how "read at start" could be automated instead of relying
 * on the human to run /prime manually.
 *
 * Status: Example only. A real hook would be wired into the Claude Code
 *         SessionStart hook and feed this summary into the agent's context.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();

/** Read a file if it exists, else return null. */
function readIfExists(relPath) {
  const full = path.join(ROOT, relPath);
  try {
    return fs.readFileSync(full, "utf8");
  } catch {
    return null;
  }
}

/** Grab the first non-empty section of a markdown file, trimmed. */
function firstSection(content, maxLines = 12) {
  if (!content) return "(missing)";
  return content
    .split("\n")
    .filter((l) => l.trim().length > 0)
    .slice(0, maxLines)
    .join("\n");
}

/** Current git branch, or "(unknown)". */
function currentBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT })
      .toString()
      .trim();
  } catch {
    return "(unknown — not a git repo?)";
  }
}

function main() {
  const claude = readIfExists("CLAUDE.md");
  const standup = readIfExists("STANDUP.md");
  const decisions = readIfExists("DECISIONS.md");
  const branch = currentBranch();

  console.log("==================================================");
  console.log("  AgentOS — Session Start Context (example hook)");
  console.log("==================================================");
  console.log(`\n📍 Branch: ${branch}\n`);

  console.log("── CLAUDE.md (project guide) ──────────────────");
  console.log(firstSection(claude, 8));

  console.log("\n── STANDUP.md (where we left off) ─────────────");
  console.log(firstSection(standup, 14));

  console.log("\n── DECISIONS.md (locked — do not relitigate) ──");
  console.log(decisions ? firstSection(decisions, 10) : "(none yet)");

  console.log("\n--------------------------------------------------");
  console.log("Next: run /prime to load full context, then /start-issue.");
  console.log("--------------------------------------------------\n");
}

main();

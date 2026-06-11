# Decisions

_Locked architectural and product decisions. Add a row only when a real decision was made — not as a session log._
_Read this at session start. Do not modify CLAUDE.md or STANDUP.md to record decisions — put them here._

---

## Format

| Date | Decision | Context | Alternatives considered | Consequences | Related issue / PR |
|---|---|---|---|---|---|
| YYYY-MM-DD | What was decided | Why this decision was needed | What else was considered | What this locks in or rules out | Linear issue ID or PR link |

---

## Decisions

| Date | Decision | Context | Alternatives considered | Consequences | Related issue / PR |
|---|---|---|---|---|---|
| 2026-06-01 | Linear is the single source of truth for tasks; one app = one Linear project | Claude/Codex/human work in parallel and need one arbiter | Ad-hoc / no tracker; one project per feature | No meaningful work without an issue (except Level 0); never a project-per-feature | global / AGENTS.md |
| 2026-06-01 | Never commit to `main`; always a named branch + PR | Protect the deploy branch from direct, unreviewed change | Direct push to `main` | Every change is reviewable and revertable via PR | AGENTS.md |
| 2026-06-01 | Branch names use Linear's `gitBranchName` verbatim (`idomarg/ido-XX-slug`) | Per-agent prefixes (`claude/…`, `codex/…`) drifted from Linear's field | Per-agent prefix conventions | One canonical naming; AGENTS.md table aligned to match | AGENTS.md / CLAUDE.md |
| 2026-06-03 | Hosting is Vercel, git-connected; deploys happen on push. Never run `vercel --prod` / `vercel deploy` manually | Avoid out-of-band deploys that bypass git | Manual Vercel CLI deploys | `main` push = production, every PR/branch = preview | CLAUDE.md → Deployment |
| 2026-06-03 | A PR's `UNSTABLE` status (Vercel preview building) is not a merge blocker when local `npm run build` is green; only a Vercel `ERROR` stops a merge | Free-plan cold infra leaves the Vercel check PENDING long after the PR is mergeable | Block all merges until the check is SUCCESS | `linear-workflow` may merge on UNSTABLE; local build is the real quality gate | CLAUDE.md / IDO-83, IDO-84 |
| 2026-06-03 | No in-app LLM — Claude (via Supabase MCP) is the external categorization engine | Keep cost/latency out of the request path; categorization is offline staging | Runtime LLM call inside the app | Suggestions are staged ahead of time, never generated at request time | IDO-82 / IDO-84 |
| 2026-06-03 | MCP only stages into `category_suggestions`; it never writes categories onto `transactions` — final apply happens in `/categorize` under the logged-in user | Categorization must stay a reviewed human decision, not an automatic write | MCP applies categories directly to transactions | Approval stays with the user; MCP is suggest-only | IDO-83 / IDO-84 |
| 2026-06-03 | Every service-role (`supabase` MCP) write must filter `user_id` explicitly | Service-role bypasses RLS — there is no `auth.uid()` to scope rows | Rely on RLS to scope writes | Guards against touching the wrong user's data | IDO-84 |
| 2026-06-04 | The data freshness boundary ("as-of") is derived from `max(payment_date)` (+ `max(cashflow_month)` for month defaults); no `imports`/`last_imported_at` table | App is import-driven, not real-time — "now" must come from the data, and a freshness signal was needed without over-engineering | A dedicated `imports` table tracking each import session/timestamp | Freshness is always computable from existing data (no new schema to maintain); all "current month / upcoming / overdue" logic keys off the derived as-of, not the wall clock | IDO-101 |

---

_Add rows above. Keep descriptions concise — one cell, one idea._
_If a decision is reversed, strike through the old row and add a new one explaining the reversal._

# Learnings

_Reusable lessons from working on this project. Add an entry ONLY when there is a genuinely reusable insight — not after every session._
_Before adding: ask "would a future agent (or Ido) benefit from knowing this?" If no, skip it._

---

## Format

| Date | What worked | What failed | What to avoid next time | Reusable pattern | Applies to which projects |
|---|---|---|---|---|---|
| YYYY-MM-DD | Approach or technique that succeeded | Approach that failed or caused rework | Specific thing to avoid | Generalizable rule or pattern | This project / all projects / [specific context] |

---

## Learnings

| Date | What worked | What failed | What to avoid next time | Reusable pattern | Applies to which projects |
|---|---|---|---|---|---|
| 2026-06-03 | Reading via the `supabase` MCP | `postgres-readonly` MCP errors with self-signed-cert (TLS) | Blocking on the read-only role just to read | Service-role reads are fine; don't wait on the read role. Writes still must filter `user_id` explicitly | This project |
| 2026-06-03 | Running the `merchant_normalized` backfill before staging suggestions | Querying `v_uncategorized_by_merchant` first — it filters `merchant_normalized IS NOT NULL`, so it returned nothing | Assuming "empty view = no data" | Check a view's filter prerequisites before concluding there's no data | This project |
| 2026-06-03 | Confirming both `category_suggestions` FK constraints live so embeds resolve | Relying on PostgREST embeds without the FK present → `/categorize` can't render category/business names | Embedding related rows before verifying the FK exists | PostgREST embeds need valid FK constraints; verify them before relying on embedded selects | This project / all Supabase projects |
| 2026-06-03 | Trusting local `npm run build` as the merge signal | Treating a PENDING `Vercel` check as a blocker — free/cold infra leaves it PENDING long after the PR is mergeable | Waiting indefinitely on the Vercel check | PENDING/UNSTABLE is not a code signal; merge on green local build, stop only on ERROR | This project |
| 2026-06-03 | Setting functional env vars on both Production and Preview | Preview env vars were missing initially, breaking PR previews | Assuming Production env vars cover Preview deploys | Vercel Preview env vars are separate from Production; set both via dashboard/REST API (CLI can't target "all previews") | This project / all Vercel projects |
| 2026-06-04 | Using `proxy.ts` as the single middleware replacement | (Template gotcha) having both `middleware.ts` and `proxy.ts` fails the Next.js 16 build | Leaving a leftover `middleware.ts` next to `proxy.ts` | Next.js 16: `proxy.ts` fully replaces `middleware.ts` — delete the old one. (OurMoney is Next 15 with a working `middleware.ts`; keep as a cross-project caution) | Template / all Next.js 16 projects |
| 2026-06-04 | Running a real `npm ci` inside the git worktree before `npm run build` | Junctioning the worktree's `node_modules` to the main checkout — Turbopack rejects it: _"Symlink node_modules is invalid, it points out of the filesystem root"_ | Symlink/junction tricks to share `node_modules` across worktrees when the build uses Turbopack | A git worktree needs its own real `node_modules`; Turbopack won't follow a junction/symlink that leaves the worktree root. (Also: this repo had an empty `node_modules` to begin with — install in the main checkout too.) | This project / all Turbopack + git-worktree workflows |
| 2026-06-04 | Passing the resolved label as `SelectValue` children to force the trigger text | shadcn/Radix `<SelectValue>` rendered the raw `value` (a UUID) instead of the item's name — it can't map value→label until `SelectContent` has mounted once | Relying on Radix auto-label when the select value is set programmatically (suggested/default value) and content is closed | For controlled Radix Selects whose value is set before any open, compute the label yourself and pass it as `SelectValue` children | This project / all shadcn-ui Select usages |
| 2026-06-04 | Checking `pg_constraint` before adding a new enum-like value to a text column | Assumed `category_suggestions.status` (type `text`) was unconstrained — it had a CHECK `status IN ('pending','approved','rejected')` that would reject `'hidden'` | Treating a `text` column as free-form without checking for a CHECK constraint | A `text` status column often carries a CHECK enum; query `pg_get_constraintdef` first, add a migration to extend it | This project / all Postgres schemas |
| 2026-06-04 | Deriving an "as-of" date from `max(payment_date)` and treating it as "now" everywhere | The app used `new Date()`/`current_date` for month defaults, "upcoming 30d", and "overdue" — but data is only as fresh as the last manual import, so after any gap it showed empty months and drifted windows | In an import-driven / batch-synced app, never equate the wall clock with the data boundary | For non-real-time data, compute a single freshness boundary from the data (`max(date)`) and make all "current month / upcoming / overdue / N-days" logic relative to it; surface that date to the user | This project / any import-driven or periodically-synced data app |
| 2026-06-10 | Recovering a bad bulk write by scoping to the `updated_at` trigger's time-window (all touched rows were `NULL` before, so the revert was provably clean) | A bulk action with no confirmation + no per-action filter scoping over-approved [~140] suggestions / [~1.2k] txns; UI had no undo | Shipping a one-click bulk mutate that (a) ignores the visible filter and (b) has no confirmation | For reversible recovery, lean on an `updated_at` trigger to bound the blast radius; for prevention, scope bulk actions to the IDs the user actually sees and gate them behind a confirm showing the real count | This project / all bulk-mutation UIs |
| 2026-06-10 | Re-running `git fetch` + checking origin/main right before pushing, after the session had been paused for days | The session's Phase-0 pre-flight `git fetch` was stale; a parallel worker had merged the same fix (#23) meanwhile, so the new branch/PR (#24) was a `DIRTY` duplicate | Trusting a pre-flight `git fetch` taken at session start when the session spans days/pauses; also: doing the work before checking whether the issue was already claimed/merged | In long-lived or parallel-agent sessions, re-fetch and re-check Linear+origin immediately before claiming AND before pushing; a stale mutex is worse than no mutex. Linear auto-attaching sibling PRs to the issue is the tell | This project / all parallel multi-agent workflows |

---

_Add rows above. One row per distinct learning — don't bundle multiple lessons into one row._

# Standup

_Updated by the agent at the end of each meaningful session. Read this at the start of every session._
_Current state only — full history lives in CHANGELOG.md, locked decisions in DECISIONS.md, lessons in LEARNINGS.md._

---

## Current status

**IDO-103 done (on main)** — the `/categorize` "אשר הכל" bug is fixed. The button
used to approve **every** pending suggestion regardless of the active category
filter, with no confirmation. Fixed via **PR #23** (`ff127ac`, merged 06-05 by a
parallel worker `idomarg-author`): bulk approve is scoped to the visible/filtered
IDs the client sends, the server re-checks `user_id` + `status='pending'`, and a
`window.confirm` shows the real count + scope + rule note. Test in
`app/categorize/actions.test.ts`. **Parallel-collision note:** this session opened
IDO-103 at 06-05 02:27 and, while paused for days, the parallel worker claimed it
and merged #23; this session's duplicate **PR #24 was closed and its branch
deleted**. No further work needed.

**Data recovery done (MCP, no migration):** the bug fired in real life — a
filtered-to-"סופר" "אשר הכל" approved **141** suggestions / **1,195** transactions
across 19 categories / **141** rules. Per Ido's call (keep סופר, undo the rest) the
over-approval was reverted via the service-role MCP: **1,093** transactions back to
uncategorized, **128** suggestions back to `pending`, **128** rules deleted; the
**13** סופר suggestions + their txns + rules kept. Verified: 0 stray non-סופר txns
left in the window.

**Categorization queue now:** 121 pending · 40 approved · 9 hidden · 2 rejected
at `/categorize` (samples + amount-stats + notes + category filter from IDO-100).

**IDO-101** (data-freshness boundary, `lib/freshness.ts`, migration 0006) remains
merged and live; as-of for the live data is **2026-05-31**. Dev backlog: phase-2
differentiation (IDO-56..60) and phase-3 wealth (IDO-62/63/64/67) remain in
Backlog, unassigned, claimable.

---

## Active Linear project

- **Name**: OurMoney
- **URL**: https://linear.app/idomargaliot/project/ourmoney-34d5c0383a54

---

## Active Linear issue

None (IDO-103 done on main via #23; duplicate #24 closed).

- **status**: clean
- **branch**: `main`
- **origin-main**: `ff127ac` — IDO-103 fix (#23) on main; local main synced (ff-only)

---

## Next actions

- [ ] **User: review the 121 pending suggestions at `/categorize`.** Cards now
  show samples + amount stats — use the filter (by suggested category) and the
  stats to spot wide-range merchants (high stddev) that need splitting. For any
  merchant you want handled differently, leave a **note** on the card; Claude
  reads notes on the next suggestion round (CLAUDE.md step 1b). 41 are flagged
  "לאימות" (P2P like PAYBOX/BIT, ATM cash, large standing orders, yeshiva income).
- [ ] **Backfill the remaining 1,291 un-normalized txns**: click **"נרמל בתי
  עסק"** in `/categorize` (server action — an agent can't trigger it via MCP).
  Then ask Claude for another suggestion round to cover them.
- [ ] Optional: a second MCP round for the **~547 long-tail groups** (1–2 txns
  each, ~646 txns) — mostly one-off/unidentified merchants, low value.
- [ ] Consider a ticket: `public.exchange_rates` has RLS disabled (pre-existing DB advisor flag).

---

## Blockers

None.

---

## Last session summary

**Date**: 2026-06-05→10 · **Agent**: Claude Opus 4.8 · **Branch**: `main` (no new merge — see below)

**`/categorize` "אשר הכל" incident → recovery → IDO-103 (already fixed on main).**
Ido filtered to "סופר" (14 cards), clicked "אשר הכל", and the count dropped far
more than expected. Root cause: `bulkApproveAll` approved **all** pending
suggestions ignoring the filter, with no confirmation — it had fired on 141
suggestions / 1,195 transactions / 141 rules. **Recovery** via the service-role
MCP (the `transactions.updated_at` trigger gave a precise time-window to scope the
revert; all touched txns were `category_id IS NULL` before, so the revert was
clean): kept the 13 סופר, reverted 1,093 txns + 128 suggestions + deleted 128
rules; verified 0 stray non-סופר left. Then opened **IDO-103** to fix the bug and
built a fix (scoped IDs + confirm + pure `filter.ts` helper + test). **But** a
parallel worker had already merged the equivalent fix as **PR #23** (`ff127ac`,
06-05) while this session was paused for days — so the local pre-flight `git fetch`
was stale and the duplicate **PR #24** came up `DIRTY`. Yielded: closed #24,
deleted the branch, `git pull --ff-only` to `ff127ac`, marked IDO-103 Done. No code
shipped from this session; main is green and already carries the fix.

---

## Previous session summary

**Date**: 2026-06-04 · **Agent**: Claude Opus 4.8 · **Branch**: `idomarg/ido-101-data-freshness-…` (merged via PR #21, squash)

**IDO-101 — data freshness boundary.** The app is import-driven but computed
"now" from `new Date()`/`current_date` in several places, so stale data looked
live (worst case: empty dashboard month after a rollover). Added
`lib/freshness.ts` (`getDataFreshness` → `latestMonth` + `asOfDate`), made
dashboard + budgets default to the latest month **with data**, rewrote
`v_upcoming_payments_30d` (migration 0006) to window from each user's
`max(payment_date)` via a correlated `as_of` CTE, made subscriptions "overdue"
relative to `asOfDate − 7d`, added `components/data-freshness-banner.tsx` on
dashboard/budgets, and fixed misleading labels (incl. landing "בזמן אמת").
typecheck ✓, `npm run build` ✓; migration applied live + MCP-verified (as_of
2026-05-31, view returns 14 rows spanning 05-31…06-14 — the 05-31 row precedes
today 06-04 and would've been dropped under the old `current_date` window).
Note: deliberately did **not** sweep the untracked `docs/gamechanger-final-project.md`
into the PR (left untracked on disk).

---

## Earlier session summary

**IDO-100 — enriched `/categorize` suggestion cards.** Migration 0005 adds
`category_suggestions.note` and extends `v_uncategorized_by_merchant` (CREATE OR
REPLACE, columns appended so the documented Claude workflow query is untouched)
with amount stats — min/max/avg/stddev/median over `abs(amount)` — plus a 2-row
`sample_transactions` jsonb array built with `(array_agg(... order by ...))[1:2]`.
`listSuggestions` now does two parallel reads (suggestions + the view) and merges
stats/samples by `group_key`; new `updateSuggestionNote` server action. Client:
StatsStrip + SampleList components on each card, an editable note Textarea with a
save button (disabled until changed), a pending counter chip in the header, and a
category filter (`useMemo` over pending, options built only from categories that
appear). `postgres-readonly` MCP still throws the self-signed-cert TLS error, so
reads went via the `supabase` MCP. typecheck ✓, `npm run build` ✓; migration
applied live + view spot-checked (paybox wide range vs אבשק מרקט tight cluster).
CLAUDE.md recipe updated (step 1b: read reviewer notes before re-staging).

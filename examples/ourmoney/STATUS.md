<div dir="rtl">

# Status — OurMoney (example)

_מקביל ל-`STANDUP.md`. תמונת מצב לדוגמה._

---

## Current status

מנוע הקטגוריזציה רץ מקצה לקצה: הצעות הועלו לטבלת `category_suggestions` דרך Supabase MCP, וממתינות לאישור המשתמש במסך `/categorize`. המסך שודרג לאחרונה — כל כרטיס מציג 2 תנועות לדוגמה, רצועת סטטיסטיקת סכומים (min/max/avg/median/stddev), ושדה הערה חופשי שה-AI קורא בסבב הבא.

---

## Active Linear issue

- **issue**: None (בין משימות)
- **status**: clean
- **branch**: `main`
- **origin sync**: `main == origin/main`

---

## Next actions

- [ ] המשתמש: לסקור את ההצעות ה-pending ב-`/categorize` ולסמן בית עסק עם פיזור רחב (stddev גבוה) לפיצול.
- [ ] backfill לתנועות שעדיין לא נורמלו (כפתור "נרמל בתי עסק"), ואז סבב הצעות נוסף.
- [ ] להמשיך לשכבת ההון (תיק נכסים, הלוואות) — phase 3.

---

## Blockers

None.

---

## Last session summary

**Date**: 2026-06-04 · **Agent**: Claude Opus · **Branch**: merged via PR

שודרגו כרטיסי ההצעה במסך `/categorize`: migration שמוסיף שדה הערה ומרחיב את ה-view בסטטיסטיקות סכומים + מערך תנועות לדוגמה. typecheck ✓, build ✓, migration הוחל ונבדק.

</div>

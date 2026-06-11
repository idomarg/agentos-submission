# CLAUDE.md — <Project Name>

> תבנית AgentOS. החלף את כל ה-`<placeholders>` בערכים של הפרויקט שלך.
> זהו הקובץ הראשון שהסוכן קורא בכל סשן — שמור אותו יציב ומדויק.

## Purpose

<תיאור קצר: מה האפליקציה עושה, למי היא מיועדת, ומה הבעיה שהיא פותרת.>

## Tech stack

- **Frontend**: <Next.js / React / ...>
- **Backend**: <Supabase / Node / ...>
- **Database**: <PostgreSQL / ...>
- **Auth**: <...>
- **Hosting**: <Vercel / ...>

## Commands

```bash
npm install        # התקנת תלויות
npm run dev        # שרת פיתוח
npm run build      # build לפרודקשן
npm test           # הרצת טסטים
npm run typecheck  # בדיקת טייפים
npm run lint       # lint
npm run format     # עיצוב קוד
```

## Linear project

- **Name**: <שם הפרויקט ב-Linear>
- **URL**: <קישור>
- **Team**: <שם הצוות>

## Safety rules

- לעולם לא לערוך `.env` או קבצי secrets.
- לעולם לא לדחוף ישירות ל-`main`/`master`. תמיד branch בעל שם.
- לעולם לא להריץ `DROP TABLE` / `TRUNCATE` או כל פעולת DB הרסנית בלי אישור מפורש.
- לא לדרוס קובץ שסוכן אחר שינה ב-24 השעות האחרונות בלי לבדוק ב-Linear.

## Linear workflow

- אפליקציה אחת = פרויקט Linear אחד. לעולם לא פרויקט לכל feature.
- כל משימה משמעותית דורשת issue לפני שמתחילים.
  - חריג: Level 0 (typo, שורה אחת, פחות מ-5 דקות) — ישירות.
- שם branch: `<user>/<issue-id>-<slug>` (ה-`gitBranchName` של Linear מילה במילה).

## Work classification

| Level | דוגמאות | פעולה |
|---|---|---|
| 0 — טריוויאלי | typo, פורמט, שורה אחת | ישירות, בלי Linear. |
| 1 — תיקון קטן | bug fix, UI tweak, <50 שורות | issue קליל, ואז ביצוע. |
| 2 — רב־קובצי | refactor, שינוי התנהגות/נתונים | זרימת Linear מלאה. |
| 3 — feature/מערכת | מודול חדש, אינטגרציה | עצור. כתוב תוכנית. חכה לאישור. |

בספק בין רמות — בחר את הגבוהה יותר.

## Session files

| קובץ | תפקיד |
|---|---|
| `STANDUP.md` | סטטוס נוכחי, משימה פעילה, צעדים הבאים, חסמים |
| `DECISIONS.md` | החלטות ארכיטקטוניות/מוצריות נעולות |
| `LEARNINGS.md` | לקחים חוזרים מסשנים קודמים |
| `CHANGELOG.md` | לוג שינויים לפי issue ו-branch |
| `AGENTS.md` | כללי תיאום בין סוכנים |

קרא את `STANDUP.md` ו-`DECISIONS.md` בתחילת כל סשן. בסוף סשן — הרץ את שער הניתוב (ראה `/wrap-up`).

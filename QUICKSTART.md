<div dir="rtl">

# QUICKSTART — התקנת AgentOS ב-repo חדש

מדריך קצר להתקנת ה-Overlay בפרויקט חדש. ההתקנה ידנית (installer אוטומטי הוא **Future** — ראה [docs/future-roadmap.md](docs/future-roadmap.md)).

זמן משוער: 10–15 דקות.

---

## שלב 1 — העתק את ה-templates

העתק את ששת קבצי ה-memory מ-[`templates/`](templates/) לשורש ה-repo החדש:

```bash
cp templates/CLAUDE.md      <your-repo>/CLAUDE.md
cp templates/AGENTS.md      <your-repo>/AGENTS.md
cp templates/STANDUP.md     <your-repo>/STANDUP.md
cp templates/DECISIONS.md   <your-repo>/DECISIONS.md
cp templates/LEARNINGS.md   <your-repo>/LEARNINGS.md
cp templates/CHANGELOG.md   <your-repo>/CHANGELOG.md
```

(ב-PowerShell: `Copy-Item templates\CLAUDE.md <your-repo>\CLAUDE.md` וכן הלאה.)

---

## שלב 2 — התאם את `CLAUDE.md`

זה הקובץ היחיד שחייב התאמה ידנית. עדכן בו:

- **Purpose** — מה הפרויקט עושה.
- **Tech stack** — שפות, frameworks, DB, hosting.
- **Commands** — `dev`, `build`, `test`, `typecheck`, `lint`.
- **Safety rules** — מה אסור לגעת (secrets, main branch, פעולות הרסניות ב-DB).
- **Linear project** — שם ו-URL (אחרי שלב 3).

שאר הקבצים (`STANDUP`, `DECISIONS`, `LEARNINGS`, `CHANGELOG`) מתחילים ריקים ומתמלאים תוך כדי עבודה.

---

## שלב 3 — חבר פרויקט Linear

1. צור **פרויקט Linear אחד** לאפליקציה (לא אחד לכל feature).
2. הוסף ל-`CLAUDE.md` סקשן:

```markdown
## Linear project
- **Name**: <שם הפרויקט>
- **URL**: <קישור>
- **Team**: <שם הצוות>
```

3. הגדר קונבנציית שמות branch: `<user>/<issue-id>-<slug>` (ה-`gitBranchName` של Linear).

ראה את הקונבנציה המלאה ב-[`linear/`](linear/).

---

## שלב 4 — (אופציונלי) הוסף commands ו-hooks

- העתק את הגדרות ה-commands מ-[`commands/`](commands/) לתיקיית ה-slash commands של Claude Code (`.claude/commands/`).
- אם תרצה הקשר אוטומטי בתחילת/סוף סשן, עיין בדוגמאות ב-[`hooks/`](hooks/). **הן דוגמאות להמחשה — לא מחוברות ל-API אמיתי.**

---

## שלב 5 — השתמש ב-`/prime` בתחילת כל סשן

פתח Claude Code ב-repo והרץ:

```
/prime
```

הסוכן יקרא את `CLAUDE.md` + `STANDUP.md` + `DECISIONS.md`, יבין את הסטטוס, וידווח מאיפה להמשיך.

---

## שלב 6 — השתמש ב-`/wrap-up` בסוף כל סשן

לפני שאתה סוגר:

```
/wrap-up
```

הסוכן יריץ את **שער הניתוב בארבע שאלות** (החלטה? לקח? התקדמות? סטטוס?) ויעדכן את הקבצים — כדי שהסשן הבא ימשיך חלק.

---

## הזרימה היומית בקצרה

```
/prime  →  /start-issue  →  [work]  →  /review-pr  →  /wrap-up
```

זהו. ה-Overlay מותקן, והסוכן כבר לא שוכח איפה עצרתם.

</div>

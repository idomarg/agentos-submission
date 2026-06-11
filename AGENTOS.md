<div dir="rtl">

# AGENTOS.md — מסמך המערכת המרכזי

המסמך הזה מגדיר את **AgentOS**: מה הוא, על אילו עקרונות הוא בנוי, ואיך כל רכיב משתלב. זהו המסמך שכל סוכן (וכל אדם) צריך לקרוא כדי להבין את השיטה.

---

## מטרת AgentOS

לתת לסוכן פיתוח מבוסס AI **זיכרון מתמשך בין סשנים**, כך ש:

1. שום הקשר חשוב לא הולך לאיבוד בין חלון אחד למשנהו.
2. החלטות מתקבלות פעם אחת ונשמרות.
3. לקחים נצברים במקום להישכח.
4. יש מקור אמת אחד לסטטוס, למשימות ולהיסטוריה.

AgentOS לא מחליף את הסוכן ולא את הקוד — הוא **שכבת overlay** שמתלבשת על כל repo ונותנת לו מסגרת עבודה חוזרת.

---

## עקרונות תכנון

| עיקרון | משמעות |
|---|---|
| **Files are memory** | הזיכרון של הסוכן הוא קבצים ב-repo. מה שנכתב לקובץ — נשמר; מה שלא — נשכח. אין הסתמכות על state פנימי. |
| **Read at start, write at end** | כל סשן מתחיל בקריאת הקשר (`/prime`) ומסתיים בכתיבתו (`/wrap-up`). |
| **One source of truth** | Linear הוא מקור האמת למשימות. הקבצים הם מקור האמת לסטטוס ולהחלטות. אין כפילות סותרת. |
| **Decisions are durable** | החלטה שננעלה ב-`DECISIONS.md` לא נפתחת מחדש בלי סיבה. |
| **Convention over configuration** | שמות קבצים, מבנה ושמות branches קבועים — כדי שכל סוכן ידע איפה למצוא מה. |
| **Human in the loop** | הסוכן מבצע; ההחלטות העסקיות/סיכוניות נשארות אצל האדם. |

---

## Project Memory Files

ששת הקבצים שמרכיבים את הזיכרון. תבניות מלאות נמצאות ב-[`templates/`](templates/).

### `CLAUDE.md`
הנחיות עבודה ספציפיות לפרויקט — tech stack, פקודות, כללי בטיחות, קונבנציות branch, וזרימת Linear. **זהו הקובץ הראשון שהסוכן קורא.** הוא יציב; לא משמש כיומן סשנים.

### `AGENTS.md`
כללי תיאום בין סוכנים: אילו תפקידים/סוכנים פועלים, איך מחלקים עבודה, ואיך מונעים התנגשות (שני סוכנים על אותו קובץ/issue).

### `STANDUP.md`
"איפה אנחנו עכשיו" — סטטוס נוכחי בלבד: משימה פעילה, branch, סטטוס סנכרון מול remote, צעדים הבאים, חסמים. נכתב מחדש בסוף כל סשן.

### `DECISIONS.md`
החלטות ארכיטקטוניות ומוצריות **נעולות**. כל החלטה: מה הוחלט, מתי, ולמה. הסוכן מתייחס אליהן כעובדות.

### `LEARNINGS.md`
לקחים שחוזרים על עצמם — gotchas, דברים שנשברו, פתרונות לא־מובנים־מאליהם. רק לקח שימושי לעתיד; לא יומן.

### `CHANGELOG.md`
לוג שינויים רץ לפי issue ו-branch. מה השתנה, באילו קבצים, ולאיזה issue זה שייך.

---

## Session lifecycle

מחזור החיים של סשן עבודה אחד, מקצה לקצה:

### 1. Prime / session start — `/prime`
הסוכן קורא `CLAUDE.md`, `STANDUP.md`, `DECISIONS.md` (ולפי הצורך `LEARNINGS.md`), בודק את ה-branch והסטטוס הנוכחי, ומדווח בפסקה אחת: פרויקט, משימה פעילה, branch, והצעד הבא המומלץ.

### 2. Start issue — `/start-issue`
תופס את ה-issue הבא שאפשר לתבוע מ-Linear, נועל אותו (assignee + status + branch), פותח branch בשם התואם ל-Linear, וקורא את ה-Acceptance Criteria.

### 3. Work loop
ביצוע העבודה **מול ה-Acceptance Criteria** של ה-issue. שינויים קטנים נעשים ישירות; שינויים גדולים מפורקים. הסוכן לא חורג מגבולות ה-issue.

### 4. Review PR — `/review-pr`
בדיקת ה-PR מול ה-criteria, מול `DECISIONS.md` (לא נשברה החלטה נעולה), ומול סטנדרטי הקוד. אישור או הערות לתיקון.

### 5. Wrap-up — `/wrap-up`
**שער ניתוב בארבע שאלות**, נשאל בכל סוף סשן:
- החלטה חדשה? → `DECISIONS.md`
- לקח שימושי לעתיד? → `LEARNINGS.md`
- התקדמות רגילה? → `CHANGELOG.md`
- מה הסטטוס הבא? → `STANDUP.md`

עדכון ה-issue ב-Linear בתגובה קצרה בעברית. הסשן נסגר במצב שממנו אפשר להמשיך.

---

## Linear as source of truth

- **אפליקציה אחת = פרויקט Linear אחד.** לעולם לא פרויקט לכל feature.
- כל משימה משמעותית = issue עם Acceptance Criteria לפני שמתחילים.
- חריג: עבודת Level 0 (typo, שורה אחת, פחות מ-5 דקות) — ישירות, בלי issue.
- שם branch = ה-`gitBranchName` של Linear, מילה במילה.
- נעילה תלת־שכבתית: assignee + status + branch — מונעת שני סוכנים על אותו issue.

ראה את הקונבנציה המלאה ב-[`linear/linear-workflow.md`](linear/linear-workflow.md).

---

## Vault / docs as memory layer

מעבר לקבצי ה-memory ב-repo, שכבת `docs/` מחזיקה זיכרון ארוך־טווח שלא משתנה בכל סשן:

- [`docs/architecture.md`](docs/architecture.md) — איך AgentOS בנוי.
- [`docs/workflow.md`](docs/workflow.md) — זרימת העבודה המלאה.
- [`docs/implementation-notes.md`](docs/implementation-notes.md) — מה ממומש ואיך.
- [`docs/future-roadmap.md`](docs/future-roadmap.md) — מה מתוכנן.

ברמת המשתמש, אפשר לחבר גם Vault חיצוני (למשל Obsidian) כשכבת זיכרון על־פרויקטלית — זה **Future**, לא חלק מה-MVP.

---

## גבולות — מה עובד, מה template, מה future

ביושר, כדי שלא יהיו ציפיות מוגזמות:

| רכיב | סטטוס |
|---|---|
| Project Memory Files | ✅ **Implemented as templates** — מוכחים בשימוש בפרויקטים אמיתיים. |
| Commands (slash) | ✅ **Implemented** — מתועדים ופעילים ב-Claude Code. |
| Linear workflow | ✅ **Used conceptually in real projects** — קונבנציה מלאה, מופעלת ידנית/חצי־אוטומטית. |
| Case studies | ✅ שניים אמיתיים — OurMoney, Napolitanit Inventory. |
| Hooks | 🟡 **Examples only** — ממחישים את הרעיון; לא מחוברים ל-API אמיתי. |
| Installer אוטומטי | ⏳ **Future** — כרגע העתקה ידנית של templates. |
| Linear API דו־כיווני | ⏳ **Future** — סנכרון אוטומטי מלא. |

</div>

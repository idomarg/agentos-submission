# /start-issue — פתיחת משימה דרך Linear

> Slash command של AgentOS. תופס issue ופותח עליו עבודה.
> מיקום מותקן: `.claude/commands/start-issue.md`

## מטרה

לתבוע את המשימה הבאה מ-Linear בצורה בטוחה — בלי להתנגש בסוכן אחר — ולפתוח עליה branch.

## מה הפקודה עושה

1. בוחרת את ה-issue הבא שאפשר לתבוע מ-Linear (לא חסום, לא מוקצה לאחר).
2. **נועלת אותו תלת־שכבתית**: מקצה אותו אליך (assignee), משנה status ל-In Progress, ויוצרת branch.
3. פותחת branch בשם התואם ל-Linear: `<user>/<issue-id>-<slug>` (ה-`gitBranchName` מילה במילה).
4. קוראת את ה-**Acceptance Criteria** של ה-issue וחוזרת עליהם בקצרה.

## כללים

- **בדוק `STANDUP.md` ו-Linear קודם.** אם ה-issue כבר תפוס על ידי סשן אחר — בחר את הבא בתור.
- עבודת **Level 0** (typo, שורה אחת) לא צריכה issue — דלג על הפקודה ובצע ישירות.
- עבודת **Level 3** (feature/מערכת) שמגיעה בלי תוכנית — **עצור**. כתוב תוכנית, חכה לאישור, ורק אז פתח issues.
- אל תחרוג מגבולות ה-issue. אם צף scope חדש — issue נפרד.

## פלט

> **נתבע**: <issue-id> — <כותרת> · **branch**: <שם> · **Acceptance Criteria**: <רשימה קצרה>.

## מתי משתמשים

אחרי `/prime`, כשמתחילים יחידת עבודה חדשה.

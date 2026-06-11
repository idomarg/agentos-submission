<div dir="rtl">

# Architecture — AgentOS

איך AgentOS בנוי, ואיך הרכיבים מתחברים.

---

## תמונת על

AgentOS הוא **שכבת overlay** — לא framework ולא ספרייה. הוא לא מריץ קוד בתוך האפליקציה; הוא קבוצה של קבצים וקונבנציות שמתלבשים על repo קיים ונותנים לסוכן מסגרת עבודה עם זיכרון.

```
┌─────────────────────────────────────────────┐
│                  Your repo                  │
│                                             │
│   ┌─────────────── AgentOS Overlay ──────┐  │
│   │  Memory files   Commands    Hooks    │  │
│   │  CLAUDE.md      /prime       session │  │
│   │  STANDUP.md     /start-issue  -start │  │
│   │  DECISIONS.md   /review-pr    stop   │  │
│   │  LEARNINGS.md   /wrap-up             │  │
│   │  CHANGELOG.md                        │  │
│   │  AGENTS.md                           │  │
│   └──────────────┬───────────────────────┘  │
│                  │                           │
│            your app code                     │
└──────────────────┼───────────────────────────┘
                   │
            ┌──────▼──────┐
            │   Linear    │  ← source of truth for tasks
            └─────────────┘
```

---

## שלוש השכבות

### 1. שכבת הזיכרון (Memory files)
ששת קבצי ה-markdown. זה ה-state המתמשך של הפרויקט. הסוכן קורא מהם בהתחלה וכותב אליהם בסוף. **כל מה שלא נכתב לכאן — נשכח.**

### 2. שכבת התהליך (Commands + Hooks)
- **Commands** (`/prime`, `/start-issue`, `/review-pr`, `/wrap-up`) — מגדירים זרימות חוזרות שהסוכן מבצע.
- **Hooks** — אוטומציה אופציונלית של "קרא בהתחלה / כתוב בסוף". כרגע **דוגמאות בלבד**.

### 3. שכבת מקור האמת (Linear)
המשימות חיות ב-Linear. issue אחד למשימה, עם Acceptance Criteria, סטטוס, ו-branch. זה מה שמונע משני סוכנים לדרוך זה על זה.

---

## למה overlay ולא כלי?

- **לא פולשני** — לא משנה את הקוד, לא מוסיף תלויות. אפשר להסיר בלי שובר.
- **נייד** — אותו overlay על כל repo, כל stack.
- **שקוף** — הכל markdown קריא לאדם; אין קופסה שחורה.
- **עמיד** — גם אם הסוכן מתחלף (Claude → Codex), הקבצים נשארים והזיכרון עובר.

---

## זרימת הנתונים בסשן

```
  start ──▶ [hook/​/prime] ──▶ reads CLAUDE+STANDUP+DECISIONS
                                      │
                                      ▼
                            /start-issue (claim from Linear)
                                      │
                                      ▼
                                 work loop
                                      │
                                      ▼
                              /review-pr ──▶ merge
                                      │
                                      ▼
  end   ◀── [hook/​/wrap-up] ◀── writes STANDUP+CHANGELOG(+DECISIONS/LEARNINGS)
```

</div>

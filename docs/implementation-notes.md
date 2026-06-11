<div dir="rtl">

# Implementation Notes — מה ממומש ואיך

הערות יישום כנות: מה באמת עובד, מה template, ומה עדיין רעיון. נכתב כדי שלא יהיו ציפיות מוגזמות.

---

## טבלת סטטוס

| רכיב | סטטוס | פירוט |
|---|---|---|
| Project Memory Files | ✅ **Implemented (templates)** | ששת הקבצים — תבניות מלאות, מוכחות בשימוש בפרויקטים אמיתיים. |
| Commands (`/prime` וכו') | ✅ **Implemented** | מתועדים כ-slash commands; מופעלים ידנית ב-Claude Code. |
| Linear workflow | ✅ **Used conceptually** | קונבנציה מלאה (Levels, נעילה תלת־שכבתית, שמות branch); מופעלת ידנית/חצי־אוטומטית. |
| Case studies | ✅ **Real** | OurMoney + Nap Inventory. |
| Hooks | 🟡 **Examples only** | `session-start-example.js`, `stop-hook-example.js` — ממחישים את הרעיון, **לא מחוברים ל-API אמיתי**. |
| Installer אוטומטי | ⏳ **Future** | כרגע העתקה ידנית של templates (ראה `QUICKSTART.md`). |
| Linear API דו־כיווני | ⏳ **Future** | אין סנכרון אוטומטי מלא בין הקבצים ל-Linear. |
| Vault על־פרויקטלי | ⏳ **Future** | זיכרון חוצה־פרויקטים (למשל Obsidian) — קונספט, לא ממומש כאן. |

---

## מה אומר "Implemented as templates"

הקבצים ב-`templates/` אינם mock-ups. זה אותו מבנה שמשמש בפועל ב-OurMoney וב-Nap Inventory. "Template" כאן = **מוכן להעתקה ולשימוש**, לא "עתיד להיבנות".

## מה אומר "Used conceptually in real projects"

זרימת ה-Linear (claim → branch → PR → wrap-up) מופעלת ידנית בפרויקטים האמיתיים. היא **עובדת**, אבל לא עטופה עדיין בכלי שמריץ אותה בלחיצה. הפער בין "קונבנציה שמופעלת ביד" ל"אוטומציה מלאה" הוא ה-roadmap.

## מה אומר "Examples only" על ה-hooks

ה-hooks קוראים קבצים מקומיים ומדפיסים סיכום. הם **לא** מתחברים ל-Claude Code runtime ולא קוראים API. הם קיימים כדי להראות **איך** אוטומציה של "קרא בהתחלה / כתוב בסוף" תיראה — לא כדי לספק אותה כרגע.

---

## למה השקיפות הזו חשובה

AgentOS שימושי **בדיוק** במצב הנוכחי — כמסגרת תבניות וקונבנציות מוכחות. הצגתו כ"מוצר production מותקן בלחיצה" תהיה לא מדויקת. הערך האמיתי הוא בשיטה, וזו עובדת היום.

</div>

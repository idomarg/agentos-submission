<div dir="rtl">

# Changelog — OurMoney (example)

_לוג שינויים לדוגמה. הרשומה החדשה למעלה. ערכים מייצגים._

---

## 2026-06-XX — IDO-100: העשרת כרטיסי ההצעה ב-/categorize

- **branch**: `idomarg/ido-100-...` → merged via PR
- **מה השתנה**: migration שמוסיף שדה `note` ומרחיב את ה-view בסטטיסטיקות סכומים + 2 תנועות לדוגמה לכל בית עסק. המסך מציג רצועת stats, רשימת דוגמאות, מונה pending, וסינון לפי קטגוריה.
- **קבצים עיקריים**: `app/categorize/page.tsx`, `app/categorize/actions.ts`, migration
- **אימות**: typecheck ✓, build ✓, migration הוחל ונבדק

---

## 2026-05-XX — IDO-83: מסך /categorize לאישור הצעות סיווג

- **branch**: `idomarg/ido-83-...` → merged via PR
- **מה השתנה**: מסך שמציג הצעות AI עם אישור/דחייה בכמות; אישור מחיל קטגוריה על כל תנועות בית העסק ויכול ליצור חוק.
- **קבצים עיקריים**: `app/categorize/`, server actions
- **אימות**: typecheck ✓, build ✓

---

## 2026-04-XX — IDO-80: נרמול בתי עסק + מנוע חוקים

- **branch**: `idomarg/ido-80-...` → merged via PR
- **מה השתנה**: `normalizeMerchant()` כמקור אמת יחיד; backfill ל-`merchant_normalized`; החלת חוקים אוטומטית בייבוא.
- **קבצים עיקריים**: `lib/merchants/normalize.ts`, `app/transactions/actions.ts`
- **אימות**: typecheck ✓, build ✓

---

## 2026-03-XX — ייבוא Riseup

- **branch**: `idomarg/...` → merged via PR
- **מה השתנה**: ייבוא קובץ תנועות מ-Riseup עם זיהוי כפילויות ([~4k] תנועות יובאו).
- **קבצים עיקריים**: `app/import/`
- **אימות**: build ✓

</div>

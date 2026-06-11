<div dir="rtl">

# Learnings — OurMoney (example)

_לקחים לדוגמה. ערכים מייצגים._

---

## ה-view של בתי עסק לא־מסווגים מסנן `merchant_normalized IS NOT NULL`

- **ההקשר**: ניסינו להריץ סבב הצעות סיווג, וה-view החזיר ריק.
- **מה קרה**: ה-view מקבץ לפי `merchant_normalized`; אם ה-backfill לא רץ, אין מה להציע.
- **הלקח**: backfill לנרמול בתי עסק הוא **prerequisite** לכל סבב הצעות.
- **איך מיישמים**: ללחוץ "נרמל בתי עסק" באפליקציה לפני שמבקשים סבב הצעות.

---

## כתיבת service-role עוקפת RLS — חייבים לסנן `user_id` ידנית

- **ההקשר**: כתיבת הצעות דרך ה-`supabase` MCP (service-role).
- **מה קרה**: אין `auth.uid()` ב-service-role; ה-policy של own-rows לא מגן.
- **הלקח**: כל statement חייב `user_id` מפורש — אחרת אפשר לגעת בנתונים של משתמש אחר.
- **איך מיישמים**: לכלול `where user_id = '...'` בכל קריאה/כתיבה דרך service-role.

---

## upsert על מפתח (user_id, group_key) — כדי שסבב חוזר ירענן, לא יכפיל

- **ההקשר**: הרצת סבב הצעות נוסף על אותם בתי עסק.
- **מה קרה**: בלי upsert, סבב חוזר יוצר כפילויות.
- **הלקח**: לעשות `on conflict (user_id, group_key) do update` — סבב חוזר מרענן את ההצעה.
- **איך מיישמים**: רק בתי עסק שעדיין לא טופלו ע"י המשתמש — re-staging מאפס סטטוס ל-pending.

</div>

# 🌙 Crescent English Quiz Pro

تطبيق ويب تعليمي (PWA) لمراجعة مفردات اللغة الإنجليزية لمنهج Crescent.

---

## 📁 هيكل الملفات

```
crescent-quiz/
├── index.html        ← التطبيق الكامل (HTML + CSS + JS)
├── manifest.json     ← تعريف PWA للتثبيت على الهاتف
├── sw.js             ← Service Worker للعمل بدون إنترنت
├── sample-data.json  ← مثال على ملف البيانات
└── README.md         ← هذا الملف
```

---

## 🚀 طريقة الاستخدام

### تشغيل محلي
افتح `index.html` مباشرةً في المتصفح، أو استخدم خادم محلي:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

### نشر على GitHub Pages
1. ارفع الملفات إلى مستودع GitHub
2. فعّل GitHub Pages من الإعدادات → Pages
3. اختر الفرع `main` والمجلد `/ (root)`

### نشر على Netlify
1. اسحب مجلد المشروع وأفلته على [netlify.com/drop](https://app.netlify.com/drop)
2. سيتم النشر تلقائياً في ثوانٍ

---

## 📋 صيغة ملف البيانات JSON

```json
[
  {
    "en": "Word",
    "ar": "الكلمة بالعربي",
    "type": ["n"]
  },
  {
    "en": "advance",
    "ar": "يتقدم / تقدم",
    "type": ["v1", "n"]
  }
]
```

### أنواع الكلام المدعومة

| الرمز  | النوع       |
|--------|-------------|
| `v1`   | Present     |
| `v2`   | Past        |
| `v3`   | Past Part.  |
| `adj`  | Adjective   |
| `adv`  | Adverb      |
| `n`    | Noun        |
| `prep` | Preposition |
| `conj` | Conjunction |

> ⚠️ `type` يجب أن تكون **مصفوفة** دائماً، حتى لو كان نوع واحد: `["n"]`

---

## 🔧 تحديث التطبيق

عند تعديل الكود، افتح `sw.js` وغيّر رقم الإصدار:
```js
const CACHE_VERSION = 'crescent-quiz-v1.0.1'; // ← زد الرقم
```
هذا يُجبر المتصفحات على تحميل النسخة الجديدة.

---

## ✨ الميزات

- 🔄 اختبار عكسي: إنجليزي→عربي أو عربي→إنجليزي
- 👁️ كشف المعنى بالنقر (Blur Effect)
- 🏷️ تقييم نوع الكلمة (POS) مع 8 أنواع
- ⚠️ تنبيه للكلمات متعددة الأنواع
- 📊 إحصاءات فورية + لوحة نتائج نهائية
- 📶 يعمل بدون إنترنت (PWA + Service Worker)
- 📲 قابل للتثبيت على الهاتف

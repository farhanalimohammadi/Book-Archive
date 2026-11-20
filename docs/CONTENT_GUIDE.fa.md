# راهنمای مدیریت محتوای کتابخانه کتاب‌ها

این سند راهنمای کامل برای اضافه کردن ترجمه‌های جدید، فصل‌ها، بخش‌ها و مدیریت محتوای کتابخانه کتاب‌هاست.

## فهرست مطالب

1. [ساختار پروژه](#ساختار-پروژه)
2. [فرمت محتوای فصل‌ها](#فرمت-محتوای-فصل‌ها)
3. [اضافه کردن فصل جدید](#اضافه کردن-فصل-جدید)
4. [اضافه کردن بخش/مقدمه/پایان‌نامه جدید](#اضافه-کردن-بخشمقدمهپایان‌نامه-جدید)
5. [مدیریت ترجمه‌ها](#مدیریت-ترجمه‌ها)
6. [تصاویر وAssets](#تصاویر-وassets)
7. [استقرار (Deployment)](#استقرار-deployment)
8. [بهترین شیوه‌ها](#بهترین-شیوه‌ها)

---

## ساختار پروژه

```
books-archive/
├── app/
│   ├── (marketing)/           # صفحات بازاریابی (خانه، درباره)
│   │   └── page.tsx           # صفحه اصلی
│   ├── (reader)/              # صفحات خواندن کتاب
│   │   ├── book/[slug]/       # صفحات فصل‌ها
│   │   │   └── page.tsx
│   │   └── toc/               # صفحه فهرست مطالب
│   │       └── page.tsx
│   ├── api/                   # API Routes
│   ├── layout.tsx             # Layout ریشه
│   ├── page.tsx               # صفحه اصلی (redirect به marketing)
│   ├── providers.tsx          # Context Providers
│   └── globals.css            # استایل‌های سراسری
├── components/
│   ├── ui/                    # کامپوننت‌های UI پایه
│   ├── reader/                # کامپوننت‌های خواندن
│   ├── layout/                # کامپوننت‌های Layout
│   └── home/                  # کامپوننت‌های صفحه اصلی
├── content/
│   ├── chapters/              # فایل‌های Markdown فصل‌ها
│   │   ├── preface.md
│   │   ├── chapter-1.md
│   │   ├── chapter-2.md
│   │   └── ...
│   └── translations/          # فایل‌های ترجمه
│       ├── fa.json
│       └── en.json
├── lib/
│   ├── constants/
│   │   ├── book.ts            # متادیتای کتاب و ساختار
│   │   └── theme.ts           # ثابت‌های تم
│   ├── data/
│   │   ├── toc.ts             # دسترسی به داده‌های TOC
│   │   └── chapters.ts        # دسترسی به داده‌های فصل
│   ├── hooks/                 # Custom Hooks
│   ├── types/                 # TypeScript Types
│   └── utils/                 # توابع کمکی
├── public/
│   ├── images/
│   │   ├── cover.jpg
│   │   ├── og-image.jpg
│   │   └── chapter1/          # تصاویر فصل ۱
│   └── fonts/
└── docs/
    └── CONTENT_GUIDE.fa.md    # این فایل
```

---

## فرمت محتوای فصل‌ها

فصل‌ها در فرمت **Markdown با Frontmatter** ذخیره می‌شوند. فایل‌ها در مسیر `content/chapters/` قرار دارند.

### ساختار فایل فصل

```markdown
---
title: "عنوان فصل"
number: "۱"
partNumber: "بخش اول"
partTitle: "مبانی"
page: 3
originalTitle: "What Are Microservices?"
translators: ["نام مترجم"]
reviewers: ["نام بازبین"]
lastUpdated: "2024-01-15"
version: "1.0.0"
tags: ["میکروسرویس", "معماری"]
---

# عنوان فصل

مقدمه فصل اینجا قرار می‌گیرد...

## سرفصل اول

محتوای سرفصل اول...

### زیرسرفصل

جزییات بیشتر...

## سرفصل دوم

محتوای سرفصل دوم...

> این یک نقل‌قول نمونه است.

## کد نمونه

```typescript
// مثال کد
function example() {
  return "Hello, Microservices!";
}
```

## تصویر

![توضیح تصویر](/images/chapter1/example.png "عنوان تصویر")

## لیست

- مورد اول
- مورد دوم
  - زیرمورد
- مورد سوم

## جدول

| ستون ۱ | ستون ۲ | ستون ۳ |
|--------|--------|--------|
| داده ۱ | داده ۲ | داده ۳ |

## خلاصه

خلاصه فصل در اینجا قرار می‌گیرد.
```

### فیلدهای Frontmatter

| فیلد | نوع | الزامی | توضیح |
|-------|------|---------|--------|
| `title` | string | بله | عنوان نمایشی فصل |
| `number` | string | بله | شماره فصل (به فارسی: ۱، ۲، ۳...) |
| `partNumber` | string | خیر | شماره بخش (مثال: "بخش اول") |
| `partTitle` | string | خیر | عنوان بخش (مثال: "مبانی") |
| `page` | number | خیر | شماره صفحه در کتاب چاپی |
| `originalTitle` | string | خیر | عنوان اصلی فصل در کتاب انگلیسی |
| `translators` | string[] | خیر | لیست مترجمان |
| `reviewers` | string[] | خیر | لیست بازبینان |
| `lastUpdated` | string | خیر | تاریخ آخرین بروزرسانی (YYYY-MM-DD) |
| `version` | string | خیر | نسخه محتوا (semver) |
| `tags` | string[] | خیر | برچسب‌های جستجو |

### عناصر Markdown پشتیبانی شده

| عنصر | سینتکس | مثال |
|--------|---------|-------|
| تیتر سطح ۱ | `# متن` | `# مقدمه` |
| تیتر سطح ۲ | `## متن` | `## سرفصل` |
| تیتر سطح ۳ | `### متن` | `### زیرسرفصل` |
| پاراگراف | متن ساده | `این یک پاراگراف است.` |
| پر tím | `**متن**` | `**مهم**` |
| کج | `*متن*` | `*تاکید*` |
| کد در خط | `` `code` `` | `` `const x = 1` `` |
| بلوک کد | ```lang\ncode\n``` | ```ts\ncode\n``` |
| نقل‌قول | `> متن` | `> نقل‌قول` |
| تصویر | `![alt](src "title")` | `![img](/img.png "title")` |
| لینک | `[text](url)` | `[link](url)` |
| لیست تو در تو | تو رفتگی ۲ فاصله | `- مورد\n  - زیرمورد` |
| جدول | \| col1 \| col2 \| | \| a \| b \| |
| خط افقی | `---` | `---` |

---

## اضافه کردن فصل جدید

### مرحله ۱: ایجاد فایل Markdown

یک فایل جدید در `content/chapters/` ایجاد کنید:

```bash
# مثال: فصل ۱۷
touch content/chapters/chapter-17.md
```

سپس محتوای فصل را با فرمت فوق پر کنید.

### مرحله ۲: به‌روزرسانی ساختار کتاب

فایل `lib/constants/book.ts` را ویرایش کنید و فصل جدید را به آرایه `BOOK_STRUCTURE.parts` اضافه کنید:

```typescript
// در بخش مربوطه (part) فصل را اضافه کنید
{
  number: '۱۷',
  title: 'عنوان فصل جدید',
  slug: 'chapter-17',
  page: 580,
  sections: [
    { title: 'سرفصل اول', level: 1 },
    { title: 'سرفصل دوم', level: 1, subsections: ['زیرمجموعه ۱', 'زیرمجموعه ۲'] },
    { title: 'خلاصه', level: 1 },
  ],
},
```

### مرحله ۳: به‌روزرسانی thứ tự فصل‌ها (اختیاری)

اگر فصل در وسط کتاب قرار می‌گیرد، ترتیب آرایه را اصلاح کنید. آرایه `CHAPTER_ORDER` به صورت خودکار از `BOOK_STRUCTURE` ساخته می‌شود.

### مرحله ۴: تصاویر (در صورت نیاز)

تصاویر فصل را در `public/images/chapter17/` قرار دهید و در Markdown ارجاع دهید:

```markdown
![توضیح](/images/chapter17/diagram.png "نمایه معماری")
```

### مرحله ۵: تست

```bash
npm run dev
```

به `/book/chapter-17` بروید و بررسی کنید:
- ✅ محتوای درست نمایش داده می‌شود
- ✅ ناوبری فصل قبل/بعد کار می‌کند
- ✅ فهرست فصل (TOC) در سایدبار نمایش داده می‌شود
- ✅ پیشرفت مطالعه ذخیره می‌شود
- ✅ نشانک‌ها کار می‌کنند

---

## اضافه کردن بخش/مقدمه/پایان‌نامه جدید

### مقدمه (Front Matter)

در `lib/constants/book.ts`، آرایه `frontMatter` را ویرایش کنید:

```typescript
frontMatter: [
  { slug: 'preface', title: 'پیشگفتار', page: 'xvii', order: 1 },
  { slug: 'acknowledgments', title: 'تشکر و قدردانی', page: 'xxi', order: 2 },
  { slug: 'new-intro', title: 'معرفی جدید', page: 'xxv', order: 3 },
],
```

سپس فایل `content/chapters/new-intro.md` ایجاد کنید.

### پایان‌نامه (Back Matter)

آرایه `backMatter` را ویرایش کنید:

```typescript
backMatter: [
  { slug: 'epilogue', title: 'پس‌گفتار', page: 551, order: 1 },
  { slug: 'bibliography', title: 'کتاب‌شناسی', page: 563, order: 2 },
  { slug: 'glossary', title: 'واژه‌نامه', page: 569, order: 3 },
  { slug: 'index', title: 'نمایه', page: 575, order: 4 },
  { slug: 'appendix-a', title: 'پیوست الف: چک‌لیست', page: 585, order: 5 },
],
```

سپس فایل `content/chapters/appendix-a.md` ایجاد کنید.

### بخش جدید (Part)

برای اضافه کردن بخش کاملاً جدید:

```typescript
parts: [
  // بخش‌های موجود...
  {
    partNumber: 'بخش چهارم',
    partTitle: 'موضوعات پیشرفته',
    chapters: [
      { number: '۱۸', title: 'فصل ۱۸', slug: 'chapter-18', page: 600, sections: [...] },
      { number: '۱۹', title: 'فصل ۱۹', slug: 'chapter-19', page: 630, sections: [...] },
    ],
  },
],
```

---

## مدیریت ترجمه‌ها

### فایل‌های ترجمه

ترجمه‌ها در `content/translations/` ذخیره می‌شوند:

```
content/translations/
├── fa.json    # فارسی (پیش‌فرض)
├── en.json    # انگلیسی
└── ar.json    # عربی (اختیاری)
```

### ساختار فایل ترجمه

```json
{
  "nav": {
    "home": "خانه",
    "toc": "فهرست مطالب",
    "search": "جستجو",
    "settings": "تنظیمات"
  },
  "reader": {
    "fontSize": "اندازه فونت",
    "lineHeight": "فاصله خطوط",
    "theme": "تم",
    "previousChapter": "فصل قبل",
    "nextChapter": "فصل بعد"
  },
  "home": {
    "title": "ساخت میکروسرویس‌ها",
    "startReading": "شروع مطالعه"
  },
  "toc": {
    "title": "فهرست مطالب",
    "frontMatter": "مقدمات",
    "chapters": "فصل‌ها",
    "backMatter": "پایان‌نامه‌ها"
  },
  "errors": {
    "notFound": "صفحه یافت نشد",
    "loading": "در حال بارگذاری...",
    "retry": "تلاش مجدد"
  }
}
```

### اضافه کردن زبان جدید

1. فایل جدید در `content/translations/` ایجاد کنید (مثال: `ar.json`)
2. در `lib/utils/i18n.ts`، نوع `Locale` را به‌روزرسانی کنید:

```typescript
export type Locale = 'fa' | 'en' | 'ar';
```

3. در `app/layout.tsx`، فونت مناسب را اضافه کنید:

```typescript
// برای عربی
const amiri = Amiri({ subsets: ["arabic"], variable: "--font-amiri" });
```

4. در `getDirection` و `getFontFamily` زبان جدید را مدیریت کنید.

### استفاده در کامپوننت‌ها

```tsx
import { t } from '@/lib/utils/i18n';

function MyComponent() {
  const locale = 'fa'; // یا از context بگیرید
  return <h1>{t('home.title', locale)}</h1>;
}
```

---

## تصاویر و Assets

### مکان تصاویر

- **کاور کتاب**: `public/images/cover.jpg`
- **Open Graph**: `public/images/og-image.jpg` (۱۲۰۰×۶۳۰)
- **تصاویر فصل‌ها**: `public/images/chapter{N}/`
- **فاوآیکون**: `public/favicon.ico`

### بهینه‌سازی تصاویر

```bash
# تغییر اندازه و بهینه‌سازی
# ابزارهای پیشنهادی: sharp, imagemin, squoosh
```

### استفاده در Markdown

```markdown
![نص جایگزین](/images/chapter1/diagram.png "عنوان تصویر")
```

### فرمت‌های پشتیبانی شده

- **WebP** (پیشنهادی برای وب)
- **AVIF** (بهینه‌ترین فشرده‌سازی)
- **PNG** (برای دیاگرام‌ها و متن)
- **JPG** (برای عکس‌ها)
- **SVG** (برای آیکون‌ها و نمودارها)

---

## استقرار (Deployment)

### پیش‌نیازها

- Node.js 20+
- npm/pnpm/yarn
- حساب Vercel (پیشنهادی) یا پلتفرم Node.js

### متغیرهای محیطی

```env
# .env.production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BOOK_TITLE=ساخت میکروسرویس‌ها
```

### بیلد محلی

```bash
# نصب وابستگی‌ها
npm install

# بیلد برای استقرار
npm run build

# تست بیلد
npm run start
```

### استقرار روی Vercel

1. مخزن را به Vercel متصل کنید
2. متغیرهای محیطی را در تنظیمات پروژه اضافه کنید
3. استقرار خودکار انجام می‌شود

### استقرار روی Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# بیلد و اجرا
docker build -t books-archive .
docker run -p 3000:3000 books-archive
```

### تنظیمات Next.js برای Standalone

در `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // برای Docker
  // ... سایر تنظیمات
};
```

---

## بهترین شیوه‌ها

### نوشتن محتوا

1. **سازماندهی**: از تیترها (h1-h3) به درستی استفاده کنید
2. **خوانایی**: پاراگراف‌ها را کوتاه نگه دارید (۳-۵ جمله)
3. **کد**: زبان برنامه‌نویسی را در بلوک‌های کد مشخص کنید
4. **تصاویر**: همیشه `alt` و `title` داشته باشند
5. **لینک‌ها**: متن لینک توصیفی باشد (نه "اینجا را کلیک کنید")

### کارایی

1. **تصاویر**: بهینه‌سازی شده و در فرمت‌های مدرن (WebP/AVIF)
2. **فونت‌ها**: پیش‌بارگذاری فونت وزیرمتن
3. **استاتیک जनرشن**: فصل‌ها به صورت استاتیک تولید می‌شوند
4. **کشینگ**: هدرهای Cache-Control مناسب

### دسترسی‌پذیری (Accessibility)

1. **تیترها**: سلسله‌مرتبه صحیح (h1 → h2 → h3)
2. **رنگ‌ها**: تضاد رنگ حداقل ۴.۵:۱
3. **کیبورد**: همه تعاملات با کیبورد امکان‌پذیر
4. **اسکرین‌ریدر**: ARIA labels مناسب
5. **Focus**: وضعیت focus قابل مشاهده

### SEO

1. **Metadata**: title، description، og:image برای هر فصل
2. **Sitemap**: تولید خودکار از `generateStaticParams`
3. **Structured Data**: Schema.org Book markup
4. **Canonical URLs**: جلوگیری از محتوای تکراری

### نگهداری کد

1. **TypeScript**: تمام کدها تایپ‌شده
2. **ESLint**: lint در CI/CD
3. **Prettier**: فرمت‌دهی یکنواخت
4. **تست**: Unit tests برای utility functions

---

## عیب‌یابی مشکلات رایج

### فصل نمایش داده نمی‌شود

1. مطمئن شوید فایل در `content/chapters/` وجود دارد
2. `slug` در `book.ts` با نام فایل همخوانی دارد
3. Frontmatter معتبر است (YAML syntax)

### ناوبری فصل قبل/بعد کار نمی‌کند

1. ترتیب فصل‌ها در `BOOK_STRUCTURE.parts` صحیح است
2. `slug` یکتا است

### تم/فونت اعمال نمی‌شود

1. CSS Variables در `globals.css` تعریف شده‌اند
2. `data-theme` attribute روی `<html>` ست شده است
3. فونت وزیرمتن در `layout.tsx` لود شده است

### بیلد با خطا مواجه می‌شود

```bash
# کش را پاک کنید
rm -rf .next node_modules
npm install
npm run build
```

---

## چک‌لیست انتشار فصل جدید

- [ ] فایل Markdown در `content/chapters/` ایجاد شده
- [ ] Frontmatter کامل و معتبر است
- [ ] محتوای Markdown با سینتکس صحیح نوشته شده
- [ ] تصاویر در `public/images/chapter{N}/` قرار گرفته
- [ ] فصل در `lib/constants/book.ts` اضافه شده
- [ ] `slug` یکتا و با نام فایل همخوانی دارد
- [ ] `page` (شماره صفحه) وارد شده
- [ ] `sections` با تیترهای موجود در Markdown همخوانی دارد
- [ ] تست محلی: `npm run dev` → `/book/new-chapter`
- [ ] ناوبری پیش/بعد کار می‌کند
- [ ] TOC فصل در سایدبار نمایش داده می‌شود
- [ ] پیشرفت مطالعه ذخیره/بازیابی می‌شود
- [ ] نشانک‌ها کار می‌کنند
- [ ] جستجو فصل جدید را پیدا می‌کند
- [ ] بیلد پروداکشن: `npm run build` موفقیت‌آمیز
- [ ] استقرار و تست روی استیج/پروداکشن

---

## پشتیبانی و مشارکت

### گزارش باگ

ایشو در GitHub با اطلاعات زیر باز کنید:
- نسخه Node.js و npm
- مرورگر و سیستم‌عامل
- مراحل reproducer
- اسکرین‌شات (در صورت لزوم)

### پیشنهاد ویژگی

برای پیشنهاد ویژگی جدید، یک Discussion یا Issue با برچسب `enhancement` باز کنید.

### مشارکت در ترجمه

1. فایل ترجمه مربوطه را در `content/translations/` ویرایش کنید
2. کلیدهای جدید را به همه فایل‌های ترجمه اضافه کنید
3. PR با توضیحات تغییرات ارسال کنید

---

**آخرین بروزرسانی**: ۲۰۲۴-۱۱-۱۴  
**نسخه سند**: ۱.۰.۰  
**نویسنده**: تیم توسعه کتابخانه کتاب‌ها
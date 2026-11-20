# Graph Report - books-archive  (2026-11-14)

## Corpus Check
- 60 files · ~42,274 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .css 1, .bak 1)

## Summary
- 670 nodes · 1136 edges · 36 communities (32 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 96 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e5058c0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ReaderControls.tsx
- toc.ts
- utils/markdown.ts
- chapters.ts
- package.json
- types/book.ts
- راهنمای مدیریت محتوای کتابخانه کتاب‌ها
- useBookmarks.ts
- search.ts
- TypeScript Config
- Theme Design System
- reading-time.ts
- چالش‌های میکروسرویس‌ها
- نحوه مدل‌سازی میکروسرویس‌ها
- کتاب‌های مرجع معماری نرم‌افزار
- تفکیک Monolith
- i18n.ts
- page.tsx
- Icon.tsx
- 6.1 Core Domain Types (`lib/types/book.ts`)
- پس‌گفتار: گردآوری و یکپارچه‌سازی تمام مطالب
- Books Archive Project - Comprehensive Technical Report
- پیشگفتار
- 13. Development Workflow & Tooling
- 14. Deployment & Production
- 7. Content Management System
- 15. Current Project State & Completeness
- 1. Project Overview
- 2. Project Purpose & Use Cases
- 3. Architecture & Technology Stack
- Appendices
- README.md
- AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `Icon()` - 34 edges
2. `18.3 Communities (12 Detected)` - 31 edges
3. `useThemeContext()` - 25 edges
4. `react` - 21 edges
5. `Books Archive Project - Comprehensive Technical Report` - 21 edges
6. `ReaderLayout()` - 19 edges
7. `ReaderControls()` - 18 edges
8. `compilerOptions` - 16 edges
9. `Button` - 13 edges
10. `IconButton` - 13 edges

## Surprising Connections (you probably didn't know these)
- `9.1 React Context Architecture (`app/providers.tsx`)` --references--> `Providers()`  [INFERRED]
  docs/report.md → app/providers.tsx
- `16.1 Critical Issues (Blocking)` --references--> `ReaderLayout()`  [INFERRED]
  docs/report.md → components/reader/ReaderLayout.tsx
- `18.3 Communities (12 Detected)` --references--> `ChapterItem`  [INFERRED]
  docs/report.md → lib/markdown.ts
- `18.3 Communities (12 Detected)` --references--> `BookTOC`  [INFERRED]
  docs/report.md → lib/markdown.ts
- `18.3 Communities (12 Detected)` --references--> `RootLayout()`  [INFERRED]
  docs/report.md → app/layout.tsx

## Import Cycles
- None detected.

## Communities (36 total, 4 thin omitted)

### Community 0 - "ReaderControls.tsx"
Cohesion: 0.08
Nodes (57): useReadingProgressContext(), useThemeContext(), Footer(), Header(), Sidebar(), ChapterMeta(), ChapterTOC(), FontSizeSelector() (+49 more)

### Community 1 - "toc.ts"
Cohesion: 0.07
Nodes (36): BackMatterSectionProps, FrontMatterSectionProps, PartSectionProps, FooterProps, HeaderProps, SidebarProps, ChapterTOCWithProgress(), ReaderSidebarProps (+28 more)

### Community 2 - "utils/markdown.ts"
Cohesion: 0.08
Nodes (32): ALIGNMENT_CLASSES, ChapterContent(), ChapterContentProps, getHeadingClass(), SectionRenderer(), ChapterTOCProps, ReaderLayoutProps, BookPart (+24 more)

### Community 3 - "chapters.ts"
Cohesion: 0.13
Nodes (17): 7.4 Book Structure Definition (`lib/constants/book.ts`), CHAPTER_ORDER, getAllSlugs(), getChapterBySlug(), getChapterIndex(), getNextChapter(), getPreviousChapter(), getAllContentSlugs() (+9 more)

### Community 4 - "package.json"
Cohesion: 0.05
Nodes (40): eslintConfig, dependencies, gray-matter, lucide-react, next, react, react-dom, react-markdown (+32 more)

### Community 5 - "types/book.ts"
Cohesion: 0.06
Nodes (41): app_globals, metadata, RootLayout(), vazirmatn, viewport, BookmarksContext, BookmarksContextType, BookmarksProvider() (+33 more)

### Community 6 - "راهنمای مدیریت محتوای کتابخانه کتاب‌ها"
Cohesion: 0.04
Nodes (45): SEO, استفاده در Markdown, استقرار (Deployment), استقرار روی Docker, استقرار روی Vercel, اضافه کردن بخش/مقدمه/پایان‌نامه جدید, اضافه کردن فصل جدید, بخش جدید (Part) (+37 more)

### Community 7 - "useBookmarks.ts"
Cohesion: 0.07
Nodes (22): 16.1 Critical Issues (Blocking), 16.2 Major Issues, 16.3 Minor Issues, 16.4 Code Quality Issues, 16. Identified Issues & Defects, 9.1 React Context Architecture (`app/providers.tsx`), 9.2 ThemeProvider, 9.3 ReadingProgressProvider (+14 more)

### Community 8 - "search.ts"
Cohesion: 0.16
Nodes (21): 10.1 Full-Text Search Engine (`lib/utils/search.ts`), 10.2 Navigation System, 10. Search & Navigation, SearchableChapter, SearchableSection, SearchIndex, SearchResult, lib_types_index_searchablechapter (+13 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Theme Design System"
Cohesion: 0.14
Nodes (13): BORDER_RADIUS, BREAKPOINTS, FONT_SIZES, generateAllCSSVariables(), generateCSSVariables(), LINE_HEIGHTS, MAX_WIDTHS, SHADOWS (+5 more)

### Community 11 - "reading-time.ts"
Cohesion: 0.21
Nodes (10): 12.1 Implemented Accessibility Features, 12.2 Persian-Specific Optimizations, 12. Accessibility & UX, calculateReadingTime(), countWords(), countWordsByLanguage(), formatReadingTime(), getChapterReadingTime() (+2 more)

### Community 12 - "چالش‌های میکروسرویس‌ها"
Cohesion: 0.05
Nodes (41): Monolith, Monolith توزیع‌شده (Distributed Monolith), Monolith تک‌فرایندی (Single-Process Monolith), Monolith ماژولار (Modular Monolith), Monolithها و تعارض در فرایند تحویل (Delivery Contention), Public Cloud و Serverless, Streaming, آیا باید از میکروسرویس‌ها استفاده کنم؟ (+33 more)

### Community 13 - "نحوه مدل‌سازی میکروسرویس‌ها"
Cohesion: 0.07
Nodes (26): Aggregate, Bounded Context, Common Coupling, Content Coupling, Domain Coupling, Event Storming, Pass-Through Coupling, آشنایی با مفاهیم ضروری Domain-Driven Design (+18 more)

### Community 14 - "کتاب‌های مرجع معماری نرم‌افزار"
Cohesion: 0.09
Nodes (21): CI/CD, DevOps و Continuous Delivery, Domain-Driven Design, Observability, Observable Systems, Service Mesh, ابزارها و پلتفرم‌ها, ارکستراسیون (+13 more)

### Community 15 - "تفکیک Monolith"
Cohesion: 0.10
Nodes (20): Monolith به‌ندرت دشمن اصلی است, ابتدا داده (Data First), ابتدا چه چیزی را تفکیک کنیم؟, ابتدا کد (Code First), ابزارها (Tooling), اجرای موازی (Parallel Run), الگوهای کاربردی تجزیه (Useful Decompositional Patterns), الگوی Strangler Fig (+12 more)

### Community 16 - "i18n.ts"
Cohesion: 0.10
Nodes (17): استفاده در کامپوننت‌ها, اضافه کردن زبان جدید, ساختار فایل ترجمه, فایل‌های ترجمه, مدیریت ترجمه‌ها, 17.1 Immediate (Sprint 1-2), 17.2 Short-term (Sprint 3-5), 17.3 Medium-term (Quarter 2) (+9 more)

### Community 17 - "page.tsx"
Cohesion: 0.13
Nodes (19): HomePage(), metadata, components_home_index_backmattersection, components_home_index_frontmattersection, components_home_index_partsection, BackMatterSection(), FrontMatterSection(), PartSection() (+11 more)

### Community 18 - "Icon.tsx"
Cohesion: 0.15
Nodes (12): ReaderControlsProps, IconButtonProps, LinkButtonProps, iconMap, IconName, IconProps, LucideIconComponent, 18.1 Graph Statistics (+4 more)

### Community 19 - "6.1 Core Domain Types (`lib/types/book.ts`)"
Cohesion: 0.20
Nodes (10): 6.1 Core Domain Types (`lib/types/book.ts`), 6.2 Type Safety Highlights, 6. Data Models & Type System, Book Structure Types, Chapter Content Types, Component Props Types, Navigation Types, Reading Experience Types (+2 more)

### Community 20 - "پس‌گفتار: گردآوری و یکپارچه‌سازی تمام مطالب"
Cohesion: 0.22
Nodes (8): lời نهایی, اصول راهبردی برای موفقیت, موضوعات کلیدی که پوشش داده شد, پس‌گفتار: گردآوری و یکپارچه‌سازی تمام مطالب, چالش‌های پیش رو, ۱. درک بنیادین (فصل‌های ۱-۴), ۲. پیاده‌سازی عملی (فصل‌های ۵-۱۳), ۳. ابعاد انسانی و سازمانی (فصل‌های ۱۴-۱۶)

### Community 21 - "Books Archive Project - Comprehensive Technical Report"
Cohesion: 0.22
Nodes (8): 11.1 Current Implementation (`lib/utils/i18n.ts`), 11.2 Integration Status, 11. Internationalization (i18n), 4.1 Complete Directory Tree, 4.2 Route Structure, 4. Project Structure & File Organization, Books Archive Project - Comprehensive Technical Report, Table of Contents

### Community 22 - "پیشگفتار"
Cohesion: 0.33
Nodes (5): برای چه کسانی نوشته شده؟, در مورد این ترجمه, ساختار کتاب, پیشگفتار, چرا این کتاب؟

### Community 23 - "13. Development Workflow & Tooling"
Cohesion: 0.33
Nodes (6): 13.1 Available Scripts (`package.json`), 13.2 TypeScript Configuration (`tsconfig.json`), 13.3 ESLint Configuration (`eslint.config.mjs`), 13.4 Tailwind CSS v4 Configuration (`app/globals.css`), 13.5 Content Development Workflow (per `docs/CONTENT_GUIDE.fa.md`), 13. Development Workflow & Tooling

### Community 24 - "14. Deployment & Production"
Cohesion: 0.40
Nodes (5): 14.1 Build Configuration (`next.config.ts`), 14.2 Deployment Options, 14.3 Environment Variables (per docs), 14.4 Performance Considerations, 14. Deployment & Production

### Community 25 - "7. Content Management System"
Cohesion: 0.40
Nodes (5): 7.1 Markdown Pipeline, 7.2 Supported Markdown Elements, 7.3 Chapter File Structure (Frontmatter), 7.5 Content Status, 7. Content Management System

### Community 26 - "15. Current Project State & Completeness"
Cohesion: 0.50
Nodes (4): 15.1 Completed Features (✅), 15.2 Partially Complete (🟡), 15.3 Not Started (❌), 15. Current Project State & Completeness

### Community 27 - "1. Project Overview"
Cohesion: 0.50
Nodes (4): 1.1 What Is This Project?, 1.2 Key Characteristics, 1.3 Project Maturity, 1. Project Overview

### Community 28 - "2. Project Purpose & Use Cases"
Cohesion: 0.50
Nodes (4): 2.1 Primary Purpose, 2.2 Target Audience, 2.3 Use Cases, 2. Project Purpose & Use Cases

### Community 29 - "3. Architecture & Technology Stack"
Cohesion: 0.50
Nodes (4): 3.1 High-Level Architecture, 3.2 Technology Stack Details, 3.3 Key Architectural Decisions, 3. Architecture & Technology Stack

### Community 30 - "Appendices"
Cohesion: 0.50
Nodes (4): Appendices, Appendix A: File Inventory Summary, Appendix B: Dependency Graph (Key), Appendix C: Environment Requirements

### Community 31 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **302 isolated node(s):** `vazirmatn`, `metadata`, `viewport`, `metadata`, `ThemeContext` (+297 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 371 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Books Archive Project - Comprehensive Technical Report` connect `Books Archive Project - Comprehensive Technical Report` to `ReaderControls.tsx`, `useBookmarks.ts`, `search.ts`, `reading-time.ts`, `i18n.ts`, `page.tsx`, `Icon.tsx`, `6.1 Core Domain Types (`lib/types/book.ts`)`, `13. Development Workflow & Tooling`, `14. Deployment & Production`, `7. Content Management System`, `15. Current Project State & Completeness`, `1. Project Overview`, `2. Project Purpose & Use Cases`, `3. Architecture & Technology Stack`, `Appendices`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `مدیریت ترجمه‌ها` connect `i18n.ts` to `راهنمای مدیریت محتوای کتابخانه کتاب‌ها`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Icon()` (e.g. with `18.2 God Nodes (Most Connected)` and `18.3 Communities (12 Detected)`) actually correct?**
  _`Icon()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 30 inferred relationships involving `18.3 Communities (12 Detected)` (e.g. with `RootLayout()` and `HomePage()`) actually correct?**
  _`18.3 Communities (12 Detected)` has 30 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `useThemeContext()` (e.g. with `18.2 God Nodes (Most Connected)` and `18.3 Communities (12 Detected)`) actually correct?**
  _`useThemeContext()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `vazirmatn`, `metadata`, `viewport` to the rest of the system?**
  _302 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ReaderControls.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07824513794663049 - nodes in this community are weakly interconnected._
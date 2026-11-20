# Graph Report - books-archive  (2026-11-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 384 nodes · 772 edges · 12 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 18,218 input · 1,128 output

## Graph Freshness
- Built from commit: `2e5058c0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Reader UI Components
- Home Page Structure
- Table of Contents
- Chapter Data Navigation
- Project Configuration
- App Layout Providers
- Chapter Content Rendering
- Custom Hooks Types
- Search System
- TypeScript Config
- Theme Design System
- Reading Time Calculation

## God Nodes (most connected - your core abstractions)
1. `Icon()` - 31 edges
2. `useThemeContext()` - 22 edges
3. `react` - 21 edges
4. `compilerOptions` - 16 edges
5. `ReaderControls()` - 15 edges
6. `ReaderLayout()` - 14 edges
7. `Button` - 13 edges
8. `IconButton` - 13 edges
9. `next` - 11 edges
10. `getChapterContent()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `CircularProgress()` --calls--> `useThemeContext()`  [EXTRACTED]
  components/ui/ReadingProgress.tsx → app/providers.tsx
- `BackMatterSectionProps` --references--> `BackMatterItem`  [EXTRACTED]
  components/home/PartSection.tsx → lib/types/book.ts
- `FrontMatterSectionProps` --references--> `FrontMatterItem`  [EXTRACTED]
  components/home/PartSection.tsx → lib/types/book.ts
- `PartSectionProps` --references--> `BookPart`  [EXTRACTED]
  components/home/PartSection.tsx → lib/types/book.ts
- `ChapterTOCProps` --references--> `ContentSection`  [EXTRACTED]
  components/reader/ChapterTOC.tsx → lib/types/book.ts

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "Reader UI Components"
Cohesion: 0.08
Nodes (49): useThemeContext(), ChapterMeta(), ChapterTOC(), FontSizeSelector(), LineHeightControl(), ReaderControls(), ReaderControlsProps, ReaderLayout() (+41 more)

### Community 1 - "Home Page Structure"
Cohesion: 0.08
Nodes (34): HomePage(), metadata, components_home_index_backmattersection, components_home_index_frontmattersection, components_home_index_partsection, BackMatterSection(), BackMatterSectionProps, FrontMatterSection() (+26 more)

### Community 2 - "Table of Contents"
Cohesion: 0.06
Nodes (30): ChapterTOCProps, ChapterTOCWithProgress(), BookPart, BookTOC, ChapterItem, DEFAULT_TOC, ExtraMatter, SectionItem (+22 more)

### Community 3 - "Chapter Data Navigation"
Cohesion: 0.08
Nodes (27): CHAPTER_ORDER, getAllSlugs(), getChapterBySlug(), getChapterIndex(), getNavigationItems(), getNextChapter(), getPreviousChapter(), getAllContentSlugs() (+19 more)

### Community 4 - "Project Configuration"
Cohesion: 0.05
Nodes (39): eslintConfig, dependencies, gray-matter, lucide-react, next, react, react-dom, react-markdown (+31 more)

### Community 5 - "App Layout Providers"
Cohesion: 0.10
Nodes (25): app_globals, metadata, RootLayout(), vazirmatn, viewport, BookmarksContext, BookmarksContextType, BookmarksProvider() (+17 more)

### Community 6 - "Chapter Content Rendering"
Cohesion: 0.11
Nodes (21): useReadingProgressContext(), ALIGNMENT_CLASSES, ChapterContent(), ChapterContentProps, getHeadingClass(), SectionRenderer(), ReaderLayoutProps, components_ui_index_iconbutton (+13 more)

### Community 7 - "Custom Hooks Types"
Cohesion: 0.09
Nodes (21): ExtendedButtonProps, APIResponse, BaseComponentProps, ButtonProps, ChapterNavigation, DeepPartial, IconProps, LinkProps (+13 more)

### Community 8 - "Search System"
Cohesion: 0.18
Nodes (18): SearchableChapter, SearchableSection, SearchIndex, SearchResult, lib_types_index_searchablechapter, lib_types_index_searchablesection, lib_types_index_searchindex, lib_types_index_searchresult (+10 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Theme Design System"
Cohesion: 0.14
Nodes (13): BORDER_RADIUS, BREAKPOINTS, FONT_SIZES, generateAllCSSVariables(), generateCSSVariables(), LINE_HEIGHTS, MAX_WIDTHS, SHADOWS (+5 more)

### Community 11 - "Reading Time Calculation"
Cohesion: 0.29
Nodes (7): calculateReadingTime(), countWords(), countWordsByLanguage(), formatReadingTime(), getChapterReadingTime(), ReadingTimeResult, toPersianDigits()

## Knowledge Gaps
- **109 isolated node(s):** `ReaderControlsProps`, `IconButtonProps`, `LinkButtonProps`, `IconName`, `IconProps` (+104 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 170 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Chapter Content Rendering` to `Reader UI Components`, `Home Page Structure`, `Table of Contents`, `Project Configuration`, `App Layout Providers`, `Custom Hooks Types`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `next` connect `Home Page Structure` to `Reader UI Components`, `Table of Contents`, `Project Configuration`, `App Layout Providers`, `Chapter Content Rendering`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `ReaderControlsProps`, `IconButtonProps`, `LinkButtonProps` to the rest of the system?**
  _109 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Reader UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07704918032786885 - nodes in this community are weakly interconnected._
- **Should `Home Page Structure` be split into smaller, more focused modules?**
  _Cohesion score 0.07878787878787878 - nodes in this community are weakly interconnected._
- **Should `Table of Contents` be split into smaller, more focused modules?**
  _Cohesion score 0.06161616161616162 - nodes in this community are weakly interconnected._
- **Should `Chapter Data Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.07973421926910298 - nodes in this community are weakly interconnected._
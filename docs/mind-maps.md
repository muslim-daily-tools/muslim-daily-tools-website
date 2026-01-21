# Mind Maps Feature

Visual learning tools using proven memorization techniques (Chunking, Semantic Grouping, Mnemonic Sentences, etc.) inspired by the [Effective Learning Strategies](https://almdrasa.com/products/courses/effective-learning-strategies) course on Almdrasa.

## Overview

- **Route**: `/mind-maps`
- **Purpose**: Display downloadable PDF mind maps for memorizing Quran, Seerah, and book summaries
- **Drip Strategy**: Uses `published: boolean` flag to gradually release content

## File Structure

```
src/
├── routes/
│   └── mind-maps.tsx          # Main page with grid + category tabs
├── components/
│   └── mindmaps/
│       ├── index.ts           # Barrel exports
│       ├── MindMapCard.tsx    # Card with Preview/Download buttons
│       └── CategoryTabs.tsx   # Category filter tabs
├── data/
│   └── mindmaps.ts            # Data + types
│   └── mindmaps.test.ts       # Data layer tests
└── lib/
    └── i18n.ts                # Translations (mindMaps namespace)

public/
└── mindmaps/
    └── *.pdf                  # PDF files (named by slug)
```

## Adding a New Mind Map

### 1. Add the PDF file

Place the PDF in `public/mindmaps/` with kebab-case naming:
```
public/mindmaps/your-map-name.pdf
```

### 2. Add data entry

Edit `src/data/mindmaps.ts`:

```typescript
{
  slug: 'your-map-name',              // Must match PDF filename (without .pdf)
  titleKey: 'mindMaps:items.yourMapName.title',
  descriptionKey: 'mindMaps:items.yourMapName.description',
  category: 'quran',                  // 'quran' | 'seerah' | 'books'
  pdfPath: '/mindmaps/your-map-name.pdf',
  published: false,                   // Set true when ready to release
},
```

### 3. Add translations

Edit `src/lib/i18n.ts` in both `en` and `ar` sections under `mindMaps.items`:

```typescript
// English (around line 371)
yourMapName: {
  title: 'Your Map Title',
  description: 'Brief description of the mind map',
},

// Arabic (around line 762)
yourMapName: {
  title: 'عنوان الخريطة',
  description: 'وصف مختصر للخريطة الذهنية',
},
```

### 4. Publish

When ready to release, set `published: true` in the data entry.

## Data Structure

```typescript
interface MindMap {
  slug: string              // URL-safe identifier, matches PDF filename
  titleKey: string          // i18n key for title
  descriptionKey: string    // i18n key for description
  category: MindMapCategory // 'quran' | 'seerah' | 'books'
  pdfPath: string           // Path to PDF in public folder
  published: boolean        // Visibility flag for drip releases
}
```

## Categories

| Key | English | Arabic | Color |
|-----|---------|--------|-------|
| `quran` | Quran | القرآن | Emerald |
| `seerah` | Seerah | السيرة | Amber |
| `books` | Books | الكتب | Blue |

## Components

### MindMapCard

Displays a card with:
- Category badge (colored)
- Title
- Description
- Two icon buttons: Preview (opens PDF in new tab) + Download (triggers download)

**Teaser cards** (unpublished): Shown with 40% opacity, "Coming Soon" badge, non-clickable.

### CategoryTabs

Filter tabs: All | Quran | Seerah | Books

Uses URL search params (`?category=quran`) for state.

## i18n Keys

All translations are in the `mindMaps` namespace:

| Key | Purpose |
|-----|---------|
| `title` | Page title |
| `subtitle` | Page description (mentions techniques) |
| `reference.text` | "Inspired by" |
| `reference.linkText` | "Effective Learning Strategies" |
| `reference.linkSuffix` | "course on Almdrasa" |
| `reference.url` | Course URL |
| `filter.all` | "All" tab label |
| `comingSoon` | Badge for unpublished maps |
| `categories.*` | Category labels |
| `actions.preview` | Preview button tooltip |
| `actions.download` | Download button tooltip |
| `items.*.title` | Individual map titles |
| `items.*.description` | Individual map descriptions |

## Testing

Run tests:
```bash
pnpm test
```

Tests verify:
- All mind maps have required fields
- Slugs are unique
- Category values are valid
- i18n keys follow correct format
- PDF paths follow correct format

## Navigation

Mind Maps is linked in the main header navigation (replaced Changelog).

Edit `src/components/Navigation.tsx` if you need to change navigation placement.

## Cloudflare Workers Configuration

PDFs are served as static assets, bypassing the Worker for optimal performance:

- `public/_routes.json` - Excludes `/mindmaps/*` from Worker processing
- `vite.config.ts` - Explicitly lists routes to prerender (excludes PDFs)
- `MindMapCard.tsx` - Uses `<button>` instead of `<a>` for preview to prevent prerender crawler from discovering PDF links

**Why this matters**: TanStack Start's prerenderer crawls `<a href>` links and attempts to SSR them. This corrupts binary files like PDFs by overwriting them with HTML output. Using `<button>` + `window.open()` prevents crawler discovery while maintaining the same UX.

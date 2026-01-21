# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server on port 3000
pnpm build            # Production build (outputs to dist/)
pnpm test             # Run Vitest tests
pnpm lint             # ESLint check (safe, no modifications)
pnpm format           # Prettier check (safe, no modifications)
pnpm lint:fix         # ESLint with auto-fix
pnpm format:fix       # Prettier with auto-fix
```

### Commands to Avoid

- **Never run `pnpm lint:fix` or `pnpm format:fix`** on the whole project - adds noise to diffs
- To verify changes compile, use `pnpm build` instead
- To fix specific files only: `pnpm exec prettier --write <file>` or `pnpm exec eslint --fix <file>`

**Add shadcn components:**
```bash
pnpm dlx shadcn@latest add <component>
```

## Deployment

- **Production**: Deploys automatically on push to `main` branch → `muslimdailytools.com`
- **Preview**: Deploys automatically on PR to `main` branch → `muslim-daily-tools-preview.mohamedabusrea.workers.dev`
- Preview deployments post a comment on PR with preview URL
- See `docs/preview-deployments.md` for details

## Best Practices

### Problem-Solving Approach

**ALWAYS research framework-native solutions and plugins BEFORE implementing workarounds:**

1. **Search first**: When encountering framework-specific issues (build, prerendering, asset handling), search for:
   - Official framework documentation and configuration options
   - Framework-specific plugins (e.g., Vite plugins, TanStack Start options)
   - Community solutions in npm/GitHub

2. **Prefer native solutions**: Framework authors provide built-in options for common problems:
   - Example: TanStack Start has `filter` option to exclude paths from prerendering
   - Example: Vite has `publicDir` for static assets that should be copied as-is

3. **Avoid premature workarounds**: Don't modify application code (components, UI) to work around build/framework issues:
   - ❌ Bad: Changing `<a>` to `<button>` to prevent link crawling
   - ✅ Good: Using framework's `filter` configuration option

4. **Document the "why"**: When using framework options, explain in comments/docs why it's needed to help future maintainers

**Lesson from Mind Maps PDF issue**: When PDFs were being corrupted by TanStack Start's prerenderer, the proper fix was using the built-in `filter` option in `vite.config.ts`, not modifying UI components to hide links from the crawler.

## Architecture

**TanStack Start + React 19** application deployed on Cloudflare Workers with SSR support.

### Stack
- **Framework**: TanStack Start (full-stack React meta-framework)
- **Routing**: TanStack Router with file-based routing (`src/routes/`)
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style, zinc base)
- **Build**: Vite 7 with Cloudflare adapter (`@cloudflare/vite-plugin`)
- **Deployment**: Cloudflare Workers (auto-deploy via GitHub Actions on push to `main`)
- **Testing**: Vitest + Testing Library

### Key Directories
- `src/routes/` - File-based routes (auto-generates `routeTree.gen.ts`)
- `src/components/` - React components (page-level and shared)
- `src/assets/` - Static images (tool logos)
- `src/lib/` - Utilities (includes shadcn `cn()` helper)
- `public/` - Static assets (favicon, manifest, robots.txt)

### Routing Pattern
Routes use TanStack Router's file-based convention:
- `__root.tsx` - Root layout with Header/Footer shell
- `index.tsx` - Home page (renders Hero component)
- Route files export `Route = createFileRoute('/path')({...})`

### Path Aliases
Use `@/*` to import from `src/*`:
```tsx
import { cn } from '@/lib/utils'
import { Hero } from '@/components/Hero'
```

### Component Conventions
- shadcn components go in `src/components/ui/`
- Icons from `react-icons` (e.g., `react-icons/fi` for Feather icons)
- Styling uses Tailwind with CSS variables for theming

### Layout Components
- `Header.tsx` - Sticky header with Apple-style glassmorphism, contains Logo + Navigation
- `Navigation.tsx` - Desktop nav + mobile hamburger menu with toggle state
- `Logo.tsx` - Site logo/branding
- `Footer.tsx` - Site footer

### Custom CSS Classes (in `src/styles.css`)
- `.glass-header` - Apple-style glassmorphism for header (saturate + blur + transparency)
- `.glass-panel` - Glass effect for dropdowns/panels (mobile menu)

Both support dark mode automatically via `.dark` variant.

### Mobile Menu Pattern
The mobile menu in `Navigation.tsx` uses:
- `useState` for open/close toggle
- Hamburger icon switches to X when open
- Menu panel uses absolute positioning relative to header
- Links call `closeMenu()` on click to dismiss

### Section Pattern
Homepage sections alternate backgrounds for visual separation:
- **Hero** - inherits `bg-background` (transparent/default)
- **About** - explicit `bg-card` (for contrast)
- **Tools** - inherits `bg-background` (transparent/default)
- **Testimonials** - inherits `bg-background` (transparent/default), includes stats row
- **Team** - inherits `bg-background` (transparent/default)

When adding new sections, alternate between `bg-card` and no background class to maintain visual rhythm.

### Dark Mode / Theming
The site supports light and dark themes with:
- **Theme Context** (`src/lib/theme.tsx`) - `ThemeProvider` wraps the app, `useTheme()` hook for access
- **Theme Toggle** (`src/components/ThemeToggle.tsx`) - Sun/Moon button in header
- **Persistence** - Theme stored in localStorage, defaults to system preference
- **Flash Prevention** - Inline script in `<head>` applies `.dark` class before paint

**Color conventions for dark mode compatibility:**
- Use `bg-background` for page background, `bg-card` for elevated surfaces
- Use `border-border` instead of hardcoded gray borders
- Use `text-foreground` and `text-muted-foreground` for text
- For semantic colors (amber badges), add dark variants: `bg-amber-100 dark:bg-amber-900/30`
- Star ratings use `fill-amber-400` (works in both modes) and `fill-muted` for empty

### Testimonials Design (Chrome Web Store Style)
Combined stats + testimonials section inspired by Chrome Web Store reviews:
- **Stats row** at top with key metrics (users, ratings, downloads, languages)
  - Stats with optional star ratings displayed inline
  - Vertical dividers between stats on desktop
- **Masonry layout** - Cards distributed across 3 columns for varying heights
- **Testimonial cards** feature:
  - Circular avatar (image or colored initials based on name)
  - Author name next to avatar
  - 5-star rating with amber fill
  - Review text in muted color
  - Subtle hover shadow and border effect
  - Staggered fade-in animation
- **Avatar generation**: Initials from name with deterministic color based on first character

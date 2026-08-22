# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server on port 3006
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
- `src/lib/` - Utilities (includes shadcn `cn()` helper, `stripe.ts` for payment links)
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

- `Header.tsx` - Sticky 64px header with blur, contains Logo + Navigation
- `Navigation.tsx` - Centered desktop nav with active-route underline, "Support" pill, animated mobile menu (`AnimatePresence`)
- `Logo.tsx` - Site logo/branding
- `Footer.tsx` - Three-column footer (brand, tools, company) + socials

### Design System

- Display font: Fraunces (`.font-display`), body: system sans, Arabic: Readex Pro (RTL overrides in `styles.css`)
- Tokens: `gold`, `gold-soft`, `ink` (both themes) on top of the shadcn palette
- `.geo-pattern` - CSS-only 8-point star backdrop for hero-type sections
- `src/components/ui/section.tsx` - `Section` wrapper with `eyebrow`, `title`, `description`, `tone` (`default|card|pattern`), `align`, `width`
- `src/components/ui/eyebrow.tsx` - small gold uppercase label

### Data Files

- `src/data/tools.ts` - tools, platforms, store stats, per-tool `accent` colour and `badgeKey` (`getToolBySlug`, `getFeaturedTools`)
- `src/data/team.ts` - team members, socials, projects, experience, talks (`getTeamMember`)
- `src/data/stats.ts` - homepage stats strip
- Copy for all of these lives in `src/lib/i18n.ts`

### Personal Pages

`/team/$slug` renders `src/components/profile/*` from `src/data/team.ts`. See `docs/personal-pages.md`.

### Custom CSS Classes (in `src/styles.css`)

Bold product direction (dark-first launch-page surfaces, all token-driven so
both themes work):

- `.glow-field` - gradient glow backdrop (hero, About quote, Donate, profile hero/contact)
- `.grid-lines` - masked hairline grid, Linear style
- `.glass-surface` - blurred card/panel: `--glass-bg` + 1px `--glass-border` + `--glass-shadow`
- `.glass-bar` - lighter blur for the header and the mobile menu panel
- `.accent-card` / `.accent-badge` / `.accent-tile` / `.accent-text` / `.accent-rule` -
  read the inline `--tool-accent` custom property for per-tool colour
- `.text-glow-gradient` - warm gradient headline text
- `.marquee` / `.marquee-track` - testimonial marquee (paused on hover, off under reduced motion)
- `.stat-number` - tabular, tight-tracked big numbers

Tokens behind them: `--glass-bg`, `--glass-border`, `--glass-shadow`,
`--hairline` (exposed as `border-hairline`), `--glow-warm`, `--glow-cool`.

### Mobile Menu Pattern

The mobile menu in `Navigation.tsx` uses:

- `useState` for open/close toggle
- Hamburger icon switches to X when open
- Menu panel uses absolute positioning relative to header
- Links call `closeMenu()` on click to dismiss

### Section Pattern

Homepage sections, top to bottom:

- **Hero** - `glow-field grid-lines`, centred headline, tool tile row, big-number strip, sticky CTA
- **About** - glass pull-quote panel next to the mission text
- **Tools** - bento grid of accent glass cards (featured tools span two columns)
- **Testimonials** - two marquee rows, opposite directions
- **Team** - accent glass cards linking to `/team/$slug`
- **Donate** - glow panel with a glass payment widget

`src/components/StickyCta.tsx` is the dismissible bottom bar; the Hero mounts it,
so it stays on the homepage only.

### Stripe Support Widget

The Donate section uses Stripe Payment Links (hardcoded in `src/lib/stripe.ts`) for $10/$50/$100 one-time and monthly tiers plus a custom amount option. No Stripe SDK or server-side code needed — links open Stripe's hosted checkout page directly.

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

### Testimonials Design (Marquee)

Store reviews scroll in two marquee rows:

- **Row split** - the list is cut in half; the top row scrolls one way, the bottom row the other
- **Duplicate copy** - each row renders its cards twice; the second copy is `aria-hidden`
- **Duration** - set per row through the `--marquee-duration` custom property
- **Pause** - hover pauses the row; `prefers-reduced-motion` stops the animation
- **Cards** - glass cards that take the accent colour of the reviewed tool
- **Avatar generation** - initials from the name with a deterministic colour

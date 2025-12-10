# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server on port 3000
pnpm build            # Production build (outputs to dist/)
pnpm test             # Run Vitest tests
pnpm lint             # ESLint check
pnpm format           # Prettier check
pnpm check            # Format + lint with auto-fix
```

**Add shadcn components:**
```bash
pnpm dlx shadcn@latest add <component>
```

## Architecture

**TanStack Start + React 19** application deployed on Netlify with SSR support.

### Stack
- **Framework**: TanStack Start (full-stack React meta-framework)
- **Routing**: TanStack Router with file-based routing (`src/routes/`)
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style, zinc base)
- **Build**: Vite 7 with Netlify adapter
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
- Icons from `lucide-react`
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
- **About** - explicit `bg-white`
- **Tools** - inherits `bg-background` (transparent/default)

When adding new sections, alternate between `bg-white` and no background class to maintain visual rhythm.

# Personal Pages

Each team member has a public profile at `/team/<slug>` (for example `/team/mohamed`). The page works as a personal site for events and job applications and prints as a one-page CV (header, footer, and decorative patterns hide in print).

## Where the content lives

| Content                                                            | File                                                     |
| ------------------------------------------------------------------ | -------------------------------------------------------- |
| Photo, socials, email, CV link, tools, projects, experience, talks | `src/data/team.ts`                                       |
| Name, short title, summary, long bio                               | `src/lib/i18n.ts` → `home.team.members.<slug>` (en + ar) |
| Role line, tagline, job titles, project blurbs, section labels     | `src/lib/i18n.ts` → `profile` namespace (en + ar)        |
| Route, SEO meta, JSON-LD Person schema                             | `src/routes/team.$slug.tsx`                              |
| Sections                                                           | `src/components/profile/*`                               |

## Add a member

1. Add the portrait to `src/assets/` and import it in `src/data/team.ts`.
2. Add the slug to `TeamSlug` and push a new `TeamMember` entry.
3. Add `home.team.members.<slug>` and `profile.<slug>` keys in both languages.
4. The Team section on the homepage links to the page, so the prerender crawler picks it up. Add the URL to `public/sitemap.xml`.

## Add experience, a talk, or a CV

- **Experience**: push to `experience` in display order. `period` is free text (`"2022 — now"`) and stays hidden when missing. Do not guess dates.
- **Talk**: push to `talks` with a `titleKey` in the `profile` namespace, an `event`, and either `youtubeId` (thumbnail comes from YouTube) or `href`. When `talks` is empty the page shows a link to the YouTube channel.
- **CV**: place the PDF in `public/cv/<slug>.pdf` and set `cvUrl: '/cv/<slug>.pdf'`. The prerender filter already skips PDFs.
- **Email**: set `email` to show the "Email me" buttons.

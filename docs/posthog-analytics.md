# PostHog Analytics Integration

Analytics tracking for mind maps downloads and previews using PostHog.

## Overview

PostHog is integrated to track user interactions with mind maps:
- **Download events**: When users download PDF mind maps
- **Preview events**: When users open PDFs in new tab
- **Page views**: Automatically tracked across the site

## Setup

### 1. Get PostHog API Key

1. Sign up at [PostHog](https://posthog.com)
2. Create a new project or use existing one
3. Go to Project Settings → API Keys
4. Copy your Project API Key

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxx
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

Or for EU region:
```bash
VITE_POSTHOG_HOST=https://eu.i.posthog.com
```

### 3. Deploy Configuration

For Cloudflare Workers deployment, add environment variables:

```bash
# Via Cloudflare Dashboard:
# Workers & Pages → Your Worker → Settings → Variables and Secrets

# Or via wrangler CLI:
wrangler secret put VITE_POSTHOG_KEY
wrangler secret put VITE_POSTHOG_HOST
```

## Tracked Events

### Mind Map Download
```typescript
{
  event: 'mind_map_download',
  properties: {
    slug: 'prophet-lineage',
    category: 'seerah',
    title: 'Prophet Muhammad Family Tree'
  }
}
```

### Mind Map Preview
```typescript
{
  event: 'mind_map_preview',
  properties: {
    slug: 'prophet-lineage',
    category: 'seerah',
    title: 'Prophet Muhammad Family Tree'
  }
}
```

## Viewing Analytics

### PostHog Dashboard

**Mind Maps Analytics Dashboard**: https://us.posthog.com/project/103960/dashboard/1099654

The dashboard includes these insights:
- **Total Mind Map Downloads** - Big number showing total downloads
- **Total Mind Map Previews** - Big number showing total previews
- **Downloads Over Time** - Line graph showing daily download trend
- **Downloads by Mind Map** - Bar chart breaking down downloads by slug
- **Downloads by Category** - Pie chart showing downloads by category

All insights automatically filter for `product: 'mind-maps'` to separate from other products like Quran Station.

### Common Queries

**Total downloads this month:**
```sql
SELECT count(*)
FROM events
WHERE event = 'mind_map_download'
  AND timestamp >= now() - interval '30 days'
```

**Most popular mind maps:**
```sql
SELECT
  properties.slug as mind_map,
  count(*) as downloads
FROM events
WHERE event = 'mind_map_download'
GROUP BY properties.slug
ORDER BY downloads DESC
LIMIT 10
```

## Privacy & GDPR

PostHog configuration:
- `person_profiles: 'identified_only'` - Only creates profiles for logged-in users
- `autocapture: false` - No automatic element tracking
- Anonymous users tracked with session ID only
- No personal data collected without explicit consent

## Free Tier Limits

PostHog free tier includes:
- ✅ 1M events/month
- ✅ 5K session recordings
- ✅ Unlimited data retention
- ✅ Unlimited team members
- ✅ No credit card required

## Troubleshooting

### Events not appearing

1. Check API key is set correctly
2. Open browser DevTools → Console
3. Look for "PostHog initialized" message
4. Check Network tab for requests to PostHog

### Local Development

PostHog is initialized in development mode but you'll see console logs.
To disable in dev:

```typescript
// In src/lib/posthog.tsx
if (!import.meta.env.DEV) {
  posthog.init(...)
}
```

## Implementation Details

### Files

- `src/lib/posthog.tsx` - PostHog provider and initialization
- `src/routes/__root.tsx` - Provider wraps entire app
- `src/components/mindmaps/MindMapCard.tsx` - Event tracking
- `.env.example` - Environment variables template

### Architecture

PostHog initializes once on client-side mount and persists throughout session.
Events are captured with `posthog.capture()` and sent asynchronously (non-blocking).

### SSR Compatibility

PostHog only initializes on client-side (`typeof window !== 'undefined'`).
No server-side tracking to avoid double-counting events.

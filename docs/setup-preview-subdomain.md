# ⚠️ Preview Subdomain Setup Required

## Quick Setup (2 minutes)

1. **Open Cloudflare Dashboard**: [dash.cloudflare.com](https://dash.cloudflare.com) → `muslimdailytools.com` → DNS
2. **Add AAAA Record**:
   - Type: `AAAA`
   - Name: `preview`
   - IPv6: `100::`
   - Proxy: ☁️ **Enabled** (orange cloud)
3. **Save** and wait 2-3 minutes
4. **Test**: Visit [preview.muslimdailytools.com](https://preview.muslimdailytools.com)

## What's Already Configured

✅ Preview worker deployed (`muslim-daily-tools-preview`)
✅ Custom domain route configured
✅ GitHub Actions workflow for automatic PR deployments
✅ PostHog analytics integrated

## Why `100::`?

Cloudflare uses `100::` as a placeholder for Workers on custom domains. When proxied (orange cloud), Cloudflare routes traffic to your worker automatically.

## Verification

```bash
# Should return HTTP/2 200
curl -I https://preview.muslimdailytools.com

# Check worker deployment
pnpm wrangler deployments list --name muslim-daily-tools-preview
```

## Troubleshooting

**DNS not resolving?**
- Verify orange cloud (Proxy) is enabled
- Wait 5 minutes for DNS propagation
- Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)

**502/504 errors?**
- Check worker deployment status in Cloudflare Dashboard
- Verify route is configured: `preview.muslimdailytools.com`
- Test workers.dev URL: `muslim-daily-tools-preview.mohamedabusrea.workers.dev`

**SSL certificate errors?**
- Cloudflare auto-provisions SSL (takes 1-2 minutes)
- Ensure domain is proxied through Cloudflare

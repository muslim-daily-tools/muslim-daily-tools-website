# Setting Up preview.muslimdailytools.com

Steps to configure the preview subdomain for PR deployments.

## What's Already Done

✅ Custom domain route added to `muslim-daily-tools-preview` worker
✅ Worker configured to respond to `preview.muslimdailytools.com/*`

## What's Needed

⏳ DNS record for `preview.muslimdailytools.com`

## Steps to Add DNS Record

### Option 1: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select the `muslimdailytools.com` domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - **Type**: `AAAA`
   - **Name**: `preview`
   - **IPv6 address**: `100::`
   - **Proxy status**: **Proxied** (orange cloud)
   - **TTL**: Auto
6. Click **Save**

### Option 2: Via Wrangler CLI

```bash
# This requires Cloudflare API token with Zone:Edit permissions
# Add as CNAME record pointing to the worker
```

## Why `100::`?

When you add a custom domain to a Cloudflare Worker via routes, Cloudflare automatically handles the routing. The IPv6 address `100::` is a placeholder that Cloudflare recognizes for Workers. When the domain is proxied (orange cloud), Cloudflare intercepts the traffic and routes it to your worker.

## Verification

After adding the DNS record:

1. Wait 1-2 minutes for DNS propagation
2. Test: `curl -I https://preview.muslimdailytools.com`
3. Should return `HTTP/2 200` with Cloudflare headers

## Update Workflow

Once DNS is working, the workflow will automatically use the custom domain in PR comments instead of the workers.dev URL.

## Troubleshooting

### DNS not resolving
- Check that record is **Proxied** (orange cloud icon)
- Wait a few minutes for global propagation
- Clear local DNS cache: `sudo dscacheutil -flushcache` (macOS)

### SSL errors
- Cloudflare automatically provisions SSL for custom domains
- May take 1-2 minutes after DNS record creation
- Ensure domain is proxied through Cloudflare

### Worker not responding
- Verify worker is deployed: `pnpm wrangler deployments list --name muslim-daily-tools-preview`
- Check triggers: Should show `preview.muslimdailytools.com/*`
- Test workers.dev URL first: `https://muslim-daily-tools-preview.mohamedabusrea.workers.dev`

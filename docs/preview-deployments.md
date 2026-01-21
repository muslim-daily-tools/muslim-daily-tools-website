# Preview Deployments

Automatic preview deployments for pull requests to test changes before merging to production.

## Overview

Every pull request to `main` branch automatically deploys a preview version to Cloudflare Workers. This allows you to:
- Test changes in a production-like environment
- Share preview links with team members or stakeholders
- Verify functionality before merging to production

## How It Works

### Automatic Deployment

1. Open a pull request to `main` branch
2. GitHub Actions automatically builds and deploys to preview environment
3. A bot comment is posted to the PR with the preview URL
4. Each push to the PR updates the preview deployment

### Preview URL

All PR previews deploy to: **https://muslim-daily-tools-preview.mohamedabusrea.workers.dev**

The same preview worker is reused for all PRs to minimize resource usage.

## Manual Deployment

You can manually trigger a preview deployment from GitHub Actions:

1. Go to **Actions** → **Deploy Preview**
2. Click **Run workflow**
3. Enter the branch name to deploy
4. Optionally enter a PR number to post the comment

## Configuration

### GitHub Secrets Required

The following secrets must be configured in GitHub repository settings:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers write permission
- `VITE_POSTHOG_KEY` - PostHog API key for analytics (optional)
- `VITE_POSTHOG_HOST` - PostHog host URL (optional, defaults to US region)

### Workflow File

`.github/workflows/deploy-preview.yml` - Handles preview deployments

Key differences from production deployment:
- Deploys to `muslim-daily-tools-preview` worker name
- Uses `--no-bundle` flag (already bundled by build step)
- Posts comment to PR with preview URL

## Preview vs Production

| Aspect | Preview | Production |
|--------|---------|-----------|
| Worker Name | `muslim-daily-tools-preview` | `muslim-daily-tools` |
| Domain | `muslim-daily-tools-preview.mohamedabusrea.workers.dev` | `muslimdailytools.com` |
| Trigger | Pull request to main | Push to main |
| Environment Variables | Same as production | Configured in Cloudflare |
| PostHog Tracking | Enabled (uses same project) | Enabled |

## Limitations

- Preview deployments share the same worker instance (one preview for all PRs)
- Custom domains not available for preview (uses workers.dev subdomain)
- Preview may take 1-2 minutes to reflect latest changes after deployment
- PostHog events from preview show same `product: 'mind-maps'` as production

## Troubleshooting

### Preview URL not working

1. Check GitHub Actions logs for deployment errors
2. Verify Cloudflare API token has Workers write permission
3. Ensure build completed successfully

### Preview not updating

- Allow 1-2 minutes for Cloudflare's global network to propagate changes
- Clear browser cache or use incognito mode
- Check GitHub Actions to confirm deployment completed

### Comment not posted to PR

- Verify workflow has `pull-requests: write` permission
- Check that PR is targeting `main` branch
- Review GitHub Actions logs for comment step errors

## Testing Checklist

When reviewing PRs with preview deployments:

- ✅ Preview loads without errors
- ✅ New features work as expected
- ✅ Existing features not broken
- ✅ Responsive design on mobile/tablet
- ✅ Dark mode works correctly
- ✅ Mind map downloads/previews tracked in PostHog
- ✅ i18n (Arabic/English) works correctly
- ✅ Performance acceptable (check DevTools)

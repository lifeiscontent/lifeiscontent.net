# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js 15 app to GitHub Pages using GitHub Actions.

## Prerequisites

- Your code is committed and pushed to the `main` branch of your GitHub repository
- Your repository is public (or you have GitHub Pro/Team for private repos with Pages)

## Setup Steps

### 1. Configure Repository Settings

1. Go to your repository on GitHub: `https://github.com/lifeiscontent/lifeiscontent.net`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. This enables GitHub Actions to deploy to Pages

### 2. Commit and Push Your Changes

Make sure all the files we just created are committed and pushed:

```bash
git add .
git commit -m "Add GitHub Pages deployment with GitHub Actions"
git push origin main
```

### 3. Trigger the Deployment

The deployment will automatically trigger when you push to the `main` branch. You can also:

1. Go to the **Actions** tab in your repository
2. Click **Run workflow** on the "Deploy to GitHub Pages" workflow
3. Click the green **Run workflow** button

### 4. Monitor the Deployment

1. Go to the **Actions** tab to see the workflow progress
2. The deployment has two jobs:
   - **Build**: Compiles your Next.js app and creates static files
   - **Deploy**: Uploads the static files to GitHub Pages

### 5. Access Your Site

Once deployed, your site will be available at:
`https://lifeiscontent.github.io/lifeiscontent.net/`

Or if you have a custom domain configured: `https://lifeiscontent.net`

## Custom Domain Setup (Optional)

If you want to use your custom domain `lifeiscontent.net`:

1. In your repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `lifeiscontent.net`
3. Check **Enforce HTTPS**
4. Create a CNAME file in your domain's DNS settings pointing to `lifeiscontent.github.io`

## Files Created

The setup created these files:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/.nojekyll` - Tells GitHub Pages not to use Jekyll
- Updated `next.config.ts` - Added static export configuration
- Updated `package.json` - Fixed export script
- Added `export const dynamic = 'force-static'` to all metadata files

## Troubleshooting

### Build Fails

- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Verify that all dynamic routes have `generateStaticParams()`

### Site Not Loading

- Check that the workflow completed successfully
- Verify GitHub Pages is enabled in repository settings
- Check for any custom domain configuration issues

### PWA Features

- Service Worker will work after deployment
- Manifest file is generated dynamically
- Icons are created at build time

## Local Testing

To test the static export locally:

```bash
pnpm run build
npx serve out
```

This will serve the static files on `http://localhost:3000`

## Deployment Timeline

- **First deployment**: ~5-10 minutes
- **Subsequent deployments**: ~3-5 minutes
- **Pages propagation**: A few minutes after deployment

## Notes

- The app is configured for static export, so server-side features are disabled
- Headers defined in `next.config.ts` won't work (they need a server)
- All images are unoptimized for static export compatibility
- PWA features including service worker and manifest work correctly

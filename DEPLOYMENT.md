# Deployment Guide

## ✅ Current Deployment Status

**Status**: Live and deployed on Vercel
**Repository**: https://github.com/kaihaan/haringeyweb
**Live URL**: Your Vercel deployment URL (e.g., `haringeyweb.vercel.app`)

---

## 🌐 Sharing with Community Members

### For Preview & Feedback

Share your Vercel URL with community members:
- The site is publicly accessible
- No login required to view
- Optimized for mobile and desktop
- HTTPS enabled by default

### Gathering Feedback

**Option 1: Simple Methods**
- Email the link and ask for feedback via email
- Share in WhatsApp/Telegram groups
- Create a Google Form for structured feedback

**Option 2: GitHub Issues** (Recommended)
- Community members can report bugs/suggestions at:
  `https://github.com/kaihaan/haringeyweb/issues`
- Click "New Issue" to report
- Great for tracking what's been addressed

**What to Ask Community Members:**
- Is the information accurate and complete?
- Is the site easy to navigate?
- Are prayer texts and event details correct?
- What features would you like to see?
- Any issues on mobile devices?
- Suggestions for improvement?

---

## 🔄 Updating the Site

### Automatic Deployments

Vercel automatically rebuilds and deploys when you push to GitHub:

```bash
# Make changes to your files
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will:
1. Detect the push to GitHub
2. Build the site (~1-2 min)
3. Deploy the new version
4. Update the live URL

### Deployment Status

Check deployment status:
- Visit your Vercel dashboard: https://vercel.com/dashboard
- See build logs and deployment history
- Get notified of successful/failed builds

---

## 📝 Content Updates

### Adding/Editing Content

Since you're using Content Collections, updating content is easy:

**Add a new prayer:**
```bash
# Create: src/content/prayers/new-prayer.md
---
title: New Prayer Title
author: "Baháʼu'lláh"
category: General
tags:
  - peace
---

Prayer text here...
```

**Add a new event:**
```bash
# Create: src/content/events/new-event.json
{
  "title": "Event Title",
  "description": "Description",
  "startDateTime": "2025-12-01T19:00:00",
  "endDateTime": "2025-12-01T20:30:00",
  "location": "Location",
  "isPublic": true
}
```

Then commit and push:
```bash
git add .
git commit -m "Add new prayer/event"
git push origin main
```

Site updates automatically in 1-2 minutes!

---

## 🎨 Custom Domain (Optional)

### Adding Your Own Domain

If you want `haringeybahai.org` instead of `haringeyweb.vercel.app`:

1. **Buy a domain** (Namecheap, Google Domains, etc.)
2. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions
3. **Update DNS records** at your domain registrar
4. **Wait for propagation** (5-60 minutes)

Vercel automatically provisions SSL certificates for custom domains.

---

## 📊 Analytics (Phase 2)

Current: No analytics installed (Phase 1 POC)

**Recommended for Phase 2:**
- **Plausible Analytics** (privacy-first, GDPR compliant)
- **Fathom Analytics** (similar to Plausible)
- Avoid Google Analytics (privacy concerns)

---

## 🚀 Next Steps

### Phase 1 Complete ✅
- [x] Fullstack POC with dummy content
- [x] All pages and components implemented
- [x] Content Collections structure
- [x] Deployed to Vercel
- [x] Available for community preview

### Phase 2: CMS Integration

When ready to move to Phase 2:

1. **Set up Directus CMS**
   - Deploy Directus on Render
   - Configure PostgreSQL database on Neon
   - Create collections matching content structure

2. **Replace Content Collections**
   - Create `src/lib/directus.ts` API client
   - Update pages to fetch from Directus
   - Keep content collections as backup

3. **Configure Webhooks**
   - Directus → Vercel rebuild webhook
   - Enables content updates without code deployment

4. **Add Features**
   - Pagefind for search
   - Multilingual support (i18n)
   - Contact form (Formspree)
   - Analytics (Plausible)

---

## 🔧 Troubleshooting

### Build Fails on Vercel

Check build logs in Vercel dashboard:
- Look for error messages
- Common issues: Missing dependencies, TypeScript errors
- Fix locally, test with `npm run build`, then push

### Site Not Updating

- Check Vercel dashboard for build status
- Verify Git push was successful: `git log origin/main`
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### Content Not Showing

- Verify content files in `src/content/` directory
- Check frontmatter format matches schema in `src/content/config.ts`
- Test locally first: `npm run dev`

---

## 📞 Support

**Developer Contact**: kaihaan@gmail.com

**Useful Links:**
- Vercel Documentation: https://vercel.com/docs
- Astro Documentation: https://docs.astro.build
- GitHub Repository: https://github.com/kaihaan/haringeyweb
- Project Brief: `/Brief/Brief.md`
- Content Structure: `/CONTENT_STRUCTURE.md`

---

## 🎯 Community Feedback Template

Share this with community members for structured feedback:

```
Haringey Baháʼí Community Website Preview

Thank you for reviewing our new website! Please provide feedback:

1. Overall Impression (1-5 stars): ___
2. Easy to Navigate? (Yes/No): ___
3. Information Accuracy: ___
4. Suggestions for Improvement: ___
5. Missing Features: ___
6. Mobile Experience: ___
7. Any Errors or Issues: ___

Please send feedback to: [your-email]
```

---

**Congratulations on launching Phase 1! 🎉**

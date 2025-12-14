# Editor Guide: Managing Content with Directus CMS

This guide is for community members who will be editing and managing content for the Haringey Baháʼí Community website.

**CMS URL**: https://haringey-directus.onrender.com
**Website URL**: https://haringeyweb.vercel.app (or your custom domain)

---

## Table of Contents

1. [Logging In](#logging-in)
2. [Managing Prayers](#managing-prayers)
3. [Publishing Content](#publishing-content)
4. [Understanding the Workflow](#understanding-the-workflow)
5. [Tips & Best Practices](#tips--best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Logging In

1. Visit: https://haringey-directus.onrender.com
2. Enter your email and password
3. Click **Sign In**

**Note**: On first visit, the site may take 30-60 seconds to wake up (free tier). This is normal.

---

## Managing Prayers

### Viewing Existing Prayers

1. Click **Content** in the left sidebar
2. Click **prayers**
3. You'll see a list of all prayers

### Adding a New Prayer

1. Go to **Content** → **prayers**
2. Click **+ Create Item** (top right)
3. Fill in the fields:

   **Author** (Required)
   - Enter the author's name
   - Example: `Baháʼu'lláh`, `ʻAbdu'l-Bahá`, `The Báb`

   **Category** (Required)
   - Select from dropdown:
     - General
     - Morning
     - Evening
     - Healing
     - Children
     - Departed
     - Unity
     - Assistance

   **Text** (Required)
   - Paste or type the full prayer text
   - You can use formatting (bold, italic, etc.)
   - Keep paragraph breaks as they appear in the original

   **Tags** (Optional)
   - Add relevant keywords
   - Example: `unity`, `peace`, `healing`, `forgiveness`
   - Press Enter after each tag

   **Language** (Required)
   - Default is `en` (English)
   - Select appropriate language if adding translations

   **Status** (Required)
   - Set to **Draft** while working
   - Set to **Published** when ready to go live

4. Click **✓** (checkmark at top right) to save

### Editing an Existing Prayer

1. Go to **Content** → **prayers**
2. Click on the prayer you want to edit
3. Make your changes
4. Click **✓** to save

### Deleting a Prayer

1. Go to **Content** → **prayers**
2. Check the box next to the prayer(s) to delete
3. Click the trash icon at the top
4. Confirm deletion

---

## Publishing Content

### Draft vs. Published

- **Draft**: Content is saved but NOT visible on the website
- **Published**: Content is live and visible to everyone

### Publishing Workflow

1. Create or edit your content
2. Set **Status** to **Draft** initially
3. Review your content carefully
4. When ready, change **Status** to **Published**
5. Click **✓** to save
6. **Wait 1-2 minutes** for the website to rebuild
7. Visit the live website to see your changes

### Automatic Website Updates

When you publish content:
1. Directus sends a signal to Vercel (the hosting service)
2. Vercel rebuilds the website (~1-2 minutes)
3. Your new content appears on the live site

**No need to do anything else!** The website updates automatically.

---

## Understanding the Workflow

### The Publishing Process

```
You edit in Directus
    ↓
Save as "Draft" (not public yet)
    ↓
Review and make changes
    ↓
Change status to "Published"
    ↓
Directus triggers website rebuild
    ↓
Website updates in 1-2 minutes
    ↓
Content is live!
```

### Who Can Do What?

**Editor** (You):
- ✅ Create new prayers
- ✅ Edit your own drafts
- ✅ Publish content
- ❌ Cannot delete published content
- ❌ Cannot change other users' content

**Reviewer** (Senior editor):
- ✅ Everything an Editor can do
- ✅ Edit anyone's content
- ✅ Delete content

**Administrator**:
- ✅ Everything
- ✅ Manage users and permissions
- ✅ Change system settings

---

## Tips & Best Practices

### Before Publishing

- ✅ **Proofread carefully** - Check spelling, grammar, and formatting
- ✅ **Verify accuracy** - Ensure prayers are correctly attributed
- ✅ **Add tags** - Helps visitors find prayers more easily
- ✅ **Use correct category** - Makes browsing easier
- ✅ **Preview before publishing** - Save as Draft first and review

### Writing Tips

**For Prayer Text:**
- Copy and paste from authoritative sources when possible
- Maintain original paragraph structure
- Don't add extra formatting unless necessary
- Keep it simple and readable

**For Tags:**
- Use lowercase
- Keep tags short and relevant
- Common tags: unity, peace, healing, children, morning, evening, guidance, forgiveness

**For Categories:**
- Choose the most appropriate category
- When in doubt, use "General"

### Performance Tips

- **Save frequently** - Click ✓ often to avoid losing work
- **Don't add too many prayers at once** - Do 5-10 at a time, then publish
- **Wait for rebuild** - Give the website 2 minutes to rebuild before checking

---

## Troubleshooting

### "Site is taking long to load"

**Problem**: Directus takes 30-60 seconds to wake up on first visit.

**Solution**: Wait patiently. This is normal for the free hosting tier. After the first load, it will be fast.

---

### "I saved changes but don't see them on the website"

**Problem**: Content is saved in Directus but not appearing on live site.

**Checklist**:
1. ✅ Is Status set to **Published**? (not Draft)
2. ✅ Did you wait 1-2 minutes for rebuild?
3. ✅ Did you hard-refresh the website? (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
4. ✅ Are you looking at the correct page? (e.g., `/devotional/prayers`)

**Solution**: Check each item above. If still not working, contact the administrator.

---

### "I can't log in"

**Problem**: Email or password not working.

**Solution**: Contact the administrator to reset your password.

---

### "I accidentally deleted something"

**Problem**: Deleted content that should not have been deleted.

**Solution**: Contact the administrator immediately. Database backups can restore deleted content.

---

### "The website isn't updating after I publish"

**Problem**: Webhook may not be working.

**Checklist**:
1. ✅ Check Vercel dashboard for recent deployments
2. ✅ Look for failed builds

**Solution**: Contact the developer. The webhook connection may need to be fixed.

---

### "I made a mistake and already published"

**Problem**: Published content with errors.

**Solution**:
1. Go back to Directus
2. Edit the content and fix the error
3. Content is still set to "Published" - just save
4. Website will automatically rebuild with corrections
5. Wait 1-2 minutes and refresh

---

## Need Help?

**Developer Contact**: kaihaan@gmail.com

**Useful Links**:
- Directus CMS: https://haringey-directus.onrender.com
- Live Website: https://haringeyweb.vercel.app
- Directus Documentation: https://docs.directus.io/

---

## Quick Reference Card

### Adding a Prayer (Quick Steps)

1. **Content** → **prayers** → **+ Create Item**
2. Fill in: **Author**, **Category**, **Text**, **Tags**
3. Status: **Published**
4. Click **✓**
5. Wait 1-2 minutes
6. Check website

### Publishing Checklist

- [ ] Content is complete and proofread
- [ ] Author is correctly attributed
- [ ] Category is selected
- [ ] Relevant tags are added
- [ ] Status is set to "Published"
- [ ] Saved with ✓ checkmark
- [ ] Waited 1-2 minutes for rebuild
- [ ] Verified on live website

---

**Last Updated**: 2025-10-25 (Phase 2 Complete)

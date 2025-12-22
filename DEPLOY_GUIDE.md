# 🚀 Easy Deployment Guide (For You, Not Cliff)

## Option 1: Netlify (RECOMMENDED - 10 Minutes Setup)

### Step 1: Sign Up & Connect
1. Go to https://netlify.com
2. Click "Sign up" (use GitHub login - easiest)
3. Click "Add new site" → "Import an existing project"
4. Choose "Deploy with GitHub"
5. Select the "Cliff" repository
6. Click "Deploy site"

**Done! Site is live in ~2 minutes**

### Step 2: Custom Domain (Optional)
1. In Netlify dashboard → "Domain settings"
2. Click "Add custom domain"
3. Enter: `filmcrewworkshop.com`
4. Netlify gives you DNS records
5. Go to Cliff's domain registrar (GoDaddy/Namecheap/etc.)
6. Add the DNS records Netlify provides
7. Wait 24 hours for DNS propagation

**Done! No more work needed.**

### Step 3: Tell Cliff
- "Your site is live at filmcrewworkshop.com"
- "Admin panel: filmcrewworkshop.com/admin.html"
- "Password: cliff2025"

---

## Option 2: Vercel (Also Great)

Same as Netlify but:
1. Go to https://vercel.com
2. "Import Project" from GitHub
3. Select "Cliff" repo
4. Deploy

Everything else is the same.

---

## Option 3: His Existing Web Host

**If he already pays for hosting:**

### Upload via FTP:
1. Get FTP credentials from his hosting provider
2. Use FileZilla (free FTP client)
3. Connect to his server
4. Upload ALL files from the Cliff folder
5. Make sure PHP backend files are in `/api/` folder
6. Point domain to this hosting

### Files to Upload:
```
/index.html
/pricing.html
/gallery.html
/admin.html
/register-*.html (all of them)
/styles.css
/checkout.js
/registration-form.js
/admin.js
/workshop-config.json
/registrations.json
/api/save-registration.php
/api/save-config.php
```

**Cons:** Every time you update code, you have to re-upload files manually.

---

## 🎯 My Recommendation:

**Use Netlify because:**
- ✅ Set it up once, never touch it again
- ✅ Updates automatically when you push to GitHub
- ✅ Free forever for this type of site
- ✅ SSL certificate included
- ✅ Backups automatic
- ✅ 99.9% uptime
- ✅ Cliff can't break anything
- ✅ You don't have to maintain it

**Literally:** You set it up in 10 minutes, push to GitHub when you make changes, and forget about it.

---

## What About Updates?

### With Netlify/Vercel:
1. You make changes locally
2. `git push`
3. Site updates automatically in 1 minute
4. **That's it**

### With Traditional Hosting:
1. You make changes locally
2. Open FTP client
3. Upload changed files
4. Wait for upload
5. Test
6. Fix if broke
7. Re-upload

**Choose wisely!** 😄

---

## Cost Comparison:

| Service | Cost | Maintenance |
|---------|------|-------------|
| **Netlify** | $0 | None |
| **Vercel** | $0 | None |
| **Traditional Hosting** | $5-15/month | Manual updates |
| **GitHub Pages + Firebase** | $0 | Complex setup |

---

## After Deployment Checklist:

- [ ] Site loads at custom domain
- [ ] Admin panel works (admin.html)
- [ ] Can log in with password
- [ ] Workshop config saves
- [ ] Registration form appears
- [ ] Registrations save and appear in admin
- [ ] Export buttons work
- [ ] Test a full registration flow

---

## If Something Breaks:

**Netlify/Vercel:**
- Check build logs in dashboard
- Usually auto-fixes itself
- Rollback to previous version with 1 click

**Traditional Hosting:**
- Check PHP error logs
- Make sure file permissions are correct (755 for folders, 644 for files)
- Make sure `registrations.json` is writable

---

## Contact Info for Cliff:

"I set up your workshop site. Here's what you need to know:

**Your Website:** filmcrewworkshop.com
**Admin Panel:** filmcrewworkshop.com/admin.html
**Password:** cliff2025

**To edit workshops:**
1. Go to admin panel
2. Log in
3. Change prices, dates, descriptions
4. Click 'Save'

**To see registrations:**
1. Go to admin panel
2. Click 'Registrations' tab
3. See everyone who signed up
4. Export attendance lists

**To update your domain:** Call your domain registrar (GoDaddy/etc) if you need to point it somewhere else.

**Questions?** Read the guides I left:
- ADMIN_GUIDE.md
- REGISTRATION_GUIDE.md
- HOSTING_SETUP.md

That's it!"

---

## You're Done! 🎉

Set up Netlify once, tell Cliff his login info, and you're both free.


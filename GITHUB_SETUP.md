# How to Host Your Website on GitHub Pages

Your files are ready! Follow these steps to get your site live:

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `film-crew-workshop` (or any name you like)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

Run these commands in your terminal (you're already in the right folder):

```bash
# Add the GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/film-crew-workshop.git

# Rename branch to main (GitHub uses 'main' by default)
git branch -M main

# Push your code
git push -u origin main
```

**Note:** You'll need to:
- Have a GitHub account (sign up at github.com if you don't)
- Install GitHub CLI or use GitHub Desktop, OR
- Use your browser to authenticate when pushing

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**

## Step 4: Your Site Will Be Live!

Your website will be available at:
**https://YOUR_USERNAME.github.io/film-crew-workshop/**

**BUT WAIT** - Since your files are in the "Site 1" folder, we need to fix the path. See below.

---

## ⚠️ Important: Fix the Folder Structure

GitHub Pages serves from the root, but your files are in "Site 1" folder. You have two options:

### Option A: Move Files to Root (Easiest)
Move `index.html` and `styles.css` from "Site 1" to the root folder, then commit and push again.

### Option B: Use a Custom Workflow
I can create a GitHub Actions workflow that will automatically copy the files to the root when you push.

---

## Quick Alternative: Use Netlify Drop (Even Easier!)

If GitHub seems complicated, just:
1. Go to https://app.netlify.com/drop
2. Drag your "Site 1" folder
3. Get instant URL to share!

Let me know which option you prefer and I'll help you set it up!


# Backend Setup Guide

This guide explains how to set up the backend API for saving workshop configuration changes from the admin panel.

## Option 1: Vercel (Recommended - Easiest)

Vercel provides free serverless functions that work perfectly for this use case.

### Setup Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy your site:**
   ```bash
   vercel
   ```

3. **The API function is already set up:**
   - File: `api/save-config.js`
   - Vercel will automatically detect and deploy it

4. **Set environment variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `ADMIN_PASSWORD` = your secure password

5. **Update admin.js:**
   - The admin panel will automatically use `/api/save-config` when deployed to Vercel

## Option 2: Netlify Functions

Netlify also provides free serverless functions.

### Setup Steps:

1. **Move the API function:**
   - Create folder: `netlify/functions/`
   - Move `api/save-config.js` to `netlify/functions/save-config.js`

2. **Update the function for Netlify:**
   ```javascript
   exports.handler = async (event, context) => {
       // Netlify function handler
       // Similar code to Vercel version
   };
   ```

3. **Deploy to Netlify:**
   - Connect your GitHub repo to Netlify
   - Netlify will auto-deploy

4. **Set environment variable:**
   - Netlify Dashboard → Site Settings → Environment Variables
   - Add: `ADMIN_PASSWORD`

## Option 3: GitHub API (For GitHub Pages)

If you're using GitHub Pages, you can use GitHub API to update the config file directly.

### Setup Steps:

1. **Create a GitHub Personal Access Token:**
   - GitHub → Settings → Developer settings → Personal access tokens
   - Create token with `repo` scope

2. **Use the GitHub API function:**
   - See `api/github-api-save.js` for implementation
   - Requires GitHub token as environment variable

3. **Deploy via GitHub Actions or external service**

## Option 4: Simple Node.js Server (For Local Development)

For local testing, you can run a simple Express server.

### Setup Steps:

1. **Install dependencies:**
   ```bash
   npm init -y
   npm install express cors
   ```

2. **Create `server.js`:**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const fs = require('fs').promises;
   const app = express();
   
   app.use(cors());
   app.use(express.json());
   
   app.post('/api/save-config', async (req, res) => {
       // Check password from Authorization header
       const auth = req.headers.authorization;
       if (auth !== 'Bearer cliff2025') {
           return res.status(401).json({ error: 'Unauthorized' });
       }
       
       try {
           await fs.writeFile('workshop-config.json', 
               JSON.stringify(req.body, null, 2));
           res.json({ success: true });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   });
   
   app.listen(3000, () => console.log('Server running on port 3000'));
   ```

3. **Run server:**
   ```bash
   node server.js
   ```

4. **Update admin.js for local:**
   - Change fetch URL to `http://localhost:3000/api/save-config`

## Security Recommendations

1. **Change the default password:**
   - Update `ADMIN_PASSWORD` in both `admin.js` and your backend
   - Use a strong, unique password

2. **Add rate limiting:**
   - Prevent brute force attacks
   - Limit requests per IP

3. **Use HTTPS:**
   - Always use HTTPS in production
   - Vercel/Netlify provide this automatically

4. **Consider adding:**
   - Two-factor authentication
   - Session management
   - IP whitelisting (optional)

## Testing

1. **Test locally first:**
   - Run local server
   - Access admin panel
   - Make changes and save
   - Verify `workshop-config.json` updates

2. **Test in production:**
   - Deploy to Vercel/Netlify
   - Test admin panel
   - Verify changes persist

## Troubleshooting

- **CORS errors:** Make sure CORS is enabled in your backend
- **401 Unauthorized:** Check that password matches in admin.js and backend
- **File not saving:** Check file permissions and path
- **GitHub Pages:** Consider using Vercel/Netlify instead for easier backend setup


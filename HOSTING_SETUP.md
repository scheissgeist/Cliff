# Setup Instructions for Your Own Hosting

## What Cliff Needs to Upload

Upload these files to his web hosting:

```
/public_html/  (or wherever his site root is)
├── index.html
├── pricing.html
├── gallery.html
├── styles.css
├── checkout.js
├── load-workshop-data.js
├── workshop-config.json
├── admin.html
├── admin.js
├── checkout-success.html
├── checkout-cancel.html
├── register-camera-operator.html
├── register-steadicam.html
├── register-gimbal.html
├── register-1st-ac.html
├── register-2nd-ac.html
└── api/
    └── save-config.php  (or .js if Node.js hosting)
```

## Setup Steps

### 1. Change Admin Password

**In `admin.js` (line 4):**
```javascript
const ADMIN_PASSWORD = 'your-secure-password-here';
```

**In `api/save-config.php` (line 19):**
```php
$ADMIN_PASSWORD = 'your-secure-password-here';
```

⚠️ **Must match!**

### 2. Update Admin Panel API URL

**In `admin.js` (around line 193):**

Change:
```javascript
const response = await fetch('/api/save-config', {
```

To:
```javascript
const response = await fetch('/api/save-config.php', {
// OR if using your domain:
const response = await fetch('https://yourdomain.com/api/save-config.php', {
```

### 3. Set File Permissions (Important!)

The `workshop-config.json` file needs to be writable by the web server:

**Via FTP/File Manager:**
- Right-click `workshop-config.json`
- Set permissions to `644` or `666`

**Via SSH:**
```bash
chmod 666 workshop-config.json
```

**Via .htaccess (if needed):**
```apache
<Files "workshop-config.json">
    Require all granted
</Files>
```

### 4. Test Admin Panel

1. Go to: `https://yourdomain.com/admin.html`
2. Login with your password
3. Make a test change
4. Click "Save All Changes"
5. Check if `workshop-config.json` updated

### 5. Secure the Admin Panel (Optional but Recommended)

**Option A: Password protect via .htaccess**

Create `.htpasswd` file:
```bash
htpasswd -c .htpasswd cliff
```

Create/edit `.htaccess` in same directory as `admin.html`:
```apache
<Files "admin.html">
    AuthType Basic
    AuthName "Admin Access"
    AuthUserFile /full/path/to/.htpasswd
    Require valid-user
</Files>
```

**Option B: Move admin to subdirectory**
```
/public_html/
├── admin/
│   ├── index.html  (rename from admin.html)
│   ├── admin.js
│   └── .htaccess   (password protect this folder)
```

## Hosting Types

### cPanel / Shared Hosting (Most Common)
- ✅ PHP works out of the box
- ✅ Use `api/save-config.php`
- Upload via FTP or File Manager

### Node.js Hosting
- Use `api/save-config.js` (already created)
- May need to set up as Express app
- Check with hosting provider

### WordPress Hosting
- Can still use PHP backend
- Upload to WordPress root or create subdomain

## Troubleshooting

### "Failed to save configuration"
- **Check file permissions** on `workshop-config.json` (should be 666 or 664)
- Check PHP error logs in cPanel
- Verify API path is correct

### "CORS error"
- Make sure `save-config.php` includes CORS headers (already in the file)
- May need to add to `.htaccess`:
```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "POST, GET, OPTIONS"
```

### "Unauthorized" error
- Check password matches in both `admin.js` and `save-config.php`
- Make sure there are no extra spaces in the password

### Admin panel loads but doesn't save
- Open browser console (F12) to see errors
- Check Network tab to see if API request is sent
- Verify API endpoint URL is correct

## Security Best Practices

1. ✅ Change default password immediately
2. ✅ Use HTTPS (get free SSL from hosting provider)
3. ✅ Password-protect admin.html with .htaccess
4. ✅ Keep admin panel URL private
5. ✅ Regular backups of workshop-config.json
6. ✅ Don't share admin password

## Testing Checklist

- [ ] Upload all files
- [ ] Change admin password in both files
- [ ] Set correct file permissions
- [ ] Test admin login
- [ ] Make test change and save
- [ ] Verify workshop-config.json updated
- [ ] Check registration page shows updated data
- [ ] Test Stripe payment link works

## Support

If Cliff has issues, common solutions:
- Most hosting providers have PHP support enabled by default
- File permissions are the #1 issue - make sure workshop-config.json is writable
- Check with hosting provider about file write permissions if issues persist


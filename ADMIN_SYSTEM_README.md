# Workshop Admin System

This system allows Cliff to easily manage workshop dates, prices, and details through a web-based admin panel.

## Features

✅ **Admin Panel** - Web interface for managing workshops  
✅ **Dynamic Updates** - Changes automatically reflect on registration pages  
✅ **Stripe Integration** - Payment links managed through admin panel  
✅ **No Database Required** - Uses simple JSON file storage  
✅ **Secure** - Password-protected admin access  

## Quick Start

### 1. Access Admin Panel

Navigate to: `https://scheissgeist.github.io/Cliff/admin.html`

**Default Password:** `cliff2025` (⚠️ **Change this immediately!**)

### 2. Edit Workshop Details

1. Login with password
2. Click on "Workshops" tab
3. Edit any workshop:
   - Dates and times
   - Prices (in cents, e.g., 45000 = $450)
   - Descriptions
   - Features list
   - Images
   - Stripe payment links
   - Active/inactive status

### 3. Save Changes

Click "Save All Changes" button. The system will:
- Save to `workshop-config.json`
- Automatically update all registration pages
- Update checkout system

## File Structure

```
├── admin.html              # Admin panel interface
├── admin.js                # Admin panel logic
├── workshop-config.json    # Workshop data (editable via admin)
├── checkout.js             # Checkout system (reads from config)
├── load-workshop-data.js   # Dynamic page updates
├── api/
│   ├── save-config.js     # Backend API for saving (Vercel/Netlify)
│   └── github-api-save.js # Alternative: GitHub API save
└── BACKEND_SETUP.md       # Backend deployment guide
```

## How It Works

1. **Admin Panel** (`admin.html`)
   - Cliff logs in with password
   - Edits workshop data in web form
   - Clicks "Save All Changes"

2. **Backend API** (`api/save-config.js`)
   - Receives updated config
   - Validates data
   - Saves to `workshop-config.json`

3. **Registration Pages**
   - Load `workshop-config.json` on page load
   - Display current dates, prices, descriptions
   - Automatically update when config changes

4. **Checkout System**
   - Reads payment links from config
   - Redirects to Stripe Payment Links
   - Validates workshop is active

## Setting Up Backend

The admin panel needs a backend to save changes. Choose one:

### Option 1: Vercel (Recommended)
- Free serverless functions
- Automatic HTTPS
- Easy deployment
- See `BACKEND_SETUP.md` for details

### Option 2: Netlify Functions
- Similar to Vercel
- Free tier available
- See `BACKEND_SETUP.md` for details

### Option 3: Manual File Upload
- Admin panel can download updated JSON
- Manually upload to GitHub
- Works but less convenient

## Security

⚠️ **Important Security Notes:**

1. **Change Default Password:**
   - Update password in `admin.js` (line 4)
   - Update password in backend environment variable

2. **Use HTTPS:**
   - Always access admin panel over HTTPS
   - Vercel/Netlify provide this automatically

3. **Consider Additional Security:**
   - IP whitelisting
   - Two-factor authentication
   - Session management

## Workshop Configuration Structure

```json
{
  "workshops": {
    "camera-operator": {
      "id": "camera-operator",
      "name": "Camera Operator Workshop",
      "date": "Saturday, November 15, 2025",
      "time": "8:30am - 5:00pm",
      "price": 45000,  // in cents
      "regularPrice": 60000,
      "discount": 25,
      "image": "https://...",
      "description": "...",
      "features": ["...", "..."],
      "stripePaymentLink": "https://buy.stripe.com/...",
      "active": true
    }
  },
  "combos": { ... },
  "settings": { ... }
}
```

## Updating Stripe Payment Links

1. Create Payment Links in Stripe Dashboard
2. Copy the payment link URLs
3. In admin panel, paste into "Stripe Payment Link" field
4. Save changes

## Troubleshooting

**Admin panel won't save:**
- Check backend is deployed and accessible
- Verify password matches in admin.js and backend
- Check browser console for errors

**Registration pages not updating:**
- Clear browser cache
- Verify `workshop-config.json` was updated
- Check browser console for errors

**Payment links not working:**
- Verify Stripe Payment Links are created
- Check links are pasted correctly in admin panel
- Ensure workshop is marked as "active"

## Support

For issues or questions:
1. Check `BACKEND_SETUP.md` for backend setup
2. Check `STRIPE_SETUP.md` for payment setup
3. Review browser console for errors


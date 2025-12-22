# 🎬 Admin Panel Quick Guide for Cliff

## Accessing the Admin Panel

1. Go to: **https://yoursite.com/admin.html**
2. Password: `cliff2025`
3. Click "Login"

---

## What You Can Edit

### ✅ For EACH Workshop, You Can Change:

1. **Date** - e.g., "Saturday, November 15, 2025"
2. **Time** - e.g., "8:30am - 5:00pm"
3. **Price** - Enter in cents (45000 = $450.00)
4. **Regular Price** - Enter in cents (60000 = $600.00)
5. **Discount Percentage** - e.g., 25 (for 25% off)
6. **Image URL** - The hero image for the workshop
7. **Description** - The main paragraph describing the workshop
8. **Features** - The bullet points (✓) that show what students learn
9. **Stripe Payment Link** - Your Stripe checkout URL
10. **Active/Inactive** - Toggle to show/hide workshop on site

---

## Current Workshops You Can Edit

1. **Camera Operator Workshop**
2. **Steadicam Operator Workshop**
3. **Gimbal Operator Workshop**
4. **1st Camera Assistant Workshop**
5. **2nd Camera Assistant Workshop**
6. **Car Mounts and Rigs Workshop**
7. **Phone Cameras Workshop**

---

## Combo Packages You Can Edit

1. **Steadicam + Gimbal Combo**
2. **Camera Op + Steadicam + Gimbal** (Full Weekend)

For combos, you can change:
- Price
- Regular Price
- Description
- Stripe Payment Link
- Active/Inactive

---

## General Settings You Can Edit

1. **Next Workshop Date** - Shows in hero section
2. **Special Offer Text** - e.g., "25% OFF ALL WORKSHOPS"
3. **Free Bonus Text** - e.g., "FREE Music Video Workshop included"
4. **Music Video Workshop Details**
   - Name
   - Date/Time
   - Price

---

## How to Make Changes

### Step 1: Login
- Go to admin.html and enter password

### Step 2: Edit
- Click the tabs at top: **Workshops** | **Combo Packages** | **Settings**
- Edit any field you want to change
- Add/Remove features using the buttons

### Step 3: Save
- Click **"Save All Changes"** button at the bottom
- You'll see a success message

### Step 4: Check Your Site
- Go to your live site and refresh
- Changes should appear immediately

---

## Important Notes

### Prices are in CENTS
- $450 = enter **45000**
- $600 = enter **60000**
- $100 = enter **10000**

### Stripe Payment Links
- Leave blank until you set up Stripe
- Get these from your Stripe Dashboard
- Format: `https://buy.stripe.com/...`

### Active/Inactive Toggle
- **Green** = Workshop shows on site
- **Gray** = Workshop hidden from site

---

## Need Help?

If the "Save All Changes" button downloads a file instead of saving:
1. Download the `workshop-config.json` file
2. Upload it to your website's root folder
3. Replace the existing `workshop-config.json` file

This happens if the backend isn't set up yet on your hosting.

---

## Examples of What You Can Change

### Change Workshop Date
```
Old: Saturday, November 15, 2025
New: Saturday, March 20, 2026
```

### Change Price
```
Old: 45000 (shows as $450)
New: 55000 (shows as $550)
```

### Change Description
```
Old: "Learn Camera Operator skills..."
New: "Master professional camera operating..."
```

### Add a Feature
Click "Add Feature" button and type:
```
"Get hands-on with Hollywood equipment"
```

---

## That's It!

You have full control over:
- ✅ All workshop dates
- ✅ All prices (regular & sale)
- ✅ All descriptions
- ✅ All features/bullet points
- ✅ Show/hide any workshop
- ✅ Stripe payment links
- ✅ Combo packages
- ✅ Site-wide settings

**No coding required!** Just type and click Save. 🎉


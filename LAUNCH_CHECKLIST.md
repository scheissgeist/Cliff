# Quick Setup Checklist for Cliff

## Before Launch - Setup Tasks

### 1. Change Admin Password (5 minutes)
**File: `admin.js` (line 4)**
```javascript
const ADMIN_PASSWORD = 'YOUR-SECURE-PASSWORD';
```

**File: `api/save-config.php` (line 19)**
```php
$ADMIN_PASSWORD = 'YOUR-SECURE-PASSWORD';
```
⚠️ Must match in both files!

### 2. Upload Files to Hosting (10 minutes)
Upload everything to your web hosting via FTP or File Manager

### 3. Set File Permissions (2 minutes)
Set `workshop-config.json` to **666** (writable)

### 4. Create Stripe Account (One time - 15 minutes)
1. Go to [stripe.com](https://stripe.com)
2. Sign up
3. Complete verification
4. Note: Takes 1-2 business days for full verification

### 5. Create Stripe Payment Links (30 minutes)
Create a Payment Link for EACH workshop:

**In Stripe Dashboard → Products → Payment Links → Create:**

| Workshop | Price | Name |
|----------|-------|------|
| Camera Operator | $450 CAD | Camera Operator Workshop |
| Steadicam | $450 CAD | Steadicam Operator Workshop |
| Gimbal | $450 CAD | Gimbal Operator Workshop |
| 1st Camera Assistant | $600 CAD | 1st Camera Assistant Workshop |
| 2nd Camera Assistant | $600 CAD | 2nd Camera Assistant Workshop |
| Steadicam + Gimbal Combo | $720 CAD | Steadicam + Gimbal Combo |
| Full Weekend | $1,205 CAD | Full Weekend Package |

**Copy each Payment Link** (looks like: `https://buy.stripe.com/abc123`)

### 6. Add Payment Links to Admin Panel (10 minutes)
1. Go to `yourdomain.com/admin.html`
2. Login with your password
3. For each workshop:
   - Find "Stripe Payment Link" field
   - Paste the link from Stripe
4. Click **Save All Changes**

### 7. Test Registration Flow (5 minutes)
1. Go to your site
2. Click a workshop
3. Click "Complete Registration"
4. Should go to Stripe payment page
5. Use Stripe test card: `4242 4242 4242 4242`
6. Verify success page appears

---

## After Launch - Regular Tasks

### Daily/Weekly: Check Registrations
1. Login to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Payments**
3. See who registered

### When Needed: Update Workshop Details
1. Go to `yourdomain.com/admin.html`
2. Login
3. Edit dates, prices, descriptions
4. Save

### Before Workshop: Get Attendee List
1. Stripe Dashboard → Payments
2. Export to CSV
3. Email attendees with details

---

## What Students See (User Flow)

1. **Visit site** → Click workshop
2. **See details** → Date, time, price, what they'll learn
3. **Click "Complete Registration"** → Goes to Stripe
4. **Pay** → Enter credit card
5. **Done** → Gets receipt email

You see payment in Stripe immediately!

---

## Cost Breakdown

**Stripe Fees:** 2.9% + $0.30 per transaction

**Examples:**
- $450 workshop → Fee: $13.35 → You receive: $436.65
- $600 workshop → Fee: $17.70 → You receive: $582.30

**No monthly fees, no setup fees**

---

## Support

**Stripe Issues:**
- [support.stripe.com](https://support.stripe.com)
- 24/7 support

**Website Admin Issues:**
- Check browser console (F12)
- Verify file permissions
- See `HOSTING_SETUP.md`

**Payment Not Working:**
- Check Stripe payment link is pasted correctly
- Make sure workshop is marked "Active" in admin
- Test the Stripe link directly

---

## Pro Tips

✅ **Keep admin password secure** - don't share it  
✅ **Test in Stripe test mode first** - use test card before going live  
✅ **Check Stripe daily** - see new registrations  
✅ **Back up workshop-config.json** - download it occasionally  
✅ **Turn off workshops when full** - toggle "Active" to OFF in admin  

---

## Ready to Launch?

- [ ] Admin password changed
- [ ] Files uploaded to hosting
- [ ] File permissions set
- [ ] Stripe account created & verified
- [ ] Payment links created in Stripe
- [ ] Payment links added to admin panel
- [ ] Test registration completed successfully
- [ ] Real registration tested

🚀 **You're live!**


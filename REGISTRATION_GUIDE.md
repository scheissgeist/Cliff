# 📋 Registration Management Guide for Cliff

## Overview

You now have a **complete registration tracking system**! When students sign up for workshops, you'll see all their information in one place and can manage everything easily.

---

## How It Works

### For Students:
1. Student clicks "COMPLETE REGISTRATION" on any workshop page
2. A form appears asking for their details:
   - Name
   - Email
   - Phone
   - Experience level (optional)
   - Notes/questions (optional)
3. After filling the form, they click "Continue to Payment"
4. They're taken to your Stripe/PayPal checkout
5. **Their registration is saved immediately** (even if they don't complete payment)

### For You (Cliff):
1. Log into admin panel: **admin.html**
2. Click the **"Registrations"** tab
3. See everyone who signed up!

---

## Viewing Registrations

### What You'll See:

For each registration:
- ✅ **Customer Name**
- ✅ **Email & Phone**
- ✅ **Workshop they registered for**
- ✅ **Workshop date**
- ✅ **Price**
- ✅ **Payment Status** (Paid or Pending)
- ✅ **Registration Date & Time**
- ✅ **Experience Level** (if they provided it)
- ✅ **Any notes/questions** they added
- ✅ **Attendance status** (Did they show up?)

---

## Managing Registrations

### Filter by Workshop
At the top of the page:
- Select "All Workshops" to see everyone
- Or select a specific workshop (e.g., "Camera Operator Workshop")
- Instantly see only those registrations

### Mark as Paid
- If someone pays you directly (cash, e-transfer, etc.)
- Click **"Mark as Paid"** button
- Status changes from PENDING (orange) to PAID (green)

### Track Attendance
- On workshop day, mark who shows up
- Click **"Mark Attended"** button
- Button turns red with a checkmark when they've attended

### Delete Registration
- If someone cancels or is a duplicate
- Click **"Delete"** button
- Confirm, and it's removed

---

## Export Features

### 1. Attendance List (Text File)
**Perfect for workshop day!**

Click **"Export Attendance List"**
- Creates a printable text file
- Shows only PAID registrations
- Grouped by workshop
- Includes checkboxes to mark who attended
- Has customer name, email, phone

**Example output:**
```
=== WORKSHOP ATTENDANCE LIST ===

--- CAMERA OPERATOR WORKSHOP ---
Date: Saturday, November 15, 2025
Total Attendees: 12

1. John Doe
   Email: john@example.com
   Phone: (604) 555-1234
   Experience: Beginner
   Attended: NO

2. Jane Smith
   Email: jane@example.com
   Phone: (604) 555-5678
   Experience: Some Experience
   Attended: NO
...
```

### 2. Export All Data (CSV File)
**For your records & bookkeeping!**

Click **"Export All Data (CSV)"**
- Creates a spreadsheet file
- Opens in Excel or Google Sheets
- Includes ALL registrations (paid and pending)
- Has all fields: name, email, phone, workshop, price, payment status, etc.

**Use this for:**
- Accounting/bookkeeping
- Email marketing lists
- Analyzing which workshops are most popular
- Following up with people who didn't complete payment

---

## Common Scenarios

### Scenario 1: Workshop Day is Tomorrow
1. Go to Registrations tab
2. Filter by the workshop happening tomorrow
3. Click **"Export Attendance List"**
4. Print it out
5. Check off names as people arrive

### Scenario 2: Someone Paid by E-Transfer
1. Go to Registrations tab
2. Find their name
3. Click **"Mark as Paid"**
4. Status changes to green PAID

### Scenario 3: Need to Email All Attendees
1. Go to Registrations tab
2. Filter by workshop
3. Click **"Export All Data (CSV)"**
4. Open in Excel/Sheets
5. Copy all email addresses
6. Paste into your email's BCC field

### Scenario 4: See Who Actually Showed Up
1. After the workshop
2. Go to Registrations tab
3. For each person who attended, click **"Mark Attended"**
4. Later you can see attendance rates

### Scenario 5: Someone Wants to Cancel
1. Find their registration
2. Click **"Delete"**
3. Refund them separately (via Stripe or however they paid)

---

## Tips & Best Practices

### Daily Routine:
- Check registrations every morning
- Mark payments as they come in
- Respond to any notes/questions people left

### Before Workshop Day:
- Export attendance list 1-2 days before
- Print it out or have on your phone
- Send reminder email to all attendees

### After Workshop Day:
- Mark everyone who attended
- Follow up with no-shows (maybe they want to reschedule)
- Export CSV for your records

### For Accounting:
- Export CSV at end of each month
- Shows all revenue and payment statuses
- Easy to import into QuickBooks or accounting software

---

## Important Notes

### Payment Status:
- **PENDING (Orange)** = They filled out the form but haven't paid yet
  - Follow up with them!
  - Maybe they had issues with checkout
  - Maybe they're deciding
  
- **PAID (Green)** = Payment received
  - Either through Stripe/PayPal automatically
  - Or you manually marked it as paid

### Automatic vs Manual:
- When someone pays through Stripe: Status is "pending" until you mark it
- **Future enhancement:** We can make Stripe automatically mark as "paid" (needs webhook setup)
- For now: Check your Stripe dashboard and manually mark as paid in admin panel

### Data Storage:
- All registrations save to `registrations.json` file on your server
- Backs up automatically
- You can also download CSV files as additional backup

---

## Troubleshooting

### "No registrations found"
- Click **"Refresh List"** button
- Make sure someone has actually registered
- Check that backend API is working

### Registration not showing up
- Check if it saved to localStorage (fallback)
- Make sure backend PHP file is working on your server
- Contact developer if persists

### Can't export
- Make sure your browser allows downloads
- Try different browser
- Right-click export button → "Save Link As"

---

## Quick Reference

| **What You Want** | **What To Do** |
|-------------------|----------------|
| See all signups | Go to Registrations tab |
| See specific workshop | Use filter dropdown |
| Print attendance list | Export Attendance List button |
| Get spreadsheet of all data | Export All Data (CSV) button |
| Mark someone as paid | Click "Mark as Paid" |
| Track who showed up | Click "Mark Attended" |
| Remove a registration | Click "Delete" |

---

## That's It!

You now have **complete control** over your workshop registrations. No more spreadsheets, no more confusion. Everything is in one place! 🎉

**Need help?** Contact your developer or check the main admin guide.


# How to Manage Workshop Registrations - For Cliff

## The Simple System

Your workshops use **Stripe Payment Links**. This is the easiest way to:
- ✅ Accept payments (2.9% + $0.30 per transaction - lowest fees)
- ✅ See who registered
- ✅ Send automatic receipts
- ✅ No shopping cart needed
- ✅ No inventory to manage

## Part 1: Setting Up Stripe Payment Links (One Time)

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for free account
3. Complete verification (takes 1-2 days)

### Step 2: Create Payment Link for Each Workshop

For each workshop, create a Payment Link:

**Example: Camera Operator Workshop**

1. Login to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Products** → **Payment Links**
3. Click **+ New**
4. Fill in:
   - **Product name**: Camera Operator Workshop
   - **Price**: $450 CAD
   - **Description**: Saturday, November 15, 2025 • 8:30am - 5:00pm
5. Click **Create link**
6. **Copy the link** (looks like: `https://buy.stripe.com/abc123xyz`)

**Repeat for all workshops:**
- Camera Operator → $450
- Steadicam Operator → $450
- Gimbal Operator → $450
- 1st Camera Assistant → $600
- 2nd Camera Assistant → $600
- Combo packages (if desired)

### Step 3: Add Payment Links to Your Site

1. Go to your site: `yourdomain.com/admin.html`
2. Login with your admin password
3. For each workshop:
   - Find the "Stripe Payment Link" field
   - **Paste the link** from Stripe
4. Click **Save All Changes**

**Done!** Now when someone clicks "COMPLETE REGISTRATION", they go straight to Stripe to pay.

---

## Part 2: Managing Workshops (Anytime)

### Change Dates, Prices, or Details

1. Go to `yourdomain.com/admin.html`
2. Login
3. Edit any workshop:
   - Update dates: "Saturday, December 15, 2025"
   - Change prices: 45000 (in cents = $450)
   - Edit descriptions
   - Update what they'll learn
4. Click **Save All Changes**

**The registration pages automatically update!** No need to edit code.

---

## Part 3: Seeing Who Registered

### View Registrations in Stripe

1. Login to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Payments** in left menu
3. See all registrations:
   - Who paid
   - Email address
   - Which workshop
   - Amount paid
   - Date/time

### Download Registration List

1. In Stripe Dashboard → **Payments**
2. Click **Export** (top right)
3. Choose date range
4. Download as CSV/Excel
5. Open in Excel/Google Sheets

### Send Emails to Registrants

**Option A: Manual from Stripe**
- Copy emails from Stripe
- Send group email with workshop details

**Option B: Automatic (Stripe Checkout)**
- Stripe automatically sends payment receipts
- You can customize the receipt message
- Add workshop location/details in receipt

**Option C: Email Service (Advanced)**
- Use Mailchimp, ConvertKit, etc.
- Integrate with Stripe
- Auto-send welcome emails with workshop info

---

## Part 4: Day-to-Day Operations

### Someone Wants to Register

**They do it themselves:**
1. They visit your site
2. Click on a workshop
3. See details and price
4. Click "COMPLETE REGISTRATION"
5. Pay with Stripe
6. Get confirmation email
7. **You get notified** (Stripe emails you when payment received)

### Checking Registrations

**Quick check:**
- Open Stripe app on phone
- See today's payments

**Detailed report:**
- Login to Stripe Dashboard
- View all payments
- Export for records

### Before Workshop Day

1. Go to Stripe → **Payments**
2. Filter by workshop date
3. See everyone registered
4. Export list
5. Send reminder emails (manual or via email service)

---

## Part 5: Common Tasks

### Change Workshop Date
1. Admin panel → Edit date field
2. Save changes
3. Site updates automatically

### Change Price
1. Admin panel → Edit price (in cents)
2. Save changes
3. **ALSO update Stripe Payment Link:**
   - Create new Payment Link with new price
   - Copy new link
   - Paste in admin panel
   - Save

### Cancel/Refund Registration
1. Stripe Dashboard → **Payments**
2. Find the payment
3. Click **⋯ More** → **Refund**
4. Choose full or partial refund
5. Stripe processes automatically

### Temporarily Disable a Workshop
1. Admin panel → Find workshop
2. Toggle "Active" switch to OFF
3. Save
4. Registration button won't work until you turn it back on

---

## Part 6: Financial Tracking

### See Your Money

**Stripe Dashboard:**
- **Balance** → See available funds
- **Payouts** → See when money hits your bank
- Typically 2-7 days after payment

### Reports for Accounting

**Monthly/Yearly Reports:**
1. Stripe Dashboard → **Reports**
2. Choose date range
3. Download detailed transaction report
4. Give to accountant for taxes

**Track by Workshop:**
- Use Stripe's product reports
- See revenue per workshop type
- Track which workshops are most popular

---

## Part 7: Customer Communication

### After Someone Registers

**Automatic (via Stripe):**
- Customer gets payment receipt
- Includes workshop name and amount

**Manual Email:**
- Copy email from Stripe
- Send workshop details:
  - Exact location/address
  - What to bring
  - Parking info
  - Schedule

### Set Up Auto-Emails (Optional)

**In Stripe Settings:**
1. Settings → **Customer emails**
2. Customize receipt email
3. Add message like:
   ```
   Thank you for registering!
   
   Workshop Details:
   Date: November 15-16, 2025
   Location: [Address]
   Time: 8:30am - 5:00pm
   
   What to Bring:
   - Camera (if you have one)
   - Notebook
   - Comfortable shoes
   
   We'll send a reminder 1 week before.
   
   Questions? Reply to this email.
   ```

---

## Part 8: Troubleshooting

### "Payment link not working"
- Check link is pasted correctly in admin panel
- Verify workshop is marked "Active"
- Test the Stripe link directly

### "How do I know if someone registered?"
- Stripe emails you for each payment
- Check Stripe Dashboard anytime
- Enable mobile notifications in Stripe app

### "Need to change workshop after people registered"
- Update details in admin panel (site updates)
- Email registrants about changes
- Get emails from Stripe payment list

---

## Quick Reference

### Admin Panel
`yourdomain.com/admin.html`
- Change dates, prices, details
- Add Stripe payment links
- Toggle workshops on/off

### Stripe Dashboard
[dashboard.stripe.com](https://dashboard.stripe.com)
- View registrations
- Process refunds
- Download reports
- See revenue

### Where Your Money Goes
Stripe → Your Bank Account (2-7 days)

### Fees
2.9% + $0.30 per transaction
(Example: $450 workshop = $13.35 fee, you get $436.65)

---

## Need Help?

**Stripe Support:**
- [support.stripe.com](https://support.stripe.com)
- 24/7 email/chat support
- Excellent documentation

**Site Admin Issues:**
- Check `HOSTING_SETUP.md`
- Browser console (F12) shows errors
- Verify file permissions on hosting

**Payment Issues:**
- Always check Stripe Dashboard first
- Stripe shows exactly what happened
- Test mode available for practice


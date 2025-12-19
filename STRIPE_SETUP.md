# Stripe Checkout Setup Guide

This guide will help you set up Stripe Payment Links for your workshop registration system. Stripe Payment Links are the simplest solution - they require no backend code and have the lowest fees (2.9% + $0.30 per transaction).

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com) and create an account
2. Complete the account setup and verification process
3. Once verified, you'll have access to your Stripe Dashboard

## Step 2: Create Payment Links for Each Workshop

1. Log into your Stripe Dashboard
2. Go to **Products** → **Payment Links**
3. Click **"Create payment link"**

For each workshop, create a payment link with these details:

### Camera Operator Workshop
- **Name**: Camera Operator Workshop
- **Price**: $450.00 CAD (or your currency)
- **Description**: "Saturday, November 15, 2025 • 8:30am - 5:00pm"
- Copy the payment link URL

### Steadicam Operator Workshop
- **Name**: Steadicam Operator Workshop
- **Price**: $450.00 CAD
- **Description**: "Sunday, November 16, 2025 • 9:00am - 5:00pm"
- Copy the payment link URL

### Gimbal Operator Workshop
- **Name**: Gimbal Operator Workshop
- **Price**: $450.00 CAD
- **Description**: "Sunday, November 16, 2025 • 9:00am - 5:00pm"
- Copy the payment link URL

### 1st Camera Assistant Workshop
- **Name**: 1st Camera Assistant Workshop
- **Price**: $600.00 CAD
- **Description**: "Saturday & Sunday, November 15-16, 2025 • Full Weekend"
- Copy the payment link URL

### 2nd Camera Assistant Workshop
- **Name**: 2nd Camera Assistant Workshop
- **Price**: $600.00 CAD
- **Description**: "Saturday & Sunday, November 15-16, 2025 • Full Weekend"
- Copy the payment link URL

### Combo Packages (Optional)
- **Steadicam + Gimbal Combo**: $720.00 CAD
- **Full Weekend Package**: $1,205.00 CAD

## Step 3: Update checkout.js

1. Open `checkout.js` in your project
2. Replace the placeholder payment links with your actual Stripe Payment Link URLs:

```javascript
const paymentLinks = {
    'camera-operator': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'steadicam': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'gimbal': 'https://buy.stripe.com/YOUR_LINK_HERE',
    '1st-ac': 'https://buy.stripe.com/YOUR_LINK_HERE',
    '2nd-ac': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'steadicam-gimbal-combo': 'https://buy.stripe.com/YOUR_LINK_HERE',
    'full-weekend': 'https://buy.stripe.com/YOUR_LINK_HERE'
};
```

## Step 4: Configure Success/Cancel URLs (Optional)

In your Stripe Payment Link settings, you can configure:
- **Success URL**: `https://scheissgeist.github.io/Cliff/checkout-success.html`
- **Cancel URL**: `https://scheissgeist.github.io/Cliff/checkout-cancel.html`

This will redirect customers back to your site after payment.

## Step 5: Test Your Setup

1. Use Stripe's test mode to test payments
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date and any CVC
4. Once everything works, switch to live mode

## Alternative: Stripe Checkout Sessions (Advanced)

If you want more control (custom checkout pages, automatic email receipts, etc.), you can use Stripe Checkout Sessions instead. This requires:

1. A backend server (Node.js, Python, etc.)
2. Create an API endpoint that creates checkout sessions
3. Update `checkout.js` to use `createCheckoutSession()` instead of `redirectToPaymentLink()`

See Stripe's documentation: https://stripe.com/docs/payments/checkout

## Fees

- **Stripe Payment Links**: 2.9% + $0.30 per transaction (lowest fees)
- No monthly fees
- No setup fees
- Funds typically arrive in your bank account within 2-7 business days

## Support

For Stripe support, visit: https://support.stripe.com


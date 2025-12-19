// Stripe Checkout Integration
// This file handles the checkout process for workshops
// Loads workshop data from workshop-config.json

let workshopConfig = null;

// Load workshop configuration
async function loadWorkshopConfig() {
    if (!workshopConfig) {
        try {
            const response = await fetch('workshop-config.json');
            workshopConfig = await response.json();
        } catch (error) {
            console.error('Error loading workshop config:', error);
        }
    }
    return workshopConfig;
}

// Get workshop data
async function getWorkshop(workshopId) {
    const config = await loadWorkshopConfig();
    if (config.workshops[workshopId]) {
        return config.workshops[workshopId];
    } else if (config.combos[workshopId]) {
        return config.combos[workshopId];
    }
    return null;
}

// Function to create checkout session (requires backend)
async function createCheckoutSession(workshopId) {
    const workshop = await getWorkshop(workshopId);
    if (!workshop) {
        console.error('Invalid workshop ID');
        return;
    }

    if (!workshop.active) {
        alert('This workshop is currently not available for registration.');
        return;
    }

    try {
        // Call your backend to create checkout session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                workshopId: workshopId,
                workshopName: workshop.name,
                price: workshop.price,
                successUrl: `${window.location.origin}/checkout-success.html?workshop=${workshopId}`,
                cancelUrl: `${window.location.origin}/checkout-cancel.html`
            })
        });

        const session = await response.json();
        
        // Initialize Stripe (replace with your publishable key)
        const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
        alert('An error occurred. Please try again.');
    }
}

// Direct checkout using Stripe Payment Links (no backend needed)
// This reads payment links from the workshop config
async function redirectToPaymentLink(workshopId) {
    const workshop = await getWorkshop(workshopId);
    
    if (!workshop) {
        alert('Workshop not found. Please contact support.');
        return;
    }
    
    if (!workshop.active) {
        alert('This workshop is currently not available for registration.');
        return;
    }
    
    if (workshop.stripePaymentLink && workshop.stripePaymentLink.trim() !== '') {
        window.location.href = workshop.stripePaymentLink;
    } else {
        // Show helpful message when payment link not set up yet
        alert('Registration is not yet available for this workshop.\n\nThe workshop organizer needs to configure the payment system.\n\nPlease check back soon or contact us for more information.');
        console.error('Stripe payment link not configured for workshop:', workshopId);
    }
}

// Export for use in HTML
window.createCheckoutSession = createCheckoutSession;
window.redirectToPaymentLink = redirectToPaymentLink;


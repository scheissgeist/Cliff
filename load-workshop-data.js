// Load and display workshop data dynamically from workshop-config.json
// This allows the registration pages to automatically update when config changes

let workshopConfig = null;

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

async function loadWorkshopData(workshopId) {
    const config = await loadWorkshopConfig();
    if (!config) return null;
    
    const workshop = config.workshops[workshopId];
    if (!workshop) return null;
    
    return workshop;
}

// Update registration page with workshop data
async function updateRegistrationPage(workshopId) {
    const workshop = await loadWorkshopData(workshopId);
    if (!workshop || !workshop.active) {
        // Workshop not found or inactive
        return;
    }
    
    // Update page title
    if (document.title.includes('Register')) {
        document.title = `Register - ${workshop.name}`;
    }
    
    // Update hero background image
    const heroBg = document.querySelector('.hero-background');
    if (heroBg && workshop.image) {
        heroBg.style.backgroundImage = `url('${workshop.image}')`;
    }
    
    // Update workshop name
    const nameEl = document.querySelector('h1');
    if (nameEl) {
        nameEl.textContent = workshop.name.toUpperCase();
    }
    
    // Update date and time
    const dateEl = document.querySelector('p[style*="color: #dc2626"]');
    if (dateEl) {
        dateEl.textContent = `${workshop.date} • ${workshop.time}`;
    }
    
    // Update price
    const priceEl = document.querySelector('span[style*="font-size: 2rem"]');
    if (priceEl) {
        const priceInDollars = (workshop.price / 100).toFixed(0);
        priceEl.textContent = `$${priceInDollars}`;
    }
    
    // Update regular price
    const regularPriceEl = document.querySelector('div[style*="color: #999"]');
    if (regularPriceEl && workshop.regularPrice) {
        const regularPriceInDollars = (workshop.regularPrice / 100).toFixed(0);
        regularPriceEl.textContent = `Regular Price: $${regularPriceInDollars} • Save ${workshop.discount}%`;
    }
    
    // Update description
    const descriptionEl = document.querySelector('textarea, p[style*="margin-bottom: 2rem"]');
    if (descriptionEl && workshop.description) {
        descriptionEl.textContent = workshop.description;
    }
    
    // Update features list
    const featuresList = document.querySelector('ul[style*="list-style: none"]');
    if (featuresList && workshop.features) {
        featuresList.innerHTML = workshop.features.map(feature => `
            <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #dc2626;">✓</span>
                ${feature}
            </li>
        `).join('');
    }
}

// Get workshop ID from page (based on URL or data attribute)
function getWorkshopIdFromPage() {
    // Try to get from URL
    const path = window.location.pathname;
    const match = path.match(/register-([^.]+)\.html/);
    if (match) {
        return match[1];
    }
    
    // Try to get from data attribute
    const dataAttr = document.querySelector('[data-workshop-id]');
    if (dataAttr) {
        return dataAttr.getAttribute('data-workshop-id');
    }
    
    return null;
}

// Auto-update page on load
document.addEventListener('DOMContentLoaded', async () => {
    const workshopId = getWorkshopIdFromPage();
    if (workshopId) {
        await updateRegistrationPage(workshopId);
    }
});

// Export for manual use
window.loadWorkshopData = loadWorkshopData;
window.updateRegistrationPage = updateRegistrationPage;


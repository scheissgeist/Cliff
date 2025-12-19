// Admin Panel JavaScript
// Simple password-based authentication (for production, use proper auth)

const ADMIN_PASSWORD = 'cliff2025'; // Change this to a secure password
let workshopConfig = null;
let currentTab = 'workshops';

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('adminPanel').classList.add('active');
        loadConfig();
    }
}

// Login function
function login() {
    const password = document.getElementById('adminPassword').value;
    const messageEl = document.getElementById('authMessage');
    
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('adminPanel').classList.add('active');
        loadConfig();
        messageEl.className = 'status-message';
    } else {
        messageEl.className = 'status-message error';
        messageEl.textContent = 'Incorrect password';
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('adminPassword').value = '';
}

// Load workshop configuration
async function loadConfig() {
    try {
        const response = await fetch('workshop-config.json');
        workshopConfig = await response.json();
        renderWorkshops();
        renderCombos();
        renderSettings();
    } catch (error) {
        console.error('Error loading config:', error);
        showMessage('Error loading configuration', 'error');
    }
}

// Render workshops
function renderWorkshops() {
    const container = document.getElementById('workshopsList');
    container.innerHTML = '';
    
    Object.values(workshopConfig.workshops).forEach(workshop => {
        const card = createWorkshopCard(workshop);
        container.appendChild(card);
    });
}

// Render combos
function renderCombos() {
    const container = document.getElementById('combosList');
    container.innerHTML = '';
    
    Object.values(workshopConfig.combos).forEach(combo => {
        const card = createComboCard(combo);
        container.appendChild(card);
    });
}

// Render settings
function renderSettings() {
    const settings = workshopConfig.settings;
    document.getElementById('nextWorkshopDate').value = settings.nextWorkshopDate || '';
    document.getElementById('specialOffer').value = settings.specialOffer || '';
    document.getElementById('freeBonus').value = settings.freeBonus || '';
    
    if (settings.musicVideoWorkshop) {
        document.getElementById('musicVideoName').value = settings.musicVideoWorkshop.name || '';
        document.getElementById('musicVideoDate').value = settings.musicVideoWorkshop.date || '';
        document.getElementById('musicVideoPrice').value = settings.musicVideoWorkshop.price || '';
    }
}

// Create workshop card
function createWorkshopCard(workshop) {
    const card = document.createElement('div');
    card.className = 'workshop-card';
    card.innerHTML = `
        <h2>${workshop.name}</h2>
        
        <div class="form-row">
            <div>
                <label>Workshop Date:</label>
                <input type="text" id="${workshop.id}-date" value="${workshop.date || ''}" placeholder="Saturday, November 15, 2025">
            </div>
            <div>
                <label>Time:</label>
                <input type="text" id="${workshop.id}-time" value="${workshop.time || ''}" placeholder="8:30am - 5:00pm">
            </div>
        </div>
        
        <div class="form-row">
            <div>
                <label>Price (in cents, e.g., 45000 = $450):</label>
                <input type="number" id="${workshop.id}-price" value="${workshop.price || ''}">
            </div>
            <div>
                <label>Regular Price (in cents):</label>
                <input type="number" id="${workshop.id}-regularPrice" value="${workshop.regularPrice || ''}">
            </div>
        </div>
        
        <div class="form-row">
            <div>
                <label>Discount Percentage:</label>
                <input type="number" id="${workshop.id}-discount" value="${workshop.discount || ''}">
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" id="${workshop.id}-image" value="${workshop.image || ''}">
            </div>
        </div>
        
        <label>Description:</label>
        <textarea id="${workshop.id}-description" rows="3">${workshop.description || ''}</textarea>
        
        <label>Stripe Payment Link:</label>
        <input type="text" id="${workshop.id}-stripeLink" value="${workshop.stripePaymentLink || ''}" placeholder="https://buy.stripe.com/...">
        
        <label>Features:</label>
        <div class="features-list" id="${workshop.id}-features">
            ${(workshop.features || []).map((feature, index) => `
                <div class="feature-item">
                    <input type="text" value="${feature}" data-index="${index}">
                    <button onclick="removeFeature('${workshop.id}', ${index})" class="add-feature-btn">Remove</button>
                </div>
            `).join('')}
        </div>
        <button onclick="addFeature('${workshop.id}')" class="add-feature-btn">Add Feature</button>
        
        <div class="toggle-active" style="margin-top: 1rem;">
            <label>Active:</label>
            <div class="toggle-switch ${workshop.active ? 'active' : ''}" onclick="toggleActive('${workshop.id}')"></div>
        </div>
    `;
    return card;
}

// Create combo card
function createComboCard(combo) {
    const card = document.createElement('div');
    card.className = 'workshop-card';
    card.innerHTML = `
        <h2>${combo.name}</h2>
        
        <div class="form-row">
            <div>
                <label>Price (in cents):</label>
                <input type="number" id="${combo.id}-price" value="${combo.price || ''}">
            </div>
            <div>
                <label>Regular Price (in cents):</label>
                <input type="number" id="${combo.id}-regularPrice" value="${combo.regularPrice || ''}">
            </div>
        </div>
        
        <label>Description:</label>
        <textarea id="${combo.id}-description" rows="2">${combo.description || ''}</textarea>
        
        <label>Stripe Payment Link:</label>
        <input type="text" id="${combo.id}-stripeLink" value="${combo.stripePaymentLink || ''}" placeholder="https://buy.stripe.com/...">
        
        <div class="toggle-active" style="margin-top: 1rem;">
            <label>Active:</label>
            <div class="toggle-switch ${combo.active ? 'active' : ''}" onclick="toggleComboActive('${combo.id}')"></div>
        </div>
    `;
    return card;
}

// Add feature
function addFeature(workshopId) {
    const featuresList = document.getElementById(`${workshopId}-features`);
    const index = featuresList.children.length;
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';
    featureItem.innerHTML = `
        <input type="text" value="" data-index="${index}">
        <button onclick="removeFeature('${workshopId}', ${index})" class="add-feature-btn">Remove</button>
    `;
    featuresList.appendChild(featureItem);
}

// Remove feature
function removeFeature(workshopId, index) {
    const featuresList = document.getElementById(`${workshopId}-features`);
    const items = Array.from(featuresList.children);
    items[index].remove();
    // Re-index remaining items
    Array.from(featuresList.children).forEach((item, i) => {
        item.querySelector('input').dataset.index = i;
    });
}

// Toggle active status
function toggleActive(workshopId) {
    const toggle = document.querySelector(`#${workshopConfig.workshops[workshopId].id}-date`).closest('.workshop-card').querySelector('.toggle-switch');
    toggle.classList.toggle('active');
}

function toggleComboActive(comboId) {
    const toggle = document.querySelector(`#${workshopConfig.combos[comboId].id}-price`).closest('.workshop-card').querySelector('.toggle-switch');
    toggle.classList.toggle('active');
}

// Show tab
function showTab(tabName) {
    currentTab = tabName;
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}Tab`).style.display = 'block';
}

// Save all changes
async function saveAll() {
    // Update workshops
    Object.keys(workshopConfig.workshops).forEach(workshopId => {
        const workshop = workshopConfig.workshops[workshopId];
        workshop.date = document.getElementById(`${workshopId}-date`)?.value || '';
        workshop.time = document.getElementById(`${workshopId}-time`)?.value || '';
        workshop.price = parseInt(document.getElementById(`${workshopId}-price`)?.value) || 0;
        workshop.regularPrice = parseInt(document.getElementById(`${workshopId}-regularPrice`)?.value) || 0;
        workshop.discount = parseInt(document.getElementById(`${workshopId}-discount`)?.value) || 0;
        workshop.image = document.getElementById(`${workshopId}-image`)?.value || '';
        workshop.description = document.getElementById(`${workshopId}-description`)?.value || '';
        workshop.stripePaymentLink = document.getElementById(`${workshopId}-stripeLink`)?.value || '';
        
        // Get features
        const featuresList = document.getElementById(`${workshopId}-features`);
        if (featuresList) {
            workshop.features = Array.from(featuresList.querySelectorAll('input')).map(input => input.value).filter(f => f.trim());
        }
        
        // Get active status
        const toggle = document.querySelector(`#${workshopId}-date`)?.closest('.workshop-card')?.querySelector('.toggle-switch');
        workshop.active = toggle?.classList.contains('active') || false;
    });
    
    // Update combos
    Object.keys(workshopConfig.combos).forEach(comboId => {
        const combo = workshopConfig.combos[comboId];
        combo.price = parseInt(document.getElementById(`${comboId}-price`)?.value) || 0;
        combo.regularPrice = parseInt(document.getElementById(`${comboId}-regularPrice`)?.value) || 0;
        combo.description = document.getElementById(`${comboId}-description`)?.value || '';
        combo.stripePaymentLink = document.getElementById(`${comboId}-stripeLink`)?.value || '';
        
        const toggle = document.querySelector(`#${comboId}-price`)?.closest('.workshop-card')?.querySelector('.toggle-switch');
        combo.active = toggle?.classList.contains('active') || false;
    });
    
    // Save to file (this requires a backend - see saveConfig function)
    await saveConfig();
}

// Save settings
async function saveSettings() {
    workshopConfig.settings.nextWorkshopDate = document.getElementById('nextWorkshopDate').value;
    workshopConfig.settings.specialOffer = document.getElementById('specialOffer').value;
    workshopConfig.settings.freeBonus = document.getElementById('freeBonus').value;
    
    if (!workshopConfig.settings.musicVideoWorkshop) {
        workshopConfig.settings.musicVideoWorkshop = {};
    }
    workshopConfig.settings.musicVideoWorkshop.name = document.getElementById('musicVideoName').value;
    workshopConfig.settings.musicVideoWorkshop.date = document.getElementById('musicVideoDate').value;
    workshopConfig.settings.musicVideoWorkshop.price = parseInt(document.getElementById('musicVideoPrice').value) || 0;
    
    await saveConfig();
}

// Save configuration
async function saveConfig() {
    try {
        // Option 1: Save via backend API
        const response = await fetch('/api/save-config.php', {  // Change to .php for standard hosting
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN_PASSWORD}`
            },
            body: JSON.stringify(workshopConfig)
        });
        
        if (response.ok) {
            showMessage('Configuration saved successfully!', 'success');
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Failed to save');
        }
    } catch (error) {
        // Option 2: Download as JSON file (fallback)
        console.warn('Backend not available, downloading config file...', error);
        const blob = new Blob([JSON.stringify(workshopConfig, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workshop-config.json';
        a.click();
        URL.revokeObjectURL(url);
        showMessage('Configuration downloaded. Please upload workshop-config.json to your server.', 'success');
    }
}

// Show message
function showMessage(message, type) {
    const messageEl = document.getElementById('statusMessage');
    messageEl.textContent = message;
    messageEl.className = `status-message ${type}`;
    setTimeout(() => {
        messageEl.className = 'status-message';
    }, 5000);
}

// Initialize on load
checkAuth();


// Admin Panel JavaScript
// Simple password-based authentication (for production, use proper auth)

const ADMIN_PASSWORD = 'cliff2025'; // Change this to a secure password
let workshopConfig = null;
let currentTab = 'workshops';
let allRegistrations = [];

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
        populateWorkshopFilter();
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
        // Convert cents to dollars for display
        document.getElementById('musicVideoPrice').value = (settings.musicVideoWorkshop.price / 100).toFixed(2) || '';
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
                <label>Price (in dollars, e.g., 450 or 450.00):</label>
                <input type="number" step="0.01" id="${workshop.id}-price" value="${(workshop.price / 100).toFixed(2)}">
            </div>
            <div>
                <label>Regular Price (in dollars):</label>
                <input type="number" step="0.01" id="${workshop.id}-regularPrice" value="${(workshop.regularPrice / 100).toFixed(2)}">
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
                <label>Price (in dollars, e.g., 720 or 720.00):</label>
                <input type="number" step="0.01" id="${combo.id}-price" value="${(combo.price / 100).toFixed(2)}">
            </div>
            <div>
                <label>Regular Price (in dollars):</label>
                <input type="number" step="0.01" id="${combo.id}-regularPrice" value="${(combo.regularPrice / 100).toFixed(2)}">
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
    
    // Load registrations when registrations tab is opened
    if (tabName === 'registrations') {
        loadRegistrations();
    }
}

// Save all changes
async function saveAll() {
    // Update workshops
    Object.keys(workshopConfig.workshops).forEach(workshopId => {
        const workshop = workshopConfig.workshops[workshopId];
        workshop.date = document.getElementById(`${workshopId}-date`)?.value || '';
        workshop.time = document.getElementById(`${workshopId}-time`)?.value || '';
        // Convert dollars to cents for storage
        workshop.price = Math.round(parseFloat(document.getElementById(`${workshopId}-price`)?.value) * 100) || 0;
        workshop.regularPrice = Math.round(parseFloat(document.getElementById(`${workshopId}-regularPrice`)?.value) * 100) || 0;
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
        // Convert dollars to cents for storage
        combo.price = Math.round(parseFloat(document.getElementById(`${comboId}-price`)?.value) * 100) || 0;
        combo.regularPrice = Math.round(parseFloat(document.getElementById(`${comboId}-regularPrice`)?.value) * 100) || 0;
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
    // Convert dollars to cents for storage
    workshopConfig.settings.musicVideoWorkshop.price = Math.round(parseFloat(document.getElementById('musicVideoPrice').value) * 100) || 0;
    
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

// ==================== REGISTRATION MANAGEMENT ====================

// Load registrations
async function loadRegistrations() {
    try {
        const response = await fetch('/api/save-registration.php');
        const data = await response.json();
        allRegistrations = data.registrations || [];
        renderRegistrations(allRegistrations);
        showMessage(`Loaded ${allRegistrations.length} registrations`, 'success');
    } catch (error) {
        console.error('Error loading registrations:', error);
        // Try localStorage fallback
        allRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
        renderRegistrations(allRegistrations);
        if (allRegistrations.length > 0) {
            showMessage(`Loaded ${allRegistrations.length} registrations from local storage`, 'success');
        } else {
            showMessage('No registrations found', 'error');
        }
    }
}

// Populate workshop filter dropdown
function populateWorkshopFilter() {
    const filter = document.getElementById('workshopFilter');
    if (!filter || !workshopConfig) return;
    
    filter.innerHTML = '<option value="all">All Workshops</option>';
    Object.values(workshopConfig.workshops).forEach(workshop => {
        const option = document.createElement('option');
        option.value = workshop.id;
        option.textContent = workshop.name;
        filter.appendChild(option);
    });
}

// Filter registrations
function filterRegistrations() {
    const filter = document.getElementById('workshopFilter').value;
    if (filter === 'all') {
        renderRegistrations(allRegistrations);
    } else {
        const filtered = allRegistrations.filter(reg => reg.workshopId === filter);
        renderRegistrations(filtered);
    }
}

// Render registrations list
function renderRegistrations(registrations) {
    const container = document.getElementById('registrationsList');
    if (!container) return;
    
    if (registrations.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No registrations found.</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sorted = [...registrations].sort((a, b) => 
        new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    
    container.innerHTML = sorted.map(reg => {
        const date = new Date(reg.registrationDate);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        return `
            <div style="background: #000; border: 1px solid #333; border-radius: 4px; padding: 1.5rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="color: #dc2626; margin-bottom: 0.5rem;">${reg.customerName}</h3>
                        <div style="color: #999; font-size: 0.9rem;">${reg.customerEmail} | ${reg.customerPhone}</div>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: ${reg.paymentStatus === 'paid' ? '#10b981' : '#f59e0b'}; 
                                     color: #000; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">
                            ${reg.paymentStatus.toUpperCase()}
                        </span>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <div style="color: #666; font-size: 0.85rem;">Workshop</div>
                        <div style="color: #fff;">${reg.workshopName || reg.workshopId}</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.85rem;">Workshop Date</div>
                        <div style="color: #fff;">${reg.workshopDate || 'TBD'}</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.85rem;">Price</div>
                        <div style="color: #fff;">$${reg.workshopPrice || '0.00'}</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.85rem;">Registered</div>
                        <div style="color: #fff;">${formattedDate}</div>
                    </div>
                </div>
                
                ${reg.experienceLevel ? `
                    <div style="margin-bottom: 0.5rem;">
                        <span style="color: #666; font-size: 0.85rem;">Experience:</span>
                        <span style="color: #fff; margin-left: 0.5rem;">${formatExperienceLevel(reg.experienceLevel)}</span>
                    </div>
                ` : ''}
                
                ${reg.notes ? `
                    <div style="margin-bottom: 1rem;">
                        <div style="color: #666; font-size: 0.85rem; margin-bottom: 0.25rem;">Notes:</div>
                        <div style="color: #ccc; padding: 0.5rem; background: #1a1a1a; border-radius: 4px;">${reg.notes}</div>
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                    ${reg.paymentStatus !== 'paid' ? `
                        <button onclick="markAsPaid('${reg.id}')" style="background: #10b981; padding: 0.5rem 1rem; font-size: 0.9rem;">
                            Mark as Paid
                        </button>
                    ` : ''}
                    <button onclick="toggleAttendance('${reg.id}')" 
                        style="background: ${reg.attended ? '#dc2626' : '#333'}; padding: 0.5rem 1rem; font-size: 0.9rem;">
                        ${reg.attended ? '✓ Attended' : 'Mark Attended'}
                    </button>
                    <button onclick="deleteRegistration('${reg.id}')" 
                        style="background: #7f1d1d; padding: 0.5rem 1rem; font-size: 0.9rem;">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Format experience level
function formatExperienceLevel(level) {
    const levels = {
        'beginner': 'Beginner - No experience',
        'some': 'Some Experience - Hobbyist/Student',
        'intermediate': 'Intermediate - Some paid work',
        'advanced': 'Advanced - Industry professional'
    };
    return levels[level] || level;
}

// Mark registration as paid
async function markAsPaid(registrationId) {
    const reg = allRegistrations.find(r => r.id === registrationId);
    if (reg) {
        reg.paymentStatus = 'paid';
        await updateRegistration(reg);
    }
}

// Toggle attendance
async function toggleAttendance(registrationId) {
    const reg = allRegistrations.find(r => r.id === registrationId);
    if (reg) {
        reg.attended = !reg.attended;
        await updateRegistration(reg);
    }
}

// Update registration
async function updateRegistration(registration) {
    try {
        // For now, we'll just re-save all registrations
        // In a real backend, you'd have an UPDATE endpoint
        const response = await fetch('/api/save-registration.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrations: allRegistrations })
        });
        
        if (response.ok) {
            filterRegistrations();
            showMessage('Registration updated', 'success');
        }
    } catch (error) {
        console.error('Error updating registration:', error);
        localStorage.setItem('pendingRegistrations', JSON.stringify(allRegistrations));
        filterRegistrations();
        showMessage('Registration updated locally', 'success');
    }
}

// Delete registration
async function deleteRegistration(registrationId) {
    if (!confirm('Are you sure you want to delete this registration?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/save-registration.php?id=${registrationId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            allRegistrations = allRegistrations.filter(r => r.id !== registrationId);
            filterRegistrations();
            showMessage('Registration deleted', 'success');
        }
    } catch (error) {
        console.error('Error deleting registration:', error);
        allRegistrations = allRegistrations.filter(r => r.id !== registrationId);
        localStorage.setItem('pendingRegistrations', JSON.stringify(allRegistrations));
        filterRegistrations();
        showMessage('Registration deleted locally', 'success');
    }
}

// Export attendance list
function exportAttendanceList() {
    const filter = document.getElementById('workshopFilter').value;
    let regsToExport = filter === 'all' ? allRegistrations : 
                       allRegistrations.filter(reg => reg.workshopId === filter);
    
    // Filter only paid registrations
    regsToExport = regsToExport.filter(reg => reg.paymentStatus === 'paid');
    
    if (regsToExport.length === 0) {
        alert('No paid registrations to export.');
        return;
    }
    
    // Group by workshop
    const grouped = {};
    regsToExport.forEach(reg => {
        const workshopName = reg.workshopName || reg.workshopId;
        if (!grouped[workshopName]) {
            grouped[workshopName] = [];
        }
        grouped[workshopName].push(reg);
    });
    
    // Create text content
    let content = '=== WORKSHOP ATTENDANCE LIST ===\n';
    content += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    Object.keys(grouped).forEach(workshopName => {
        const regs = grouped[workshopName];
        content += `\n--- ${workshopName.toUpperCase()} ---\n`;
        content += `Date: ${regs[0].workshopDate || 'TBD'}\n`;
        content += `Total Attendees: ${regs.length}\n\n`;
        
        regs.forEach((reg, index) => {
            content += `${index + 1}. ${reg.customerName}\n`;
            content += `   Email: ${reg.customerEmail}\n`;
            content += `   Phone: ${reg.customerPhone}\n`;
            if (reg.experienceLevel) {
                content += `   Experience: ${formatExperienceLevel(reg.experienceLevel)}\n`;
            }
            content += `   Attended: ${reg.attended ? 'YES' : 'NO'}\n\n`;
        });
    });
    
    // Download
    downloadFile('attendance-list.txt', content);
    showMessage('Attendance list exported', 'success');
}

// Export all registrations as CSV
function exportAllRegistrations() {
    if (allRegistrations.length === 0) {
        alert('No registrations to export.');
        return;
    }
    
    // CSV headers
    let csv = 'Name,Email,Phone,Workshop,Workshop Date,Price,Experience Level,Payment Status,Attended,Registration Date,Notes\n';
    
    // Add rows
    allRegistrations.forEach(reg => {
        csv += `"${reg.customerName}",`;
        csv += `"${reg.customerEmail}",`;
        csv += `"${reg.customerPhone}",`;
        csv += `"${reg.workshopName || reg.workshopId}",`;
        csv += `"${reg.workshopDate || 'TBD'}",`;
        csv += `"$${reg.workshopPrice || '0.00'}",`;
        csv += `"${formatExperienceLevel(reg.experienceLevel || '')}",`;
        csv += `"${reg.paymentStatus}",`;
        csv += `"${reg.attended ? 'Yes' : 'No'}",`;
        csv += `"${new Date(reg.registrationDate).toLocaleString()}",`;
        csv += `"${(reg.notes || '').replace(/"/g, '""')}"\n`;
    });
    
    downloadFile('registrations.csv', csv);
    showMessage('CSV exported', 'success');
}

// Download file helper
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}



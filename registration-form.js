// Registration Form Handler
// Captures customer info before checkout

function showRegistrationForm(workshopId) {
    const modal = document.createElement('div');
    modal.id = 'registration-modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.95);
        align-items: center;
        justify-content: center;
        padding: 1rem;
    `;
    
    modal.innerHTML = `
        <div style="
            background: #1a1a1a;
            padding: 3rem;
            border-radius: 8px;
            max-width: 600px;
            width: 100%;
            border: 2px solid #dc2626;
        ">
            <h2 style="color: #dc2626; margin-bottom: 2rem; font-size: 2rem;">Complete Your Registration</h2>
            <p style="color: #ccc; margin-bottom: 2rem;">Please provide your details before proceeding to payment.</p>
            
            <form id="registrationForm" style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div>
                    <label style="display: block; color: #ccc; margin-bottom: 0.5rem; font-weight: 500;">Full Name *</label>
                    <input type="text" id="customerName" required 
                        style="width: 100%; padding: 0.75rem; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; font-size: 1rem;"
                        placeholder="John Doe">
                </div>
                
                <div>
                    <label style="display: block; color: #ccc; margin-bottom: 0.5rem; font-weight: 500;">Email Address *</label>
                    <input type="email" id="customerEmail" required 
                        style="width: 100%; padding: 0.75rem; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; font-size: 1rem;"
                        placeholder="john@example.com">
                </div>
                
                <div>
                    <label style="display: block; color: #ccc; margin-bottom: 0.5rem; font-weight: 500;">Phone Number *</label>
                    <input type="tel" id="customerPhone" required 
                        style="width: 100%; padding: 0.75rem; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; font-size: 1rem;"
                        placeholder="(604) 555-1234">
                </div>
                
                <div>
                    <label style="display: block; color: #ccc; margin-bottom: 0.5rem; font-weight: 500;">Experience Level (Optional)</label>
                    <select id="experienceLevel" 
                        style="width: 100%; padding: 0.75rem; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; font-size: 1rem;">
                        <option value="">Select...</option>
                        <option value="beginner">Beginner - No experience</option>
                        <option value="some">Some Experience - Hobbyist/Student</option>
                        <option value="intermediate">Intermediate - Some paid work</option>
                        <option value="advanced">Advanced - Industry professional</option>
                    </select>
                </div>
                
                <div>
                    <label style="display: block; color: #ccc; margin-bottom: 0.5rem; font-weight: 500;">Additional Notes (Optional)</label>
                    <textarea id="customerNotes" rows="3"
                        style="width: 100%; padding: 0.75rem; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; font-size: 1rem; resize: vertical;"
                        placeholder="Any questions or special requirements..."></textarea>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" 
                        style="flex: 1; background: #dc2626; color: #fff; border: none; padding: 1rem 2rem; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 600;">
                        Continue to Payment
                    </button>
                    <button type="button" onclick="closeRegistrationForm()" 
                        style="background: #333; color: #fff; border: none; padding: 1rem 2rem; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 600;">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitRegistration(workshopId);
    });
}

function closeRegistrationForm() {
    const modal = document.getElementById('registration-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

async function submitRegistration(workshopId) {
    // Get workshop details
    const workshop = await window.getWorkshop(workshopId);
    
    const registrationData = {
        id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        workshopId: workshopId,
        workshopName: workshop ? workshop.name : workshopId,
        workshopDate: workshop ? workshop.date : 'TBD',
        workshopPrice: workshop ? (workshop.price / 100).toFixed(2) : '0.00',
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        customerPhone: document.getElementById('customerPhone').value,
        experienceLevel: document.getElementById('experienceLevel').value,
        notes: document.getElementById('customerNotes').value,
        registrationDate: new Date().toISOString(),
        paymentStatus: 'pending',
        attended: false
    };
    
    try {
        // Save registration
        await saveRegistration(registrationData);
        
        // Close modal
        closeRegistrationForm();
        
        // Proceed to payment using the original checkout function
        const workshop = await window.getWorkshop(workshopId);
        
        if (!workshop) {
            alert('Workshop not found. Please contact support.');
            return;
        }
        
        if (!workshop.active) {
            alert('This workshop is currently not available for registration.');
            return;
        }
        
        if (workshop.stripePaymentLink && workshop.stripePaymentLink.trim() !== '') {
            // Add registration ID and customer info to URL for tracking
            const url = new URL(workshop.stripePaymentLink);
            url.searchParams.append('client_reference_id', registrationData.id);
            url.searchParams.append('prefilled_email', registrationData.customerEmail);
            window.location.href = url.toString();
        } else {
            alert('Registration saved! However, payment processing is not yet configured.\n\nThe workshop organizer will contact you to complete payment.');
        }
    } catch (error) {
        console.error('Error saving registration:', error);
        alert('Error saving registration. Please try again.');
    }
}

async function saveRegistration(registrationData) {
    try {
        // Try to save via API
        const response = await fetch('/api/save-registration.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });
        
        if (!response.ok) {
            throw new Error('API not available');
        }
        
        return await response.json();
    } catch (error) {
        // Fallback: Store in localStorage
        console.warn('API not available, storing locally');
        let registrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
        registrations.push(registrationData);
        localStorage.setItem('pendingRegistrations', JSON.stringify(registrations));
        return registrationData;
    }
}

// Override the redirectToPaymentLink function to show form first
const originalRedirectFunc = window.redirectToPaymentLink;
if (originalRedirectFunc) {
    window.redirectToPaymentLink = function(workshopId) {
        // Show registration form first
        showRegistrationForm(workshopId);
    };
}


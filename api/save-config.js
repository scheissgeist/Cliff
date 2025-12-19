// Serverless function to save workshop configuration
// This can be used with Vercel, Netlify Functions, or AWS Lambda

// For Vercel: Save this as api/save-config.js
// For Netlify: Save this as netlify/functions/save-config.js
// For AWS Lambda: Package and deploy separately

// IMPORTANT: Add authentication/authorization before deploying!
// This example uses a simple password check - use proper auth in production

const fs = require('fs').promises;
const path = require('path');

// Simple password authentication (REPLACE WITH PROPER AUTH)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cliff2025';

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const config = req.body;
        
        // Validate config structure
        if (!config.workshops || !config.combos || !config.settings) {
            return res.status(400).json({ error: 'Invalid configuration structure' });
        }

        // Save to file
        // Note: For serverless functions, you may need to use a database or file storage service
        // This example assumes you have write access to the file system
        
        // Option 1: Save to local file (works for Vercel/Netlify with persistent storage)
        const configPath = path.join(process.cwd(), 'workshop-config.json');
        await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
        
        // Option 2: For GitHub Pages, you'd need to use GitHub API to update the file
        // See github-api-save.js for an example
        
        return res.status(200).json({ 
            success: true, 
            message: 'Configuration saved successfully' 
        });
    } catch (error) {
        console.error('Error saving config:', error);
        return res.status(500).json({ error: 'Failed to save configuration' });
    }
};


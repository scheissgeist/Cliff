// Alternative: Save config using GitHub API
// This allows updating the file directly in your GitHub repo
// Useful if you're using GitHub Pages

const https = require('https');

// GitHub API function to update workshop-config.json
async function saveConfigViaGitHub(config, token, owner, repo, branch = 'main') {
    const filePath = 'workshop-config.json';
    const content = JSON.stringify(config, null, 2);
    const encodedContent = Buffer.from(content).toString('base64');

    // First, get the current file to get its SHA
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    
    let fileSha = null;
    try {
        const fileData = await githubRequest(getFileUrl, token, 'GET');
        fileSha = fileData.sha;
    } catch (error) {
        // File might not exist yet
        console.log('File does not exist, will create new one');
    }

    // Update the file
    const updateUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const updateData = {
        message: 'Update workshop configuration',
        content: encodedContent,
        branch: branch
    };

    if (fileSha) {
        updateData.sha = fileSha;
    }

    return await githubRequest(updateUrl, token, 'PUT', updateData);
}

// Helper function for GitHub API requests
function githubRequest(url, token, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: method,
            headers: {
                'Authorization': `token ${token}`,
                'User-Agent': 'Workshop-Admin-Panel',
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(body));
                } else {
                    reject(new Error(`GitHub API error: ${res.statusCode} - ${body}`));
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Serverless function wrapper (for Vercel/Netlify)
module.exports = async (req, res) => {
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
    const adminPassword = process.env.ADMIN_PASSWORD || 'cliff2025';
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const config = req.body;
        const githubToken = process.env.GITHUB_TOKEN;
        const githubOwner = process.env.GITHUB_OWNER || 'scheissgeist';
        const githubRepo = process.env.GITHUB_REPO || 'Cliff';

        if (!githubToken) {
            return res.status(500).json({ 
                error: 'GitHub token not configured. Set GITHUB_TOKEN environment variable.' 
            });
        }

        await saveConfigViaGitHub(config, githubToken, githubOwner, githubRepo);
        
        return res.status(200).json({ 
            success: true, 
            message: 'Configuration saved to GitHub successfully' 
        });
    } catch (error) {
        console.error('Error saving config via GitHub:', error);
        return res.status(500).json({ error: error.message });
    }
};


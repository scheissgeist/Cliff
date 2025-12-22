// Netlify serverless function for saving workshop config
// Replaces PHP backend

const fs = require('fs');
const path = require('path');

const configFile = path.join(process.cwd(), 'workshop-config.json');
const ADMIN_PASSWORD = 'cliff2025';

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Check auth
    const authHeader = event.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    
    if (token !== ADMIN_PASSWORD) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    // Save config
    const configData = JSON.parse(event.body);
    fs.writeFileSync(configFile, JSON.stringify(configData, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};


// Netlify serverless function for registration management
// Replaces PHP backend

const fs = require('fs');
const path = require('path');

const registrationsFile = path.join(process.cwd(), 'registrations.json');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // GET - Fetch all registrations
    if (event.httpMethod === 'GET') {
      let data = { registrations: [] };
      
      if (fs.existsSync(registrationsFile)) {
        const fileData = fs.readFileSync(registrationsFile, 'utf8');
        data = JSON.parse(fileData);
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    // POST - Save registration
    if (event.httpMethod === 'POST') {
      const registrationData = JSON.parse(event.body);
      
      // Load existing
      let registrations = { registrations: [] };
      if (fs.existsSync(registrationsFile)) {
        const fileData = fs.readFileSync(registrationsFile, 'utf8');
        registrations = JSON.parse(fileData);
      }
      
      // Add new registration
      registrations.registrations.push(registrationData);
      
      // Save
      fs.writeFileSync(registrationsFile, JSON.stringify(registrations, null, 2));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, registration: registrationData })
      };
    }

    // DELETE - Remove registration
    if (event.httpMethod === 'DELETE') {
      const params = event.queryStringParameters || {};
      const registrationId = params.id;
      
      if (!registrationId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Registration ID required' })
        };
      }
      
      if (fs.existsSync(registrationsFile)) {
        const fileData = fs.readFileSync(registrationsFile, 'utf8');
        let registrations = JSON.parse(fileData);
        
        // Filter out the registration
        registrations.registrations = registrations.registrations.filter(
          reg => reg.id !== registrationId
        );
        
        // Save
        fs.writeFileSync(registrationsFile, JSON.stringify(registrations, null, 2));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true })
        };
      }
      
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Registrations not found' })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
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


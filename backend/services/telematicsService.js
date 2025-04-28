const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchUnitsFromTelematics() {
  var config = {
    method: 'get',
    url: process.env.TELEMATICS_API_URL + 'unit/list.json?key=' + process.env.TELEMATICS_API_KEY,
  };

  console.log('Fetching units from Telematics API...', JSON.stringify(config));
  try {
    const response = await axios(config);
    console.log('Units fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching units:', error);

    // Load simulated response from JSON file
    const simulatedResponsePath = path.join(__dirname, 'simulatedUnitsResponse.json');
    const simulatedResponse = JSON.parse(fs.readFileSync(simulatedResponsePath, 'utf8'));

    console.log('Returning simulated response:', simulatedResponse);
    return simulatedResponse;
  }
}

module.exports = { fetchUnitsFromTelematics };
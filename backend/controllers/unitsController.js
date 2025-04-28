const { fetchUnitsFromTelematics } = require('../services/telematicsService');

async function getUnits(req, res) {
  try {
    const units = await fetchUnitsFromTelematics();
    res.json(units);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Failed to fetch units' });
  }
}

module.exports = { getUnits };
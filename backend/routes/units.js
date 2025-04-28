const express = require('express');
const router = express.Router();
const { getUnits } = require('../controllers/unitsController');
const { authorizeRequest } = require('../middleware/authMiddleware');

router.get('/', authorizeRequest, getUnits);

module.exports = router;
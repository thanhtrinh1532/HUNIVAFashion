// // server/routes/aiRoutes.js
// const express = require('express');
// const router = express.Router();
// const AIController = require('../controllers/AIController');

// router.post('/chat', AIController.handleChat);
// router.post('/recommend', AIController.getProductRecommendations);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/AIController');

router.post('/chat', chatWithAI);

module.exports = router;

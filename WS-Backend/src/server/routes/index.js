const express = require('express');
const router = express.Router();
const path = require('path');
const {calculateScore} = require('../controller/score');


router.get('/score', (req, res) => {
	const scoreJson = calculateScore();
	res.json(scoreJson)
});

router.get('/ping', (req, res) => {
	res.json({ response: 'pong' })
});

router.get('*', (req, res) => {
	console.log('dd');
	
	res.sendFile(BASEPATH + 'src/server/views/app.html')
});

module.exports = router;

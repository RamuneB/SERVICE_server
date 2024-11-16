const express = require('express');
const router = express.Router();

// Gauti visas įmones
router.get('/', (req, res) => {
  res.send('Gauti visas įmones');
});

// Pridėti naują įmonę
router.post('/', (req, res) => {
  res.send('Pridėti naują įmonę');
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Gauti visas kategorijas
router.get('/', (req, res) => {
  res.send('Gauti visas kategorijas');
});

// Sukurti naują kategoriją
router.post('/', (req, res) => {
  res.send('Sukurti naują kategoriją');
});

module.exports = router;

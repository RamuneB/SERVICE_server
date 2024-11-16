
const Business = require('../HomeServiceAPI/models/Business');

exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
};

exports.getBusinessesByCategory = async (req, res) => {
  try {
    const businesses = await Business.find({ category: req.params.category });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch businesses by category' });
  }
};

// Other businessController methods here...

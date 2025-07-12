// Basic Express backend for name lookup
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// Load guest-to-table mapping
const guests = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/guests.json'), 'utf-8'));

app.post('/api/lookup', (req, res) => {
  const name = req.body.name;
  const table = guests[name];
  if (table) {
    res.json({table});
  } else {
    res.json({});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Wedding QR backend running on port ${PORT}`);
});

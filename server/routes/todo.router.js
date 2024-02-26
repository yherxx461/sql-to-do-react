const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
  const dbQuery = `SELECT * FROM "todo" ORDER BY "id";`;

  pool
    .query(dbQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('ERROR in getting the "todo" list from the database', error);
      res.sendStatus(500);
    });
});
// POST

// PUT

// DELETE

module.exports = router;

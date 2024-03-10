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
      console.log('Error in getting the "todo" list from the database', error);
      res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
  const dbQuery = `INSERT INTO "todo" ("task", "completed") VALUES ($1, $2) RETURNING "id";`;
  const newTask = req.body;
  const queryArgs = [newTask.task, newTask.completed];

  pool
    .query(dbQuery, queryArgs)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in posting new task', error);
      res.sendStatus(500);
    });
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dbQuery = `UPDATE "todo" SET "completed" = NOT "completed" WHERE "id" = $1;`;

  pool
    .query(dbQuery, [id])
    .then((response) => {
      console.log('Success in updating task completion');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in updating task completion', error);
      res.sendStatus(500);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dbQuery = `DELETE FROM "todo" WHERE "id" = $1;`;

  pool
    .query(dbQuery, [id])
    .then((result) => {
      console.log('Success in deleting task');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in deleting task', error);
      res.sendStatus(500);
    });
});

module.exports = router;

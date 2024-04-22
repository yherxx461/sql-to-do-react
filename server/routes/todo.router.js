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

router.get('/:id', (req, res) => {
  const dbQuery = `SELECT * FROM "todo" WHERE "id" = $1;`;
  pool
    .query(dbQuery, [req.params.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(
        'Error in getting the new added "todo" list from the database',
        error
      );
      res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
  const dbQuery = `INSERT INTO "todo" ("task", "completed") VALUES ($1, $2)`;
  const task = req.body;
  const queryArgs = [task.task, task.completed];

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
  const { id } = req.params;
  const { task, completed } = req.body;
  console.log('Received ID:', id);
  console.log('Received Task:', task);
  console.log('Received Status:', completed);

  const dbQuery = `UPDATE "todo" SET "task" = $2, "completed" = $3 WHERE "id" = $1;`;

  pool
    .query(dbQuery, [id, task, completed])
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
  const { id } = req.params;
  console.log(req.body);
  const dbQuery = `DELETE FROM "todo" WHERE "id" = $1;`;

  pool
    .query(dbQuery, [id])
    .then((result) => {
      console.log('Success in deleting task', result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in deleting task', error);
      res.sendStatus(500);
    });
});

module.exports = router;

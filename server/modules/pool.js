const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'weekend_to_do_app_xznk',
});

module.exports = pool;

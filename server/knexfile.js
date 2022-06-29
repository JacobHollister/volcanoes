// Update with your config settings.
require('dotenv').config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    database: 'volcanoes',
    user: 'root',
    password: process.env.SQL_KEY,
  }
};
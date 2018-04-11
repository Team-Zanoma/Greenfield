const mysql = require('mysql');
const knex = require('knex');

exports.knex = knex({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'Jkpywb98',
    database : 'Devterest'
  }
});
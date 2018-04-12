const mysql = require('mysql');
const keys = require('../config/keys.js');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : keys.mysqlEndpoint,
    user : keys.rdsUser,
    port: keys.rdsPort,
    password : keys.rdsPassword,
    database : keys.rdsName
  }
});

module.exports = { knex };
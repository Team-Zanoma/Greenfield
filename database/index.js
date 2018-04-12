const mysql = require('mysql');
const knex = require('knex');
const keys = require('../config/keys.js');

exports.knex = knex({
  client: 'mysql',
  connection: {
    host : keys.mysqlEndpoint,
    user : keys.rdsUser,
    port: keys.rdsPort,
    password : keys.rdsPassword,
    database : keys.rdsName
  }
});
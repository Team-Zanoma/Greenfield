const mysql = require('mysql');
const knex = require('knex');

exports.knex = knex({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'Devterest'
  }
});

// module.exports = knex;


// const mysql = require('mysql');

// class Database {
// 	constructor(config) {
// 		this.connection = mysql.createConnection(config);
// 	}
// 	query(sql, args) {
// 		return new Promise((resolve, reject) => {
// 			this.connection.query(sql, args, (err, rows) => {
// 				if (err) return reject(err);
// 				resolve(rows);
// 			});
// 		});
// 	}
// };

// module.exports = new Database({
// 	host: 'localhost',
// 	user: 'root',
// 	database: 'minteger'
// });

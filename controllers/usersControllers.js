const { knex } = require('../database/index');

exports.getAllUsers = async (req, res) => {
	const allUsers = await knex.select().from('users');
	res.send(allUsers);
}

exports.addUser = async (req, res) => {
	const { username, email } = req.body;
  const isUser = await knex('users').select('username').where({ username: username, email: email });

  if (!isUser.length) {
    const result = await knex('users').insert({ username: username, email: email });
  }

	res.send();
};

exports.getLinksByUser = async (req, res) => {
  const { username } = req.query;
  
  
}

exports.addFavorite = async (req, res) => {

}
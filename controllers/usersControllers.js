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
  const userId = await knex('users').select('id_users').where({ username: username });
  const userLinkIds = await knex('UsersLinks').select('links_id').where({ users_id: userId[0].id_users });
  const userLinks = [];

  for (let i = 0; i < userLinkIds.length; i++) {
    let link = await knex('links').select().where({ id_links: userLinkIds[i].links_id });
    userLinks.push(link);
  }
  res.send(userLinks);
}

exports.addFavorite = async (req, res) => {
  const { username, url } = req.body;
  const likedLink = await knex('links').select('id_links').where({ url: url });
  const userId = await knex('users').select('id_users').where({ username: username});
  const insertFavorite = await knex('UsersLinks').insert({ links_id: likedLink[0].id_links, users_id: userId[0].id_users });
  res.send()
}

exports.removeFavorite = async (req, res) => {
  const { linkId, username } = req.body;

  const userId = await knex('users').select('id_users').where({ username: username});
  const insertFavorite = await knex('UsersLinks').where({ links_id: linkId, users_id: userId[0].id_users }).del();
  res.send()
}
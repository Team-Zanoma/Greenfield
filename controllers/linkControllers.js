const { knex } = require('../database/index');

exports.getAllLinks = async (req, res) => {
	const allLinks = await knex.select().from('links');
	res.send(allLinks);
};

exports.addLink = async (req, res) => {
	const { url, kind, votes, username, tagName } = req.body;
	const isLink = await knex.select('url').from('links').where({ url: url });

	if (isLink.length === 0) {
		const userId = await knex.select('id_users').from('users').where({ username: username });
		const addingLink = await knex('links').insert({ url: url, kind: kind });
		const linkId = await knex.select('id_links').from('links').where({ url: url });

		const addingToLinkJoin = await knex('UsersLinks').insert({ links_id: linkId[0].id_links, users_id: linkId[0].id_links });
		res.status(201).send();

	} else {
		const linkCount = await knex('links').where({ url: url }).select('shares');
		const updatedCount = linkCount[0].shares + 1;
		const upShareCount = await knex('links').where({ url: url }).update({ shares: updatedCount });

		res.status(201).send();
	}
};



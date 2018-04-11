const { knex } = require('../database/index');
const _ = require('lodash');

exports.addTags = async (req, res, next) => {
	const { url, kind, votes, username } = req.body;
	const isLink = await knex.select('url').from('links').where({ url: url });

	if (isLink.length === 0) {
		const userId = await knex.select('id_users').from('users').where({ username: username });
		const addingLink = await knex('links').insert({ url: url, kind: kind });
		const linkId = await knex.select('id_links').from('links').where({ url: url });

		const addingToJoin = await knex('UsersLinks').insert({ links_id: linkId[0].id_links, users_id: linkId[0].id_links });
		res.status(201).send();

	} else {
		const linkCount = await knex('links').where({ url: url }).select('shares');
		const updatedCount = linkCount[0].shares + 1;
		const upShareCount = await knex('links').where({ url: url }).update({ shares: updatedCount });

		res.status(201).send();
	}
};

exports.getAllTags = async (req, res) => {
	const allTags = await knex.select().from('tags');
	res.send(allTags);
}

exports.getTags = async (req, res, next) => {
	const collectTags = await knex.select().from('tags');
	const newTags = _.differenceBy(req.body.tagName, _.map(collectTags, (tag) => tag.tagName));
	// for (let i = 0; i < newTags.length; i++) {
	// 	let pushTags = await knex('tags').insert({ tagName: newTags[i] });
	// }

	// next();
}

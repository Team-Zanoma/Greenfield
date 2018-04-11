const { knex } = require('../database/index');

exports.getAllLinks = async (req, res) => {
	const allLinks = await knex.select().from('links').orderBy('votes', 'desc');
	res.send(allLinks);
};

exports.addLink = async (req, res) => {
	const { url, kind, votes, username, tagName } = req.body;
	const isLink = await knex.select('url').from('links').where({ url: url });
	const userId = await knex.select('id_users').from('users').where({ username: username });

	if (isLink.length === 0) {
		const addingLink = await knex('links').insert({ url: url, kind: kind });
		var linkId = await knex.select('id_links').from('links').where({ url: url });
		const addingToLinkJoin = await knex('UsersLinks').insert({ links_id: linkId[0].id_links, users_id: userId[0].id_users });
	}
	else {
		const linkCount = await knex('links').where({ url: url }).select('shares');
		const updatedCount = linkCount[0].shares + 1;
		const upShareCount = await knex('links').where({ url: url }).update({ shares: updatedCount });
		var linkId = await knex.select('id_links').from('links').where({ url: url });
		const addingToLinkJoin = await knex('UsersLinks').insert({ links_id: linkId[0].id_links, users_id: userId[0].id_users });
	}

	for (let i = 0; i < tagName.length; i++) {
		const tagId = await knex.select('id_tags').from('tags').where({ tagName: tagName[i] });
		const isLinkTagged = await knex('LinksTags').select('links_id').where({ tags_id: tagId[0].id_tags });

		if (!isLinkTagged.length) {
			const addingToTagsJoin = await knex('LinksTags').insert({ links_id: linkId[0].id_links, tags_id: tagId[0].id_tags });
		}
	}

	res.send();
};

exports.upVote = async (req, res) => {
	const { url } = req.body;
	const votes = await knex('links').select('votes').where({ url: url});
	const link = await knex('links').where({ url: url }).update({ votes: (votes[0].votes + 1) });
	res.status(201).send();
}

exports.searchByTag = async (req, res) => {
	const { tag } = req.query;
	console.log(req.query)
	const tagId = await knex('tags').select('id_tags').where({ tagName: tag });
	const linkIds = await knex('LinksTags').select('links_id').where({ tags_id: tagId[0].id_tags });
	let links = [];

	for (let i = 0; i < linkIds.length; i++) {
		let tempLink = await knex('links').select().where({ id_links: linkIds[i].links_id });
		links.push(tempLink);
	}

	res.status(200).send(links);
}






















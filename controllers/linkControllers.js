const { knex } = require('../database/index');
const urlMetadata = require('url-metadata');
const _ = require('lodash');

exports.getAllLinks = async (req, res) => {
	const by = req.query.by || 'votes'; 
	if (by === 'kind') {
		var { kind } = req.query;
	} // not finished

	const allLinks = await knex.select().from('links').orderBy(by, 'desc');
	exports.addTagsToLinks(allLinks, (linksWithTags) => {
		res.send(linksWithTags);
	});
};

exports.getLinksByDate = async (req, res) => {
	const allLinks = await knex.select().from('links').orderBy('id_links', 'desc');
	exports.addTagsToLinks(allLinks, (linksWithTags) => {
		res.send(linksWithTags);
	});
}

exports.addTagsToLinks = async (allLinks, cb) => {
	for (let i = 0; i < allLinks.length; i++) {
		const tagsId = await knex('LinksTags').select('tags_id').where({
			links_id: allLinks[i].id_links || ''
		});

		for (let x = 0; x < tagsId.length; x++) {
			let tag = await knex('tags').select('tagName').where({
				id_tags: tagsId[x].tags_id
			});
			if (allLinks[i].tagName) {
				allLinks[i].tagName.push(tag[0].tagName);
			} else {
				allLinks[i].tagName = [tag[0].tagName];
			}
			allLinks[i].tagName = _.uniq(allLinks[i].tagName);
		}
	}
	cb(allLinks);
}

exports.addLink = async (req, res) => {
	const { url, kind, votes, username, tagName } = req.body;

	try {
		var metaData = await urlMetadata(url);
	} catch (err) {
		var metaData = {
			"og:title": "",
			"og:description": "",
			"og:image": ""
		}
	}

	const isLink = await knex.select('url').from('links').where({ url: url });
	const userId = await knex.select('id_users').from('users').where({ username });

	if (isLink.length === 0) {
		const addingLink = await knex('links').insert({
			url: url,
			kind: kind,
			title: metaData['og:title'],
			description: metaData['og:description'],
			image: metaData['og:image']
		});
		var linkId = await knex.select('id_links').from('links').where({ url });
		const addingToLinkJoin = await knex('UsersLinks').insert({
			links_id: linkId[0].id_links,
			users_id: userId[0].id_users
		});
	} else {
		const linkCount = await knex('links').where({ url }).select('shares');
		const updatedCount = linkCount[0].shares + 1;
		const upShareCount = await knex('links').where({ url }).update({ shares: updatedCount });
		var linkId = await knex.select('id_links').from('links').where({ url });
		const addingToLinkJoin = await knex('UsersLinks').insert({
			links_id: linkId[0].id_links,
			users_id: userId[0].id_users
		});
	}

	for (let i = 0; i < tagName.length; i++) {
		const tagId = await knex.select('id_tags').from('tags').where({ tagName: tagName[i] });
		const isLinkTagged = await knex('LinksTags').select('tags_id').where({ links_id: url });

		if (!isLinkTagged.length) {
			const addingToTagsJoin = await knex('LinksTags').insert({
				links_id: linkId[0].id_links,
				tags_id: tagId[0].id_tags
			});
		}
	}
	res.send();
};

exports.upVote = async (req, res) => {
	const { url } = req.body;
	const votes = await knex('links').select('votes').where({ url });
	const link = await knex('links').where({ url }).update({ votes: (votes[0].votes + 1) });
	res.status(201).send();
}

exports.searchByTag = async (req, res) => {
	var { tag } = req.query;
	const links = [];
	if (typeof tag === 'string') {
		var tag = JSON.parse(tag);
	}

	for (let j = 0; j < tag.length; j++) {
		const tagId = await knex('tags').select('id_tags').where({ tagName: tag[j] });

		if (tagId[0]) {
			var linkIds = await knex('LinksTags').select('links_id').where({ tags_id: tagId[0].id_tags });
		} else {
			var linkIds = [];
		}

		for (let i = 0; i < linkIds.length; i++) {
			let tempLink = await knex('links').select().where({ id_links: linkIds[i].links_id });
			links.push(tempLink[0]);
		}
	}

	exports.addTagsToLinks(links, (linksWithTags) => {
		res.status(200).send(linksWithTags);
	})
}


exports.searchByTitle = async (req, res) => {
	const allLinks = await knex.select().from('links').orderBy('votes', 'desc');
	var { title } = req.query;
	title = title.toLowerCase();
	const matches = [];

	exports.addTagsToLinks(allLinks, (linksWithTags) => {
		for (let i = 0; i < allLinks.length; i++) {
			let currTitle = allLinks[i].title.toLowerCase();
			if (currTitle.indexOf(title) > -1) {
				matches.push(allLinks[i]);
			}
		}

		res.send(matches);
	});
}
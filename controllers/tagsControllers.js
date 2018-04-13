const { knex } = require('../database/index');
const _ = require('lodash');

exports.getAllTags = async (req, res) => {
	const allTags = await knex.select().from('tags');
	res.send(allTags);
}

exports.getTags = async (req, res, next) => {
	const collectTags = await knex.select().from('tags');
	const newTags = _.differenceBy(req.body.tagName, _.map(collectTags, (tag) => tag.tagName.toLowerCase()));

	for (let i = 0; i < newTags.length; i++) {
		let pushTags = await knex('tags').insert({ tagName: newTags[i] });
	}

	next();
}

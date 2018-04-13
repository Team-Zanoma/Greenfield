const express = require('express');
const router = express.Router();

const linkControllers = require('../controllers/linkControllers');
const usersControllers = require('../controllers/usersControllers');
const tagsControllers = require('../controllers/tagsControllers');

router.post('/api/links', tagsControllers.getTags, linkControllers.addLink);
router.post('/api/users', usersControllers.addUser);
router.post('/api/upVote', linkControllers.upVote);
router.post('/api/downVote', linkControllers.downVote);

router.get('/api/links', linkControllers.getAllLinks);
router.get('/api/users', usersControllers.getAllUsers);
router.get('/api/linksByDate', linkControllers.getLinksByDate);
router.get('/api/searchByTitle', linkControllers.searchByTitle);
router.get('/api/searchByTag', linkControllers.searchByTag);
router.get('/api/getAllTags', tagsControllers.getAllTags);
router.get('/api/userLinks', usersControllers.getLinksByUser);
router.post('/api/userLinks', usersControllers.addFavorite);
router.post('/api/deleteFav', usersControllers.removeFavorite);

router.get('/api/test', tagsControllers.test);

module.exports = router;
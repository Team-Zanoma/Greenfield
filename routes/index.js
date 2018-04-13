const express = require('express');
const router = express.Router();

const linkControllers = require('../controllers/linkControllers');
const usersControllers = require('../controllers/usersControllers');
const tagsControllers = require('../controllers/tagsControllers');

router.post('/api/links', tagsControllers.getTags, linkControllers.addLink);
router.post('/api/users', usersControllers.addUser);
router.post('/api/upVote', linkControllers.upVote);

router.get('/api/links', linkControllers.getAllLinks);
router.get('/api/users', usersControllers.getAllUsers);
router.get('/api/linksByDate', linkControllers.getLinksByDate);
router.get('/api/searchByTitle', linkControllers.searchByTitle);
router.get('/api/searchByTag', linkControllers.searchByTag);
router.get('/api/userLinks', usersControllers.getLinksByUser);
router.get('/api/userLinks', usersControllers.addFavorite);

module.exports = router;
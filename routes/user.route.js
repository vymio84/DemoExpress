var express = require('express');
var router = express.Router();
var usersController = require('../controller/users.controller');
var usersValidate = require('../validate/users.validate');

router.get('/', usersController.index);

router.get('/search', usersController.search);

router.get('/create', usersController.getCreate);

// demo middleware
router.post('/create', usersValidate.postCreate, usersController.postCreate);

router.get('/view/:id', usersController.view);

module.exports = router;

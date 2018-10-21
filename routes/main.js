const express = require('express');
const router = express.Router();
var mainController = require('../controller/mainController')();

router.post('/',mainController._post);

module.exports =router;
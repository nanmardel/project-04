const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/comments');

// /*---------- Public Routes ----------*/
router.post('/', commentsCtrl.create)  


/*---------- Protected Routes ----------*/

module.exports = router;
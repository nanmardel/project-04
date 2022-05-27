const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/comments');

// /*---------- Public Routes ----------*/
router.post('/', commentsCtrl.create)  //is authenticated 



/*---------- Protected Routes ----------*/

module.exports = router;
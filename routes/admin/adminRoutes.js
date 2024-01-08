const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController')

router.route("/createUser").get(adminController.createUserPage);
router.route("/createUser").post(adminController.createUser);

module.exports = router;
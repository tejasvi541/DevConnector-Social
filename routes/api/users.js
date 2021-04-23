const express = require("express");
// Initialising router
const router = express.Router();

//==================================== Test User Route =========================//
// @route       GET api/users
// @desc        Test route
// @access      PUBLIC
router.get("/", (req, res) => {
  res.send("User Route");
});

module.exports = router;

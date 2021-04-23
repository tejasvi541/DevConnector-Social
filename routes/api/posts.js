const express = require("express");
// Initialising router
const router = express.Router();

//==================================== Test User Route =========================//
// @route       GET api/posts
// @desc        Test route
// @access      PUBLIC
router.get("/", (req, res) => {
  res.send("posts Route");
});

module.exports = router;

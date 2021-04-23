const express = require("express");
// Initialising router
const router = express.Router();

//==================================== Test User Route =========================//
// @route       GET api/profile
// @desc        Test route
// @access      PUBLIC
router.get("/", (req, res) => {
  res.send("Profile Route");
});

module.exports = router;

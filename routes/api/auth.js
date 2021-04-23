const express = require("express");
// Initialising router
const router = express.Router();

//==================================== Test User Route =========================//
// @route       GET api/auth
// @desc        Test route
// @access      PUBLIC
router.get("/", (req, res) => {
  res.send("Auth Route");
});

module.exports = router;

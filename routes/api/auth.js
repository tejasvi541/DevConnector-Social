const express = require("express");
const auth = require("../../middleware/auth");
// Initialising router
const router = express.Router();

//==================================== Test User Route =========================//
// @route       GET api/auth
// @desc        Test route
// @access      Protected
router.get("/", auth, (req, res) => {
  res.send("Auth Route");
});

module.exports = router;

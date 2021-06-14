const express = require("express");
const auth = require("../../middleware/auth");
// const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
// Initialising router
const router = express.Router();

//==================================== Get User Route =========================//
// @route       GET api/auth
// @desc        Test route
// @access      Protected
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//==================================== Authenticate User Route =========================//
// @route       POST api/auth
// @desc        Authenticate User And get token
// @access      Protected
router.post(
  "/",
  [
    check("email", "Please write a valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pulling things out of req.body

    const { email, password } = req.body;
    try {
      // See if user exist
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

const express = require("express");
const { check, validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const config = require("config");
const User = require("../../models/User"); // Requiring User Model

// Initialising router
const router = express.Router();

//==================================== Resgister User Route =========================//
// @route       POST api/users
// @desc        Register
// @access      PUBLIC

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please write a valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password with 8 or more Characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pulling things out of req.body

    const { name, email, password } = req.body;
    try {
      // See if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already Exists" }] });
      }

      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        default: "mm",
      });
      //we create an instance of the user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

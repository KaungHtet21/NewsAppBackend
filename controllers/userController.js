const User = require('../models/userModel.js')
var crypto = require('crypto');
var mailer = require('../utils/Mailer.js');
const generateToken = require("../utils/generateToken.js")

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists && userExists.active) {
      return res.status(400).json({
        success: false,
        msg: "Entered email id is already registered with us. Login to continue",
      });
    } else if (userExists && !userExists.active) {
      return res.status(400).json({
        success: false,
        msg: "Account created but need to activate. A link sent with your registered mobile no",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    // Generate 20 bit activation code, crypto is build in package of nodejs
    crypto.randomBytes(20, async (err, buf) => {
      // Ensure the activation link is unique
      user.activeToken = user._id + buf.toString("hex");

      // Set expiration time is 24 hours
      user.activeExpires = Date.now() + 24 * 3600 * 1000;
      var link =
        process.env.NODE_ENV == "development"
          ? `http://localhost:${process.env.PORT}/api/users/active/${user.activeToken}`
          : `${process.env.api_host}/api/users/active/${user.activeToken}`;

      //Sending activation mail
      mailer.send({
        to: req.body.email,
        subject: 'Welcome',
        html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
      })

      try {
        await user.save()
        res.status(201).json({
          success: true,
          msg: `The activation email has been sent to ${user.email}, please click the activation link within 24 hours.`
        });
      } catch (error) {
        return next(err)
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server having some issues",
    });
  }
};

module.exports = {
  registerUser
}

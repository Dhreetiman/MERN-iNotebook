let router = require("express").Router();
let User = require("../models/User");
let bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken')
const { body, validationResult } = require("express-validator");

//======================< api for signup user >=========================//

router.post(
  "/signup",
  [
    body("email", "Plaese enter valid email").isEmail(),
    body("password", "Password must be minimum 6 character").isLength({
      min: 6,
    }),
    body("name", "Please enter a valid name")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      //validations
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send("user already exist with this email");
      }
      //encrypting password using bcrypt
      let salt = await bcrypt.genSalt(10);
      let secretpwd = await bcrypt.hash(password, salt);
      // creating new user
      user = await User.create({
        name: name,
        email: email,
        password: secretpwd,
      });
      // authenticating user using jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "shhh", { expiresIn: 144000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });


    } catch (error) {
      console.log(error);
      return res.status(500).json("Something went wrong");
    }
  }
);

//====================< Login api >============================//

router.post('/login',[

  body("email", "Plaese enter valid email").isEmail(),
  body("password", "Password is required").exists()


],async (req, res)=>{
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  try {

    const {email, password} = req.body
    let user = await User.findOne({email: email})
    if (!user) return res.status(400).json({ errors: { msg: "Invalid Credentials" } })
    let checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) return res.status(400).json({ errors: { msg: "Invalid Credentials" } })

    let payload = {
      user: {
        id : user.id
      }
    }

    jwt.sign(payload, "shhh", { expiresIn: 144000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong")
  }
})

module.exports = router;

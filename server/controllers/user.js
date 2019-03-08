const User = require("../models/userSchema");
const { normelizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");
/**
 * authentification controller
 */
exports.auth = function(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      errors: [
        { title: "Data missing", detail: "provide email and/or password" }
      ]
    });
  }

  User.findOne({ email }, function(err, user) {
    if (err) {
      return res.status(422).send({ errors: normelizeErrors(err.errors) });
    }
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Invalid user", detail: "User does not exist" }]
      });
    }
    if (user.hasSamePassword(password)) {
      // return JWT token
      // https://www.npmjs.com/package/jsonwebtoken
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        config.SECRET,
        { expiresIn: "1h" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: "Wrong data", detail: "Wrong email or password" }]
      });
    }
  });
};

/**
 * registration controller
 */
exports.register = function(req, res) {
  /*  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;
 */
  // même fonction
  const { username, email, password, passwordConfirmation } = req.body;
  if (!username || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing", detail: "provide email and/or username" }
      ]
    });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid password",
          detail: "password is not a same as confirmation"
        }
      ]
    });
  }
  /**
   * registration with control user already exist inside the function
   */
  /*
  Même écriture
  User.findOne({email});
  */
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normelizeErrors(err.errors) });
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid email",
            detail: "User with this email already exist"
          }
        ]
      });
    }
    const user = new User({
      username,
      email,
      password
    });

    user.save(function(err) {
      if (err) {
        return res.status(422).send({ errors: normelizeErrors(err.errors) });
      }
      return res.json({ registered: true });
    });
  });

  // res.json({ username, email });
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({ errors: normelizeErrors(err.errors) });
      }
      if (user) {
        // express
        res.locals.user = user;
        next();
      } else {
        return res.status(422).send({
          errors: [
            {
              title: "not authorized",
              detail: "you need to login to access"
            }
          ]
        });
      }
    });
  } else {
    return res.status(422).send({
      errors: [
        {
          title: "not authorized",
          detail: "you need to login to access"
        }
      ]
    });
  }
  function parseToken(token) {
    return jwt.verify(token.split(" ")[1], config.SECRET);
  }
};

const User = require("../models/userSchema");
const {normelizeErrors} = require('../helpers/mongoose');
exports.auth = function(req, res) {};

exports.register = function(req, res) {
  /*  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;
 */
  // même fonction
  const { username, email, password, passwordConfirmation } = req.body;
  if (!username || !email) {
    return res
      .status(422)
      .send({
        errors: [
          { title: "Data missing", detail: "provide email and/or password" }
        ]
      });
  }
  if (password !== passwordConfirmation) {
    return res
      .status(422)
      .send({
        errors: [
          {
            title: "Invalid password",
            detail: "password is not a same as confirmation"
          }
        ]
      });
  }

  /*
  Même écriture
  User.findOne({email});
  */
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normelizeErrors(err.errors)});
    }
    if (existingUser) {
      return res
        .status(422)
        .send({
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
        return res.status(422).send({errors: normelizeErrors(err.errors)});
      }
      return res.json({ registered: true });
    });
  });

  // res.json({ username, email });
};

const express = require("express");
const router = express.Router(); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const SECRET = process.env.SECRET;
const nodemailer = require('nodemailer');
const validateSignUpInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

router.post("/signup", (req, res) => {
   const {errors, isValid} = validateSignUpInput(req.body);
   const {user_name, email, password} = req.body;
   if (!isValid) {
      return res.status(400).json(errors);
   }
   User.findOne({$or:[{email},{user_name}]}).then(user => {
      if (user) {
         if (user.email === email)
            return res.status(400).json({ email: "Email redan registrerad" });
         else
            return res
               .status(400)
               .json({ user_name: "Användarnamnet är upptaget" });
      } else {
         const newUser = new User({ user_name, email, password });
         // hashing password before storing it in database
         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               if (err) throw err;
               newUser.password = hash;
               newUser
                  .save()
                  .then(user => res.json(user))
                  // .then(user => {
                  //    const payload = {
                  //       id: user.id,
                  //       user_name: user.user_name
                  //    };
                  //    jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
                  //       if (err) {
                  //          console.log(err);
                  //       }
                  //       const url = `http://localhost:3000/confirmation/${token}`;
                  //       // Send the email
                  //       // const transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
                  //       const transporter = nodemailer.createTransport({
                  //          service: 'Gmail',
                  //          auth: {
                  //            user: process.env.GMAIL_USER,
                  //            pass: process.env.GMAIL_PASS,
                  //          },
                  //        });
                  //       console.log(process.env.GMAIL_USER, '\n',process.env.GMAIL_PASS)
                  //       const mailOptions = { 
                  //          // from: 'no-reply@yourwebapplication.com',
                  //          to: user.email, subject: 'Account Verification Token',
                  //          // text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
                  //          html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                  //       };
                  //       transporter.sendMail(mailOptions, (err) => {
                  //           if (err) { return res.status(500).send({ msg: err.message }); }
                  //           res.status(200).send('A verification email has been sent to ' + user.email + '.');
                  //       });
                  //    });
                  // })
                  .catch(err =>
                     console.log({ error: "Error creating a new user" })
                  );
            });
         });
      }
   });
});

router.post("/login", (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);
   if (!isValid) {
      return res.status(400).json(errors);
   }
   const { email, password } = req.body;
   User.findOne({ email }).then(user => {
      if (!user) {
         return res.status(404).json({ email: "Epostadress hittades inte" });
      } else if(!user.isVerified) {
         return res.status(400).json({ email: "Vänligen verifiera epost för att logga in" });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
         if (isMatch) {
            const payload = {
               id: user.id,
               user_name: user.user_name
            };
            jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
               if (err) {
                  console.log(err);
               }
               return res.json({
                  success: true,
                  token: "Bearer " + token
               });
            });
         } else {
            return res.status(400).json({ password: "Felaktigt lösenord" });
         }
      });
   });
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ["profile", "email"]})
);

router.get(
   '/auth/google/redirect',
   passport.authenticate('google', {
      failureRedirect: "/auth/login/failed"
    }),
   (req, res) => {
      signJWT(req,res);
   }
);

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope : ['email'] }));

router.get('/auth/facebook/redirect',
   passport.authenticate('facebook', { failureRedirect: '/login' }),
   (req, res) => {
      signJWT(req,res);
   }
);

const signJWT = (req, res) => {
   // Successful authentication, sign jwt and redirect to success .
   const {id, user_name} = req.user;
     jwt.sign({ id, user_name }, SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) {
           console.log(err);
           return res.cookie('jwt', {
              success: false,
           });
        }
        res.cookie('jwt', {
           success: true,
           token: "Bearer " + token
        });
        res.redirect('/signup/success'); 
     });
};

// when login is successful, retrieve user info
router.get("/auth/login/success", (req, res) => {
   const { jwt } = req.cookies;
   if (jwt) {
     res.json(jwt);
   } else {
      res.status(401).send('login failed');
   }
});

module.exports = router;
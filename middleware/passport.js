const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const SECRET = process.env.SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

module.exports = passport => {

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });
   
   passport.deserializeUser((id, done) => {
      User.findById(id)
          .then(user => {
            done(null, user);
          })
          .catch(err => {
             console.error('Failed to deserialize an user ', err);
          });
   });

   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         User.findOne({ _id: jwt_payload.id })
            .then(user => {
               if (user) {
                  return done(null, user);
               } else {
                  return done(null, false);
               }
            })
            .catch(err =>
               console.log({ error: "Error authenticating the user" })
            );
      })
   );

   passport.use(new GoogleStrategy({
       clientID: GOOGLE_CLIENT_ID,
       clientSecret: GOOGLE_CLIENT_SECRET,
       callbackURL: '/api/users/auth/google/redirect'
     },
      (accessToken, refreshToken, profile, done) => {
       const {displayName, id, emails} = profile;
       User.findOne({ 'google.id': id})
           .then(user => {
              // Check if user already exists   
              if(user) {
               done(null, user);
              } else {
                  const newUser = new User({
                     user_name: displayName.replace(/\s/g, '_'),
                     email: emails[0].value,
                     google: { id, accessToken }
                  });
                  newUser
                  .save()
                  .then((newUser) => {
                     console.log(newUser);
                     done(null, newUser);
                  })
                  .catch(err => {
                     console.log({ error: "Error creating a new user with google" }, err)
                  })
              }
           })
       
     }
   ));
};
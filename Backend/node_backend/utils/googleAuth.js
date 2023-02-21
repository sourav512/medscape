// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth2')
// passport.use(new GoogleStrategy({
//     clientID: '845493944298-r74d75s7pmb9gs8tn9fubpsbei7ig3s5.apps.googleusercontent.com',
//     clientSecret: '845493944298-r74d75s7pmb9gs8tn9fubpsbei7ig3s5.apps.googleusercontent.com',
//     callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // User's profile information
//     return cb(null, profile);
//   }
// ));

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
//   });
  
//   // Deserialize user data from the session
//   passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
//   });
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
      done(null, user);
});

passport.use(new GoogleStrategy({//configurando passport com dados da API do google
    clientID: 'segredo',
    clientSecret: 'segredo',
    callbackURL: "http://localhost:3000/google/callback"
  },//função que retorna dados do usuario pelo profille
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));
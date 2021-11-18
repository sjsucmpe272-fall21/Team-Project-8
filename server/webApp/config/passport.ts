import passport from 'passport'
import { Strategy as LocalStrategy }  from 'passport-local';

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, done) => {
  
}));
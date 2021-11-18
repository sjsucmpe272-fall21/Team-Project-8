import express from 'express';
import passport from 'passport'
import { Strategy as LocalStrategy }  from 'passport-local';
import { userModel } from './models/UserModel';

export const WebAppRouter = express.Router();

const WEB_APP_HOME_PAGE = '/wa'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  console.log("Reached verify function");
  try {
    const authenticateResult = await userModel.authenticateUser(email, password);
    if (!authenticateResult) {
      return done(null, false);
    }
    console.log(authenticateResult);
    return done(null, authenticateResult);
  } catch (error: any) {
    done(error);
  }
}));

WebAppRouter.use(passport.initialize());
WebAppRouter.use(express.json());

WebAppRouter.route('/')
.get((req, res) => {
  console.log("Reached web app main route");
  res.send('Welcome to WebApp main route at: ' + req.originalUrl);
})
 
WebAppRouter.route('/login')
  .post((req, res, next) => {
    console.log("Reached login");
    next()
  },passport.authenticate('local'), (req, res) => {
    console.log(req.method);
    res.send('Welcome to WebApp authenticated: ' + req.originalUrl);
  })

WebAppRouter.route('/logout') 
  .get((req, res) =>{
    req.logout();
    res.redirect(WEB_APP_HOME_PAGE);
  })

WebAppRouter.route('/signup')
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("No email or password");
    }
    try {
      const user = await userModel.addUser(email, password);
      res.redirect('/api/wa');
    } catch(err: any) {
      res.status(409).send(err.message);
    }
  })

WebAppRouter.route('*')
  .get((_, res) => {
    res.redirect(WEB_APP_HOME_PAGE);
  })










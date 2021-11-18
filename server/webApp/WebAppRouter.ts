import express from 'express'


export const WebAppRouter = express.Router();

WebAppRouter.route('/')
  .get((req, res) => {
    console.log(req.method);
    res.send('Welcome to WebApp main route at: ' + req.originalUrl);
  })












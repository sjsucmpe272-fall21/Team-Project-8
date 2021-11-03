import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from '../client/components/app'
import { VendingMachineRouter } from './vendingMachine/VendingMachineRouter';
import { WebAppRouter } from './webApp/WebAppRouter'


const server = express()

server.use('/api/vm', VendingMachineRouter);
server.use('/api/wa', WebAppRouter);

// Serving static resources, mainly rendered React components
server.use('/', express.static(path.join(__dirname, 'static')))



server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))



const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8'
)

const assets = JSON.parse(manifest) 

// Routes for API

server.get('*', (req, res) => {


  const component = ReactDOMServer.renderToString(
    (<StaticRouter location={req.url}>
      <App />
    </StaticRouter>)
  );

  res.render('client', { assets, component });
})





server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})
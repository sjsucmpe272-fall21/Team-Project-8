import express from 'express'

export const VendingMachineRouter = express.Router();

VendingMachineRouter.route('/')
  .get((req, res) => {
    res.send('Welcome to VendingMachine main route at: ' + req.originalUrl);
  })
import express from 'express'

import { logger } from '../Logger';
import { connection as connPromise } from '../Database/Connection';

export const VendingMachineRouter = express.Router();

VendingMachineRouter.route('/')
  .get((req, res) => {
    res.send('Welcome to VendingMachine main route at: ' + req.originalUrl);
  })

VendingMachineRouter.route('/nearestMachineCheck')
  .get(async (req, res) => {
    const { productId, flr } = req.query;
    logger.info("Quantity check for the product " + `productId(${productId})`);

    console.log(req.query);

    console.log("productID", productId);
    console.log(req.query, productId, flr)

    let sql1 = `CALL nearestMachineCheck('${productId}',${flr})`
    console.log(sql1);
    const connection = await connPromise;
    try {
      const results = await connection.query(sql1);
      console.log(results);
      res.send(results[0])
    }
    catch (error) {
      res.send(error)
    }
  })

VendingMachineRouter.route('/quantityCheckandUpdation')
  .get(async (req, res) => {
    const { machineId, productId, cost, card_number } = req.query;

    let sql1 = `CALL quantityCheck('${machineId}','${productId}')`
    logger.info(
      `Calling quantityCheck for the product productId(${productId}) in the machine machineId(${machineId})`
    );

    const connection = await (await connPromise).getConnection();

    try {
      const results = await connection.query(sql1);
      const result = results[0][0].quantity;

      if (result <= 0) {
        res.send('Item out of stock')
      }

      try {
        await connection.beginTransaction();

        const sqlQuery = `CALL purchaseItem('${machineId}',${cost},${card_number},'${productId}')`;

        try {
          const results2 = connection.query(sqlQuery);
          await connection.commit();
          connection.release();
          res.send({
            message: "Transaction Successful",
            results
          });

        } catch (err) {
          await connection.rollback();
          await connection.release();
          res.send("Error");
        }


      }

      catch (err) {
        await connection.rollback();
        connection.release();
        logger.info("Error in Transaction")
        res.send("Error in transaction");
      }
    }
    catch (err) {
      logger.info("Error while acquring the connection")
      res.send(err)
    }
  })


const { application } = require('express');
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cors = require('cors');
var mysql = require('mysql');
var constants=require('./config.json');
const log4js = require('log4js');



log4js.configure({
    appenders: {
        app: { type: 'file', filename: 'application.log' }
    },
    categories: {
        default: { appenders: ['app'], level: 'info' }
    }
})

const logger = log4js.getLogger();


var connection = mysql.createPool({
    host : constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port:constants.DB.port,
    database:constants.DB.database
});
connection.getConnection((err)=>{
    if(err){
        throw 'Error occured ' +err;
    }
    console.log("db connected");
});

app.use(cors())
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret              : 'cmpe272_react_nodejs_mysql',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));
app.use(bodyParser.json());




app.get('/nearestMachineCheck',(req,res)=>{
    
   const {productId,flr} = req.query;
   logger.info("Quantity check for the product "+`productId(${productId})`);

    console.log(req.query);

    console.log("productID",productId);
    console.log(req.query, productId,flr)

    let sql1=`CALL nearestMachineCheck('${productId}',${flr})`
    console.log(sql1);
    connection.query(sql1,(error,results)=>{
        if (error){
            res.send(error)
        }
        console.log(results);
        res.send(results[0])
    })
    

        }
)



app.get('/quantityCheckandUpdation',(req,res) =>{
    const{machineId,productId,cost, card_number} =req.query;

    let sql1=`CALL quantityCheck('${machineId}','${productId}')` 
    logger.info("Calling quantityCheck for the product "+`productId(${productId})`+" in the machine "+`machineId(${machineId})`)

    connection.getConnection((err,connection)=>{
        connection.query(sql1,(err,results)=>{
            if(err){
                logger.info("Error while acquring the connection")
                res.send(err)
            }
            const result = results[0][0].quantity
    
            if (result>0){
                connection.beginTransaction((err)=>{
                    if(err){
                        connection.rollback(()=>{
                            connection.release();
                            logger.info("Error in Transaction")
                            res.send("Error in transaction")
                        })
                    }else{
                        const sqlQuery = `CALL purchaseItem('${machineId}',${cost},${card_number},'${productId}')`;
                        connection.query(sqlQuery,(err)=>{
                            if(err){
                                connection.rollback(()=>{
                                    connection.release();
                                    res.send("Error");
                                })
                            }else{
                                connection.commit((err,results)=>{
                                    if(err){
                                        connection.rollback(()=>{
                                            connection.release();
                                            res.send("Error")
                                        })
                                    }else{
                                        connection.release();
                                        const response = {
                                            message:"Transaction Successful",
                                            results
                                        }
                                        res.send(response);
                                    }
                                })
                            }
                        })
                    }
                })
    
            }else{
                res.send('Item out of stock')
            }
            
    
        })
    })

  
}


)

const port = 3001
app.listen(port, () => {
    console.log("Listening");
});


const { application } = require('express');
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var mysql = require('mysql');
var constants=require('./config.json');
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
    secret              : 'cmpe273_react_nodejs_mysql',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));
app.use(bodyParser.json());


app.put('/quantitycheck',(req,res)=>{
    const {
        machine_id,
        PRODUCT_ID
    }= req.body;

    let sql1=`UPDATE MACHINE_ITEMS SET Quantity = quantity-1 where m_id='${machine_id}' and PRODUCT_ID='${PRODUCT_ID}' and QUANTITY>0`
    console.log(sql1);
    connection.query(sql1,(error,results)=>{
        if(error){
            res.send(error);
        }
        if(results.affectedRows==0){
            res.send("Item Unavailable");
        }else{
            res.send("Item Available");
        }
        
    });

})


app.post('/samefloorcheck',(req,res)=>{
    const {
        PRODUCT_ID,
        FLOOR
    }= req.body;

    let sql1=`select MACHINE_NUMBER,floor from vending_machines where MACHINE_ID in (select mi.M_ID from MACHINE_ITEMS mi,vending_machines v where v.MACHINE_ID =mi.M_ID and v.floor ='${FLOOR}' and mi.product_id='${PRODUCT_ID}' and quantity>0) order by MACHINE_NUMBER asc`
    console.log(sql1);
    connection.query(sql1,(error,results)=>{
        if(error){
            res.send(error);
        }

        

        if(results.length==0)
        {
            res.send("Item is not available in this floor ")
        }

        else
        {
            res.send("Item is available in this floor at machine "+results[0].MACHINE_NUMBER)
        }
        
    });
});


app.post('/belowfloorcheck',(req,res)=>{
    const {
        PRODUCT_ID,
        FLOOR
    }= req.body;
    
    let sql1=`select MACHINE_NUMBER,floor from vending_machines where  MACHINE_ID in(select mi.M_ID from MACHINE_ITEMS mi,vending_machines v where v.MACHINE_ID =mi.M_ID and v.floor <'${FLOOR}' and mi.product_id='${PRODUCT_ID}' and quantity>0) order by MACHINE_NUMBER asc limit 1`
    console.log(sql1);
    connection.query(sql1,(error,results)=>{
        if(error){
            res.send(error);
        }
        if(results.length==0)
        {
            res.send("Item is not available in any floor below")
        }
    
        else
        {
            res.send("Item is available in the floor "+results[0].floor+" in the machine "+results[0].MACHINE_NUMBER)
        }
    
    });
});


app.post('/abovefloorcheck',(req,res)=>{
    const {
        PRODUCT_ID,
        FLOOR
    }= req.body;
    
    let sql1=`select MACHINE_NUMBER,floor from vending_machines where  MACHINE_ID in(select mi.M_ID from MACHINE_ITEMS mi,vending_machines v where v.MACHINE_ID =mi.M_ID and v.floor >'${FLOOR}' and mi.product_id='${PRODUCT_ID}' and quantity>0) order by MACHINE_NUMBER asc limit 1`
    console.log(sql1);
    connection.query(sql1,(error,results)=>{
        if(error){
            res.send(error);
        }
        if(results.length==0)
        {
            res.send("Item is not available in any floor above")
        }
    
        else
        {
            res.send("Item is available in the floor "+results[0].floor+" in the machine "+results[0].MACHINE_NUMBER)
        }
    
    });
});





var server = app.listen(3001, function () {
    console.log("Server listening on port 3001");
});

module.exports=app;
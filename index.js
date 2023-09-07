 const db = require('./model/modelsindex');
 const express = require('express');

 const app = express();
 const port = 6000;

 app.use(express.json());
 app.use(express.urlencoded({extended:true}));


 app.post('/',async (req,res)=>{
    await db.users.create(req.body);
 })

 app.listen(port,()=>{
    console.log(`live on port ${port}`)
 })

 db.sequelize.sync({alter:true});

// console.log(db);
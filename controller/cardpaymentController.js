const express = require('express');
const path = require('path')
const router = express.Router();
const app = express();
const db = require('../model/modelsindex');
const interswitch = require('../thirdpartyapi/xtrapay');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const crypto = require('crypto');


dotenv.config();

app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 app.set('view engine', 'ejs');
 app.set('views',path.join(__dirname,'../views'));
 

 router.post('/encrypt',async(req,res)=>{
    try {
        const uniqueId = (length=16) =>{
            return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
        }
        const w = "PROWAN"+ uniqueId().toString()
        const pkold = ("SGHVSNVSNBVSKBSKBNSSOVSBV6594030202SVBSDKVS".substring(0,32))//The old key
        const pknew = ("TiKl5T17p5dW3vbAe5Faf8nLrLPzTtx".substring(0,16))//The new key 

        const IV = (w.substring(0,16))
       // const cipher = crypto.createCipheriv('aes-256-cbc',pkold,IV)//crypto.CreateCipheriv('aes-256-cbc',pk,IV)
        //console.log(cipher)//to track key length error;
        const cipher2 = crypto.createCipheriv('aes-128-cbc',pknew,IV)//the new key is not matching 
        //console.log(cipher2);//to track key legnth error

//let encrypted = cipher.update(JSON.stringify(req.body.data),'utf-8','hex');
//console.log("enc1",encrypted)
let encrypted2 = cipher2.update(JSON.stringify(req.body.data),'utf-8','hex');
//console.log("enc2",encrypted2)
//encrypted += cipher.final('hex');
encrypted2 += cipher2.final('hex');
//console.log(encrypted)
//console.log(encrypted2)
//console.log(w)

const obj2 = {
    amount:req.body.amount,
    card:encrypted2,
    pin:req.body.pin,
    reference:w,
}

const card = await interswitch.cardpay(obj2)
console.log(card)

if(card.data.success == false){
    res.status(400).json({
        message:card.data
    })
    return "failed"
}


     if(card.data.data.TermUrl == `https://mobile.xtrapay.ng/api/api-inter-continu/${obj2.reference}`){


const object = {
    TermUrl:card.data.data.TermUrl,
    MD:card.data.data.MD,
    jwt:card.data.data.jwt
}
console.log(card.data.data);
    res.render('test.ejs',{post:object})
    console.log('here');

    return 'redirect'
}

res.json(card.data)



        
    } catch (error) {
        console.log(error)
        res.send(error)
    
        
    }

 })


 router.post('/confirmotp/',async(req,res)=>{
    try{   const otp = await interswitch.otp(req.body);
      if(otp.data.success == true){
         await db.refs.create({reference:otp.data.reference,message:otp.data.message})
         console.log(otp)
      }
      //work on this
    //  console.log(otp);
      res.json(otp.data);
  }catch(error){
           console.log(error.config.headers)
      res.send(error)
  }
  
  })
  
router.post('/resendotp/',async(req,res)=>{
      try{const otp = await interswitch.resendotp(req.body);
  
          // console.log(otp);
          res.json(otp.data);}
  catch(error){
              res.json(error)
          }
  
  })
  

 module.exports = router;
const express = require('express');
const router = express.Router();
const app = express();
const db = require('../model/modelsindex');
const interswitch = require('../thirdpartyapi/xtrapay');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');


dotenv.config();

app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 router.post('/encrypt',async(req,res)=>{
    try {
        const uniqueId = (length=16) =>{
            return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
        }
        const w = "BBT"+ uniqueId().toString()
        const pk = ("TiKl5T17p5dW3vbAe5Faf8nLrLPzTtx".substring(0,32))

        const IV = (w.substring(0,16))
        const cipher = crypto.CreateCipheriv('aes-256-cbc',pk,IV)

let encrypted = cipher.update(JSON.stringify(req.body.data),'utf-8','hex');
encrypted += cipher.final('hex');

const obj2 = {
    amount:req.body.amount,
    card:encrypted,
    pin:req.body.pin,
    reference:w,
}

const card = await interswitch.cardpay(obj2)

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
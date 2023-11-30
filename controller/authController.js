const express = require('express');
const router = express.Router();
const app = express();
const db = require('../model/modelsindex');
const email = require('../email/nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mn = require('../final.json')
const crypto = require('crypto');
dotenv.config();


app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 router.post('/register', async (req,res)=>{
    const hashedPassword = bcrypt.hashSync(req.body.password,10);

    //try catch
    //olduser
    //input validation



try {

//   const y = mn.filter((x)=>{
//     if(x['M/N'] == req.body.membershipNumber.toString())  
//        return x
//    })
// if (y.length <= 0){
// res.status(400).json({message:"please enter your prowan or anan number"})
// return false
// }


 const user =  await db.users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    email: req.body.email,
    password: hashedPassword,
    title: req.body.title,
    status: req.body.status,
    phone: req.body.phone,
    membershipNumber: req.body.membershipNumber,
    dateOfBirth:req.body.dateOfBirth,
    residentialAddress: req.body.residentialAddress,
    nationality: req.body.nationality,
    stateOfOrigin: req.body.stateOfOrigin,
    branch: req.body.branch,
    presentEmployer: req.body.presentEmployer,
    memberOfManagementBoard:req.body.memberOfManagementBoard,
    positionHeld: req.body.positionHeld,
   

})

//try id and email

const token = jwt.sign(
    {email:req.body.email},process.env.SECRETE,{expiresIn:86400}
    
)

const info = email.transporter.sendMail({
from: 'info@prowan.ng', // sender address
to: req.body.email, // list of receivers
subject: "Prowan web registration", // Subject line
html: `<p>Hello ${req.body.firstName} ${req.body.lastName} your prowan web registration was successful.</p>
        <p><b>CONGRATULATIONS!!!</b></p>`, // plain text body
//html: "<b>Hello world?</b>", // html body
})

res.status(200).send({auth: true,token: token,user,email:await info.response,email:await info.envelope})
  
} catch (error) {
	console.log(error);
  res.status(419).send({error:'bad request'})
  
}
   

 })

 router.post('/login', async function(req, res) {
    try {

      const user = await db.users.findOne({ where: { email: req.body.email } })

    
      if (!user) return res.status(404).send('No user found.');
      
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      const token = jwt.sign({email:req.body.email}, process.env.SECRETE, {
        expiresIn: 86400 // expires in 24 hours
      })
      
      res.status(200).send({ auth: true, token: token,user });
      
    } catch (error) {
      console.log(error);
  res.status(419).send({error:'bad request'})
    }

    
    });
    
    router.post('/password-verification',async function(req,res){

      try {

        const user = await db.users.findOne({ where: { email: req.body.email } })

    
      if (!user) return res.status(404).send('No user found.');
      const w = crypto.randomBytes(32).toString("hex")
      let token = await db.token.findOne({where:{user:user.id}})
      // console.log(token)
      if(!token){
        token = await db.token.create(
          {user: user.id,
                token: crypto.randomBytes(32).toString("hex"),
          })
       } 
       else{
        
       await db.token.update({ token: w}, {
          where: {
            user: user.id
          }
        });
        
      }
      token = await db.token.findOne({where:{user:user.id}})
      
      const link = `${process.env.BASE_URL_FRONT}/passwordreset?id=${user.id}&token=${token.token}`;
      const info = email.transporter.sendMail({
        from: 'info@prowan.ng', // sender address
        to: req.body.email, // list of receivers
        subject: "Prowan reset password", // Subject line
        html: `<p>Hello click the link below to change your password</p>
                <p>${link}</p>`, // plain text body
        //html: "<b>Hello world?</b>", // html body
        })
        
        res.status(200).send("a password reset link has been sent to your email")
        
      } catch (error) {
        console.log(error);
  res.status(419).send({error:'bad request'})
        
      }
      
      

     // res.send("password reset link sent to your email account");

    })

    router.post('/changepassword/:userid/:token', async (req,res)=>{

      try {
        const user = await db.users.findOne({ where: { id: req.params.userid }})
        if (!user) return res.status(400).send("invalid link or expired");
  
  
        const token = await db.token.findOne(
          {where:{user:user.id,token:req.params.token}})
          //console.log(token)

         

          if (!token) return res.status(400).send("Invalid link or expired");
  
          const hashedPassword = bcrypt.hashSync(req.body.password,10);
  
          await db.users.update({ password: hashedPassword }, {
            where: {
              id: req.params.userid
            }
          });
  
          
          // await db.token.destroy({
          //   where: {
          //     token: req.params.token
          //   }
          // });
  
          res.send("password reset sucessfully.");
        
      } catch (error) {
        console.log(error);
  res.status(419).send({error:'bad request'})
      }
   

    })
  module.exports = router;

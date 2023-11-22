const express = require('express');
const router = express.Router();
const app = express();
const db = require('../model/modelsindex');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mn = require('../final.json')
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
res.status(200).send({auth: true,token: token,user})
  
} catch (error) {
	console.log(error);
  res.status(419).send({error:'bad request'})
  
}
   

 })

 router.post('/login', async function(req, res) {

    const user = await db.users.findOne({ where: { email: req.body.email } })

    
      if (!user) return res.status(404).send('No user found.');
      
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      const token = jwt.sign({email:req.body.email}, process.env.SECRETE, {
        expiresIn: 86400 // expires in 24 hours
      })
      
      res.status(200).send({ auth: true, token: token,user });
    });
    
  module.exports = router;

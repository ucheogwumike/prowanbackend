 const db = require('./model/modelsindex');
 const express = require('express');
 const multer = require('multer');
 const path = require('path')
 //const upload = multer({ dest: './uploads'});
 const AuthController = require('./controller/authController');
 const cardController = require('./controller/cardpaymentController');
 const fs = require('fs')
 const auth = require('./middleware/auth')
 const dotenv = require('dotenv');
 const cors = require('cors')
 

 
 
 
 




 dotenv.config();

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
      cb(null, Date.now() +`.${ext}`);
    }
  });

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: multerFilter,
         });

 const app = express();
 const port = 4000;


 app.use(cors());
 app.use(express.static(path.join(__dirname, '/uploads')));
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 


 app.use('/api/auth', AuthController);
 app.use('/payment',cardController);

 app.get('/',async (req,res)=>{
    // await db.users.create(req.body);
    res.send('hello')
 })

 app.get('/userslist',async (req,res)=>{
  try{
    const user = await db.users.findAll({})
    res.send(user)
  }catch(error){
    res.send(error)
  }
 
})

 app.get('/users/:email',auth,async (req,res)=>{
  try {
    console.log(req.params)
    const user = await db.users.findOne({ where: { email: req.params.email } })
    res.send(user);
  } catch (error) {
    console.log(error)
  }
  

  


})



app.get('/usertotal',async (req,res)=>{
    try {
      console.log(req.params)
      const user = await db.users.findAll({})
	const total = user.length
      res.status(200).json({total});
	console.log(total)
    } catch (error) {
      console.log(error)
	res.status(400).send(error)
    }
    
  })



 app.post('/transferusertransactions',auth,async(req,res)=>{

  try {
    const uniqueId = (length=16) =>{
      return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
  }
  const w = "PROWAN"+ uniqueId().toString()

    const user = await db.users.findOne({where:{email:req.body.email}})
    console.log(req.body.title)
   const transaction = await db.transactionStatus.create({reference:w,
                                    title:req.body.title,
                                  amount:req.body.amount,
                                  stus:"pending",
                             //     userId:user.id
                                });
  
    res.status(200).send({message:"transaction updated",transaction:transaction})
  } catch (error) {
         res.status(419).send({error:'bad request'})
    
  }

 })

 app.post('/usertransactions',auth,async(req,res)=>{
  try {
    const user = await db.users.findOne({where:{email:req.body.email}})
    console.log(req.body.title)
   const transaction = await db.transactionStatus.create({reference:req.body.reference,
                                    title:req.body.title,
                                  amount:req.body.amount,
                                  stus:"pending",
                            //      userId:user.id
                                });
  
    res.status(200).send({message:"transaction updated",transaction:transaction})
  } catch (error) {
         res.status(419).send({error:'bad request'})
    
  }
  
   })


   app.patch('/updateusertransactions',auth,async(req,res)=>{
    try {
      const transaction  = await db.transactionStatus.findOne({where:{reference:req.body.reference}})
      console.log(req.body.title)
     const transactionStatus =  await db.transactionStatus.update({ stus:"success" }, {
      where: {
        reference: transaction.reference
      },
    });
      res.status(200).send({message:"transaction updated",transaction:transactionStatus})
    } catch (error) {
           res.status(419).send({error:'bad request'})
      
    }
    
     })  

app.get('/alltransactions',auth,async(req,res)=>{
  try {
    const transactions = await db.transactionStatus.findAll({})
	//const total = user.length
      res.status(200).json({transactions});
  } catch (error) {
    res.status(419).send({error:'bad request'})
  }
  
})

app.get('/allusertransactions/:email',auth,async(req,res)=>{
  try {
    const user = await db.users.findOne({where:{email:req.params.email}})
    const transactions = await db.transactionStatus.findAll({where:{userId:user.id}})
	//const total = user.length
      res.status(200).json({transactions});
  } catch (error) {
    res.status(419).send({error:'bad request'})
  }
  
})

app.get('/getatransaction/:reference',auth,async(req,res)=>{
  try {
    const transaction = await db.transactionStatus.findOne({where:{reference:req.params.reference}})
	//const total = user.length
      res.status(200).json({transaction});
  } catch (error) {
    res.status(419).send({error:'bad request'})
  }
  
})

 app.post('/profile',auth,upload.single('picture'),async (req,res,next)=>{
    //await db.users.create(req.body);
    //req.file.filename = `john.png`
    // console.log( `${process.env.BASE_URL}/${req.file.filename}`)
    try {
      await db.users.update({ profilePicture: `${process.env.BASE_URL}/${req.file.filename}` }, {
            where: {
              email: req.body.email,
            },
          });

          //console.log(user)

       // user.save();
//          console.log(req.file.filename)

          res.status(200).send({message:"profile picture changed",user:`${process.env.BASE_URL}/${req.file.filename}`})
        
    } catch (error) {
      console.log(error)
         res.status(419).send({error:'bad request'})
 
    }
   
 })
 app.listen(port,()=>{
    console.log(`live on port ${port}`)
 })

 db.sequelize.sync();



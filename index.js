 const db = require('./model/modelsindex');
 const express = require('express');
 const multer = require('multer');
 const path = require('path')
 //const upload = multer({ dest: './uploads'});
 const AuthController = require('./controller/authController');
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

 app.get('/',async (req,res)=>{
    // await db.users.create(req.body);
    res.send('hello')
 })

 app.post('/profile',auth,upload.single('picture'),async (req,res,next)=>{
    //await db.users.create(req.body);
    //req.file.filename = `john.png`
    // console.log( `${process.env.BASE_URL}/${req.file.filename}`)
    try {
        await db.users.update({ profilePicture: `${process.env.BASE_URL}/${req.filename}` }, {
            where: {
              email: req.body.email,
            },
          });

          await db.users.save();

          res.status(200).send({message:"profile picture changed"})
        
    } catch (error) {
        
    }
   
 })
 app.listen(port,()=>{
    console.log(`live on port ${port}`)
 })

 db.sequelize.sync();

// console.log(db);
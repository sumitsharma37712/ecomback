const express= require('express')
const session = require('express-session')
const router=new express.Router()

const cors = require("cors");
router.use(cors());
const bodyParser = require("body-parser"); // Middleware
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cookie = require("cookie-parser");
const {  UserReg, UserAuth } = require('../controllers/UserController');
const { Categorya, delCategory, allCat, selectCat } = require('../controllers/CardController');
const salt = 10;
JWT_SECRET = process.env.JWT;



router.use(
    session({
      secret: "secretkeyforusersa",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
  
  var storage = multer.diskStorage({
    destination: "src",
  
    destination: (req, file, callBack) => {
      callBack(null, "src"); // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
      callBack(null, file.originalname);
    },
  });
  var upload = multer({
    storage: storage,
  });
  


//   All routers start 

// Authentication 
router.route('/api/create').post(UserReg)
// router.post('/api/create',UserAuth)
router.route('/api/auth').post(UserAuth)



// Category route
router.route('/api/category/new').post(Categorya)
router.route('/api/category').get(allCat)
router.route('/api/category/:id').get(selectCat)
router.route('/api/category/new/:id').delete(delCategory)












module.exports=router;
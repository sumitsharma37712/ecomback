const express= require('express')
const session = require('express-session')
const router=new express.Router()


// connection const variable 
const {  UserReg, UserAuth } = require('../controllers/UserController');
const { Categorya, delCategory, allCat, selectCat, updateCategory } = require('../controllers/CardController');
const { CreateProduct, selectProduct, allProduct, delProduct, updateProduct, selectProcat, countProduct, filterProduct, featuredProduct } = require('../controllers/ProductController');




const cors = require("cors");
router.use(cors());
const bodyParser = require("body-parser"); // Middleware
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cookie = require("cookie-parser");
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
router.route('/api/create').post(UserReg)  //create user 
// router.post('/api/create',UserAuth)
router.route('/api/auth').post(UserAuth) // authenticate user



// Category route
router.route('/api/category/new').post(Categorya)  // create Categories
router.route('/api/category').get(allCat) //get all categories
router.route('/api/category/:id').get(selectCat)  //select spacific category
router.route('/api/category/new/:id').delete(delCategory) // delete category one
router.route('/api/category/:id').put(updateCategory) //update category 


// product Route
router.route('/api/products/new').post(CreateProduct)  //create product
router.route('/api/products').get(allProduct)  //get all products 
// router.route('/api/products/:id').get(selectProduct) //get spacific products 
router.route('/api/products/new/:id').delete(delProduct)  //delete product one
router.route('/api/products/:id').put(updateProduct)  //update product file
// filter product categories
router.route('/api/products/:id').get(selectProcat) //get all product include categotry
router.route('/api/products/get/count').get(countProduct)  //get all count product
router.route('/api/products/get/fetures/:count').get(featuredProduct) //get featured product how much
// router.route('/api/products/fil').get(filterProduct)












module.exports=router;

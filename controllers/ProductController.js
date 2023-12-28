const expressAsyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Category = require("../database/model/Card");
const Product = require("../database/model/Product");

const CreateProduct=expressAsyncHandler(async(req,res)=>{
    const {name,description,richDiscription,image,images,brand,price,countInStock,category,ratting,numReviews,isFetured,dateCreated}=req.body
    const cat1=req.body.category
    // console.log(cat1)
    try {
        const check = await Category.findById({_id:cat1});
        if(!check){
             res.status(400).json('invalid category')
            //  console.log('invalid category')

        }else{
            const response = await Product.create({
                name,description,richDiscription,image,images,brand,price,category,countInStock,ratting,numReviews,isFetured
                // filename:req.file.filename
            });
            res.status(200).json(response);
            // console.log(`Product created`);
        }
    } catch (error) {
        res.status(404).json(error)
        // console.log(error)
    }
})
const selectProduct=expressAsyncHandler(async(req,res)=>{
    const sel=req.params.id
    try{

        const response=await Product.findById(sel).select('category')
        res.status(200).json(response)
    }catch(error){
        res.status(404).json(error)
    }
})
const allProduct=expressAsyncHandler(async(req,res)=>{
    
    try {
        const response =await Product.find()
        res.status(200).json(response)
        
    } catch (error) {
        res.status(404).json(error)
        
    }
})
const updateProduct=expressAsyncHandler(async(req,res)=>{
    const upid=req.params.id
    const {name,description,richDiscription,image,images,brand,price,countInStock,category,ratting,numReviews,isFetured}=req.body
    const cat1=req.body.category
    try {
        if(!mongoose.isValidObjectId(upid)){
            return res.status(400).json('invalid product id')
        }
        const check = await Category.findById({_id:cat1});
        if(!check){
             res.status(400).json('invalid category')
            //  console.log('invalid category')

        }else{
            const update = await Product.findByIdAndUpdate({_id:upid},{ $set: { name,description,richDiscription,image,images,brand,price,category,countInStock,ratting,numReviews,isFetured}})
            if (update) {
                res.status(200).send("update success");
                // console.log("update success");
            } else {
                res.status(200).send("update not success");
                // console.log("update not success");
            }
        }        
    } catch (error) {
        // console.log('errr')
        res.status(400).send(error)
        
    }


})
const delProduct = expressAsyncHandler(async(req,res)=>{
    const del=req.params.id
    try {
        let Cat = await Product.deleteOne({ _id: del });
        if (Cat) {
          res.status(200).send("delete success");
        } else {
          res.status(400).send("not delete data");
        }
      } catch (e) {
        res.status(404).send(e);
      }


})



// filter part information
const selectProcat=expressAsyncHandler(async(req,res)=>{
    const sel=req.params.id
    try{
        const response = await Product.findById(sel).populate('category');
        res.status(200).json(response)
    }catch(error){
        res.status(404).json(error)
    }
})
// all product count
const countProduct=expressAsyncHandler(async(req,res)=>{
    try{
        const response=await Product.countDocuments()
        if(!response){
            return res.status(500).json({success:false})
        }
        res.status(200).json(response)
        // console.log(response)
    }catch(error){
        res.status(400).json(error)
        // console.log(err)
    }
})
const filterProduct=expressAsyncHandler(async(req,res)=>{
    const filters = req.query
    try{
        const response=await Product.find({})
        const filteredUsers = response.filter((user) => {
            let isValid = true;
            for (key in filters) {
                // console.log(key, user[key], filters[key]);
                isValid = isValid && user[key] == filters[key];
            }
            return isValid;
        });
        res.send(filteredUsers);

    }catch(error){
        res.status(400).json(error)
    }

})
// feature product
const featuredProduct=expressAsyncHandler(async(req,res)=>{
    const count =req.params.count ? req.params.count :0

    try{
        const   response = await Product.find({isFetured:false}).limit(+count)
        res.status(200).json(response)
    }
    catch(error){
        res.send(error)
    }
})









module.exports={CreateProduct,allProduct,selectProduct,updateProduct,delProduct,selectProcat,countProduct,featuredProduct,filterProduct}
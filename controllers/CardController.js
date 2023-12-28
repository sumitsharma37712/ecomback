const expressAsyncHandler = require("express-async-handler");
const Category = require("../database/model/Card");


const Categorya=expressAsyncHandler(async(req,res)=>{
    const {name,icon,color}=req.body
    try {
            const response = await Category.create({
                name, icon,color
                // filename:req.file.filename
            });
            res.status(200).send(response);
            console.log(`add Categry : ${name}`);
       
        
    } catch (error) {
        res.status(404).json({error:error})        
    }
})
const allCat=expressAsyncHandler(async(req,res)=>{
    try{
        const response=await Category.find({})
        res.status(200).json({response})
        // console.log(response)

    }catch(err){
        res.status(400).json({err})
    }
})

const selectCat=expressAsyncHandler(async(req,res)=>{
    const sel=req.params.id
    try{
        const response=await Category.findById(sel)
        res.status(200).json(response)

    }catch(err){
        res.status(400).json({err})
    }

})

const updateCategory=expressAsyncHandler(async(req,res)=>{
    const upid=req.params.id
    const {name,icon,color}=req.body
    try {
        const update = await Category.findByIdAndUpdate({_id:upid},{ $set: { name,icon,color }})
        if (update) {
            res.status(200).send("update success");
            console.log("update success");
          } else {
            res.status(200).send("update not success");
            console.log("update not success");
          }

        
    } catch (error) {
        console.log('errr')
        res.status(400).send(error)
        
    }
})


const delCategory=expressAsyncHandler(async(req,res)=>{
    const del=req.params.id
    try {
        let Cat = await Category.deleteOne({ _id: del });
        if (Cat) {
          res.send("delete success");
        } else {
          res.send("not delete data");
        }
      } catch (e) {
        res.status(404).send(e);
      }

})




module.exports={Categorya,delCategory,updateCategory,allCat,selectCat}
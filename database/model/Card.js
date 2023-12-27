const mongoose=require('mongoose')

const CategorySchema=mongoose.Schema({
    name:{type:String,require:true},
    icon:{type:String},
    color:{type:String},
    // image:{type:String,require:true},
    
})
const Category=mongoose.model('Category',CategorySchema)
module.exports=Category;
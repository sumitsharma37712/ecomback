const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    richDiscription:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:""
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    countInStock:{
        type:Number,
        require:true,
        min:0,
        max:255
    },
    ratting:{
        type:Number,
        default:0
    },
    isFetured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

const Product=mongoose.model('Product',ProductSchema) 
 module.exports=Product;
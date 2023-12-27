const mongoose =require('mongoose')

const UserSchema=mongoose.Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
        required: true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true
    },
    contact:{
        type:Number,
        required: true,
        trim:true,


    },
    password:{
        type:String,
        trim:true
    }
},{timestamp:true})

const couser=mongoose.model('User',UserSchema)
 
 module.exports=couser;
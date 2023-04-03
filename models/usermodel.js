const mongoose=require("mongoose")

const userScehema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'name is required']
    },
    email:{
        type:String,
        require:[true,"email is required"]
    },
    password:{
        type:String,
        require:[true,"password is required"]
    }

})

module.exports=mongoose.model('user',userScehema);
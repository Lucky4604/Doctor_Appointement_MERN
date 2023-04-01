const mongoose=require("mongoose")

const connect=async()=>{
    await mongoose.connect('mongodb://localhost:/doctor_db');
}

module.exports=connect;
const bcrypt=require("bcryptjs")
const usermodel=require("../models/usermodel")


const loginController=()=>{}

const registerController=async(req,res)=>{
    try{
         const existingUSer=await usermodel.findOne({email:req.body.email})
        if(existingUSer){
            return res
            .status(200)
            .send({message:"user already existed ",success:false})
        }
        //encrypting the password
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new usermodel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Register Sucessfully", success: true });

    }catch(error){
        console.log(error);
        res.status(500).send({
            status:false,
            message:`register controller ${error.message}`
        })
    }
    

}

module.exports={loginController,registerController}
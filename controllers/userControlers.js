const bcrypt=require("bcryptjs")
const usermodel=require("../models/usermodel")
const jwt = require("jsonwebtoken");


const loginController = async (req, res) => {
    try {
      const user = await usermodel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "user not found", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Invlid EMail or Password", success: false });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({ message: "Login Success", success: true, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
  };

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
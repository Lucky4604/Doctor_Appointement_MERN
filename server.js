const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connect=require('./config/db')
const routes = require("./routes/userRoutes")
const mongoose = require("mongoose")
const cors = require('cors')


dotenv.config();
const app = express();

app.use(cors())

app.use(express.json());
app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.json({msg: "This is the message"})
})
app.use("/api/v1/user/", routes)

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:/doctor_db')
    .then(()=>{
        //Listening for requests
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })


// app.listen(port, async() => {
//   console.log(`Server running on port ${port}`);
//   await connect();
//   console.log("mongodb connected")

// });

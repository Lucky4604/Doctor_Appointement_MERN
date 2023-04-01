const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connect=require('./config/db')

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running'
  });
});

const port = process.env.PORT || 5000;
app.listen(port, async() => {
  console.log(`Server running on port ${port}`);
  await connect();
  console.log("mongodb connected")

});

const express = require ('express')

const app = express()
require('dotenv').config();
const dbConnect = require('./config/database')

dbConnect();

app.use(express.json())
const PORT = process.env.PORT ||4000
const user = require("./routes/user");
const Donor = require('./models/Donor');
//routes
app.use("/api/v1", user);


app.get('/', (req,res)=>{
    res.send('Welcome to my APP')
})
app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`)
})
const express = require ('express');
const cookieParser = require("cookie-parser");

const app = express()
require('dotenv').config();
const dbConnect = require('./config/database')
app.use(express.json());
app.use(cookieParser());
dbConnect();

app.use(express.json())
const PORT = process.env.PORT ||4000
const user = require("./routes/user");
const patient = require("./routes/patientRoutes");
const Donor = require('./routes/donorRoute');
const bloodbank = require('./routes/bloodbankRoutes');
//routes
app.use("/api/v1", user);
app.use("/api/v2", Donor);
app.use("/api/v2", patient);
app.use("/api/v4", bloodbank);



app.get('/', (req,res)=>{
    res.send('Welcome to my APP')
})
app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`)
})
const express = require ('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express()
require('dotenv').config();
const dbConnect = require('./config/database')
app.use(express.json());
app.use(cookieParser());
dbConnect();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow frontend to communicate with backend
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend to make requests
    credentials: true // Allow cookies
  }));
const PORT = process.env.PORT || 5173
const user = require("./routes/authRoute");
const patient = require("./routes/patientRoute");
const Donor = require('./routes/donorRoute');
const bloodRequest = require('./routes/bloodRequestRoute');
const Profile = require('./models/Profile');
//routes
app.use("/api/v1", user);
 app.use("/api/v2", Donor);
 app.use("/api/v3", patient);
 app.use("/api/v4", bloodRequest);
 app.use("/api/v5", Profile);



app.get('/', (req,res)=>{
    res.send('Welcome to my APP')
})
app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`)
})
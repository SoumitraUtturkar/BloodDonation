const express = require('express')

const router  = express.Router()

// Define the routes
const {login,signup} = require('../controllers/Auth')
const {auth,isPatient,isAdmin} = require('../middlewares/auth')



// Get all users
router.post('/login', login)
router.post('/signup',signup)

router.get('/test',auth,(req,res)=>{
    res.json({success:true,message: 'Test route'})
} )

module.exports = router
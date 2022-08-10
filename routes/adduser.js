const express =require("express");
const router =express.Router();
const {createClass,bookSlot,cancelSlot, listUsers,getUserClasses}=require('../controllers/classes.js')

router.get('/',(req,res)=>{
    console.log("router hello");
    res.send()
})

router.post('/createClass',createClass)
router.post('/bookClass/:classid',bookSlot)
router.post('/cancelClass/:classid',cancelSlot)
router.get('/getAllUsers',listUsers)
router.get('/getUser/:userid',getUserClasses)

module.exports=router;
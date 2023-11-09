const express = require('express');
const router = express.Router();


router.get("/",(req,res)=>{
    res.render('index',{title:'HomePage'})
    // res.send("home page")
})

module.exports = router;
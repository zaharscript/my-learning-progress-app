const express = require('express');
const router = express.Router();


router.get("/",(req,res)=>{
    res.render('index',{title:'HomePage'})
    // res.send("home page")
})

router.get("/about",(req,res)=>{
    res.render('about',{title:"About"});
    // res.send("this is about us");
})

router.get("/contact",(req,res)=>{
    res.render('contact',{title:"Contact"});
    // res.send("this is about us");
})

router.get("/faq",(req,res)=>{
    res.render('faq',{title:"FAQs"});
    // res.send("this is about us");
})

router.get("/login",(req,res)=>{
    res.render('login',{title:"User Log In"});
    // res.send("this is about us");
})
module.exports = router;
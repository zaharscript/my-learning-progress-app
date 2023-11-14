const express = require('express');
const router = express.Router();
const Schema = require('../models/user')




router.get("/",(req,res)=>{
    res.render('index',{title:'HomePage'})
    // res.send("home page")
})

router.get("/about",(req,res)=>{
    res.render('about',{title:"About"});
    // res.send("this is about us");
})

// insert a user database into route(add_course.ejs)
router.post('/',(req,res)=>{
    const course =new Schema({
        course: req.body.name,
        instructor: req.body.instructor,
        date: req.body.date
    })
    course.save();
    res.redirect('/');
    // course.save((err)=>{
    //     if(err){
    //         res.json({message: err.message, type: 'danger'});
    //     }else{
    //         req.session.message ={
    //             type:'Success',
    //             message:' Course added successfully!'
    //         }
    //         res.redirect('/');
    //     }
    // })
    
        // const course = new Course(req.body);
        // try {
        //   await course.save();
        //   req.session.message = {
        //     type: 'Success',
        //     message: 'Course added successfully!'
        //   };
        //   res.redirect('/');
        // } catch (err) {
        //   res.json({ message: err.message, type: 'danger' });
        // }
      
      
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
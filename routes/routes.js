const express = require('express');
const router = express.Router();
const CoursesModel = require('../models/user')

//create model for the course(refer user.js)-->

//define the route to handle POST request and save data to database
router.post('/',async(req,res)=>{
    //define course name, instructor and date enrolled
    const courseName = req.body.course;
    const instructorName = req.body.instructor;
    const roleDate = req.body.date
    //Create new course document
    const newCourse = new CoursesModel({courseName, instructorName, roleDate});
    try {
        await newCourse.save();
        req.session.message = {
          message: "New Course Added Successfully!",
          type: "success",
        };
      } catch (err) {
        res.json({ message: err.message, type: "danger" });
      } finally {
        res.redirect('/')
    };  
  console.log(`${newCourse}saved to the database`);  
})

//show database in index.ejs
router.get('/', async (req, res) => {
    try {
       const courseData = await CoursesModel.find();
       res.render('index', { title:"Home Page",courseData: courseData });
    } catch (err) {
       console.log(err);
       res.status(500).send('Server Error');
    }
});



// Edit a course route
router.get('/edit/:id',async(req,res)=>{
  try{
    const id=req.params.id;
    const editCourse =await CoursesModel.findById(id);
    
    if(editCourse == null){
      res.status(404).send('Course not found');
    }else{
      if(editCourse)
      res.render('edit',{title:'Edit Course',editCourse:editCourse});
    }
  }catch(error){
    console.log(error);
    res.status(500).send("Error");
  }
  
})
//update a course
router.post('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = {
      courseName: req.body.course_Name,
      instructorName: req.body.instructor_Name,
      roleDate: req.body.role_Date
    }

    // Use await with findByIdAndUpdate
    const result = await CoursesModel.findByIdAndUpdate(id, updatedCourse,{new:true});

    if (!result) {
      // If no document found with the provided id
      res.status(404).json({ message: 'Course not found', type: 'danger' });
    } else {
      // Successfully updated
      req.session.message = {
        message: 'Course updated successfully',
        type: 'success'
      };
      res.redirect('/');
      console.log('Course updated!')
      
    }
  } catch (err) {
    res.status(500).json({ message: err.message, type: 'danger' });
  }
});



// Delete a course route
router.get('/delete/:id', async(req,res)=>{
  try{
    const id = req.params.id;
    const deleteCourse = await CoursesModel.findByIdAndDelete(id);
    if(deleteCourse == null){
      res.status(404).send('Course not found');
      }else{
        req.session.message = {
          message: 'Course deleted!',
          type: 'success'
        };
        res.redirect('/')
        console.log('course deleted from database!');
        }
        }catch(error){
          console.log(error);
          res.status(500).send('Error');
          }

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
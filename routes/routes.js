const express = require('express');
const router = express.Router();
const Todo = require('../models/user')
const ObjectId  = require('mongoose').Types;
const methodOverride = require('method-override')


router.use(methodOverride('_method'));

//main course CRUD---------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const todo = await Todo.find();
    res.render('index', { todo });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/add', async (req, res) => {
  const course = req.body.course;
  const name = req.body.name;
  const date = req.body.date;

  try {
    await Todo.create({ course, name, date, completed: false, subItems:[] });
    res.redirect('/');
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).send('Internal server error');
  }
});

// main course update
router.put('/update/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);
    todo.completed = !todo.completed;
    await todo.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Internal server error');
  }
});

//main course delete 
router.delete('/delete/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    await Todo.findByIdAndDelete(todoId);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Internal server error');
  }
});

//main course edit
router.get('/edit/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);
    res.render('edit', { todo });
  } catch (error) {
    console.error('Error fetching todo for editing:', error);
    res.status(500).send('Internal server error');
  }
});

router.put('/edit/:id', async (req, res) => {
  const todoId = req.params.id;
  const updatedCourse = req.body.course;
  const updatedName = req.body.name;
  const updatedDate = req.body.date;

  try {
    await Todo.findByIdAndUpdate(todoId, { course: updatedCourse, name: updatedName, date: updatedDate});
    res.redirect('/');
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Internal server error');
  }
});

// subitem CRUD------------------------------------------------------------------------------------------
router.post('/addSubItem/:id', async (req, res) => {
  const todoId = req.params.id;
  const subItemText = req.body.subItem;

  try {
    const todo = await Todo.findById(todoId);
    todo.subItems.push({ text: subItemText, completed: false, subTopics:[] });
    await todo.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error adding subitem:', error);
    res.status(500).send('Internal server error');
  }
});
//update subItem
router.put('/updateSubItem/:id/:subItemId', async (req, res) => {
  const todoId = req.params.id;
  const subItemId = req.params.subItemId;

  try {
    const todo = await Todo.findById(todoId);

    // Find the sub-item
    const subItem = todo.subItems.id(subItemId);

    // Toggle the completion status
    subItem.completed = !subItem.completed;

    // Save the changes
    await todo.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error updating subitem:', error);
    res.status(500).send('Internal server error');
  }
});


//delete sub item
router.delete('/deleteSubItem/:id/:subItemId', async (req, res) => {
  const todoId = req.params.id;
  const subItemId = req.params.subItemId;

  try {
    await Todo.findByIdAndUpdate(todoId, { $pull: { subItems: { _id: subItemId } } });
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting subitem:', error);
    res.status(500).send('Internal server error');
  }
});

//sub item edit
router.get('/editSubItem/:id/:subItemId', async (req, res) => {
  const todoId = req.params.id;
  const subItemId = req.params.subItemId;

  try {
    const todo = await Todo.findById(todoId);
    const subItem = todo.subItems.id(subItemId);
    res.render('editSubItem',{todo, subItem});
  }catch(error){
    console.log('Error getting subitem to edit:', error);

  }
    
});


router.put('/editSubItem/:id/:subItemId', async (req, res) => {
  const todoId = req.params.id;
  const subItemId = req.params.subItemId;
  const updatedSubItemText = req.body.subItem;

  try {
    await Todo.updateOne(
      { _id: todoId, 'subItems._id': subItemId },
      { $set: { 'subItems.$.text': updatedSubItemText } }
    );
   
    res.redirect('/');
  } catch (error) {
    console.error('Error updating subitem:', error);
    res.status(500).send('Internal server error');
  }
});


// subtopic CRUD-----------------------------------------------------------------------------------------------
router.post('/addSubitem/:id/addSubTopic', async (req, res) => {
try {
  const todoId = req.params.id;
  const todo = await Todo.findById(todoId);
  // Assuming passing the index of the subitem as 'subItemIndex' in the request body
  const subItemIndex = req.body.subItemIndex;
  // Ensure the index is valid
  if (subItemIndex >= 0 && subItemIndex < todo.subItems.length) {
    const text = req.body.text; // Use a single 'text' property in the request body
    // Add the new subtopic to the specified subitem
    todo.subItems[subItemIndex].subTopics.push({ text: text, completed: false });

    await todo.save();
    res.redirect('/');
  } else {
    res.status(400).send('Invalid subitem index');
  }
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

//update subTopic
router.put('/updateSubTopic/:todoId/:subIndex/:subTopicIndex', async (req, res) => {
const todoId = req.params.todoId;
const subItemIndex = req.params.subIndex;
const subTopicIndex = req.params.subTopicIndex;

try {
  const todo = await Todo.findById(todoId);
    // Find the sub-topic
  const subTopic = todo.subItems[subItemIndex].subTopics[subTopicIndex];
   subTopic.completed = !subTopic.completed;

  await todo.save();
   res.redirect('/');
  } catch (error) {
      console.error('Error updating subTopic:', error);
      res.status(500).send('Internal server error');
}
});

//delete subTopic
router.delete('/deleteSubTopic/:todoId/:subIndex/:subTopicIndex', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const subItemIndex = req.params.subIndex;
    const subTopicIndex = req.params.subTopicIndex;

    const todo = await Todo.findById(todoId);
    // Ensure the indices are valid
    if (
      subItemIndex >= 0 &&
      subItemIndex < todo.subItems.length &&
      subTopicIndex >= 0 &&
      subTopicIndex < todo.subItems[subItemIndex].subTopics.length
    ) {
      // Remove the specified subtopic
      todo.subItems[subItemIndex].subTopics.splice(subTopicIndex, 1);

      await todo.save();

      res.redirect('/');
    } else {
      res.status(400).send('Invalid indices for deleting subtopic');
    } 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Edit subTopic
router.get('/editSubTopic/:todoId/:subItemId/:subTopicId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const subTopicId = req.params.subTopicId;

    // Find the todo by ID
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Find the subTopic within the todo's subTopics array
    const subTopic = todo.subItems[0].subTopics.id(subTopicId);

    if (!subTopic) {
      return res.status(404).json({ error: 'SubTopic not found' });
    }

    // Render the edit page with the subTopic's text
    res.render('editSubTopic', { subTopic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.put('/editSubTopic/:todoId/:subItemId/:subTopicId', async (req, res) => {
  const todoId = req.params.id;
  const subItemId = req.params.subItemId;
  const subTopicId = req.params.subTopicId;
  const updatedSubItemText = req.body.newText;

  try {
    await Todo.updateOne(
      { _id: todoId, 'subItems._id': subItemId,'subTopics._id': subTopicId },
      { $set: { 'subTopics.$.text': updatedSubItemText } }
    );
   
    res.redirect('/');
  } catch (error) {
    console.error('Error updating subitem:', error);
    res.status(500).send('Internal server error');
  }
});

router.get("/about",(req,res)=>{
  res.render('about',{title:"About"});
  
})
router.get("/contact",(req,res)=>{
    res.render('contact',{title:"Contact"});
   
})
router.get("/faq",(req,res)=>{
    res.render('faq',{title:"FAQs"});
    
})
router.get("/login",(req,res)=>{
    res.render('login',{title:"User Log In"});
    
})




module.exports = router;
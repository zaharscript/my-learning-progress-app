const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  course: String,
  name: String,
  date: Date,
  completed: Boolean,
  subItems: [
    {
      text: String,
      completed: Boolean,
      subTopics: [
        {
          text: String,
          completed: Boolean,  
        },  
      ],
      
    },
  ],
});
const Todo = mongoose.model("Todo", todoSchema);
console.log(Todo.modelName); // Outputs: Courses
module.exports = Todo;



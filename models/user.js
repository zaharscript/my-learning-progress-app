const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: false,
  },
  instructorName: {
    type: String,
    required: false,
  },
  roleDate: {
    type: Date,
    required: false,
  },
  completed:{
    type : Boolean ,
    required : false,
    default : false,
  },
  // topicName: {
  //     type: String,
  //     required: false
  // },
  // subtopicName:{
  //     type:String,
  //     required:true
  // }
});
const CoursesModel = mongoose.model("Courses", courseSchema);
console.log(CoursesModel.modelName); // Outputs: Courses
module.exports = CoursesModel;

// module.exports = mongoose.model('Courses', courseSchema)

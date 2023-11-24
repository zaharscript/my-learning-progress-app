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
  // topicName: {
  //     type: String,
  //     required: true
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

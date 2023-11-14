const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema;({
    courseName: { 
        type: String, 
        required: true 
    },
    instructorName: { 
        type: String, 
        required: true 
    },
    roleDate: {
        type: Date,
        required: true
    }
    // topicName: {
    //     type: String,
    //     required: true
    // },
    // subtopicName:{
    //     type:String,
    //     required:true
    // } 
    
});
    
module.exports = mongoose.model('Courses', courseSchema)
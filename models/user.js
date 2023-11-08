const mongoose = require('mongoose');
const userSchema = new mongoose.Schema;({
    course: { 
        type: String, 
        required: true },
    instructor: { 
        type: String, 
        required: true 
    }
});

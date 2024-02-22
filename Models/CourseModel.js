const mongoose =require('mongoose')

const CourseSchema = new mongoose.Schema({

CourseName:{
    type:String
},
Description:{
    type:String
},
CourseCode:{
    type:Number
},
CourseInstructor:{
    type:String
}


})
const CourseModel= mongoose.model('Course', CourseSchema);

module.exports=CourseModel
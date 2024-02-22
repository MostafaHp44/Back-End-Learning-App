
const mongoose=require('mongoose')


   const AttendanceSchema = new mongoose.Schema({

   

    studentfirstname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },

    studentlastname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },

    date: {
        type:Date,
        required:true,
       

    },
    
    attended: {
        type: Boolean
    },

    subject: {
        type:String,
    },

   
    
        

  } ,);

  const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

  module.exports= AttendanceModel ;
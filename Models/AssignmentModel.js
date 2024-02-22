
const mongoose=require('mongoose')


   const AssignmentSchema = new mongoose.Schema({

    assignmentname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },

    assignmentcontent: {
        type:String,
        required:true,
    },

    subject: {
        type: String
    },


    grade:
    {
        type:String,
    },


   
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],



    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],

        

  });

  const AssignmentModel = mongoose.model('Assignment', AssignmentSchema);

  module.exports= AssignmentModel ;
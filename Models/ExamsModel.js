const mongoose=require('mongoose')


   const ExamsSchema = new mongoose.Schema({

    examname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },

    examcontent: {
        type:String,
        required:true,
       

    },


    grade:
    {
        type:String,
    },

   
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],



    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],

        

  });

  const ExamsModel = mongoose.model('Exams', ExamsSchema);

  module.exports= ExamsModel ;
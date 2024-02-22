const mongoose=require('mongoose')


   const ResultsSchema = new mongoose.Schema({

    examname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },


    grade:
    {
        type:String,
    },

   
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],

    

    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],

        

  });

  const ResultsModel = mongoose.model('Results', ResultsSchema);

  module.exports= ResultsModel ;
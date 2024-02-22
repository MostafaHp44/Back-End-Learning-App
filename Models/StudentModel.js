const mongoose=require('mongoose')

var validateEmail = (email)=> {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

   const StudentSchema = new mongoose.Schema({
    
    firstname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },
    
   lastname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },
    gender: {
        type:String,
        enum: ['male', 'female'],
        required: true

    },
    email:{   
        type:String,
        required: 'Email address is required',
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
    PhoneNumber:{
        type:String,
        required: 'Phone Number  is required',
},
    ParentNumber:{
        type:String,// Only for Student
        required: 'Phone Number  is required',
        
}, 
    password:{
        type:String,
        },

    typeacc:{
            type:String,  
        },

        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

        attendance:{ type:Array},


  });

  const StudentModel = mongoose.model('Student', StudentSchema);

  module.exports= StudentModel ;
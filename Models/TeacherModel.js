const mongoose=require('mongoose')

var validateEmail = (email)=> {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const TeacherSchema= new mongoose.Schema({

    firstname: {
        type:String,
        required:true,
       

    },
   lastname: {
        type:String,
        required:true,
       
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
    phone:{
        type:String,
        required: 'Phone Number  is required',
},
  
    
    password:{
        type:String,
        },

    typeacc:{
            type:String,
            
        },

    subjects: {
        type:[String] // Only for teachers
    }, 
  })

const TeacherModel = mongoose.model('Teacher', TeacherSchema);


module.exports= TeacherModel ;


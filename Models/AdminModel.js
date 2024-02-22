const mongoose=require('mongoose')

var validateEmail = (email)=> {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}


const AdminSchema = new mongoose.Schema({
    name: {
        type:String
    },

    email: {
         type: String,
         unique: true 
        },

    password: {
        type:String
    },
    typeacc:{
        type:String
    }

  });


  const AdminModel   = mongoose.model('Admin', AdminSchema);


module.exports=  AdminModel ;

const express = require('express');
const app=express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NewApp=require('./Routes/Routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/',NewApp)


 
dotenv.config({
  path: "./config.env"
  });

const DB   = process.env.DATABASEURL;  
const PORT = process.env.PORT ||3000;

mongoose.connect(DB,).then(()=>{console.log('DataBase is connect....')
}).catch((err)=>{console.log(err)})





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



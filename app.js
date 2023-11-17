const express=require('express');
var fs=require('fs');
var morgan=require('morgan');
const routeb=require('./routes/routes.js');
const app=new express();
const bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use('/api',routeb);
require('dotenv').config();
const PORT=process.env.PORT;



app.listen(PORT,()=>{
    console.log("SERVER IS RUNNING ON PORT 3000");
})

const express = require('express');
const mongoose = require('mongoose');
const heroes = require('./models/heroes');
const url = 'mongodb://localhost:27017/tohdb';
const testRouter = require('./routes/heroes');
const PORT = 3000;
const app = express();



mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then((db)=>{
    console.log("Succesfully connected to mongodb server");
},(err)=>console.log(err));
app.use(express.json());

app.use(express.static(__dirname + "/public")); //serving static pages

app.use('/heroes',testRouter);
app.listen(PORT,()=>{
    console.log(`App is running at localhost:${PORT}`);
});
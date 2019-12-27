const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    }
},{ timestamps: true});
const heroesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    comment: [commentSchema]
},{timestamps:true});

const heroesSchema = new mongoose.Schema({
    desc: {
        type:String,
        required:true
    },
    comment:[commentSchema]
},{timestamps:true});

module.exports = mongoose.model('heroes', heroesSchema);


const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    firstname : {type : String , required : true},
    lastname : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    phone : {type: Number, required : false},
    source : {type : String},
    description : {type : String,default:"Social Media"},
    dueDate : {type : Date},
    status : {type : String, default : 'Pending'},
    index:{type:Number ,default:0,required:false}
}, {timestamps : true});

const Lead = mongoose.model('lead' , LeadSchema);
module.exports = Lead;
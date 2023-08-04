const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommSchema = new mongoose.Schema({
    leadId : {type: Schema.Types.ObjectId, required: true, ref: "lead",},
    date : {type : String},
    type : {type : String},
    content : {type : String}
}, {timestamps : true});

const Comm = mongoose.model('comm' , CommSchema);
module.exports = Comm;
const mongoose =require("mongoose")
const Schema = mongoose.Schema

const msg = new Schema({
by:String,
from:String,
message:String,
key:String
})

mongoose.model('msgs', msg)
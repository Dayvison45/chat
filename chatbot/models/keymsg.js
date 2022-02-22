const mongoose =require("mongoose")
const Schema = mongoose.Schema
const key = new Schema({
from:String,
by:String}
)

mongoose.model('keys',key)
import mongoose from "mongoose";
const userschema=mongoose.Schema({
    name : String,
    email : String, 
    password : String
})
const model=mongoose.model("users",userschema);
module.exports = model;
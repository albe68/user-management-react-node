const mongoose=require('mongoose')


const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type: String,
        required: true
    }
})
const Admin = mongoose.model("admins", adminSchema);
module.exports = Admin;
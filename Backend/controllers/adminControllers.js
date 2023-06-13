const Admin=require('../models/adminModel')
const User=require('../models/userModels')
const jwt=require('jsonwebtoken')

module.exports={
    login: async(req,res) => {
        try{
        //  const admin=await Admin.findOne({email:req.body.email}).exec();
        const admin="admin"
         if(admin){
            if("admin" ===req.body.password){
                const token=jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
                res.send({
                    success: true,
                    message: "admin logged in succesfully",
                    data: token,
                    admin: admin
                });
            }
         }else{
            throw new Error("Invalid password !!");
         }
        }catch(err){
            res.send({
                success: false,
                message: err.message
            });
        }

    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().exec();
            res.send({
                success: true,
                message: "fetched all users",
                users
            })
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    },
    searchUsers: async(req, res)=>{
        try{
            const users = await User.find({
                $or:[
                    {name: {$regex: new RegExp(req.body.searchInput, 'i')}},
                    // {email: {$regex: new RegExp(req.body.searchInput, 'i')}},
                    {mobile: {$regex: new RegExp(req.body.searchInput, 'i')}}
                ]
            }).exec();
            if(!users) throw new Error("user now found !!!");
            else{
                res.send({
                    success: true,
                    message: "users found",
                    users
                });
            }
        }catch(err){
            res.send({
                sucess: false,
                message: err.message
            })
        }
    },
    deleteUser: (req, res) => {
        try {
            User.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.send({
                        success: true,
                        message: "user deleted successfully"
                    });
                })
                .catch((err) => {
                    throw new Error(err.message);
                })
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            });
        }
    },
    updateUser: (req, res) => {
        try {
            User.updateOne({_id: req.body.data.editId},
                {
                    name: req.body.data.editName,
                    email: req.body.data.editEmail,
                    mobile: req.body.data.editMobile
                })
            .then(()=>{
                res.send({
                    success: true,
                    message: "user updated"
                });
            })
            .catch((err)=>{
                throw new Error(err.message);
            })
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    },
}
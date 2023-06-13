const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try{
        let token = req.header('authorization').split(' ')[1];
        token = token.replaceAll('"', '');
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decryptedToken.userId;
        next()
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}
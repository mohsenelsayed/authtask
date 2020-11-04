const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    const bearer = req.headers.authorization;
    if(bearer != undefined){
        const token = bearer.split(' ')[1];
        jwt.verify(token, 's3cr3t', (err, user) => {
            if(err){
                res.status(403).json({message: "Forbidden!"});
            }else{
                if(Users.findById(user._id.$oid)){
                    req.user = user;
                    next();
                }else{
                    res.status(403).json({message: "Forbidden!"});
                }
                
            }
        })
    }else{
        return res.status(403).json({message: "Forbidden!"});
    }
}
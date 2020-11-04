const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

const Users = require('../models/Users');


router.post('/register', async (req,res) => {
    try{
        let user = new Object;
        user.name = req.headers.name;
        user.password = req.headers.password;
        user.email = req.headers.email;
        let newUser = new Users(user);
        await newUser.save(() => {
            console.log(`${user.name} has registered.`);
        });
        res.status(200).json({message: "User registered successfully."});
    }catch(err) {
        return res.status(400).json({message: "Something went wrong, please try again."});
    }
});

router.post('/login', async (req,res) => {
    try{
        let {name, password} = req.headers;
        let verifyUser = await Users.findOne({name}, (err,user) => {
            if(err){
                res.status(404).json({message: "User not found."});
            }else{
                const validPass = bycrypt.compare(password, user.get("password"));
                if(validPass){
                    const token = jwt.sign({name,password}, 's3cr3t');
                    res.status(200).cookie('authorization', "Bearer " + token).json({message: `Welcome ${name}.`});
                }else{
                    res.status(400).json({message: "Wrong username/password, please try again."});
                }
            }
        });
    }catch(err) {
        return res.status(400).json({message: "Something went wrong, please try again."});
    }
});




module.exports = router;
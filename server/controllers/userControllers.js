
// const expressAsyncHandler = require("express-async-handler");
const User = require('../models/usermodel')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcrypt')


// creating user and checking whther it exits already or not
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt);

    const userExists = await User.findOne({email})

    // checking whether user already exists or not
    if(userExists){
        res.status(400).send("user already exist, please Login");
    }

    // creating new user & adding in mongodb
    const user = await User.create({
        name:name,email:email,password:hashedPassword
    });

    if(user){
        res.status(202).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,   
            isAdmin:user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400).send('Error Occured');
    }
}

// authenticating user for login
const authUser = async (req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password,user.password)){
        console.log('user found, Logined successfully');
        res.status(202).json({ 
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
          message: "user found, Logined successfully!"
        });
    } else{
        res.status(400).send("Invalid EmailId or Password!!!")
    }
}


const updateUserProfile = async (req,res) =>{

    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        const confirmPassword = req.body.confirmPassword;

        if(req.body.password){

            if(confirmPassword !== req.body.password){
                res.status(403).send("Password doesn't match!")
            }

            user.password = req.body.password
            const salt = await bcrypt.genSalt();
            await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save()
        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            token : generateToken(updatedUser._id)   
        })
    }
    else{
        res.status(404).send("user not found")
    }
}


module.exports = { registerUser, authUser, updateUserProfile }; 

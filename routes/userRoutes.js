const express = require('express');
const UserModel = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    let { name, email, password, gender } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        password = hash;
        console.log("Hash :", hash);

        const userData = new UserModel({ name, email, password, gender });
        await userData.save();

        res.status(201).send(userData);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

userRouter.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    try{
        let logindata=await UserModel.findOne({email:{$eq:email}});


        await bcrypt.compare(password,logindata.password,(err, result)=>{
            console.log(result);
            if(err){
                console.error("Error Comparing passwords: ",err);
            }
            if(result){
                res.status(200).send(logindata)
            }
            else
                res.send("Check Your credentials")
        })
    } catch(e){
        res.status(500).send(e)
    }
})




module.exports = userRouter;

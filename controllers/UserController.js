const asyncHandler=require('express-async-handler');
const couser = require('../database/model/User');
const jwt=require('jsonwebtoken')
const salt=10
const bcryptjs=require('bcryptjs')
// console.log(bcryptjs)
const UserReg=asyncHandler(async(req,res)=>{
    const {name,contact,email,password:plainTextPassword}=req.body;
    console.log(email)
    password = await bcryptjs.hash(plainTextPassword, salt);
    console.log(password)
    try {
        const check = await couser.findOne({ email: email });
        if(check){
            console.log("user exist");
        res.status(400).send({error:'user alredy registered'})
        }else{
            const response = await couser.create({
                name,email,contact,password
                // filename:req.file.filename
            });
            res.send(response);
            console.log(`${email}, Registration Successfull`);
        }
    } catch (error) {
        console.log('error not create')
      res.status(400).send({error:'error'})

    }
    
})

const UserAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const emailver = await couser.findOne({ email })
    // const passver =await couser.findOne({password})

    try {
        if (!emailver) {
            console.log(`User not valid: ${email}`);
            res.status(404).send(`Something wrong, ${email} not found`);
        } else if (await bcryptjs.compare(await password, emailver.password)) {
            const tdata = {
                id: emailver._id,
                email: emailver.email,
                type: "user",
            };

            const token = jwt.sign(tdata, "erueoilfu34w894wedskndskf");
            res.cookie("jwt", token);

            // Store email in session (if needed)
            req.session.email = email;

            // Respond with user data and token
            const data = res.json({
                id: emailver._id,
                email: emailver.email,
                token: token,
            });

            console.log('Access granted');
        } else {
            console.log(`User not valid`);
            res.status(404).send(`Something went wrong, user not found`);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error:'error' });
    }
});










module.exports={UserReg,UserAuth}
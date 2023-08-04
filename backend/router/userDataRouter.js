const express = require('express');
const router = express.Router();
const { body , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const authenticate = require('../middlewares/authenticate');
const Token = require("../models/TokenSchema");
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
var Mailgen = require('mailgen');


router.post('/register', [
    body('name').notEmpty().withMessage('Name is Required'),
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
] ,async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors : errors.array()});
    }
    try {
      console.log(request.body);
      // check if the user exits
      
      let { name , email , password } = request.body;
      let user = await User.findOne({email : email});

      console.log(user)

        if(user){
            return response.status(201).json({errors : [{msg : 'User Already Exists'}]});
        }

        // encode the password
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password , salt);

        // insert the user into database
     
        user = new User({name , email , password});
        await user.save();
        response.status(200).json({msg : 'Registration is Success'});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

router.get("/passwordReset", async (request, response) => {
    try {
      let { email } = request.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return response.status(201).json({ errors: [{ msg: "User Not exists" }] });
      }
      let token = await Token.findOne({ userId: user._id });
  
      if (token) {
        await token.deleteOne();
      }
  
      let resetToken = crypto.randomBytes(32).toString("hex");
      const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));
    
      await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save();
      const clientURL = process.env.CLIENT_URL;
      const link = `${clientURL}/api/user/passwordReset?token=${resetToken}&id=${user._id}`;
      
  
      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });
  
  
      var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Kanika',
            link: 'http://localhost:3000'
        }
    });
    
    // Email contents
    var result = {
        body: {
            name: user.name,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: link
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };
    
    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(result);
      let message={
        from:EMAIL,
        to:email,
        subject: "Reset Password", // Subject line
        // text: link, // plain text body
        html: emailBody
        
      }
  
    
     transporter.sendMail(message).then(()=>{
      return response.status(201).json({
        msg: "you should receive an email"
    });
     })
  
  
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  });
  
  router.post(
    "/passwordReset",
     async (request, response) => {
    try {
      const { token, id } = request.query;
      const { password } = request.body;
      console.log(request.query);
      const oldUser = await User.findOne({ _id: id });
      if (!oldUser) {
        return response.json({ status: "User Not Exists!!" });
      }
  
      let passwordResetToken = await Token.findOne({ userId:id });
      console.log(passwordResetToken);
      if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
      }
      console.log("yayy");
      const isValid = await bcrypt.compare(token, passwordResetToken.token);
      if (!isValid) {
        throw new Error("Invalid or expired password reset token");
      }
      const hash = await bcrypt.hash(password, Number(bcryptSalt));
      await User.updateOne(
        { _id: id },
        { $set: { password: hash } },
        { new: true }
      );
  
      await passwordResetToken.deleteOne();
      response.status(201).json({ msg: "Password Succeessfully Updated" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  });

/*
    @usage : to Login a User
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */

router.post('/login' , [
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
],async (request , response) => {
    console.log(body);
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors : errors.array()});
    }
    try {
        let {email , password} = request.body;

        // check if the correct email
        let user = await User.findOne({email : email});

        if(!user){
            return response.status(401).json({errors : [{msg : 'Invalid Credentials'}]});
        }

        // check the passwords
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({errors : [{msg : 'Invalid Credentials'}]});
        }

        // create a token and send to Client
        let payload = {
            user : {
                id : user.id,
                name : user.name
            }
        };
        jwt.sign(payload , process.env.JWT_SECRET_KEY, (error , token) => {
            if(error) throw error;
            response.status(200).json({
                msg : 'Login is Success',
                token : token
            });
        })
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

router.get('/me', authenticate , async (request , response) => {
    try {
        let user = await User.findById(request.user.id).select('-password');
        response.status(200).json({
            user : user
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
})

module.exports = router;

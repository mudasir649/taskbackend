import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import { successResponse, failedResponse } from "../utils/response.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Sib from "sib-api-v3-sdk"

// method to register user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    // check is name email password is empty or not
    if(!name, !email, !password){
        return res.status(400).send("All inputs are required");
    }

    // checking email already exists
    const existingEmail = await User.findOne({email});

    if(existingEmail) {
        return res.status(400).json("Email already exist!");
    }

    // method to encrypt password
    const encryptPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, 
        email: email.toLowerCase(),
        password: encryptPass
    });

    // setting api key to send email
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY

    const transEmail = new Sib.TransactionalEmailsApi();

    // sender info
    const sender = {
        email: 'mudasirriaz1793@gmail.com',
        name:"mudasir"
    }

    // receiver info
    const receiver = [
        {
            email: email
        }
    ]

    // email data which is sent on provided email
    transEmail.sendTransacEmail({
        sender,
        to: receiver,
        subject: "MERN stack developer test",
        textContent: "This is simple app for vehicle crud",
        htmlContent: `
        <h2>Welcome to vehicle crud</h2>
        <h1>${password}</h1>
        `,
        params: {
            role: 'Frontend'
        }
    }).then(data => console.log(data)).catch(error => console.log(error))

    // after successful registration saving json web token
    const token = jwt.sign(
        {user_id: user._id, email},
        process.env.TOKEN
    )

    user.token = token;

    // success response after the successfull registration
    return successResponse(
        res,
        "User is created successfully.",
        true,
        user
    )
    } catch (error) {
        // sending failed if it fails to create user
        return failedResponse(
            res,
            "failed to create user.",
            false
        )
    }
}

// method for log in user
const login = async(req, res) => {

    try {
    const { email, password } = req.body;

    // validation to check email and password
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // finding user by email
    const user = await User.findOne({ email });

    // if check for checking bycrypt password and user exist or not and then creating jwt token
    if (user && (await bcrypt.compare(password, user.password))) {

        const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN,
      );

      user.token = token;
    
      // success response after the record matched
      return successResponse(
        res,
        "LoggedIn successfully.",
        true,
        user
      )
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

export {
    register,
    login
}
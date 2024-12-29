import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Exercise from "./Models/Exercise.js";
import User from "./Models/User.js"
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config({path:".env"});
const port = process.env.PORT || 5000;
const app = express();

/*app.use(cors({origin:"http://localhost:5173"}));*/
app.use(express.json());
app.use(cookieParser());


//CORS-Related
//This middleware adds Headers to the response indicating to browser the following:
//1. The origin from which requests are allowed.
//2. The methods allowed by the server.
//3. The headers(in the request) allowed by the server.
//4. The permission to browser to accept & store the Set-Cookie header(credentials) from cross-origin responses.
//4a. The credentials option in the fetchAPI(frontend) when set to "include" allows sending Cookies received earlier from server-side.
//    For the browser to accept & store cookies sent by server, the server response must include Set-Cookie headers(res.Cookie does this)
//    & for cross-origin requests it must have additional  headers like::
//    -> "Access-Control-Allow-Credentials" set to "true" which permits browser to let client-side code to send credentials to server.
//    ->"Access-Control-Allow-Orgin" specifying the origin allowed to send request to the server. 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:5173" ); 
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
})




app.post("/login", async function(req,res){
   const{email, password}=req.body;
   try{
     const user = await User.find({email}).select("name _id password");
     if(!user.length) throw Error("User Not Registered");
     const{_id} = user;
     const isPasswordCorrect= await bcrypt.compare(password, user[0].password);
     if(isPasswordCorrect){
     const token = jwt.sign({_id}, process.env.SECRET);
     const loggedUser= await User.find({email}).select("name _id");
     res.status(200).cookie("token",token, {httpOnly:true, secure:true, samesite:"lax"}).json(loggedUser);
     }else throw Error("Incorrect Login Details")
    }catch(err){res.json({message :err.message})}
})




app.post("/signup", async function (req, res) {
  //if(!validator.isEmail(email)){throw Error("Email is not valid")}
  //if(!validator.isStrongPassword(password)){throw Error ("Password not strong enough")}
  const {name,email, password } = req.body;
  try{
     const user = await User.find({email})
     if(user.length) throw Error("Email already in use");
      //Empty Array is not Falsy!!!!
      const salt= await bcrypt.genSalt(10);
      const hash= await bcrypt.hash(password, salt);
      const usr= await User.create({name, email, password:hash});
      const createdUser= await User.findById(usr._id).select("_id name");
      const {_id}=createdUser;
      const token = jwt.sign({_id} ,(process.env.SECRET));
      res.status(200).cookie("token",token, {httpOnly:true, secure:true, samesite:"lax"}).json(createdUser)
      }catch(error){
      res.status(400).json({message:error.message})
      }
});




app.get("/getexercises/:id", async (req, res) => {
  const{id}=req.params;
  try {
    const token = req.cookies.token;
    if(!token) throw Error("Not Authorized")
    const ex = await Exercise.find({owner:id});
    res.status(200).json(ex);
     } catch (error) {
    res.status(400).json({message:error.message});
  }
});




app.post("/addexercise/:id", async (req, res) => {
  const { name, reps, load } = req.body;
  const { id } = req.params;
  try {
    const token = req.cookies.token;
    if(!token) throw Error("Not Authorized")
    const exercise = await Exercise.create({ name, reps, load, owner: id });
    res.status(200).json({ exercise });
      } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




app.get("/logout", async function(req,res){
  res.clearCookie('token',{httpOnly:true, secure:true, samesite:"lax"} );
  res.send("Cookie Cleared");
})



mongoose.connect(process.env.MONG_URI)
 .then(()=> {app.listen(port, () => {
   console.log(`Connected to DB & Server is running at port ${port}`);
 })
})
 .catch((error)=>{console.log(error)})


let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let User = require('../Models/userModel');
const { response } = require('express');



let register = async (req,res)=>{


   let {username,email,password}= req.body;
try{
   if( username && email && password){
       const existUser = await User.findOne({username});
       const existemail = await User.findOne({email});

if(! existUser){
if( ! existemail){

 const hashPassword = await bcrypt.hash(password,10)
let newUser = User({
    email:email,
    username:username,
    password:hashPassword
})
 await newUser.save()
}
else{
    return res.json({ success: false, message:"email allredy use please try defrent email"})
}
}    
else{
     return res.json({ success: false, message:"username not available please try defrent username"})
}   
   }
   else{
     return res.json({ success: false, message:"pleese enter valed input"})
   }
   
  return res.json({ success: true, message:"register sucess fully"})
  }
catch(e){
    console.log(e)
}
}


let login = async (req,res)=>{

let {username,password}= req.body;
try{
if(username && password){

    existUser = await User.findOne({username})
if(existUser){
 let isauth = await bcrypt.compare(password,existUser.password)
 if(isauth){
    let token = jwt.sign({id:existUser._id},process.env.AUTH_SECRET_KEY)
return res.json({ success:true,userID:existUser._id,token:token }) 
 }
 else{
     return res.json({ success: false, message:" wrong password please enter right password"})
 }
}
else{
     return res.json({ success: false, message:"username not found"})
}

}
else{
     return res.json({ success: false, message:"please enter valed input"})
}

return res.json({ success: false, message:"somthing went rong"})
}
catch(e){
    console.log(e)
}
}




let logout = (req,res)=>{
    res.send("i love you tam logout")

}


module.exports ={register,login,logout}
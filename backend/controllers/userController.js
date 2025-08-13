let User = require('../Models/userModel')

let getAllUsers = async (req,res)=>{
let allUsers = await User.find({});
return res.json({ success: true,allUsers:allUsers})
}

let getUserProfile = async (req,res)=>{
let id = req.params.id;
try{
let user = await User.findById(id)

if(! user){
  return res.json({ success: false,message:'user not found'})
}
 return res.json({ success: true,user:user})
}
catch(e){
    console.log(e)
}

}

let updateUserProfile = async (req,res)=>{
res.send('updateUserProfile working')
}

let deleteUserProfile = async (req,res)=>{
  
let id = req.params.id;
console.log(id)
try{
let user = await User.findById(id)
console.log(user)
if(! user){
  return res.json({ success: false,message:'user not found'})
}
 await User.findByIdAndDelete(id)
   return res.json({ success: true,message:'user deleted'})
}
catch(e){
    console.log(e)
}

}

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
}
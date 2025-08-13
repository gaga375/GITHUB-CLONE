let repoDatabase = require("../Models/repoModel");
let User = require('../Models/userModel');
let Issue = require("../Models/issueModel");
let fileModel = require("../Models/fileModel");


let CreateRepository = async (req , res) =>{
let {owner,name,descrption , content ,visibility} = req.body;

try{
if(! name){
     return res.json({ success:false, message:"name is required" })
}
let finalname = name.trim().toLowerCase();
let finalowner = owner.trim()

 let chekuser = await User.findById(finalowner);

 if(! chekuser){

   return res.json({ success:false, message:"user not found" })
    
}
let match = await repoDatabase.find({name:finalname});

 if( match.length >= 1){
      return res.json({ success:false, message:"repo name not aivlable please try defrent name" })
 }

let newrepo =  repoDatabase({
    name:finalname,
    descrption,
    content, 
    visibility,
    owner
})
 await newrepo.save();
 return res.json({ success: true, message:"repo created" ,data:newrepo})
 }
catch(e){
    console.log(e)
}
}

let getAllRepository = async (req , res) =>{
try{
 let allRepo = await repoDatabase.find({visibility:true}).limit(8).populate("owner").populate("issues");
return res.json({ success: true, message:"all repo fetch" ,data:allRepo})
}
catch(e){
    console.log(e)
}
   
}

let fetchRepositoryById = async (req , res) =>{
let id = req.params.id;

 try {
if( ! id){
    res.json({success:false,message:"id is required"})
}
let responce = await repoDatabase.findById(id).populate("owner").populate("issues");
if(! responce){
 return res.json({success:false,message:"no data found"})
}
return res.json({ success: true, message:"id fetch by id" ,data:responce})
}
  catch(e){
      return   res.json({success:false,message:"server error updating repo",error:e})
    }
    }


let fetchRepositoryByName = async (req , res) =>{
    try{
let Name = req.params.name;
if(! Name){
   return  res.json({success:false,message:"Name is Repuire"})
}
let responce = await repoDatabase.find({name:Name,visibility:true}).populate("owner").populate("issues");
if(! responce.length){
    return res.json({success:false,message:"NO data Found"})
}
res.json({success:true, data:responce})
    }
    catch(e){
        console.log(e)
    }
}

let fetchRepositoryForCurrentUser = async (req , res) =>{

let id = req.params.id;

 try {
if(! id){
   return  res.json({success:false,message:"id is required"})
}

let idchek = await User.findById(id);
if(! idchek){
 return res.json({success:false,message:"invlade userID"})
}
let fetchrepo = await repoDatabase.find({owner:id}).populate("owner").populate("issues")
 return res.json({success:true,data:fetchrepo})
    }
    catch(e){
        return res.json({success:false,message:"server error fetchRepositoryForCurrentUser ",error:e})
    }
}

let updateRepositoryById = async (req ,res)=>{
    let id = req.params.id;
let {repoDescrption ,content ,visibility} = req.body;

    try {
let responce = await repoDatabase.findById(id);
if(! responce){
    return res.json({success:false,message:"no repo found"})
}
 const update = await repoDatabase.findByIdAndUpdate(
        id,
        {
            descrption: repoDescrption,
            content: content,
            visibility:visibility
        },
        { new: true } 
    );

  return res.json({success:true,message:"update successfully",data:update})
    }
    catch(e){
      return  res.json({success:false,message:"server error updating repo",error:e})
    }

}

let toggleVisibilityById = async (req,res)=>{
  let id = req.params.id;
  try{
    if( !id){
 return res.json({success:false,message:"id is required"})
    }
    let responce = await repoDatabase.findById(id)

    if(! responce){
        return res.json({success:false,message:"no repo found"})
    }

    responce.visibility = ! responce.visibility;
    await responce.save()
    return res.json({success:true,message:"visble change successfully", data:responce})
  }
  catch(e){
   return res.json({success:false,message:"server error for togglie",e})
  }
}

let deleteRepositoryById = async (req ,res) =>{
try{

let id = req.params.id;
let issue = await Issue.deleteMany({Repository:id})
let file = await fileModel.deleteMany({owner:id})
let responce = await repoDatabase.findByIdAndDelete(id);
if(! responce){
   res.json({success:false,message:"no repository found"})
}
res.json({success:true,data:responce})
}
catch(e){
    console.log(e)
}
}


module.exports = {getAllRepository,
    CreateRepository,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    deleteRepositoryById,
    toggleVisibilityById

}


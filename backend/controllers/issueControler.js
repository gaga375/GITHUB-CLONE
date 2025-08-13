
let issueDatabase = require("../Models/issueModel");


let  createIssue = async (req,res)=>{
let {title,discription,Repository,owner} = req.body;

if(!title || !discription || !Repository){
    return res.json({success:false,message:"all feld is required"})
}
try{
    let responce =  new issueDatabase({
        title,
        discription,
        Repository,
        owner
    })
await responce.save();
res.json({success:true,message:"issue create",data:responce})
}
catch(e){
    return res.json({success:false,message:"server error for creating issue",e})
}
}





let  updateIssueById = async (req,res)=>{
    let id = req.params.id;

    let {title,discription,status}=req.body;

    if(!id){
        res.json({success:false,message:"id is required"})
    }
if(! title && ! discription && ! status){
return res.json({success:false,message:"al lest one feld required for update issue"})
}
    try{
let responce = await issueDatabase.findById(id);

if(! responce){
    return res.json({success:false,message:"no issue found"})
}

let update = await issueDatabase.findByIdAndUpdate(id,{
    title,
    discription,
    status
},
{new:true})
return res.json({success:true,message:'issue updated successfully',data:update})
    }
    catch(e){
        return res.json({success:false,message:"server error for updating issue",e})
    }
}





let  deleteIssueById = async (req,res)=>{
    let id = req.params.id;

    try{
 let responce = await issueDatabase.findByIdAndDelete(id)

 if(! responce){
    return res.json({success:false,message:"no issue found"})
 }

return res.json({success:true,message:"issue deleted sucessfully",data:responce})
    }
    catch(e){
    return res.json({success:false,message:"server error for deleting issue",e})
    }
}






let  getIssueByUserId = async (req,res)=>{
  let id = req.params.id;
      try{
 let responce = await issueDatabase.find({owner:id});

 if(! responce){
    return res.json({success:false,message:"no issue found"})
 }

return res.json({success:true,message:"all issue fetch sucessfully",data:responce})
    }
    catch(e){
    return res.json({success:false,message:"server error for fetch all issue",e})
    }


}
let  getIssueById = async (req,res)=>{
    let id = req.params.id;
    try{
  let responce = await issueDatabase.find({Repository:id});

if(! responce){
    return res.json({success:false,message:"no issue found"})
}

return res.json({success:true,message:"issue fetch sucessfully",data:responce})

    }
    catch(e){
         return res.json({success:false,message:"server error for fetch issu issue",e})
    }
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getIssueByUserId,
    getIssueById
};
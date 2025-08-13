let supabase = require('../SupabaseClient');
let fileModel = require('../Models/fileModel');
let repoDatabase = require('../Models/repoModel')

let uploadFile = async (req, res) => {
  const file = req.file;
 const {repoid} = req.body; 
try{
  
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

    if (!repoid) return res.status(400).json({ error: 'user id is required please login' });

  const fileName = `${Date.now()}-${file.originalname}`;

  const { error } = await supabase.storage
    .from('githubfile')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });
  if (error) return res.status(500).json({ error: error.message });

  const { data, error: publicUrlError } = supabase
    .storage
    .from('githubfile')
    .getPublicUrl(fileName);

  if (publicUrlError) {
    return res.status(500).json({ error: publicUrlError.message });
  }

   let newfile = fileModel({
     filename: fileName,
     fileurl: data.publicUrl,
     owner: repoid
   });
   let responce = await newfile.save();

  res.json({ success: true, data:responce });
  }
catch(e){
    console.log(e)
}
};


let getrepofile =  async(req ,res)=>{
 let id = req.params.id;

try{

let repoResponce = await repoDatabase.findById(id);

if ( ! repoResponce){
  return res.json({success:false , message:"no repo found "})
}

 let responce = await fileModel.find({owner:id})

if(! responce || responce.length == 0){
 return res.json({success:false,message:"no file found",data:responce , RepoOwner:repoResponce.owner})
}
res.json({success:true , data:responce , RepoOwner:repoResponce.owner})

}
catch(e){
  console.log(e)
}
 
}
module.exports =
 {uploadFile,
  getrepofile
};

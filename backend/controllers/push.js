 let path = require('path');
 let fs = require('fs').promises
let {s3,S3_BUCKET} = require('../config/aws-config');

async function pushCom() {
  let repoPath=  path.resolve(process.cwd(),'.gaganGit');
  let commitsPath = path.join(repoPath,'commits');
  try{
let commitDirs = await fs.readdir(commitsPath);
for (let commitDir of commitDirs ){
    const commitPath = path.join(commitsPath,commitDir);
    const files = await fs.readdir(commitPath);

    for (let file of files){
     const filePath = path.join(commitPath,file);
     const fileContent = await fs.readFile(filePath);
     const params = {
        Bucket:S3_BUCKET,
        Key:`commits/${commitDir}/${file}`,
        Body: fileContent
     };
     await s3.upload(params).promise()
    }
}
  }
  catch (error){
    console.log(error)
  }
  console.log('conde is working')
}
module.exports = pushCom
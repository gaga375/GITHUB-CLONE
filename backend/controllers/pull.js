let fs = require('fs').promises;
let path = require("path");
let {s3 ,S3_BUCKET} = require('../config/aws-config');

async function pullCom() {
const repoPath = path.resolve(process.cwd(),'.gaganGit');
const commitPath = path.join(repoPath, "commits");

try{
let data = await s3.listObjectsV2({
    Bucket:S3_BUCKET,
    Prefix:'commits/',
})
.promise();

const objects = data.Contents;
for( const object of objects){
    const key = object.Key;
    const commitDir = path.join(commitPath,path.dirname(key).split("/").pop());

    await fs.mkdir(commitDir , {recursive:true});
    const params = {
        Bucket:S3_BUCKET,
        Key:key,
    };

    const fileContent = await s3.getObject(params).promise();
    await fs.writeFile(path.join(repoPath,key),fileContent.Body);
}
console.log("pull command working ")
}
catch(e){
    console.log(e)
}

}
module.exports = pullCom
let fs = require('fs').promises;
let path = require('path');
const { config } = require('yargs');

async function init (){
const repoPath = path.resolve(process.cwd(),'.gaganGit');
const commitPath = path.join(repoPath, "commits");

try{
await fs.mkdir(repoPath,{recursive:true});
await fs.mkdir(commitPath,{recursive:true});
await fs.writeFile(
    path.join(repoPath,'config.json'),
    JSON.stringify({bucket: process.env.S3_BUCKET})
);
console.log("file create sucessfully");
}
catch (e){
console.log(e)
}
}
module.exports = init
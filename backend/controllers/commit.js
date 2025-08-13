let {v4:uuidv4 } = require("uuid");
let fs = require('fs').promises;
let path = require('path');

async function commitCom(message) {
let repoPath = path.resolve(process.cwd(),".gaganGit");
const stagePath = path.join(repoPath,"staging");
const commitPath = path.join(repoPath,"commits")
try{
const commitId = uuidv4();
const commitDir = path.join(commitPath,commitId);
await fs.mkdir(commitDir,{recursive:true});
const files = await fs.readdir(stagePath);
for(let file of files){
    await fs.copyFile(
        path.join(stagePath,file),
      path.join(commitDir,file)
    );
await fs.writeFile(
    path.join(commitDir,'commitCom.json'),
    JSON.stringify({message,date: new Date().toISOString()})
);
}
 console.log(`file ${commitId} for commit ${message}` )
}
catch(e){
    console.log(e)
}
}
module.exports = commitCom
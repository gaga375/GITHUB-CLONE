let fs = require('fs');
let path = require('path');
let {promisify} = require('util');

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);


async function revertCom(commitId) {
    let repoPath=  path.resolve(process.cwd(),'.gaganGit');
     let commitsPath = path.join(repoPath,'commits');

     try{
 const commitDir = path.join(commitsPath,commitId);
 const files = await readdir(commitDir);
 const parentDir = path.resolve(repoPath,"..");

 for (const file of files){
    await copyFile(path.join(commitDir,file),path.join(parentDir,file))
 }
 console.log('revert sucessfully')
     }
     catch(e){
        console.log(e)
     }
}
module.exports = revertCom
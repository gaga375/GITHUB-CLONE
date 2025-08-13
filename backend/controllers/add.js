let fs = require('fs').promises;
let path = require('path');

async function addRepo(filePath){
let repoPath = path.resolve(process.cwd(),'.gaganGit');
const stagingPath = path.join(repoPath, "staging");

try{
await fs.mkdir(stagingPath,{recursive:true});
let fileName = path.basename(filePath);
await fs.copyFile(filePath,path.join(stagingPath,fileName));
 console.log(`file ${fileName} was add `)
}
catch(e){
    console.log(e)
}
}
module.exports = addRepo
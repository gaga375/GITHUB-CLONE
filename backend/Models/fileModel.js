let mongoos = require('mongoose');

let {Schema} = mongoos;

let FileSchema = new Schema({
filename:{
   type:String,
},
fileurl:{
    type:String
},
uploadAt:{
    type:Date,
    default:Date.now,
},
  owner:{
type:Schema.Types.ObjectId,
ref:"Repository"
    }
})

let fileModel = mongoos.model("file",FileSchema);
module.exports = fileModel;


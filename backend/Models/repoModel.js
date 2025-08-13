let mongoos = require('mongoose');
let {Schema} = mongoos;

let RepoSchema = new Schema({
    name:{
    type:String,
    require:true,
    unique:true
    },
    descrption:{
        type:String
    },
         content:{
        type:String
    },
    visibility:{
  type:Boolean,

    },
    owner:{
type:Schema.Types.ObjectId,
ref:"User"
    },
    issues:[{
        type:Schema.Types.ObjectId,
        ref:'Issue'
    }]
})

let Repository = mongoos.model("Repository",RepoSchema);
module.exports = Repository;

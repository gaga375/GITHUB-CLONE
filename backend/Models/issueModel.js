let mongoos = require('mongoose');

let {Schema} = mongoos;

let IssueSchema = new Schema({
    title:{
   type:String,
    required:true
    },
      owner:{
type:Schema.Types.ObjectId,
ref:"User"
    },

    discription:{
        type:String,
    required:true
    },

    status:{
type:String,
enum:["open","closed"],
default:"open"
    },
    Repository:{
 type:Schema.Types.ObjectId,
 ref:"Repository"
    }
})

let Issue = mongoos.model("Issue",IssueSchema);
module.exports = Issue;


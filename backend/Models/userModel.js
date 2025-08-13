let mongoos = require('mongoose');
let {Schema} = mongoos;

let UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    repositories:[
        {
         default:[],
         type:Schema.Types.ObjectId,
         ref:'Repository',   
        }
    ],
followedUsers:[
        {
         default:[],
         type:Schema.Types.ObjectId,
         ref:'User',   
        }
    ],
    starRepos:[
        {
         default:[],
         type:Schema.Types.ObjectId,
         ref:'Repository',   
        }
    ],
})

let User = mongoos.model("User",UserSchema);
module.exports =  User;
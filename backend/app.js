let express = require('express');
let app = express();
let mongoose = require('mongoose');
let port = 8080;
let http = require('http');
let cors = require('cors');
let body_parser = require('body-parser');
let {Server} = require('socket.io')

const  yargs  = require("yargs");
const {hideBin} = require('yargs/helpers');
let inti = require('./controllers/init');
let commitCom = require('./controllers/commit');
let pullCom = require('./controllers/pull');
let addrepo = require('./controllers/add');
let revertCom = require('./controllers/revert')
let pushCom = require('./controllers/push');
let mainRouts = require('./Routs/mainRouts')


function start(){
    app.use(cors({origin:'*'}));
  app.listen(port,()=>{console.log('server start')})
  app.use(body_parser.json());
  app.use('/',mainRouts);
  app.use(express.json());
    mongoose.connect(process.env.MONGO_URL,
        console.log("database connected"))

        const httpServer = http.createServer(app);
        let user = 'test';
        const io = new Server(httpServer,{
            cors:{
                origin:'*',
                methods:['GET','POST']
            }
        })

        io.on('connection',(Socket)=>{
            Socket.on('joinRoom',(userId)=>{
                user = userId;
                console.log("====");
                console.log(user);
                 console.log("====");
              Socket.join(userId);
            });
        });
    
        const db = mongoose.connection;
        db.once('open', async ()=>{
            console.log("data fetch all bola to i love you tam")
        })
    
}



yargs(hideBin(process.argv))
.command('start','start the server',start())
.command('init','initialise a new repository',{},inti)
.command('push', 'push command for s3',{},pushCom)
.command('pull','pull command for s3',{},pullCom)
.command('add <file>',
    'add a file to the repository',
    (yargs)=>{
        yargs.positional('file',{
            describe: 'file to add to the sraging area',
            type: 'string'
        });
    },
    (argv)=>{
        addrepo(argv.file)
    }
)
.command('revert <commitId>',
    'revert the file for s3',
    (yargs)=>{
        yargs.positional("file",{
        describe: 'revert file for deleted',
        type: 'string'
        });
    },
   (argv)=>{
revertCom(argv.commitId)
   }
)
.command('commit <commit>',
    'commit sucessfully',
(yargs)=>{
    yargs.positional('file',{
    describe: 'commit sucessfully',
    type:'string'
    });
},
(argv)=>{
    commitCom(argv.commit)
}
)
.demandCommand(1,'you need at least one command')
.help().argv;



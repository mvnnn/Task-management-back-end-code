import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

import Project from './routes/project';
import Task from './routes/task';

const port = process.env.PORT || 4000 ;
const app = express();

let dburl = 'mongodb://sprinklr-todolist:sprinklr@ds151702.mlab.com:51702/sprinklr-todolist';
mongoose.connect(dburl);


app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

// app.use(session({ cookie: { maxAge: 60000 },
//                   secret: 'woot',
//                   resave: false,
//                   saveUninitialized: false}));
app.use(logger('dev'));
// app.use(flash());
// app.use(function(req, res, next){
//     res.locals.success = req.flash('success');
//     // res.locals.errors = req.flash('error');
//     next();
// });
// app.set('view engine', 'ejs');
// app.use(favicon(path.join('public','bb.ico')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', __dirname + '/views');

app.get('/project', Project.GetProjects);
app.post('/project', Project.CreateProject);

app.post('/createTask', Task.CreateTask);
app.post('/updateTaskStatus', Task.UpdateTaskStatus);
app.post('/dragAndDropCard', Task.UpdateDragAndDropCard);
app.post('/member', Task.AddMember);



app.get("/*",function(req,res){
  res.send("<h1>Hello from sprinklr</h1>");
});

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    response: 'error',
    message: err.message,
    data: (app.get('env') === 'development') ? err : {}
  });
});

var server = http.createServer(app);
server.listen(4000, function() {
    console.log('Server is listening on port 4000');
});

// });

export default app;

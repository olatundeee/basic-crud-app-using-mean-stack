var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');
var tasks = require('./routes/tasks');

//Port

var port = 3000;

var app = express();

//View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder

app.use(express.static(path.join(__dirname, 'client')));

//Body Parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//CORS Middleware

app.use(cors());

// Routes

app.use('/', index);
app.use('/api', tasks);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.listen(port, function(){
    console.log('Server started on port ' + port);
});


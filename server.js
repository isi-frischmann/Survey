// require express
var express = require('express');
// create the express app
var app = express();

// when you want to use the posted data install and then down the line use it
var bodyParser = require('body-parser')
// declare path
var path = require('path');

// require session
var session = require('express-session')

// use body parser
app.use(bodyParser.urlencoded({extended: true}));

// use static content
app.use(express.static(path.join(__dirname, './static')));

// use session
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

// setting up ejs and the views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// port is listen on
app.listen(8000, function(){})


// routing
app.get('/', function (req, res){
    // console.log(req.session.name);
    res.render('index');
})

app.post('/allInfo', function (req, res){
    req.session.name = req.body.name;
    req.session.language = req.body.language;
    req.session.location = req.body.location;
    req.session.comment = req.body.comment;
    // console.log(name);
    res.redirect('/userInfo');
})

app.get('/userInfo', function (req, res){
    var userInformation = {
        name: req.session.name,
        language: req.session.language,
        location: req.session.location,
        comment: req.session.comment
    }
    // console.log(language);
    res.render('userInfo', {user : userInformation});
})
require('./config/config.js');


const  express = require('express');
const bodyparser = require('body-parser');
const _ = require("underscore");
const port = process.env.PORT || 3000;

var app = express();
var router = express.Router();
var firebase = require("firebase");
var cookieParser = require('cookie-parser');

// var admin = require("firebase-admin");
// var serviceAccount = require("./db/serviceAccountKey.json");


// Initialize Firebase - Firebase configuration
var firebaseConfig = require("./db/serviceAccountKey.json");
firebase.initializeApp(firebaseConfig);

//*****create paths and shortcuts*****
var path2 = __dirname + '/node_modules/bootstrap/dist/js';
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/Js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/myCss', express.static(__dirname + '/public')); //redirect for my css
var path = __dirname + '/views';







// var user = firebase.auth().currentUser;
//
// if (user) {
//     app.use('/welcome', router);
// } else {
//     app.use('/', router);
// }





// *****direct pages*****
app.get('/', (req, res) => {
    res.sendFile(path + '/signIn.html');
});

app.get('/signIn', (req, res) => {
    res.sendFile(path + '/signIn.html');
});

app.get('/signUp', (req, res) => {
    res.sendFile(path + '/signUp.html');
});

app.get('/welcome', (req, res) => {
    res.sendFile(path + '/welcome.html');
});



//*****starting page and uses*****

app.use('/', router);

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cookieParser(['array', 'of', 'secrets']));






// ****test databse*****
app.get('/test/:id', function (req, res) {

    console.log("HTTP Get Request");
    res.send("HTTP GET Request");
    //Insert key,value pair to database
    firebase.database().ref('/TestMessages').set({TestMessage: 'GET b Request'});
});





//*****register user with username and passsword*****
app.post('/register',function (req,res,next) {
    var email = req.body.email;
    var password = req.body.password;
    var passwordVer = req.body.passwordVer;


    if(password == passwordVer) {
        firebase.auth().createUserWithEmailAndPassword
        (
            email,
            password
        )
            .then(function (newUser) {
                res.status(200).end();
                res.status(201).end();
            })
            .catch(function (error) {
                console.log(error);

                res.status(401).end();
            })
    }
});


//*****find user for login
app.post('/fetchUser',function (req,res,next) {
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        console.log(error.Message);
    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            res.redirect('/welcome'); //After successful login, user will be redirected to home.html
        } else {
            res.redirect('/signUp');
        }
    });
});


app.use(bodyparser.json());

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};



//require("./db/registerUser.js");

// *****RestMethods*****

// app.get('/', function (req, res) {
//     console.log("HTTP Get Request");
//     res.send("HTTP GET Request");
// });
//
// app.put('/', function (req, res) {
//     console.log("HTTP Put Request");
//     res.send("HTTP PUT Request");
// });
//
// app.post('/', function (req, res) {
//     console.log("HTTP POST Request");
//     res.send("HTTP POST Request");
// });
//
// app.delete('/', function (req, res) {
//     console.log("HTTP DELETE Request");
//     res.send("HTTP DELETE Request");
// });
// var server = app.listen(3000, function () {
//
//     var host = server.address().address;
//     var port = server.address().port;
//
//     console.log("Example app listening at http://%s:%s", host, port);
// });
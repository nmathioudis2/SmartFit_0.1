require('./config/config.js');
require('./db/firebase.js');


const  express = require('express');
const bodyparser = require('body-parser');
const _ = require("underscore");
const port = process.env.PORT || 3000;

var app = express();
var router = express.Router();

var path2 = __dirname + '/node_modules/bootstrap/dist/js';
console.log(path2);

//create shortcuts for jQuery and bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/Js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/myCss', express.static(__dirname + '/public')); //redirect for my css


console.log(__dirname);

var path = __dirname + '/views';
router.get('/', (req, res) => {
    res.sendFile(path + '/signUp.html');
});
app.use('/', router);


app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(bodyparser.json());

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};
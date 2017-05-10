var root = __dirname;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var router = express.Router();

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log("App running on port : ", app.get('port'));
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: 'handlebars'
}));
app.set('views', path.join(root, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//ROOT ROUTE
app.get('/', function(req, res) {
  var data = {
    row: ['0','1','2','3'],
    col: ['0','1','2','3']
  }
  res.render('home', data);
});

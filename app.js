var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 3000
    , router = express.Router()
    , log = require('./dev-logger.js');

var server = require('http').createServer(app);

var ws = require('./ws.js')(server);

app.use(express.static(__dirname + '/')); // set the static files location for the static html
// app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
// You can set morgan to log differently depending on your environment
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(morgan('dev', {skip: function(req, res) { return res.statusCode < 400 }}));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride());                  // simulate DELETE and PUT

router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/b/:id', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/', router);

var mongoUri = process.env.MONGO_URI || 'mongodb://localhost/gtm';

console.log(mongoUri);
var mongoose = require('mongoose');
mongoose.connect(mongoUri);
var cardRoutes = require('./api/routes/card.routes.js')(app);
var columnRoutes = require('./api/routes/column.routes.js')(app);
var boardRoutes = require('./api/routes/board.routes.js')(app);

server.listen(port, function () {
  log('App running on port', port);
});


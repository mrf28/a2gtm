var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 3000
    , router = express.Router()
    , log = require('./dev-logger.js')
    , schedule = require('node-schedule');

var j = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

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
mongoose.connect(mongoUri, function () {
  // Provisional code, for runing db.dropDatabase() every startup, 
  // while running free dyno that sleeps 6 hours per day
  mongoose.connection.db.dropDatabase(function (){
    log('db droped');
  });
});

var cardRoutes = require('./api/routes/card.routes.js')(app);
var columnRoutes = require('./api/routes/column.routes.js')(app);
var boardRoutes = require('./api/routes/board.routes.js')(app);

// This may not be achieved in free dyno
var j = schedule.scheduleJob({hour: 0}, function(){
  log('droping db');
  mongoose.connection.db.dropDatabase(function (){
    log('db droped');
  });
});

server.listen(port, function () {
  log('App running on port', port);
});


// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// set port
app.set('port', process.env.PORT || 3000);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

// Only allow cors with FCC
var corsOptions = {
  origin: 'https://www.freecodecamp.org',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', function (req, res) {
  let date_string = req.query['date_string'];
  // trigger new Date() when no date_string is given
  if (!date_string) { 
    date_string = new Date();
  }
  res.redirect('/api/timestamp/' + date_string)
});

app.get('/api/timestamp/:date_string', function (req, res) {
  const date_string = req.params['date_string'];
  let new_date = '';
  if (/^[0-9]+$/.test(date_string)) {
    new_date = new Date(Number.parseInt(date_string));
  }
  else {  
    new_date = new Date(date_string);
  }
  // check if date could be parsed
  const error = new_date.toUTCString() === 'Invalid Date';
  // build result object
  const result = error ? {'error': 'Invalid Date'} : {'unix': new_date.valueOf(), 'utc': new_date.toUTCString()};
  res.send(result);
});

// listen for requests :)
var listener = app.listen(app.get('port'), function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
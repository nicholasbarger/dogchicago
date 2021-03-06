var newrelic = require('newrelic');
var http = require('http');
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var hoganExpress = require('hogan-express');
var compress = require('compression')();

var api_user = process.env.SENDGRID_USERNAME;
var api_key = process.env.SENDGRID_PASSWORD;

var emailProvider = require("sendgrid")(api_user, api_key);

// start express
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname +  '/public/favicons/favicon.ico'));

// view engine setup
app.set('view engine', 'html');
app.set('layout', '../layout');
app.set('views', path.join(__dirname, 'views'));
app.enable('view cache');
app.engine('html', hoganExpress);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress);
app.use(cookieParser());

// redirect non-www to www for seo
if(process.env.NODE_ENV === 'production') {
  app.get('*', function(req, res, next) {
    // var reqType = req.headers["x-forwarded-proto"];
    // reqType == 'https' ? next() : res.redirect("https://" + req.headers.host + req.url);

    if (req.headers.host.slice(0, 3) != 'www') {
      res.redirect('https://www.' + req.headers.host + req.url, 301);
    } else {
      next();
    }
  });
}

// initialize routes for web
var oldWebForRedirects = require('./routes-old.js')(app);
var web = require('./routes.js')(app, emailProvider);

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('not-found', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// start web server
var server = app.listen(port, function() {
  console.log('Webserver started at http://localhost:%d/', server.address().port);
});
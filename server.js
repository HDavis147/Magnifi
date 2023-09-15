const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const querystring = require('querystring');
const request = require('request');

// const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 30 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Spotify API authentication START
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const redirectURI = process.env.redirectURI;

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  var scope = 'user-read-private%20user-read-email';

  res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURI}&state=${state}`);
});

app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    console.log("state is null");
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      })
    );
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: `http://localhost:3001/callback`,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization' : 'Basic ' + (new Buffer.from(clientID + ':' + clientSecret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };

    request.post(authOptions, function (err, response, body) {
      if (!err) {

        var accessToken = body.access_token;
        var refreshToken = body.refresh_token;
        console.log(accessToken);
        console.log(refreshToken);

      } else {
        res.send("Authentication Error.");
        console.log(err);
      }
    })
  }
});

// Spotify API authentication END

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
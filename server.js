var express = require('express')
  , config = require('./config')
  , app = express()
  , Fitbit = require('fitbit')
  , wines = require('./routes/wines');

app.use(express.cookieParser());
app.use(express.session({secret: 'hekdhthigib'}));
app.listen(3000);

// OAuth flow
app.get('/', function (req, res) {
  // Create an API client and start authentication via OAuth
  var client = new Fitbit(config.CONSUMER_KEY, config.CONSUMER_SECRET);
  console.log('initiated fitbit client');

  client.getRequestToken(function (err, token, tokenSecret) {
    if (err) {
      console.log('error in getting temporary request token');
      return;
    }

  console.log('temporary token request successful');
    req.session.oauth = {
        requestToken: token
      , requestTokenSecret: tokenSecret
    };
    
  console.log('before redirecting to fitbit server with token : ' + token + ' & tokenSecret : ' + tokenSecret);

  res.redirect(client.authorizeUrl(token));
  });
});

// On return from the authorization
app.get('/oauth_callback', function (req, res) {

    var verifier = req.query.oauth_verifier
    , oauthSettings = req.session.oauth
    , client = new Fitbit(config.CONSUMER_KEY, config.CONSUMER_SECRET);

  console.log('created verifier');

    // Request an access token
  client.getAccessToken(
      oauthSettings.requestToken
    , oauthSettings.requestTokenSecret
    , verifier
    , function (err, token, secret) {
        if (err) {
          console.log('error in exchanging request token to an access token');
          return;
        }


  	console.log('Successfully got the access token');
        oauthSettings.accessToken = token;
        oauthSettings.accessTokenSecret = secret;

        res.redirect('/stats');
      }
  );
});

// Display some stats
app.get('/stats', function (req, res) {
  client = new Fitbit(
      config.CONSUMER_KEY
    , config.CONSUMER_SECRET
    , { // Now set with access tokens
          accessToken: req.session.oauth.accessToken
        , accessTokenSecret: req.session.oauth.accessTokenSecret
        , unitMeasure: 'en_GB'
      }
  );

  // Fetch todays activities
  client.getActivities(function (err, activities) {
    if (err) {
      // Take action
      return;
    }

    // `activities` is a Resource model
    res.send('Total steps today: ' + JSON.stringify(activities));
  });
});
 
console.log('Listening on port 3000...');
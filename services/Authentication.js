var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var keys = require('../keys');
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
var baseURL = require('../config').baseURL;
var redirectUrl = baseURL + '/auth/google/return';

module.exports = function(db, config) {
	var Users = require('./Users')(db);
	var oauth2Client = new OAuth2(keys.GoogleOAuth2ClientID, keys.GoogleOAuth2ClientSecret, redirectUrl);


	OAuth2Strategy.prototype.authorizationParams = function(options) {
		return {scope: 'email'};
	};

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		Users.getUser(id).then(function(user){
			done(null, user);
		}, function(err){
			done(err, {});
		});
	});

	passport.use(new OAuth2Strategy({
			authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
			tokenURL: 'https://www.googleapis.com/oauth2/v3/token',
			clientID: keys.GoogleOAuth2ClientID,
			clientSecret: keys.GoogleOAuth2ClientSecret,
			callbackURL: redirectUrl 
		},
		function(accessToken, refreshToken, profile, done) {
			oauth2Client.setCredentials({
				access_token: accessToken,
				refresh_token: refreshToken
			});
			plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, res) {
				Users.getSocialUser('google:' + res.id).then(function(user) {
					done(null, user);
				}, function(err) {
					if(!config.allowSignUps) {
						done(err, null);
					} else {
						Users.createSocialUser('google:' + res.id, { name: res.displayName, email: res.emails[0].value})
							.then(function(user) {
								done(null, user);
							}, function(err) {
								done(err, null);
							});
					}
				});
			});
		})
	);

	return passport;
};

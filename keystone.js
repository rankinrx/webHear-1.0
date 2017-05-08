// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();
// Connect to mlab database: MONGO_URI=mongodb://admin:admin@ds133290.mlab.com:33290/webhearing

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'WebHearing',
	'brand': 'WebHearing',	//Displayed in the top left hand corner of the Admin UI

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI (relate to keystone lists by default)
keystone.set('nav', {
	users: 'users',
	manage: ['patients', 'appointments', {
		label: "Calendar",
		key: "calendar",
		path: "/calendar"
	}
	],
});

// Start Keystone to connect to your database and initialise the web server



keystone.start();

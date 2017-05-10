/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/calendar', middleware.requireUser, routes.views.calendar);
	app.get('/appointments', middleware.requireUser, routes.views.appointments.aptmntlist);
	//app.get('/appointments/:aptmntslug', routes.views.appointments.singleaptmnt);
	
	


	//  // Webhearign API
    app.get('/api/calendar', keystone.middleware.api, routes.api.appointment.getAppointments);//This gets the list of tickets
    // app.get('/api/tickets/:id', keystone.middleware.api, routes.api.ticket.getTicketById);//This gets the ticket with ID {id}
    // app.post('/api/tickets', keystone.middleware.api, routes.api.ticket.createTicket);//This creates a new ticket
    // app.put('/api/tickets/:id', keystone.middleware.api, routes.api.ticket.updateTicketById);//This updates the ticket with ID {id}
    // app.delete('/api/tickets/:id', keystone.middleware.api, routes.api.ticket.deleteTicketById);//This deletes the ticket with ID {id}
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};

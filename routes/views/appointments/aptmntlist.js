var keystone = require('keystone');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'appointments';

    locals.data = {
        appointments: [],
    };

    // Load all appointments, method is called when the HTTP request comes through the route each time
    view.on('init', function(next) {
        
    });
    // Render the view
    view.render('appointments/aptmntlist'); //any variable set wihin the res.locals variable is accessible by the given template
};


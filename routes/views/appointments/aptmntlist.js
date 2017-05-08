var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'appointments';

    locals.data = {
        appointments: [],
    };

    // Load all appointments, method is called when the HTTP request comes through the route each time
    view.on('init', function (next) {

        var q = keystone.list('Appointment').model.find();
        console.log(q);
        q.exec(function (err, results) {
            locals.data.appointments = results;
            next(err);
        });
    });
    // Render the view
    view.render('appointments/aptmntlist');
};


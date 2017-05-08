
var keystone = require('keystone');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var currentUser = locals.user

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';

    locals.data = {
        users: [],
        appointments: [],
    };

    view.on('init', function(next) {
        // retrieve list of users
        var queryAppointments = keystone.list('Appointment').model.find().select('_id name')
        queryAppointments.exec(function(err, results) {
            locals.data.users = results;
            next(err);
        });

		//scheduler.init('scheduler_here',new Date(2013,8,4),"month");
    });

    // Render the view
    view.render('calendar');
};
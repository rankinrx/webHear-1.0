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

    // view.on('init', function(next) {

    //     keystone.list('Appointment').model.find()
    //         .where('assignedTo', locals.user._id)
    //         .sort('-date')
    //         .exec(function(err, appointments) {
    //             for (var i = 0; i < appointments.length; i++) {
    //                 appointments[i].id = appointments[i]._id;
    //                 appointments[i].text = appointments[i].description;
    //                 appointments[i].start_date = appointments[i]._.date.moment();//format('LT');
    //                 appointments[i].end_date = appointments[i]._.date.moment().add(1, 'h');//.format('LT');
    //             }
    //             //console.log(appointments[1].start_date);
    //             //console.log(appointments[1].end_date);
    //             locals.data.appointments = appointments;
    //             next(err);
    //         });
    // });

    // Render the view
    view.render('calendar');
};
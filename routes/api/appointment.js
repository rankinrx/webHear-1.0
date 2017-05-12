var keystone = require('keystone');
/**
 * List Appointments
 */
var event = [];
exports.getAppointments = function (req, res) {
    // .lean is the SHIT
    keystone.list('Appointment').model.find()
        .where('assignedTo', req.user)
        .sort('-date')
        .lean()
        .exec(function (err, event) {

        for (var i = 0; i < event.length; i++) {
            event[i].id = event[i]._id;
            event[i].text = event[i].description;
            event[i].start_date = event[i].date;//._.moment();//format('LT');
            event[i].end_date = event[i].date;//.moment().add(1, 'h');//.format('LT');
            //console.log(event[i]);
        }
            if (err) return res.apiError('database error', err);
            res.apiResponse(event);
        });
}

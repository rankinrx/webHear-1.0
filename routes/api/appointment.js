var keystone = require('keystone');

/**
 * List Appointments
 */
exports.getAppointments = function(req, res) {
	 keystone.list('Appointment').model.find()
        .where('assignedTo', req.user)
        .sort('-date')
        .exec(function(err, result) {
            var obj = JSON.parse(jsonStr);
            for (var i = 0; i < appointments.length; i++)
            {
                appointments[i].id = appointments[i]._id;
                //appointments[i].text = appointments[i].description;
                appointments[i].start_date = appointments[i]._.date.moment();//format('LT');
                appointments[i].end_date = appointments[i]._.date.moment().add(1, 'h');//.format('LT');
            }
            //locals.data.appointments = appointments;

            if (err) return res.apiError('database error', err);
            
            res.apiResponse({
                appointments: appointments
            });
    });        
}
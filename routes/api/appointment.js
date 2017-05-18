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

exports.updateAppointments = function (req, res) {
    var data = req.body;

    //get operation type
    var mode = data["!nativeeditor_status"];
    //console.log(mode)
    //get id of record
    var sid = data.id;
    var tid = sid;

    //database currently doesnt have values so need to convert
    data.description = data.text;
    data.date = data.start_date;

    console.log(data.text)
    console.log(data.description)



    //remove properties which we do not want to save in DB
    delete data.id;
    delete data.gr_id;
    delete data["!nativeeditor_status"];


    //output confirmation response
    function update_response(err, result){
        if (err)
            mode = "error";
        else if (mode == "inserted")
            tid = data._id;

        res.setHeader("Content-Type","text/xml");
        res.apiResponse("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
    }

    //run db operation
    if (mode == "updated")
        //db.event.updateById( sid, data, update_response);
        keystone.list('Appointment').model.findOneAndUpdate({_id: sid}, data, update_response);
    else if (mode == "inserted")
        //db.event.insert(data, update_response);
        keystone.list('Appointment').model.insert(data, update_response);

    else if (mode == "deleted")
        //db.event.removeById( sid, update_response);
        keystone.list('Appointment').model.remove({_id: sid}, update_response);
    else
        res.send("Not supported operation");
}
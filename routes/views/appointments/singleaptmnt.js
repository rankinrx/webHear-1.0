var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'appointments';
	
    locals.data = { 
		aptmnt: {},
	};
    

	view.on('init', function(next) {

    	var q = keystone.list('Appointment').model.findOne({slug: req.params.aptmntslug});
		 
		q.exec(function(err, result) {
			if(result != null)
			{
				locals.data.aptmnt = result;
			}
			else
			{
				return res.status(404).send(keystone.wrapHTMLError('Sorry, no apartment found! (404)'));
			}
			
			next(err);
		});
	}); 
	
    
	// Render the view
	view.render('appointments/singleaptmnt');
};
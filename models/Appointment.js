var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Appointment Model
 * ==========
 */
var Appointment = new keystone.List('Appointment', {
	autokey: { from: 'date', path: 'slug', unique: true, hidden: true},
	searchFields: 'description, date, assignedFor, assignedTo',
	track: false,
	defaultSort: '-date', // sort by decending appointment dates
	//track: {updatedBy: true} // Enables updatedBy field only
	map: { name: 'date' },  // Map the name of each appointment to the date field (clickable)
});

// Autokey: automatically generates a key for each model when it is saved, based on the value of another field
//The slug is used for SEO friendly URLs. The field is defined as part of the List options using the autokey plugin. Autokey automatically generates a key for each model when it is saved, based on the value of another field. The value of the key is accessible via the ‘slug’ field on the object. In this case, we create a slug for each ticket from the title. The unique option indicates that we expect the key to be unique throughout the collection. If we create a ticket with the title set to ‘My First Ticket’ then the automatically generated slug would be similar to ‘my-first-ticket’.


Appointment.add({
}, 'Appointment Details', {
	date: { type: Types.Datetime, format: 'MMM Do YYYY h:mm a' },  
	// The healthcare technition who created the aptmnt
	//createdBy: { type: Types.Relationship, ref: 'User', filters: { author: ':_id' }, index: true, many: false, hidden: true },
	// The patient who the aptmnt is for
	assignedFor: { type: Types.Relationship, ref: 'Patient', initial: true, index: true, many: false},
	// The audiologist who the aptmnt is assigned to
	assignedTo: { type: Types.Relationship, ref: 'User', filters: { userType: 'Audiologist' }, initial: true, index: true, many: false },
	description: { type: Types.Textarea },
});

// PractKjs: add a url() virtual method to the model that returns the canonical URL of the object
Appointment.schema.virtual('url').get(function() {
 		return '/appointments/'+this.slug;
});

/**
 * Registration
 */
Appointment.defaultColumns = 'date, assignedFor, assignedTo';
Appointment.register();

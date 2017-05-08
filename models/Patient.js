var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Patient Model
 * ==========
 */
// FUTURE: Add Ability to hide certain fields in Patient Model for Office Assistants 

var Patient = new keystone.List('Patient', {
    searchFields: 'name, birthday, phoneNumber, workNumber, email, address',
    track: true,
});

// initial: causes to be displayed in the create form 
// required: Validates that the field has a value before an item can be saved
// index: Setting the index option to true will tell keystone.js that we are interested in a database index to be created for this field.
//createdBy The field is like a foreign key that defines many to one relationships in a relational database



Patient.add({
}, 'Demographic Information', {
	name: { type: Types.Name, initial: true, required: true},
    birthday: { type: Types.Date, initial: true, required: true},
    gender: { type: Types.Select, options: 'Male, Female'},
    phoneNumber: { type: Types.Key, label: 'Phone Number'},
    workNumber: { type: Types.Key, label: 'Work Phone'},
    email: { type: Types.Email },
    address: { type: Types.Location, defaults: { country: 'USA' }},
    
}, 'Significant Medical History', {
    famHist: { type: Types.Textarea, label: 'Family History of Childhood Hearing Loss'},
    otoHist: { type: Types.Textarea, label: 'Previous Otological Surgery'},
    hearAid: { type: Types.Select, label: 'Hearing Aid Use', options: 'None, Left, Right, Both', default: 'None' },
    noiseExp: { type: Types.Select, label: 'Employment Noise Exposure', options: 'None, Moderate, High', default: 'None' },
    earProt: { type: Types.Select, label: 'Ear protection Used', options: 'No, Yes', default: 'No' },
});
/**
 *The complete URL for a ticket model would the /tickets/:ticketslug. This URL is not part of the model yet and in every place we intend to use or link to a Ticket, we will need to manually build the URL by concatenating the slug. To address this issue, we can use virtual functions to build the canonical URL for Ticket objects. The convention we will follow is to add a url() virtual method to the model that returns the canonical URL of the object.
 */

Patient.schema.virtual('url').get(function() {
 		return '/patients/'+this.slug;
 	 
});

/**
 * Registration
 */
Patient.defaultColumns = 'name, birthday, email, phoneNumber, address';
Patient.register();

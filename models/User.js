var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	userType: { type: Types.Select, options: 'Tech Admin, Clinical Admin, Healthcare Tech, Audiologist', initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'BackEnd Access', index: true },
	seePatient: { type: Boolean, label: 'Access Patient Information.', index: true },
});

/** Provide access to Keystone
 * ~ The "schema" is accessible, allowing you to plug in other mongoose functionality like virtuals, methods and pre / post hooks
 * ~ To query your data, you use the "list.model" (which is a mongoose model).
 */
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, userType, isAdmin';
User.register();

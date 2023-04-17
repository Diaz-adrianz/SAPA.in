import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const { model, Schema } = mongoose;

const schema = new Schema(
	{
		first_name: String,
		last_name: String,
		email: {
			type: String,
			unique: true,
		},
		profile_picture: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		nickname: {
			type: String,
			maxlength: 16,
			unique: true,
			validate: {
				validator: function (val) {
					return val.indexOf(' ') == -1;
				},
				message: 'Nickname cannot contain any space',
			},
		},
		is_banned: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

schema.plugin(paginate);

const USERS = model('users', schema);

export default USERS;

import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const { model, Schema } = mongoose;

const schema = new Schema(
	{
		name: {
			type: String,
			maxlength: 24,
			required: true,
			validate: {
				validator: function (val) {
					return val.indexOf(' ') == -1;
				},
				message: 'Name cannot contain any space',
			},
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		last_message: String,
		banneds: [
			{
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
		],
		members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
		is_private: {
			type: Boolean,
			default: false,
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

const ROOMS = model('rooms', schema);

export default ROOMS;

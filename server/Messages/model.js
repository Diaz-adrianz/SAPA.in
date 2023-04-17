import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const schema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		room: {
			type: Schema.Types.ObjectId,
			ref: 'rooms',
		},
		reply_to: {
			type: Schema.Types.ObjectId,
			ref: 'messages',
		},
		text: String,
		media: String,
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

const MESSAGES = model('messages', schema);

export default MESSAGES;

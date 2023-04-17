import ROOMS from '../Rooms/model.js';
import ApiView from '../common/apiviews.js';

export const IsRoomAuthor = (req, res, next) => {
	if (req.room.author != req.user._id) {
		return res.status(403).json({
			msg: 'You are not allowed',
		});
	}

	next();
};
export const RoomCheck = async (req, res, next) => {
	const Api = new ApiView(ROOMS, { name: req.params.room_name }, {}, ''),
		exec = await Api.exec(Api.detail());

	if (exec.status != 200) {
		return res.status(exec.status).json({
			msg: exec.msg,
		});
	}

	if (exec.data.is_banned) {
		return res.status(404).json({
			msg: '#' + exec.data.name + ' has been banned',
		});
	}

	if (exec.data.banneds.includes(req.user._id)) {
		return res.status(403).json({
			msg: 'You are banned from #' + exec.data.name,
		});
	}

	if (!exec.data.members.includes(req.user._id)) {
		if (!exec.data.author == req.user._id) {
			return res.status(403).json({
				msg: 'You are not a member on #' + exec.data.name,
			});
		}
	}

	req.room = { _id: exec.data._id, author: exec.data.author };

	next();
};

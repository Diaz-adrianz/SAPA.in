import USERS from '../Auth/model.js';
import ApiView from '../common/apiviews.js';
import { mongoIdValidator } from '../common/helpers.js';

// WARN: need role condition
export const ListUser = async (req, res) => {
	const apiview = new ApiView(USERS, {}, req.query, '-email -role'),
		exec = await apiview.exec(
			apiview.list(req.query.search, ['nickname', 'email'], req.query.start, req.query.end, req.query.page)
		);

	return res.status(exec.status).json(exec);
};

// WARN: need role condition
export const DetailUser = async (req, res) => {
	let filter = mongoIdValidator(req.params.key) ? { _id: req.params.key } : { nickname: req.params.key };

	const apiview = new ApiView(USERS, filter, {}, '-email -role'),
		exec = await apiview.exec(apiview.detail());

	return res.status(exec.status).json(exec);
};

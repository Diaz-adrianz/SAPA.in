const ROOM = {
	_id: '123',
	name: 'Partai_Satgas',
	author: 'ObjectId()',
	banned: ['ObjectId()', 'ObjectId()'],
	last_message: 'Lorem ipsum...',
	is_private: false, // false == grup, true == direct chat
	is_banned: false,
};

const ACCOUNT = {
	nickname: 'John Doe', // editable
	first_name: 'John', // dari google
	family_name: 'Doe', // dari google
	profilePicture: 'link()', // dari google
	email: '', // dari google
	is_banned: false,
};
const CHATS = {
	user: 'ObjectId(Account)',
	room: 'ObjectId(ROOM)',
	text: 'Lorem Ipsum',
	media: 'link()',
	is_banned: false,
};

function createRoom() {
	// cek nama tidak ada spasi
}

function sendChat(room_id, msg, userid) {}

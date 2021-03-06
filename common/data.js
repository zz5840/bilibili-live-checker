const request = require('request');
const Log = require('log');

const log = new Log('info');

function user (id) {
	return new Promise(function (resolved, reject) {
		let api = `http://api.live.bilibili.com/room/v1/Room/get_info?room_id=${id}`;
		request(api, function (err, response, body) {
			if (err) return reject(err);
			try {
				user = JSON.parse(body).data;
			} catch (err) {
				return log.error('error in parsing json, error: %s', JSON.stringify(err), ', data: ', body);
			}
			resolved(user);
		});
	}).catch(function (err) {
		log.error('error in requesting json data: %s', JSON.stringify(err));
	});
}

module.exports = user;

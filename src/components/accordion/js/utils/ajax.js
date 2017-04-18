'use strict';

const Methods = {
		GET: 'GET'
	};

const get = (url) => {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open(Methods.GET, url);
		request.onload = () => {
			if (request.status === 200) {
				resolve(request.response);
			} else {
				reject(new Error(request.statusText));
			}
		};
		request.onerror = () => reject(new Error(`Network error - call GET ${url} could not be resolved.`));
		request.send();
	});
};

export default {
	get
};

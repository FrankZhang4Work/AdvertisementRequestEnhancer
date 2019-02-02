const axios = require('axios');
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
const client = new WebServiceClient('139129', 'xaFzH4gykYJU');

function getPublisher(siteId) {
	return axios.post('http://159.89.185.155:3000/api/publishers/find', {
	    q : {siteID : siteId}
	}).then((resp) => {
		return resp.data.publisher;
	});
}

function getDemoGraphics(siteId) {
	return axios.get('http://159.89.185.155:3000/api/sites/' + siteId + '/demographics').then((resp) => {
		return resp.data.demographics;
	});
}

function getGeo(ip) {
	return client.country(ip).then((resp) => {
		let isoCode = resp.country.isoCode;

		if(isoCode !== 'US') {
			return Promise.reject('ip out side of US');
		}

		return isoCode;
	});
}

function handleError(error) {
	console.warn(error);
	return ;
}

module.exports = {
	enhanceData: function(data) {
		let siteId = data.site.id;
		let ip = data.device.ip;

		return axios.all([
			getPublisher(siteId),
			getDemoGraphics(siteId),
			getGeo(ip)
		]).then(function fulfillment([publisher, demographics, country]) {
			let pct_female = parseInt(demographics.pct_female);
			let male_percent = 100 - pct_female;

			data.site.demographics = {
				"pct_female": pct_female,
				"male_percent": male_percent
			}
			data.site.publisher = publisher;
			data.device.geo = {
				country: country
			}

			return data;
		}, function rejection(reason) {
			return reason;
		}).catch(handleError);
	}
};





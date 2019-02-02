const express = require("express");
const bodyParser = require("body-parser");
const assert = require('assert');

const app = express();
const ds = require("./service/dataService");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.post("/", function(req, resp) {
	var data = req.body;

	let start = Date.now();
	ds.enhanceData(data).then((enhancedData) => {
		if(typeof enhancedData === 'string') {
			resp.status(400).send(enhancedData);
		} else {
			/*
			assert("demographics" in enhancedData.site, 'demographics is not added');
			assert("publisher" in enhancedData.site, 'publisher is not added');
			assert("geo" in enhancedData.device, 'geo is not added');

			assert("id" in enhancedData.site.publisher, 'publisher.id is not added');
			*/
			resp.json(enhancedData);
		}

		let end = Date.now();
		let processTime = end - start;

		assert(processTime < 500, 'its tooooooo long time!!!');
	});
});




app.listen(4444);

console.log("server started");





const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
let AWS = require('aws-sdk');
let JSZip = require("jszip");
let fs = require("fs");

const s3 = new AWS.S3();
exports.handler = function (event, context, callback) {
	var file = event.title + ".imscc";

	
	s3.getObject({
		'Bucket': "zipedits",
		'Key': file
	}).promise()
		.then(data => {
			let jszip = new JSZip();
			jszip.loadAsync(data.Body).then(zip => {
				zip.file("imsmanifest.xml").async("string").then(function (data) {
  
					console.log(data);
			/*	let tmpPath = `/tmp/${file}`
				zip.generateNodeStream({ streamFiles: true })
					.pipe(fs.createWriteStream(tmpPath))
					.on('error', err => callback(err))
					.on('finish', function () {
						s3.putObject({
							"Body": fs.createReadStream(tmpPath),
							"Bucket": "zipedits",
							"Key": file,
							"Metadata": {
								"Content-Length": String(fs.statSync(tmpPath).size)
							}
						})
							.promise()
							.then(data => {
								callback(null, event);
							})
							.catch(err => {
								callback(err);
							});
					});*/
					callback(null, event);
					});
			})
				.catch(err => {
					callback(err);
				});
		})
		.catch(err => {
			callback(err);
		});

}


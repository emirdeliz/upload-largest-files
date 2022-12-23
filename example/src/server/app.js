const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3003;

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);

app.post('/upload', (req, res) => {
	try {
		if (!req.files) {
			res.send({
				status: false,
				message: 'No file uploaded',
			});
		} else {
			//Use the name of the input field (i.e. "file") to retrieve the uploaded file
			const file = req.files.file;

			//send response
			res.send({
				status: true,
				message: 'File is uploaded',
				file,
				data: {
					name: file.name,
					mimetype: file.mimetype,
					size: file.size,
				},
			});
		}
	} catch (e) {
		res.status(500).send(e);
		console.debug({ e });
	}
});

app.route('/').get((req, res) => {
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../../../dist'));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

window.addEventListener('load', function () {
	const input = document.querySelector('input[type=file]');
	input.addEventListener('change', makeUpload);
});

function onProgress(e) {
	const progressElement = document.querySelector('progress');
	const percentage = parseInt(String((e.loaded / e.total) * 100));

	progressElement.setAttribute('value', percentage);
	progressElement.style.setProperty('--value', percentage + '%');
	console.log('Progress', percentage);

	if (percentage > 99) {
		const uploadSuccessfullyElement = document.querySelector(
			'.label-upload-successfully'
		);
		setTimeout(function () {
			uploadSuccessfullyElement.style.opacity = 1;
		}, 700);
	}
}

async function makeUpload(e) {
	const file = e.target.files[0];
	const url = '/upload';
	const result = await window.uploadLargestFiles.uploadFile({
		file,
		url,
		onProgress,
	});
	console.log('Result', result);
}

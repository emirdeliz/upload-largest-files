interface UploadProps {
	file: File;
	url: string | URL;
	headers?: { [key: string]: string };
	onProgress?: ((this: XMLHttpRequest, e: ProgressEvent) => void) | null;
}

export async function uploadFile({
	file,
	url,
	headers,
	onProgress,
}: UploadProps) {
	const xhr = new XMLHttpRequest();
	if (onProgress) {
		xhr.upload.onprogress = onProgress;
	}

	const method = 'POST';
	xhr.open(method, url);
	xhr.setRequestHeader('X-FILENAME', file.name);

	headers &&
		Object.keys(headers || {}).forEach(function (key) {
			xhr.setRequestHeader(key, headers[key]);
		});

	const formdata = new FormData();
	formdata.append('file', file);

	return new Promise<File>(function (resolve, reject) {
		try {
			xhr.send(formdata);
			xhr.onloadend = function () {
				resolve(file);
			};
			!xhr.onloadend && resolve(file);
		} catch (e) {
			reject(e);
		}
	});
}

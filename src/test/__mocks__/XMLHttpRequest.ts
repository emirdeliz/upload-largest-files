const NETWORK_SPEED_UPLOAD = 1000000;

async function processUploadRequest(
	fileSizePending = 0,
	uploadCallback: (fileSizePending: number) => void
) {
	const promisesCallback = [] as Array<Promise<void>>;
	let fileCallbackLength = Math.round(fileSizePending / NETWORK_SPEED_UPLOAD);
	while (fileCallbackLength > 0) {
		fileCallbackLength--;
		promisesCallback.push(
			new Promise(function (resolve) {
				const fileSizePendingUpdated =
					fileSizePending - (5 - fileCallbackLength) * NETWORK_SPEED_UPLOAD;
				uploadCallback(fileSizePendingUpdated);
				setTimeout(resolve, 1000);
			})
		);
	}
	Promise.all(promisesCallback);
}

export default class XMLHttpRequestMock {
	file = {} as File;
	requestHeader = {} as { [key: string]: string };
	response = {} as Response;
	upload = {} as XMLHttpRequestUpload;

	onloadend = jest.fn();
	open = jest.fn();

	send = async function (formData: FormData) {
		this.file = formData.get('file') as File;

		const upload = this.upload;
		await processUploadRequest(
			this.file.size,
			function (fileSizePending: number) {
				upload.onprogress && upload.onprogress(fileSizePending);
			}
		);

		this.response = JSON.stringify({
			status: true,
			message: 'File is uploaded',
			file: this.file,
			data: {
				name: this.file.name,
				mimetype: this.file.type,
				size: this.file.size,
			},
		});
		this.onloadend && this.onloadend(this);
	};

	setRequestHeader = function (key: string, value: string) {
		this.requestHeader[key] = value;
	};
}

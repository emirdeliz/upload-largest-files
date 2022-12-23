export function generateFileMock(params: {
	fileName: string;
	fileType: string;
	fileSizeInMb: number;
}) {
	const { fileName, fileType, fileSizeInMb } = params;
	const file = new File([''], fileName, { type: fileType });
	Object.defineProperty(file, 'size', { value: fileSizeInMb * 1000000 });
	return file;
}

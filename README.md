# upload-largest-files

[![Build](https://github.com/emirdeliz/upload-largest-files/actions/workflows/build.yml/badge.svg)](https://github.com/emirdeliz/upload-largest-files/actions/workflows/build.yml)
[![Lint](https://github.com/emirdeliz/upload-largest-files/actions/workflows/lint.yml/badge.svg)](https://github.com/emirdeliz/upload-largest-files/actions/workflows/lint.yml)
[![Test](https://github.com/emirdeliz/upload-largest-files/actions/workflows/test.yml/badge.svg)](https://github.com/emirdeliz/upload-largest-files/actions/workflows/test.yml)

This is a simple lib to upload large files.

## Demo

<img src="https://raw.githubusercontent.com/emirdeliz/upload-largest-files/master/docs/demo.gif" width="700" height="auto" alt="Upload Largest Files - example"/>

## How to use?

```javascript
const file = <file to upload>
const url = <endpoint>;
const onProgress = <progress callback>
const result = await window.uploadLargestFiles.uploadFile({
  file,
  url,
  onProgress,
});
```

##### About the parameters:

| **Parameter**  | **Type** | **Description**                             |
| -------------- | -------- | ------------------------------------------- |
| **file**       | File     | The file to upload.                         |
| **url**        | string   | The server url to make upload.              |
| **onProgress** | string   | The callback to follow the upload progress. |

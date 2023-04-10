export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
}

interface UploadProps {
  file: File;
  url: string | URL;
  httpMethod?: HttpMethod;
  headers?: { [key: string]: string };
  onProgress?: ((this: XMLHttpRequest, e: ProgressEvent) => void) | null;
}

export async function uploadFile({
  file,
  url,
  headers,
  httpMethod,
  onProgress,
}: UploadProps) {
  const xhr = new XMLHttpRequest();
  if (onProgress) {
    xhr.upload.onprogress = onProgress;
  }

  const method = httpMethod || HttpMethod.POST;
  xhr.open(method, url);

  headers &&
    Object.keys(headers || {}).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });

  const formData = new FormData();
  formData.append("file", file);

  return new Promise<File>(function (resolve, reject) {
    try {
      xhr.onloadend = function () {
        resolve(file);
      };
      xhr.send(formData);
    } catch (e) {
      reject(e);
    }
  });
}

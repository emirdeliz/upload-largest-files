import * as uploadLargestFiles from "../upload-largest-files";
import { generateFileMock } from "./__mocks__/assets/filesMock";
import XMLHttpRequestMock, {
  XMLHttpRequestBaseMock,
} from "./__mocks__/XMLHttpRequest";

// @ts-ignore
window.XMLHttpRequest = jest.fn().mockImplementation(XMLHttpRequestMock);

const url = "https://any.endpoint/upload";
const uploadBaseMock = {
  onProgress: jest.fn(),
};

describe("Upload Largest Files", function () {
  beforeEach(function () {
    jest.clearAllMocks();
  });

  it("Upload: should upload image png file with 5mb", async function () {
    const file = generateFileMock({
      fileName: "bus.png",
      fileType: "image/png",
      fileSizeInMb: 5,
    });

    const onProgressSpy = jest.spyOn(uploadBaseMock, "onProgress");
    await uploadLargestFiles.uploadFile({
      file,
      url,
      onProgress: uploadBaseMock.onProgress,
    });

    expect(onProgressSpy).toBeCalledTimes(5);
    expect(onProgressSpy).toHaveBeenNthCalledWith(1, 4000000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(2, 3000000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(3, 2000000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(4, 1000000);
  });

  it("Upload: should upload zip file with 721.96mb", async function () {
    const file = generateFileMock({
      fileName: "home.pdf",
      fileType: "zip",
      fileSizeInMb: 721.96,
    });

    const onProgressSpy = jest.spyOn(uploadBaseMock, "onProgress");
    await uploadLargestFiles.uploadFile({
      file,
      url,
      onProgress: uploadBaseMock.onProgress,
    });

    expect(onProgressSpy).toBeCalledTimes(722);
    expect(onProgressSpy).toHaveBeenNthCalledWith(1, 1437960000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(2, 1436960000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(3, 1435960000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(4, 1434960000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(5, 1433960000);
  });

  it("Upload: should upload pdf file with 32196.43mb", async function () {
    const file = generateFileMock({
      fileName: "photos.rar",
      fileType: "application/pdf",
      fileSizeInMb: 32196.43,
    });

    const onProgressSpy = jest.spyOn(uploadBaseMock, "onProgress");
    await uploadLargestFiles.uploadFile({
      file,
      url,
      onProgress: uploadBaseMock.onProgress,
    });

    expect(onProgressSpy).toBeCalledTimes(32196);
    expect(onProgressSpy).toHaveBeenNthCalledWith(1, 64386430000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(2, 64385430000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(3, 64384430000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(4, 64383430000);
    expect(onProgressSpy).toHaveBeenNthCalledWith(5, 64382430000);
  });

  it("Upload: should upload pdf with PUT method", async function () {
    const xhrMockOpenSpy = jest.spyOn(XMLHttpRequestBaseMock, "open");
    await uploadLargestFiles.uploadFile({
      file: new File([], "test.txt"),
      url,
      httpMethod: uploadLargestFiles.HttpMethod.PUT,
    });
    expect(xhrMockOpenSpy).toHaveBeenCalledWith(
      uploadLargestFiles.HttpMethod.PUT,
      url
    );
  });

  it("Upload: should upload pdf with PATCH method", async function () {
    const xhrMockOpenSpy = jest.spyOn(XMLHttpRequestBaseMock, "open");
    await uploadLargestFiles.uploadFile({
      file: new File([], "test.txt"),
      url,
      httpMethod: uploadLargestFiles.HttpMethod.PATCH,
    });

    expect(xhrMockOpenSpy).toHaveBeenCalledWith(
      uploadLargestFiles.HttpMethod.PATCH,
      url
    );
  });
});

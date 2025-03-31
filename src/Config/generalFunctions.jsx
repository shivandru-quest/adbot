import Cookies from "universal-cookie";
import { mainConfig } from "./mainConfig";
import axios from "axios";
import imageCompression from "browser-image-compression";
const cookies = new Cookies(null, { path: "/" });

export const getEntityId = () => {
  let entityId = cookies.get("entityDetails");
  if (entityId) {
    return entityId?.id;
  }
  return null;
};
export const getEntityApiKey = () => {
  let data = cookies.get("entityDetails");
  if (data) {
    return data?.apiKey;
  }
  return null;
};
export const getUserCredentials = () => {
  let data = cookies.get("userCredentials");
  if (data) {
    return data;
  }
  return null;
};
export const getUserId = () => {
  let data = cookies.get("userId");
  if (data) {
    return data;
  }
  return null;
};
export const getToken = () => {
  let data = cookies.get("token");
  if (data) {
    return data;
  }
  return null;
};

export const clearAllCookies = () => {
  const allCookies = cookies.getAll();

  Object.keys(allCookies).forEach((cookieName) => {
    cookies.remove(cookieName, { path: "/" });
  });
};

export const createUrl = (apiString) => {
  const url = `${
    mainConfig.ENVIRONMENT === "PRODUCTION"
      ? mainConfig.QUEST_PRODUCTION_URL
      : mainConfig.QUEST_STAGING_URL
  }${apiString}`;
  const headers = {
    apiKey: mainConfig.QUEST_API_KEY,
    userId: getUserId(),
    token: getToken(),
    entityId: mainConfig.QUEST_ADDBOT_ENTITY_ID,
  };

  return {
    url,
    headers,
  };
};

export const createUrlBackend = (apiString = "") => {
  const url = mainConfig.QUEST_ADDONS_BACKEND_URL + apiString;
  const headers = {
    apiKey: mainConfig.QUEST_API_KEY,
    userId: getUserId(),
    token: getToken(),
    entityId: mainConfig.QUEST_ADDBOT_ENTITY_ID,
  };

  return {
    url,
    headers,
  };
};

export const createLoginFlowUrl = (apiString) => {
  const url = mainConfig.QUEST_PRODUCTION_URL + apiString;
  const headers = {
    "Content-Type": "application/json",
    apikey: mainConfig.QUEST_API_KEY,
  };
  return {
    url,
    headers,
  };
};

export function base64ToFile(base64String, fileName) {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

export function base64ToBlob(base64) {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);
    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: "image/png" });
}

export async function blobUrlToFile(blobUrl, fileName) {
  try {
    const response = await fetch(blobUrl, {
      mode: "cors",
      credentials: "omit",
    });
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.log("error", error.message);
  }
}

export const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export async function loadImageAsBase64(imageUrl) {
  try {
    const { url, headers } = createUrlBackend(`download?url=${imageUrl}`);
    const response = await axios.get(url, { headers });
    return response.data?.base64;
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return null;
  }
}
const MAX_FILE_SIZE_MB = 5;
const MAX_COMPRESSED_SIZE_KB = 500;
const MAX_WIDTH_OR_HEIGHT = 1024;
export async function compressImage(file) {
  if (!file) return;
  try {
    const res = await fetch(file);
    const blob = await res.blob();
    const fileSizeMB = blob.size / (1024 * 1024);

    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      console.warn("Image is too large! Max allowed size is 5MB.");
      return;
    }

    let compressedBlob;
    let quality = 1.0;
    do {
      compressedBlob = await imageCompression(blob, {
        maxSizeMB: quality,
        maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
        useWebWorker: true,
      });

      const compressedSizeKB = compressedBlob.size / 1024;
      if (compressedSizeKB <= MAX_COMPRESSED_SIZE_KB) break;
      quality *= 0.8;
    } while (quality > 0.1);

    if (compressedBlob.size / 1024 > MAX_COMPRESSED_SIZE_KB) {
      console.warn("Compression failed to meet 500KB limit.");
      return;
    }
    return URL.createObjectURL(compressedBlob);
  } catch (error) {
    console.error("Error compressing image:", error);
  }
}

export async function compressFileForTemplatePoster(file) {
  try {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
      useWebWorker: true,
    };

    let compressedBlob = await imageCompression(file, options);

    if (compressedBlob.size / 1024 > MAX_COMPRESSED_SIZE_KB) {
      console.warn("Further compression needed...");
      options.maxSizeMB = 0.5;
      compressedBlob = await imageCompression(file, options);
    }

    console.log("Compressed file size:", compressedBlob.size / 1024, "KB");

    // Convert Blob to File
    return new File([compressedBlob], file.name, { type: file.type });
  } catch (error) {
    console.error("Error compressing image:", error);
    return file; // Return original file if compression fails
  }
}

import Cookies from "universal-cookie";
import { mainConfig } from "./mainConfig";
import axios from "axios";
import imageCompression from "browser-image-compression";
import mammoth from "mammoth";
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
      headers: { "Access-Control-Allow-Origin": "*" },
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
    const { url, headers } = createUrlBackend(
      `template/download?url=${imageUrl}`
    );
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
  if (!file) return;

  try {
    let blob;
    if (file instanceof File || file instanceof Blob) {
      blob = file;
    } else if (typeof file === "string" && file.startsWith("data:image")) {
      blob = base64ToBlob(file);
    } else if (typeof file === "string") {
      const res = await fetch(file);
      blob = await res.blob();
    } else {
      console.warn("Unsupported file input:", file);
      return;
    }

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

    return await compressedBlob.arrayBuffer();
  } catch (error) {
    console.error("Error compressing image:", error);
  }
}

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
  "text/csv",
];

export async function convertFile(file) {
  if (!allowedFileTypes.includes(file.type)) {
    return {
      success: false,
      error: "Invalid file type",
    };
  }
  if (file.type.includes("image")) {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return {
      success: true,
      data: {
        documentType: "image",
        title: file.name,
        source: {
          sourceType: "url",
        },
        metadata: {
          file,
          base64,
          isLoading: true,
        },
      },
    };
  } else if (file.type === "application/pdf") {
    return {
      success: true,
      data: {
        documentType: "document",
        title: file.name,
        source: {
          sourceType: "url",
        },
        metadata: {
          file,
          typeName: "pdf",
          isLoading: true,
        },
      },
    };
  } else if (
    file.type.includes("msword") ||
    file.type.includes("wordprocessingml.document")
  ) {
    try {
      const arrayBuffer = await file?.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      return {
        success: true,
        data: {
          documentType: "document",
          title: file.name,
          source: {
            data: value,
            media_type: "text/plain",
            sourceType: "text",
          },
          metadata: {
            typeName: "document",
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to convert DOC file",
      };
    }
  } else if (file.type.startsWith("text")) {
    const content = await file.text();
    return {
      success: true,
      data: {
        documentType: "document",
        title: file.name,
        source: {
          data: content,
          media_type: "text/plain",
          sourceType: "text",
        },
        metadata: {
          typeName: file.type.split("/")[1],
        },
      },
    };
  }
  return {
    success: false,
    error: "Invalid file type",
  };
}

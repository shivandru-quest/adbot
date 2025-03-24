import Cookies from "universal-cookie";
import { mainConfig } from "./mainConfig";
import axios from "axios";
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

const count = 0;
export const uploadImageToBackend = async (file) => {
  if (!file) {
    return null;
  }
  if (file.size > 1000000 && count <= 50) {
    try {
      // Resize the image to below 1MB
      const compressedImage = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        initialQuality: 1 - count * 0.05,
      });
      count++;

      return await uploadImageToBackend(compressedImage);
    } catch (error) {
      return null;
    }
  }

  const { url, headers: baseHeaders } = createUrl(`api/upload-img`);
  const headers = {
    ...baseHeaders,
    "Content-Type": "form-data",
  };

  const formData = new FormData();
  formData.append("uploaded_file", file);

  try {
    const res = await axios.post(url, formData, { headers });
    return res;
  } catch (error) {
    return null;
  }
};

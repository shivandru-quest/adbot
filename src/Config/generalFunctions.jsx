import Cookies from "universal-cookie";
import { mainConfig } from "./mainConfig";
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

// Convert Blob URL to File object (binary)
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

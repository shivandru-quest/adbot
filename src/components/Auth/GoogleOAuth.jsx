import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AppContext } from "../../context/AppContext";
import { mainConfig } from "../../Config/mainConfig";
import axios from "axios";
import AllSvgs from "../../assets/AllSvgs";
import { createUrl, getUserId } from "../../Config/generalFunctions";
const cookies = new Cookies(null, { path: "/" });
const GoogleOAuth = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let code = queryParams.get("code");
    if (code) {
      googleLogin(code);
    }
  }, []);
  const getUser = async () => {
    try {
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.get(url, { headers });
      cookies.set("avatar", res.data.data.imageUrl || "");
      cookies.set("UserName", res.data.data.name || "");
      dispatch({ type: "user/UserName", payload: res.data.data.name || "" });
      dispatch({ type: "user/avatar", payload: res.data.data.imageUrl || "" });
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const getEntityApiKey = async (entityId, userId, token) => {
    const response = await axios.post(
      `https://api.questlabs.ai/api/admin/new-api-key?userId=${userId}`,
      {
        entityId,
      },
      {
        headers: {
          userId: userId,
          token: token,
          apiKey: mainConfig.QUEST_API_KEY,
        },
      }
    );

    let apiKeyData = response.data;
    return apiKeyData?.data?.key;
  };
  const getEntityDetails = async ({ userId, token }) => {
    try {
      const response = await axios.get(
        `https://api.questlabs.ai/api/users/${userId}/admin-entities`,
        {
          headers: {
            userId: userId,
            token: token,
            apiKey: mainConfig.QUEST_API_KEY,
          },
        }
      );
      let data = response.data;
      localStorage.setItem("UserEntities", JSON.stringify(data.data));

      if (data.success) {
        const selectEntity = data.data?.at(0);
        if (!selectEntity?.apiKey) {
          let apiKey = await getEntityApiKey(selectEntity?.id, userId, token);
          selectEntity.apiKey = apiKey;
          cookies.set("entityDetails", selectEntity);
          return selectEntity;
        }
        cookies.set("entityDetails", selectEntity);
        return selectEntity;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  const getOnboardingDetails = async ({ userId, token }) => {
    try {
      const response = await axios.get(
        `https://api.questlabs.ai/api/v2/entities/${mainConfig.QUEST_ADDBOT_ENTITY_ID}/campaigns/${mainConfig.QUEST_ONBOARDING_CAMPAIGN_ID}?platform=REACT`,
        {
          headers: {
            userId: userId,
            token: token,
            apiKey: mainConfig.QUEST_API_KEY,
          },
        }
      );
      let data = response.data;
      if (data.success) {
        if (data.data.isClaimed) {
          cookies.set("UserName", data.data.actions.at(0).answers.at(0));
        }
        return data.data.isClaimed;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  function googleLogin(code) {
    setIsLoading(true);
    axios
      .post(
        `https://api.questlabs.ai/api/users/google/login`,
        {
          code,
          redirectUri: mainConfig.APP_URL + "login",
          entityId: mainConfig.QUEST_COMMUNITY_ID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: mainConfig.QUEST_API_KEY,
          },
        }
      )
      .then(async (res) => {
        if (res.data.success == true) {
          const { token, userId } = res.data;
          cookies.set("token", token);
          cookies.set("userId", userId);
          let entityDetails = await getEntityDetails({ userId, token });
          let onboardingDetails = await getOnboardingDetails({ userId, token });
          await getUser();
          setIsLoading(false);
          if (entityDetails) {
            if (onboardingDetails) {
              dispatch({ type: "user/isAuthenticated", payload: true });
              localStorage.setItem("isAuthenticated", "true");
              navigate("/home");
            } else {
              navigate("/onboarding");
            }
          } else {
            navigate("/onboarding");
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err.message);
      });
  }

  return (
    <a
      className="w-full flex items-center justify-center rounded-[0.625rem] bg-[#E2E2E2]"
      href={`https://accounts.google.com/o/oauth2/auth?client_id=${mainConfig.GOOGLE_CLIENT_ID}&redirect_uri=${mainConfig.APP_URL}login&scope=profile%20email&response_type=code`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        className="w-full flex items-center gap-3 justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <div className="flex flex-col gap-1">
          <p className="text-[#181818] text-sm font-[500]">
            Login/Sign up with Google
          </p>
          <p className="text-[#808080] text-xs font-[400]">
            Use your Google account to sign in
          </p>
        </div>
        <div>
          <AllSvgs type={"googleOAuthArrowIcon"} />
        </div>
      </motion.div>
    </a>
  );
};

export default GoogleOAuth;

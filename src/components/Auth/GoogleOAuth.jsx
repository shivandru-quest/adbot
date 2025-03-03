import React, { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AppContext } from "../../context/AppContext";
import { mainConfig } from "../../Config/mainConfig";
import axios from "axios";
const cookies = new Cookies(null, { path: "/" });
const GoogleOAuth = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let code = queryParams.get("code");
    if (code) {
      googleLogin(code);
    }
  }, []);
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
    axios
      .post(
        `https://api.questlabs.ai/api/users/google/login`,
        {
          code,
          redirectUri: mainConfig.APP_URL + "login",
          entityId: mainConfig.QUEST_ADDBOT_ENTITY_ID,
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
          if (entityDetails) {
            if (onboardingDetails) {
              dispatch({ type: "user/isAuthenticated", payload: true });
              localStorage.setItem("isAuthenticated", "true");
              navigate("/campaigns");
            } else {
              navigate("/onboarding");
            }
          } else {
            navigate("/onboarding");
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  return (
    <a
      className="w-full flex items-center justify-center"
      href={`https://accounts.google.com/o/oauth2/auth?client_id=${mainConfig.GOOGLE_CLIENT_ID}&redirect_uri=${mainConfig.APP_URL}login&scope=profile%20email&response_type=code`}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        className="w-full flex items-center gap-3 justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <FcGoogle className="w-5 h-5" />
        <p className="text-sm font-semibold">Continue with google</p>
      </motion.button>
    </a>
  );
};

export default GoogleOAuth;

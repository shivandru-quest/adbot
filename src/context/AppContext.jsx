import { createContext, useReducer } from "react";
import { getToken, getUserId } from "../Config/generalFunctions";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });
export const AppContext = createContext();
const token = getToken()?.trim();
const userId = getUserId()?.trim();
const initialState = {
  isAuthenticated:
    (localStorage.getItem("isAuthenticated") && token && userId) || false,
  UserName: cookies.get("UserName") || "",
  avatar: cookies.get("avatar") || "",
  canvasSize: {
    width: "650",
    height: "300",
    name: "custom",
  },
  getStartedStatus: [],
  adData: {
    title: "",
    category: "",
  },
};
function appReducer(state, { type, payload }) {
  switch (type) {
    case "user/isAuthenticated":
      return { ...state, isAuthenticated: payload };
    case "user/UserName":
      return { ...state, UserName: payload };
    case "user/avatar":
      return { ...state, avatar: payload };
    case "user/canvasSize":
      return { ...state, canvasSize: { ...state.canvasSize, ...payload } };
    case "user/adData":
      return {
        ...state,
        adData: {
          ...state.adData,
          ...payload,
          category: payload.category ?? state.adData.category,
        },
      };
    case "user/getStartedStatus":
      return { ...state, getStartedStatus: payload };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

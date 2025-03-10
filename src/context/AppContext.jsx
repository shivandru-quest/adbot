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
};
function appReducer(state, { type, payload }) {
  switch (type) {
    case "user/isAuthenticated":
      return { ...state, isAuthenticated: payload };
    case "user/UserName":
      return { ...state, UserName: payload };
    case "user/avatar":
      return { ...state, avatar: payload };
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

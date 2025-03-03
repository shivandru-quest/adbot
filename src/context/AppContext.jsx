import { createContext, useReducer } from "react";
export const AppContext = createContext();
const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  adData: {
    title: "",
    description: "",
    images: [],
  },
};
function appReducer(state, { type, payload }) {
  switch (type) {
    case "user/isAuthenticated":
      return { ...state, isAuthenticated: payload };
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

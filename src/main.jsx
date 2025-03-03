import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import { QuestProvider } from "@questlabs/react-sdk";
import "@questlabs/react-sdk/dist/style.css";
import { mainConfig } from "./Config/mainConfig.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <QuestProvider
        apiKey={mainConfig.QUEST_API_KEY}
        entityId={mainConfig.QUEST_ADDBOT_ENTITY_ID}
        apiType={mainConfig.ENVIRONMENT}
      >
        <App />
      </QuestProvider>
    </AppContextProvider>
  </BrowserRouter>
);

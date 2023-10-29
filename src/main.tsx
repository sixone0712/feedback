import React from "react";
import ReactDOM from "react-dom/client";
import App from "./start-here/App";
import "./index.css";
import FeedbackProvider from "./start-here/libs/context/FeedbackProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FeedbackProvider>
      <App />
    </FeedbackProvider>
  </React.StrictMode>
);

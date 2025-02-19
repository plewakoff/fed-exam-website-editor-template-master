import ReactDOM from "react-dom/client";
import { Editor } from "./components";
import { AppProvider } from "./components/context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <AppProvider>
    <Editor />
  </AppProvider>
);

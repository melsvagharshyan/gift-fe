import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import GiftBoxAnimation from "./GiftBoxAnimation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<GiftBoxAnimation />);

reportWebVitals();

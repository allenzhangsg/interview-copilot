import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import Home from "./pages/HomePage";
import MeetingRoom from "./pages/MeetingRoomPage";

// Add a container div to the HTML body
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <Theme accentColor="gold" grayColor="sand" radius="medium" scaling="100%">
    <HashRouter>
      <TitleBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting-room" element={<MeetingRoom />} />
      </Routes>
    </HashRouter>
  </Theme>
);

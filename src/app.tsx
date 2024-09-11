import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import MainWindow from "./components/MainWindow";
import MeetingRoomPage from "./pages/MeetingRoomPage";

// Add a container div to the HTML body
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <Theme accentColor="bronze" grayColor="sand" radius="large" scaling="100%">
    <HashRouter>
      <TitleBar />
      <Routes>
        <Route path="/" element={<MainWindow />} />
        <Route path="/meeting-room" element={<MeetingRoomPage />} />
      </Routes>
    </HashRouter>
  </Theme>
);

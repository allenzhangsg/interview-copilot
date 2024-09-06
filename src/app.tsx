import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";
import TitleBar from "./components/TitleBar";
import MainWindow from "./components/MainWindow";

// Add a container div to the HTML body
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <Theme accentColor="bronze" grayColor="sand" radius="large" scaling="100%">
    <TitleBar />
    <MainWindow />
  </Theme>
);

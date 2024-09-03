import "@radix-ui/themes/styles.css";
import {Theme, Flex} from "@radix-ui/themes";
import {createRoot} from "react-dom/client";
import TitleBar from "./components/TitleBar";

// Add a container div to the HTML body
const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="100%">
    <TitleBar/>
    <Flex direction="column" gap="2">
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
    </Flex>
  </Theme>
);

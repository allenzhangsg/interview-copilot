import "@radix-ui/themes/styles.css";
import { Theme, Text, Button, Flex } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";

// Add a container div to the HTML body
const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
    <Flex direction="column" gap="2">
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      <Text>Hello from React!</Text>
      <Button>Let's go</Button>
    </Flex>
  </Theme>
);

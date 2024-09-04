import "@radix-ui/themes/styles.css";
import { Theme, Flex, Button, Box } from "@radix-ui/themes";
import { PlayIcon } from "@radix-ui/react-icons";
import { createRoot } from "react-dom/client";
import TitleBar from "./components/TitleBar";

// Add a container div to the HTML body
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <Theme accentColor="gray" grayColor="sand" radius="large" scaling="100%">
    <TitleBar />
    <Flex direction="row" height="100vh">
      <Flex
        direction="column"
        width="150px"
        ml="-8px"
        justify="between"
        align="center"
        height="100vh"
        style={{backgroundColor: "#f0f0f0"}}
      >
        {/* Sidebar content goes here */}
        <Box>
          <Button variant="soft" radius="none" style={{ width: "100%", height: "100px" }}>
            <PlayIcon width="60%" height="60%" />
          </Button>
          <Button variant="soft" radius="none" style={{ width: "100%", height: "50px" }}>
            button2
          </Button>
          <Button variant="soft" radius="none" style={{ width: "100%", height: "50px" }}>
            button3
          </Button>
          <Button variant="soft" radius="none" style={{ width: "100%", height: "50px" }}>
            button4
          </Button>
        </Box>
        <Flex direction={"column"} width="100%" height="100px" justify="center" align="center" style={{ border: "1px solid #d0d0d0" }}>
          {new Date().toLocaleTimeString()}
        </Flex>
      </Flex>
      <Flex direction="column" pl="20px" pt="20px" style={{ flex: 1 }}>
        {/* Main content goes here */}
        💖 Hello World!
        <p>Welcome to your Electron application.</p>
      </Flex>
    </Flex>
  </Theme>
);

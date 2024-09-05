import { Flex, Button, Box } from "@radix-ui/themes";
import { PlayIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react"; // Add this import


const MainWindow = () => {
  const [selectedTab, setSelectedTab] = useState("button2");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); // Add state for current time

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // Update time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const buttonData = [
    { label: "button2", height: "50px" },
    { label: "button3", height: "50px" },
    { label: "button4", height: "50px" },
  ];

  const renderButtons = () => {
    return buttonData.map((button) => (
      <Button
        key={button.label}
        variant="soft"
        radius="none"
        style={{ width: "100%", height: button.height }}
        onClick={() => setSelectedTab(button.label)}
      >
        {button.label}
      </Button>
    ));
  };

  return (
    <Flex direction="row" height="100vh">
      <Flex
        direction="column"
        width="150px"
        ml="-8px"
        justify="between"
        align="center"
        height="100vh"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        {/* Sidebar content goes here */}
        <Box>
          <Button
            variant="soft"
            radius="none"
            style={{ width: "100%", height: "100px" }}
          >
            <PlayIcon width="60%" height="60%" />
          </Button>
          {renderButtons()} {/* Render buttons here */}
        </Box>
        <Flex
          direction={"column"}
          width="100%"
          height="100px"
          justify="center"
          align="center"
          style={{ border: "1px solid #d0d0d0" }}
        >
          {currentTime} {/* Use the state variable here */}
        </Flex>
      </Flex>
      <Flex direction="column" pl="20px" pt="20px" style={{ flex: 1 }}>
        {/* Main content goes here */}
        {selectedTab === "button2" && <p>page1</p>}
        {selectedTab === "button3" && <p>page2</p>}
        {selectedTab === "button4" && <p>page3</p>}
      </Flex>
    </Flex>
  );
};

export default MainWindow;

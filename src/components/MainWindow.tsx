import { Flex, Button, Box } from "@radix-ui/themes";
import { PlayIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react"; // Add this import
import CareerPage from "./CareerPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

const MainWindow = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  ); // Add state for current time

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // Update time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const buttonData = [
    { label: "Profile", height: "50px" },
    { label: "Settings", height: "50px" },
    { label: "Careers", height: "50px" },
  ];

  const renderButtons = () => {
    return buttonData.map((button) => (
      <Button
        key={button.label}
        variant="soft"
        radius="none"
        style={{
          width: "100%",
          height: button.height,
          backgroundColor: selectedTab === button.label ? "var(--accent-6)" : undefined,
        }}
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
        style={{ backgroundColor: "var(--accent-4)" }}
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
          direction="column"
          width="100%"
          height="100px"
          justify="center"
          align="center"
          style={{ borderTop: "1px solid var(--accent-7)" }}
        >
          <Box style={{ height: "50%" }}>{currentTime}</Box>
        </Flex>
      </Flex>
      <Flex direction="row" justify="center" p="20px" mr="-8px" style={{ flex: 1 ,backgroundColor: "var(--accent-2)"}}>
        {/* Main content goes here */}
        {selectedTab === "Profile" && <ProfilePage />}
        {selectedTab === "Settings" && <SettingsPage />}
        {selectedTab === "Careers" && <CareerPage />}
      </Flex>
    </Flex>
  );
};

export default MainWindow;

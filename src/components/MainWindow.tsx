import { Flex, Button, Box, Text } from "@radix-ui/themes";
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

  const interviewButtons = [
    { label: "Profile", height: "50px" },
    { label: "Careers", height: "50px" },
  ];
  const settingsButtons = [{ label: "Settings", height: "50px" }];

  const renderButtons = (buttons: { label: string; height: string }[]) => {
    return buttons.map((button) => (
      <Button
        key={button.label}
        variant="soft"
        radius="none"
        style={{
          width: "100%",
          height: button.height,
          backgroundColor:
            selectedTab === button.label ? "var(--accent-6)" : undefined,
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
            style={{ width: "100%", height: "80px" }}
            title="Start a meeting" // Add hover info
          >
            <PlayIcon color="red" width="30%" height="30%" />
            <Text color="red" size="4">
              Start
            </Text>
          </Button>
          {renderButtons(interviewButtons)} {/* Render buttons here */}
        </Box>
        <Flex
          direction="column"
          width="100%"
          height="120px"
          justify="between"
          align="center"
          style={{ borderTop: "1px solid var(--accent-7)" }}
        >
          {renderButtons(settingsButtons)}
          <Box style={{ height: "50%" }}>{currentTime}</Box>
        </Flex>
      </Flex>
      <Flex
        direction="row"
        justify="center"
        p="20px"
        mr="-8px"
        style={{ flex: 1, backgroundColor: "var(--accent-2)" }}
      >
        {/* Main content goes here */}
        {selectedTab === "Profile" && <ProfilePage />}
        {selectedTab === "Settings" && <SettingsPage />}
        {selectedTab === "Careers" && <CareerPage />}
      </Flex>
    </Flex>
  );
};

export default MainWindow;

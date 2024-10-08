import { Flex, Button, Box } from "@radix-ui/themes";
import { useState } from "react";
import CareerForm from "../components/CareerForm";
import ProfileForm from "../components/ProfileForm";
import SettingsForm from "../components/SettingsForm";
import StartButton from "../components/StartButton";
import { NotificationContext } from "../context/NotificationContext";
import NotificationToast from "../components/NotificationToast";
import TimeDisplay from "../components/TimeDisplay";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [notification, setNotification] = useState<string | null>(null);

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

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Flex direction="row" height="calc(100vh - 30px)">
        <Flex
          direction="column"
          width="150px"
          ml="-8px"
          justify="between"
          align="center"
          height="100%"
          style={{ backgroundColor: "var(--accent-4)" }}
        >
          {/* Sidebar content goes here */}
          <Box>
            <StartButton />
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
            <TimeDisplay />
          </Flex>
        </Flex>
        <Flex
          direction="row"
          justify="center"
          p="20px"
          mr="-8px"
          style={{
            flex: 1,
            backgroundColor: "var(--accent-2)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {/* Main content goes here */}
          <Box>
            {selectedTab === "Profile" && <ProfileForm />}
            {selectedTab === "Settings" && <SettingsForm />}
            {selectedTab === "Careers" && <CareerForm />}
          </Box>
        </Flex>
      </Flex>
      <NotificationToast
        notification={notification}
        onClose={handleCloseNotification}
      />
    </NotificationContext.Provider>
  );
};

export default Home;

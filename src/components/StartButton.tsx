import { PlayIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const StartButton = () => {
  const navigate = useNavigate();

  const handleStartMeeting = () => {
    navigate("/meeting-room");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
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
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Confirm settings</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Your interview will be recorded once you start with current settings.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleStartMeeting}>Start Meeting</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default StartButton;

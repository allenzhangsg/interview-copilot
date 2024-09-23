import { Button, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import AudioCapture from "../components/AudioCapture";
const MeetingRoom = () => {
  const navigate = useNavigate();

  const handleFinishMeeting = () => {
    navigate("/"); // todo: stop audio capture
  };

  return (
    <Flex
      direction="column"
      height="calc(100vh - 30px)"
      mr="-8px"
      ml="-8px"
      p="20px"
      style={{ backgroundColor: "var(--accent-2)" }}
    >
      <Flex direction="row" align="start" justify="between">
        <Text size="5">Meeting room</Text>
        <Button variant="soft" color="red" onClick={handleFinishMeeting}>
          Finish Meeting
        </Button>
      </Flex>
      <AudioCapture />
    </Flex>
  );
};

export default MeetingRoom;

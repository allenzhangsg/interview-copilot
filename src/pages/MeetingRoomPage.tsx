import { Button, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const MeetingRoom = () => {
  const navigate = useNavigate();

  const handleFinishMeeting = () => {
    navigate("/");
  };

  return (
    <Flex direction="column" align="center" gap="4" style={{ padding: "20px" }}>
      <Text size="5">You are in the meeting room</Text>
      <Button variant="soft" color="red" onClick={handleFinishMeeting}>
        Finish Meeting
      </Button>
    </Flex>
  );
};

export default MeetingRoom;
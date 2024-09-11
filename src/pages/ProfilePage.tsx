import { Flex, Box, Text, Button } from "@radix-ui/themes";
import EditableTextArea from "../components/EditableTextArea";
import { useState } from "react";

const ProfilePage = () => {
  const [resumeText, setResumeText] = useState("");
  const [userStoryText, setUserStoryText] = useState("");
  const [glossaryText, setGlossaryText] = useState("");

  return (
    <Box p="4" style={{ width: "600px" }}>
      <Flex justify="start">
        <Text size="5" weight="bold" mb="5">
          Profile Information
        </Text>
      </Flex>
      <Flex direction="column" gap="4">
        <Box p="1" style={{ borderBottom: "1px dashed var(--accent-7)" }}>
          <Text as="label" size="3" mb="2" htmlFor="resume">
            📄Resume
          </Text>
          <EditableTextArea
            id="resume"
            placeholder="Enter your resume"
            value={resumeText}
            onChange={setResumeText}
          />
        </Box>
        <Box p="1" style={{ borderBottom: "1px dashed var(--accent-7)" }}>
          <Text as="label" size="3" mb="2" htmlFor="userStory">
            📝User Story
          </Text>
          <EditableTextArea
            id="userStory"
            placeholder="Enter your user story"
            value={userStoryText}
            onChange={setUserStoryText}
          />
        </Box>
        <Box p="1" style={{ borderBottom: "1px dashed var(--accent-7)" }}>
          <Text as="label" size="3" mb="2" htmlFor="glossary">
            📚Glossary
          </Text>
          <EditableTextArea
            id="glossary"
            placeholder="Enter glossary terms"
            value={glossaryText}
            onChange={setGlossaryText}
          />
        </Box>
        <Flex justify="end">
          <Button size="2" variant="soft">
            Save Profile
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProfilePage;

import { Flex, Box, Text, Button, Dialog } from "@radix-ui/themes";
import EditableTextArea from "./EditableTextArea";
import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const ProfileForm = () => {
  const [resumeText, setResumeText] = useState<string>("");
  const [userStoryText, setUserStoryText] = useState<string>("");
  const [glossaryText, setGlossaryText] = useState<string>("");
  const [lastEdited, setLastEdited] = useState<string>("");

  const { setNotification } = useContext(NotificationContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profile = {
      resume: resumeText,
      user_story: userStoryText,
      glossary: glossaryText,
    };
    const id = await window.electron.db.insertProfile(profile);
    console.log(`Profile inserted with ID: ${id}`);
    handleFetch(); // Fetch the updated profile to get the new last_edited value
  };

  const handleFetch = async () => {
    console.log("Fetching last inserted profile");
    const profile = await window.electron.db.getLastInsertedProfile();
    console.log("Profile fetched:", profile);
    if (profile) {
      setResumeText(profile.resume);
      setUserStoryText(profile.user_story);
      setGlossaryText(profile.glossary);
      setLastEdited(new Date(profile.last_edited).toLocaleString());
    } else {
      setResumeText("");
      setUserStoryText("");
      setGlossaryText("");
      setLastEdited("");
    }
  };

  const handleRemoveAllProfiles = async () => {
    await window.electron.db.removeAllProfiles();
    console.log("All profiles removed");
    setNotification("All profiles removed");
    handleFetch(); // Fetch the updated profile to get the new last_edited value
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Box p="4" style={{ width: "600px" }}>
      <Flex justify="start" direction="row" align="center" gap="4">
        <Text size="5" weight="bold" mb="5">
          Profile Information
        </Text>
        <Text size="1" color="gray" mb="5">
          Last edited: {lastEdited}
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
        <Flex justify="end" gap={"2"}>
          <Button size="2" variant="soft" onClick={handleSubmit}>
            Save Profile
          </Button>

          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                size="2"
                variant="outline"
                color="red"
              >
                Remove All Profiles
              </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Remove all profiles</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Are you sure you want to remove all profiles?
              </Dialog.Description>
              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button color="red" onClick={handleRemoveAllProfiles}>
                    Confirm
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProfileForm;

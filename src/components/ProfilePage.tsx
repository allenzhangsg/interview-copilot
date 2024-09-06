import { Flex, Box, Text, TextArea, Button } from "@radix-ui/themes";

const ProfilePage = () => {
  return (
    <Box p="4">
      <Text size="5" weight="bold" mb="4">Profile Information</Text>
      <Flex direction="column" gap="4">
        <Box>
          <Text as="label" size="2" mb="2" htmlFor="cv">CV</Text>
          <TextArea placeholder="Enter your CV" id="cv" />
        </Box>
        <Box>
          <Text as="label" size="2" mb="2" htmlFor="userStory">User Story</Text>
          <TextArea placeholder="Enter your user story" id="userStory" />
        </Box>
        <Box>
          <Text as="label" size="2" mb="2" htmlFor="glossary">Glossary</Text>
          <TextArea placeholder="Enter glossary terms" id="glossary" />
        </Box>
        <Flex justify="end">
          <Button size="2" variant="soft">Save Profile</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
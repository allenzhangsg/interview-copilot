import { Flex, Box, Text, TextArea, Button } from "@radix-ui/themes";

const ProfilePage = () => {
  return (
    <Box p="4" style={{ width: "600px" }}>
      <Flex justify="start">
        <Text size="5" weight="bold" mb="5">
          Profile Information
        </Text>
      </Flex>
      <Flex direction="column" gap="4">
        <Box>
          <Text as="label" size="3" mb="2" htmlFor="cv">
            CV
          </Text>
          <TextArea placeholder="Enter your CV" resize="vertical" id="cv" />
        </Box>
        <Box>
          <Text as="label" size="3" mb="2" htmlFor="userStory">
            User Story
          </Text>
          <TextArea
            placeholder="Enter your user story"
            resize="vertical"
            id="userStory"
          />
        </Box>
        <Box>
          <Text as="label" size="3" mb="2" htmlFor="glossary">
            Glossary
          </Text>
          <TextArea
            placeholder="Enter glossary terms"
            resize="vertical"
            id="glossary"
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

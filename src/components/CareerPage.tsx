import { Flex, Box, Text, TextArea, TextField } from "@radix-ui/themes";

const CareerPage = () => {
  return (
    <Box p="4" style={{ width: "600px" }}>
      <Flex justify="start">
        <Text size="5" weight="bold" mb="5">
          Career Information
        </Text>
      </Flex>
      <Flex direction="column" gap="4">
        <Box>
          <Text as="label" size="3" mb="2" htmlFor="company">
            🏢 Company Name
          </Text>
          <TextField.Root placeholder="Enter company name" id="company">
          </TextField.Root>
        </Box>
        <Box>
          <Text as="label" size="3" mb="2" htmlFor="jobDescription">
            📋 Job Description
          </Text>
          <TextArea
            placeholder="Enter job description"
            resize="vertical"
            id="jobDescription"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default CareerPage;
import { Flex, Box, Text } from "@radix-ui/themes";
import EditableTextArea from "./EditableTextArea";
import { useState } from "react";

const CareerPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  return (
    <Box p="4" style={{ width: "600px" }}>
      <Flex justify="start">
        <Text size="5" weight="bold" mb="5">
          Career Information
        </Text>
      </Flex>
      <Flex direction="column" gap="4">
        <Box p="1" style={{ borderBottom: "1px dashed var(--accent-7)" }}>
          <Text as="label" size="3" mb="2" htmlFor="company">
            🏢 Company Name
          </Text>
          <EditableTextArea
            id="company"
            placeholder="Enter company name"
            value={companyName}
            onChange={setCompanyName}
          />
        </Box>
        <Box p="1" style={{ borderBottom: "1px dashed var(--accent-7)" }}>
          <Text as="label" size="3" mb="2" htmlFor="jobDescription">
            📋 Job Description
          </Text>
          <EditableTextArea
            id="jobDescription"
            placeholder="Enter job description"
            value={jobDescription}
            onChange={setJobDescription}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default CareerPage;
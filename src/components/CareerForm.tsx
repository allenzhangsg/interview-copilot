import { Flex, Box, Text, Button } from "@radix-ui/themes";
import EditableTextArea from "./EditableTextArea";
import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const CareerForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [lastEdited, setLastEdited] = useState<string>("");

  const { setNotification } = useContext(NotificationContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const career = {
      company_name: companyName,
      job_description: jobDescription,
    };
    const id = await window.electron.db.insertCareer(career);
    console.log(`Career inserted with ID: ${id}`);
    setNotification("Career information saved successfully");
    handleFetch();
  };

  const handleFetch = async () => {
    console.log("Fetching last inserted career");
    const career = await window.electron.db.getLastInsertedCareer();
    console.log("Career fetched:", career);
    if (career) {
      setCompanyName(career.company_name);
      setJobDescription(career.job_description);
      setLastEdited(new Date(career.last_edited).toLocaleString());
    } else {
      setCompanyName("");
      setJobDescription("");
      setLastEdited("");
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Box p="4" style={{ width: "600px" }}>
      <Flex justify="start" direction="row" align="center" gap="4">
        <Text size="5" weight="bold" mb="5">
          Career Information
        </Text>
        <Text size="1" color="gray" mb="5">
          Last edited: {lastEdited}
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
        <Flex justify="end" gap="2">
          <Button size="2" variant="soft" onClick={handleSubmit}>
            Save Career Info
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CareerForm;

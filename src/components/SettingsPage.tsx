import React from "react";
import { Box, Select, Text, Flex } from "@radix-ui/themes";

const SettingsPage = () => {
  return (
    <Box p="4" style={{ width: "600px" }}>
      <Flex justify="start">
        <Text size="5" weight="bold" mb="5">
          Settings
        </Text>
      </Flex>

      <SettingItem
        label="Display"
        options={["Option 1", "Option 2", "Option 3"]}
      />
      <SettingItem label="Theme" options={["Light", "Dark", "System"]} />
      <SettingItem
        label="Caption Location"
        options={["Bottom", "Top", "Off"]}
      />
      <SettingItem
        label="Language"
        options={["English", "Spanish", "French", "German"]}
      />
      <SettingItem
        label="Audio Input"
        options={["Default", "Microphone 1", "Microphone 2"]}
      />
    </Box>
  );
};

const SettingItem = ({
  label,
  options,
}: {
  label: string;
  options: string[];
}) => (
  <Flex
    direction="row"
    justify="between"
    align="center"
    mb="3"
    gap="2"
    p="1"
    style={{ borderBottom: "1px dashed var(--accent-7)" }}
  >
    <Text as="label" size="3" htmlFor={label}>
      {label}
    </Text>
    <Select.Root defaultValue={options[0]}>
      <Select.Trigger />
      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option} value={option}>
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  </Flex>
);

export default SettingsPage;

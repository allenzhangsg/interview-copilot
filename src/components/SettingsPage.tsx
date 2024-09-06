import React from "react";
import { Select } from "@radix-ui/themes";

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

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
    </div>
  );
};

const SettingItem = ({
  label,
  options,
}: {
  label: string;
  options: string[];
}) => (
  <div className="setting-item">
    <label>{label}</label>
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
  </div>
);

export default SettingsPage;

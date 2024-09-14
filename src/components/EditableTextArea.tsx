import React, { useState } from "react";
import { Flex, TextArea, Button, Text } from "@radix-ui/themes";

interface EditableTextAreaProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({
  id,
  placeholder,
  value,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: save to database
  };

  return (
    <>
      {isEditing ? (
        <Flex
          direction="row"
          justify="between"
          gap="2"
          align="start"
          style={{ minHeight: "100px" }}
        >
          <TextArea
            placeholder={placeholder}
            resize="vertical"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ flex: 1, minHeight: "100px" }}
          />
          <Flex direction="column" justify="start" gap="1">
            <Button
              size="2"
              color="red"
              variant="soft"
              onClick={() => onChange("")}
            >
              Clear
            </Button>
            <Button size="2" variant="soft" onClick={handleSave}>
              Save
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex justify="between" align="start">
          <Text size="2" style={{ whiteSpace: "pre-wrap", flex: 1 }}>
            {value || `No ${id} entered yet.`}
          </Text>
          <Button size="2" variant="soft" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Flex>
      )}
    </>
  );
};

export default EditableTextArea;

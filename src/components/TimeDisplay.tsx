import React, { useState, useEffect } from 'react';
import { Box } from "@radix-ui/themes";

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Box style={{ height: "50%" }}>{currentTime}</Box>;
};

export default TimeDisplay;

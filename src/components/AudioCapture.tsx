import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Text, Flex } from "@radix-ui/themes";

const AudioCapture: React.FC = () => {
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [desktopStream, setDesktopStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const startMicCapture = async () => {
    try {
      // Request access to the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const startDesktopCapture = async () => {
    navigator.mediaDevices
      .getDisplayMedia({ audio: true })
      .then((stream) => {
        setDesktopStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing desktop:", error);
      });
  };

  const stopCapture = (type: "mic" | "desktop") => {
    if (type === "mic" && micStream) {
      micStream.getTracks().forEach((track) => track.stop());
      setMicStream(null);
    } else if (type === "desktop" && desktopStream) {
      desktopStream.getTracks().forEach((track) => track.stop());
      setDesktopStream(null);
    }
  };

  useEffect(() => {
    // Clean up streams when component unmounts
    return () => {
      if (micStream) stopCapture("mic");
      if (desktopStream) stopCapture("desktop");
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && desktopStream) {
      videoRef.current.srcObject = desktopStream;
    }
  }, [desktopStream]);

  return (
    <Box p="4">
      <Text size="5" weight="bold" mb="4">
        Audio Capture
      </Text>
      <Flex direction="column" gap="3">
        <Flex align="center" gap="2">
          <Button onClick={startMicCapture} disabled={!!micStream}>
            Start Mic Capture
          </Button>
          <Button onClick={() => stopCapture("mic")} disabled={!micStream}>
            Stop Mic Capture
          </Button>
          <Text>{micStream ? "Mic capturing" : "Mic not capturing"}</Text>
        </Flex>
        <Flex align="center" gap="2">
          <Button onClick={startDesktopCapture} disabled={!!desktopStream}>
            Start Desktop Capture
          </Button>
          <Button
            onClick={() => stopCapture("desktop")}
            disabled={!desktopStream}
          >
            Stop Desktop Capture
          </Button>
          <Text>
            {desktopStream ? "Desktop capturing" : "Desktop not capturing"}
          </Text>
        </Flex>
        {desktopStream && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </Flex>
    </Box>
  );
};

export default AudioCapture;

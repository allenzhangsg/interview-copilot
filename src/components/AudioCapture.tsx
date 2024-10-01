import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Text, Flex } from "@radix-ui/themes";

const AudioCapture: React.FC = () => {
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [desktopStream, setDesktopStream] = useState<MediaStream | null>(null);
  const [micRecorder, setMicRecorder] = useState<MediaRecorder | null>(null);
  const [desktopRecorder, setDesktopRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [micButtonLoading, setMicButtonLoading] = useState(false);
  const [desktopButtonLoading, setDesktopButtonLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startMicCapture = async () => {
    setMicButtonLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      const recorder = new MediaRecorder(stream);
      setMicRecorder(recorder);

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => saveAudioFile(chunks, "mic");

      recorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    } finally {
      setMicButtonLoading(false);
    }
  };

  const startDesktopCapture = async () => {
    setDesktopButtonLoading(true);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
      });
      setDesktopStream(stream);
      const recorder = new MediaRecorder(stream);
      setDesktopRecorder(recorder);

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => saveAudioFile(chunks, "desktop");

      recorder.start();
    } catch (error) {
      console.error("Error accessing desktop:", error);
    } finally {
      setDesktopButtonLoading(false);
    }
  };

  const stopCapture = (type: "mic" | "desktop") => {
    if (type === "mic" && micStream) {
      micStream.getTracks().forEach((track) => track.stop());
      if (micRecorder) micRecorder.stop();
      setMicStream(null);
      setMicRecorder(null);
    } else if (type === "desktop" && desktopStream) {
      desktopStream.getTracks().forEach((track) => track.stop());
      if (desktopRecorder) desktopRecorder.stop();
      setDesktopStream(null);
      setDesktopRecorder(null);
    }
  };

  const saveAudioFile = async (chunks: BlobPart[], type: "mic" | "desktop") => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    window.electron.send("save-audio", {
      buffer: Array.from(uint8Array),
      type,
    });
  };

  useEffect(() => {
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
          <Button
            onClick={startMicCapture}
            disabled={!!micStream || micButtonLoading}
            loading={micButtonLoading}
          >
            Start Mic Capture
          </Button>
          <Button onClick={() => stopCapture("mic")} disabled={!micStream}>
            Stop Mic Capture
          </Button>
          <Text>{micStream ? "Mic capturing" : "Mic not capturing"}</Text>
        </Flex>
        <Flex align="center" gap="2">
          <Button
            onClick={startDesktopCapture}
            disabled={!!desktopStream || desktopButtonLoading}
            loading={desktopButtonLoading}
          >
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

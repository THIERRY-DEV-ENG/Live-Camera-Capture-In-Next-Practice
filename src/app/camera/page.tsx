"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraPage() {


  const videoRef = useRef<HTMLVideoElement | null>(null);

  
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Camera error:", error);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    setImage(imageData);
  };

  return (
    <div>
      <h1>Live Camera</h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="500"
      />

      <button onClick={captureImage}>
        Capture
      </button>

      {image && <img src={image} alt="Captured" width="300" />}
    </div>
  );
}
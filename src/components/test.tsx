import React, { useState } from "react";

const PhotoUploadTest = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setMessage(""); // Очистити повідомлення про помилку
    } else {
      setPhoto(null);
      setMessage("No photo selected.");
    }
  };

  const handleUpload = async () => {
    if (!photo) {
      setMessage("Please select a photo before uploading.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", photo);

    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessage(`Photo uploaded successfully! Link: ${data.data.link}`);
    } catch (error: any) {
      console.error("Error uploading photo:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>Photo Upload Test</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ marginBottom: "20px" }}
      />
      <br />
      {photo && <p>Selected photo: {photo.name}</p>}
      <button
        onClick={handleUpload}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          backgroundColor: isLoading ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Uploading..." : "Upload Photo"}
      </button>
      {message && <p style={{ marginTop: "20px", color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
};

export default PhotoUploadTest;

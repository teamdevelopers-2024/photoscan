import html2canvas from "html2canvas";

const captureAndUploadDiv = async () => {
  const divElement = document.getElementById("image-grid");

  try {
    // Capture the div as a canvas
    const canvas = await html2canvas(divElement);

    // Convert the canvas to a Blob
    canvas.toBlob(async (blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append("file", blob);
        formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace with your Cloudinary upload preset
        formData.append("folder", "YOUR_FOLDER"); // Optional: Specify Cloudinary folder

        // Upload to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("Uploaded Image URL:", data.secure_url);
        return data.secure_url; // Return the URL if you want to use it elsewhere
      }
    }, "image/png"); // You can specify other formats if needed (e.g., "image/jpeg")
  } catch (error) {
    console.error("Error capturing and uploading div:", error);
  }
};

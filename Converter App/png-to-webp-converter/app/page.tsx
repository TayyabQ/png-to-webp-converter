"use client"
import React, { useState } from "react";

export default function Home() {

  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
  event.preventDefault();

  if (!selectedFile) {
    console.log("File not selected");
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response1 = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data1 = await response1.json();
    if (!response1.ok || !data1.success) {
      alert("Upload Failed");
      return;
    }

    console.log("Image successfully uploaded", data1);

    const imageUrll = `/uploads/${data1.name}`;
    const imgg = document.createElement("img");
    imgg.src = imageUrll;
    imgg.alt = "Converted Image";
    imgg.style.maxWidth = "300px";

    const targetDivv = document.getElementById("preview-target");
    if (targetDivv) {
      targetDivv.insertBefore(imgg, targetDivv.firstChild);
    }

    const response2 = await fetch('/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: data1.name })
    });

    const data2 = await response2.json();
    if (!response2.ok || !data2.success) {
      alert("Conversion Failed");
      return;
    }

    console.log("Image successfully converted", data2);

    const imageUrl = `/uploads/${data2.convertedName}`;
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Converted Image";
    img.style.maxWidth = "300px";

    const targetDiv = document.getElementById("convert-preview-target");
    if (targetDiv) {
      targetDiv.insertBefore(img, targetDiv.firstChild);
    }

  } catch (error) {
    console.error("Error is: ", error);
  }
};


  return (
    <div className="flex flex-col items-center justify-center gap-4 py-25">
      <div className="flex flex-col items-center justify-center gap-4 py-25">
        <p className="text-4xl font-bold text-black">Upload any PNG Image to convert into WebP Image</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4">
            <input className="bg-black text-white text-2xl px-3 py-2 rounded-sm" type='file' onChange={handleUpload}></input>
            <button className="bg-black text-white text-2xl px-3 py-2 rounded-sm" type="submit">Upload & Convert</button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 py-25">
        <p className="text-4xl font-bold text-black">Image Preview</p>
        <p id="preview-target"></p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 py-25">
        <p className="text-4xl font-bold text-black">Convert to WebP</p>
        <p id="convert-preview-target"></p>
      </div>
    </div>
  );
}

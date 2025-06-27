'use client';
import React, { useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log('File not selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response1 = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data1 = await response1.json();
      if (!response1.ok || !data1.success) {
        alert('Upload Failed');
        return;
      }

      console.log('Image successfully uploaded', data1);

      const imageUrll = `/uploads/${data1.name}`;
      const imgg = document.createElement('img');
      imgg.src = imageUrll;
      imgg.alt = 'Converted Image';
      imgg.style.maxWidth = '300px';

      const targetDivv = document.getElementById('preview-target');
      if (targetDivv) {
        targetDivv.insertBefore(imgg, targetDivv.firstChild);
      }

      const response2 = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: data1.name }),
      });

      const data2 = await response2.json();
      if (!response2.ok || !data2.success) {
        alert('Conversion Failed');
        return;
      }

      console.log('Image successfully converted', data2);

      const imageUrl = `/uploads/${data2.convertedName}`;
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Converted Image';
      img.style.maxWidth = '300px';

      const targetDiv = document.getElementById('convert-preview-target');
      if (targetDiv) {
        targetDiv.insertBefore(img, targetDiv.firstChild);
      }
    } catch (error) {
      console.error('Error is: ', error);
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center gap-4">
    <>
      <div className="flex flex-col items-center justify-center py-10 px-5">
        <img src={"adobe-express-logo.svg"} alt='icon'className='h-7.5 w-41'/>
        <h1 className="text-[45px] font-extrabold text-black text-center">
          Free image converter.
        </h1>
        <p className='text-[16px] text-black mt-4 mb-6'>
          Our fast and free onine image converter lets you convert images in your desired formats in seconds.
        </p>
        <h1 className="text-[36px] font-extrabold text-black text-center">
          Convert to WebP.
        </h1>
        <p className='text-[16px] text-black my-8'>
          Our HD image converter makes it easy to change your image files into JPG format.
        </p>



        <div className='grid lg:grid-cols-2 sm:px-20'>
          <img src={"travel guide.png"} alt='icon'className='h-111 w-111 flex items-center justify-center'/>
          <div className='p-6 shadow-2xl rounded-2xl flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center h-full'>
              <div className='h-full border-2 border-black border-dashed flex flex-col items-center justify-center rounded-4xl'>
                <p className='w-2/4 lg:w-3/4 text-[28px] font-extrabold text-center'>Drag and drop an Image or <span className='text-[#5C5CE0]'>browse to upload.</span></p>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-rows-2 gap-1">
                    <input
                      className="bg-[#5C5CE0] font-extrabold rounded-3xl text-white px-6 py-3.5 mt-4"
                      type="file"
                      onChange={handleUpload}
                    ></input>
                    <button className='bg-[#5C5CE0] font-extrabold rounded-3xl text-white px-6 py-3.5 mt-4' type='submit'>Upload your photo</button>
                  </div>
                </form>
                <p className='text-[11px] mt-1'>File must be PNG or WebP and upto 40MB</p>
              </div>
            </div>
            <p className='text-[12px] mt-4 font-bold'>By uploading your photo or video, you agree to the Adobe <span className='text-[#5C5CE0]'>Terms of Use</span> and <span className='text-[#5C5CE0]'>Privacy Policy</span></p>
          </div>
        </div>
      </div>



      <div className="flex flex-col items-center justify-center gap-4 py-25">
            <p className="text-4xl font-bold text-black">Image Preview</p>
          <p id="preview-target"></p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-25">
          <p className="text-4xl font-bold text-black">Convert to WebP</p>
          <p id="convert-preview-target"></p>
        </div>


        <div className='flex flex-col items-center justify-center mt-10 bg-gradient-to-tr from-blue-400 to-pink-400 py-25'>
          <h2 className='text-white text-[36px] font-extrabold max-md:w-3/5 md:text-center lg:text-start'>How to convert image files with the image converter.</h2>
          <div className='grid md:grid-cols-3 gap-4 w-[80%] mt-10'>
            <div className='bg-white rounded-md flex flex-col items-center justify-center py-8'>
              <h3 className='text-[22px] font-extrabold'>1. Select.</h3>
              <p className='text-[14px] my-1 font-semibold w-2/3'>Choose a JPEG/JPG or PNG image from your photo library that is less than 2GB in size.</p>
            </div>
            <div className='bg-white rounded-md flex flex-col items-center justify-center py-8'>
              <h3 className='text-[22px] font-extrabold'>2. Convert.</h3>
              <p className='text-[14px] my-1 font-semibold w-2/3'>Upload your image to automatically convert it to a JPG, PNG, or PDF in moments.</p>
            </div>
            <div className='bg-white rounded-md flex flex-col items-center justify-center py-8'>
              <h3 className='text-[22px] font-extrabold'>3. Continue editing.</h3>
              <p className='text-[14px] my-1 font-semibold w-2/3'>Download your newly converted image file. Save it, share it, or keep editing it in Adope Express.</p>
            </div>
          </div>
        </div>
        
        {/* <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4">
            <input
              className="bg-black text-white text-2xl px-3 py-2 rounded-sm"
              type="file"
              onChange={handleUpload}
            ></input>
            <button className="bg-black text-white text-2xl px-3 py-2 rounded-sm" type="submit">
              Upload & Convert
            </button>
          </div>
        </form>
          <div className="flex flex-col items-center justify-center gap-4 py-25">
            <p className="text-4xl font-bold text-black">Image Preview</p>
          <p id="preview-target"></p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-25">
          <p className="text-4xl font-bold text-black">Convert to WebP</p>
          <p id="convert-preview-target"></p>
        </div> */}
      
    </>
  );
}

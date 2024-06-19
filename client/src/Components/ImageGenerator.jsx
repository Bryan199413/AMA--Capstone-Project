import React, { useEffect, useRef, useState } from 'react';
import useImageGenerator from '../zustand/useImageGenerator';
import preview from '../assets/Images/preview.png'

function ImageGenerator() {
  const { isOpenImageGenerator ,setIsOpenImageGenerator } = useImageGenerator();
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(preview);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isOpenImageGenerator && cardRef.current) {
      cardRef.current.focus();
    }
  }, [isOpenImageGenerator])

  const handleBlur = (e) => {
    if (!cardRef.current.contains(e.relatedTarget)) {
      setIsOpenImageGenerator(false);
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/dallE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.image_data) {
        setImage(`data:image/png;base64,${data.image_data}`);
      } else {
        console.error("Failed to generate image");
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div
      ref={cardRef}
      tabIndex="0"
      onBlur={handleBlur}
      className="card mx-auto max-w-[720px] w-full bg-base-100 shadow-xl p-2"
    >
      <figure className='bg-gray-100'>
        <img src={image} alt="Image" />
      </figure>
      <div className="card-body">
        <label className="card-title">
           Prompt
        </label>
        <input type="text"
         placeholder="Type here"
         value={prompt}
         onChange={(e) => setPrompt(e.target.value)} 
         className="input input-bordered w-full focus:border-none" />
        <div className="card-actions justify-between">
          <button className="btn btn-accent" onClick={handleGenerate}>Generate</button>
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;

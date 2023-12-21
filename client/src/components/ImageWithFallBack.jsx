import React, { useState } from 'react';

const ImageWithFallback = ({ src,  alt, cN='' }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const files = [
    '/images/fall1.png',
    '/images/fall2.png',
    '/images/fall3.png',
    '/images/fall4.png',
    '/images/fall5.png',
    '/images/fall6.png',
    '/images/fall7.png',
    '/images/fall8.png',
    '/images/fall9.png',
    // ... add all 9 file names here ...
  ];
  
  const getRandomFile = (fileArray) => {
    const randomIndex = Math.floor(Math.random() * fileArray.length);
    return fileArray[randomIndex];
  };
  
  const randomFile = getRandomFile(files)
  
  const handleError = () => {
    setImgSrc(randomFile);
  };

  return (
    <img src={randomFile} className={cN} alt={alt} onError={handleError} />
  );
};

export default ImageWithFallback;

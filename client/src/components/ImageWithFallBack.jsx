import React, { useState, useEffect } from 'react';

const ImageWithFallback = ({ src, alt, cN = '' }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [randomFile, setRandomFile] = useState('');

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

  useEffect(() => {
    const getRandomFile = (fileArray) => {
      const randomIndex = Math.floor(Math.random() * fileArray.length);
      return fileArray[randomIndex];
    };

    setRandomFile(getRandomFile(files));
  }, [files]);

  const handleError = () => {
    setImgSrc(randomFile);
  };

  return (
    <img src={imgSrc} className={cN} alt={alt} onError={handleError} />
  );
};

export default ImageWithFallback;

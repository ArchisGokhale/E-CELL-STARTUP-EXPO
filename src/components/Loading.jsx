import { useEffect, useState } from 'react';
import Image from 'next/image';

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const increment = Math.floor(Math.random() * 10) + 1;
        const newProgress = oldProgress + increment;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }

        return newProgress;
      });
    }, Math.random() * 300 + 100);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  const numberOfBlocks = 10;
  const filledBlocks = Math.floor((progress / 100) * numberOfBlocks);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-neon-green font-press-start">
        <div className="pb-5">
          <Image 
            src="/media/logos/ECELL-LOGO.png" 
            alt="Ecell logo" 
            width={250} 
            height={250} 
            className="mx-auto rounded-lg object-contain"
          />
        </div>
      <div className="text-xl md:text-4xl mb-4">Loading {progress}%</div>
      <div className="flex space-x-1">
        {Array.from({ length: numberOfBlocks }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 border-2 border-white ${
              index < filledBlocks ? 'bg-black' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;

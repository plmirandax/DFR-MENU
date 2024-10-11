'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';

interface ImageDimensions {
  width: number;
  height: number;
}

export default function Component() {
  const images = [
    "/DFR1.jpg",
    "/DFR2.jpg",
    "/DFR3.jpg",
    "/DFR4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const img = new window.Image(); // Use window.Image here
    img.src = images[currentIndex];
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [currentIndex, images]);

  const nextImage = () => {
    controls.start({ x: '-100%', transition: { duration: 0.3 } }).then(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      controls.set({ x: '100%' });
      controls.start({ x: 0, transition: { duration: 0.3 } });
    });
  };

  const prevImage = () => {
    controls.start({ x: '100%', transition: { duration: 0.3 } }).then(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      controls.set({ x: '-100%' });
      controls.start({ x: 0, transition: { duration: 0.3 } });
    });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      prevImage();
    } else if (info.offset.x < -100) {
      nextImage();
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          animate={controls}
          className="relative"
          style={{
            width: imageDimensions.width,
            height: imageDimensions.height,
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={imageDimensions.width}
            height={imageDimensions.height}
            priority
            className="pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>
      <Button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary/50 hover:bg-primary/75"
        onClick={prevImage}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary/50 hover:bg-primary/75"
        onClick={nextImage}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Component() {
  const images = [
    "/DFR1.jpg",
    "/DFR2.jpg",
    "/DFR3.jpg",
    "/DFR4.jpg",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="contain"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <Button
        className="absolute bottom-4 right-4 bg-primary/50 hover:bg-primary/75"
        onClick={nextImage}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}
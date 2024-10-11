'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

export default function Component() {
  const images = [
    "/DFR1.jpg",
    "/DFR2.jpg",
    "/DFR3.jpg",
    "/DFR4.jpg",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()

  const nextImage = () => {
    controls.start({ x: '-100%', transition: { duration: 0.5 } }).then(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      controls.set({ x: '100%' })
      controls.start({ x: 0, transition: { duration: 0.5 } })
    })
  }

  const prevImage = () => {
    controls.start({ x: '100%', transition: { duration: 0.5 } }).then(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      controls.set({ x: '-100%' })
      controls.start({ x: 0, transition: { duration: 0.5 } })
    })
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          animate={controls}
          className="w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            if (offset.x > 100) {
              prevImage()
            } else if (offset.x < -100) {
              nextImage()
            } else {
              controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
            }
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
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
  )
}
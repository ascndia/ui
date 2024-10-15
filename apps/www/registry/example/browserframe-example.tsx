"use client"

import React, { useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import BrowserFrame from "@/registry/ui/browserframe"

const VideoWrapper = ({ src }: { src: string }) => {
  return (
    <div className="relative h-full w-full">
      <video
        src={src}
        className="relative z-10 block w-full h-full reduce-motion:hidden"
        height="100%"
        width="100%"
        loop
        muted
        autoPlay
        controls={false}
        playsInline
      />
    </div>
  )
}
const Example = () => {
  const sectionRef = useRef(null)

  return (
    <div className="relative flex flex-col gap-8 lg:gap-12 w-full items-center">
      <div ref={sectionRef} className="absolute not-sr-only" />
      <BrowserFrame
        tabColors={["bg-red-500", "bg-green-500", "bg-blue-500"]}
        className="overflow-hidden lg:order-last bg-default w-full max-w-6xl mx-auto"
        contentClassName="aspect-video border overflow-hidden rounded-lg"
      >
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.1, delay: 0.2 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="relative w-full max-w-full h-full"
          >
            <VideoWrapper
              src={
                "https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-rls.webm"
              }
            />
          </motion.div>
        </AnimatePresence>
      </BrowserFrame>
    </div>
  )
}

interface TabProps {
  label: string
  isActive: boolean
  onClick: VoidFunction
}

const Tab = ({ label, isActive, onClick }: TabProps) => (
  <button onClick={onClick} aria-selected={isActive} role="tab">
    <Badge
      className={cn(
        // `text-left py-1.5 px-3 lg:py-2 lg:px-8 border rounded-md bg-alternative hover:border-foreground text-lg opacity-80 transition-all`,
        "py-1.5 px-3 lg:py-2 lg:px-8",
        "hover:border-foreground-lighter hover:text-foreground",
        `opacity-80`,
        isActive ? "opacity-100 !border-foreground" : ""
      )}
    >
      {label}
    </Badge>
  </button>
)

export default Example

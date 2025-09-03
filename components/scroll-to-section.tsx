"use client"

import type React from "react"

import { ChevronDown } from "lucide-react"

interface ScrollToSectionProps {
  targetId: string
  className?: string
  children?: React.ReactNode
}

export default function ScrollToSection({ targetId, className = "", children }: ScrollToSectionProps) {
  const scrollToSection = () => {
    const section = document.querySelector(`#${targetId}`)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <button onClick={scrollToSection} className={className} aria-label={`Scroll to ${targetId} section`}>
      {children || <ChevronDown className="h-6 w-6 text-white" />}
    </button>
  )
}

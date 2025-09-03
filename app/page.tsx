"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    // Redirect to the static HTML index page
    window.location.href = "/index.html"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to ENGINEERS4URSERVICE...</p>
      </div>
    </div>
  )
}

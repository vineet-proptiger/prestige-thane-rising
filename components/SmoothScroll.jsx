'use client'
import { ReactLenis } from 'lenis/react'

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.5, 
      smoothWheel: true,
      prevent: (node) => {
        return (node.classList && node.classList.contains('country-list')) || 
               (node.closest && node.closest('.country-list') !== null);
      }
    }}>
      {children}
    </ReactLenis>
  )
}

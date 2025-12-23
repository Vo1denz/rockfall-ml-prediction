"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EarthVisualizationProps {
  predictions: any[]
}

export function EarthVisualization({ predictions }: EarthVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const centerX = canvas.offsetWidth / 2
    const centerY = canvas.offsetHeight / 2
    const radius = Math.min(centerX, centerY) - 20

    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw Earth base
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, "rgba(0, 100, 200, 0.8)")
      gradient.addColorStop(0.7, "rgba(0, 50, 150, 0.6)")
      gradient.addColorStop(1, "rgba(0, 20, 100, 0.4)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw grid lines with fixed approach
      ctx.strokeStyle = "rgba(0, 230, 118, 0.3)"
      ctx.lineWidth = 1

      // Longitude lines (vertical)
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 + rotation
        const offsetX = Math.sin(angle) * radius * 0.3

        ctx.beginPath()
        ctx.ellipse(centerX + offsetX, centerY, Math.abs(radius * 0.8), radius, angle * 0.2, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Latitude lines (horizontal)
      for (let i = 1; i < 5; i++) {
        const latRadius = radius * (1 - i * 0.15)
        const yOffset = (radius * i) / 6

        // Upper latitude
        ctx.beginPath()
        ctx.ellipse(centerX, centerY - yOffset, latRadius, latRadius * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()

        // Lower latitude
        ctx.beginPath()
        ctx.ellipse(centerX, centerY + yOffset, latRadius, latRadius * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw risk zones with improved positioning
      const riskZones = [
        { x: centerX + radius * 0.3, y: centerY - radius * 0.4, risk: "high" },
        { x: centerX - radius * 0.5, y: centerY + radius * 0.2, risk: "medium" },
        { x: centerX + radius * 0.6, y: centerY + radius * 0.3, risk: "low" },
        { x: centerX - radius * 0.2, y: centerY - radius * 0.6, risk: "high" },
        { x: centerX + radius * 0.1, y: centerY + radius * 0.7, risk: "medium" },
      ]

      riskZones.forEach((zone, index) => {
        // Check if zone is within the visible hemisphere
        const distanceFromCenter = Math.sqrt(Math.pow(zone.x - centerX, 2) + Math.pow(zone.y - centerY, 2))

        if (distanceFromCenter <= radius) {
          const pulsePhase = (Date.now() / 1000 + index) % 2
          const pulseIntensity = Math.sin(pulsePhase * Math.PI) * 0.5 + 0.5

          let color, glowColor
          switch (zone.risk) {
            case "high":
              color = `rgba(255, 77, 77, ${0.8 + pulseIntensity * 0.2})`
              glowColor = `rgba(255, 77, 77, ${0.3 + pulseIntensity * 0.3})`
              break
            case "medium":
              color = `rgba(255, 193, 7, ${0.8 + pulseIntensity * 0.2})`
              glowColor = `rgba(255, 193, 7, ${0.3 + pulseIntensity * 0.3})`
              break
            default:
              color = `rgba(0, 230, 118, ${0.8 + pulseIntensity * 0.2})`
              glowColor = `rgba(0, 230, 118, ${0.3 + pulseIntensity * 0.3})`
          }

          // Glow effect
          ctx.shadowColor = glowColor
          ctx.shadowBlur = 15 + pulseIntensity * 10
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(zone.x, zone.y, 4 + pulseIntensity * 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      rotation += 0.005
      requestAnimationFrame(animate)
    }

    animate()
  }, [predictions])

  return (
    <Card className="glassmorphism neon-glow-cyan">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-accent" />
          <span>Global Risk Monitoring</span>
        </CardTitle>
        <Button variant="ghost" size="icon">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-80 lg:h-96">
          <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />

          {/* Floating legend */}
          <div className="absolute top-4 right-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-destructive neon-glow-red"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary neon-glow"></div>
              <span>Low Risk</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Droplets, Shield } from "lucide-react"

interface StatusCardsProps {
  predictions: any[]
}

export function StatusCards({ predictions }: StatusCardsProps) {
  const riskScore =
    predictions.length > 0
      ? Math.round((predictions.filter((p) => p.result === "Safe").length / predictions.length) * 100)
      : 85

  const avgRainfall =
    predictions.length > 0
      ? Math.round(predictions.reduce((sum, p) => sum + (p.rainfall || 0), 0) / predictions.length)
      : 127

  const modelConfidence = 94

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Risk Score */}
      <Card className="glassmorphism neon-glow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Risk Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgb(0, 230, 118)"
                  strokeWidth="2"
                  strokeDasharray={`${riskScore}, 100`}
                  className="neon-glow"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{riskScore}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Safety Index</p>
          </div>
        </CardContent>
      </Card>

      {/* Rainfall Stats */}
      <Card className="glassmorphism neon-glow-cyan">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Droplets className="h-4 w-4 text-accent" />
            <span>Rainfall</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-accent">{avgRainfall}mm</div>
            <p className="text-xs text-muted-foreground">24h Average</p>
            <Progress value={Math.min((avgRainfall / 200) * 100, 100)} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0mm</span>
              <span>200mm</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Confidence */}
      <Card className="glassmorphism neon-glow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span>Model Confidence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">{modelConfidence}%</div>
            <p className="text-xs text-muted-foreground">Prediction Accuracy</p>
            <Progress value={modelConfidence} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Neural Network v2.1</span>
              <span>Updated</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Edit3, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ManualInputProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function ManualInput({ onSubmit, isLoading }: ManualInputProps) {
  const [formData, setFormData] = useState({
    slope: "",
    rockSize: "",
    soilType: "",
    vegetation: "",
    rainfall: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      slope: Number.parseFloat(formData.slope),
      rockSize: formData.rockSize,
      soilType: formData.soilType,
      vegetation: formData.vegetation,
      rainfall: Number.parseFloat(formData.rainfall),
    })
    setFormData({
      slope: "",
      rockSize: "",
      soilType: "",
      vegetation: "",
      rainfall: "",
    })
  }

  const isFormValid = Object.values(formData).every((value) => value !== "")

  return (
    <Card className="glassmorphism neon-glow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Edit3 className="h-5 w-5 text-accent" />
          <span>Manual Data Input</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slope">Slope Angle (°)</Label>
              <Input
                id="slope"
                type="number"
                placeholder="0-90"
                value={formData.slope}
                onChange={(e) => setFormData((prev) => ({ ...prev, slope: e.target.value }))}
                className="glassmorphism"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rainfall">Rainfall (mm)</Label>
              <Input
                id="rainfall"
                type="number"
                placeholder="0-500"
                value={formData.rainfall}
                onChange={(e) => setFormData((prev) => ({ ...prev, rainfall: e.target.value }))}
                className="glassmorphism"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rockSize">Rock Size</Label>
              <Select
                value={formData.rockSize}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, rockSize: value }))}
              >
                <SelectTrigger className="glassmorphism">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small (&lt; 0.5m)</SelectItem>
                  <SelectItem value="Medium">Medium (0.5-2m)</SelectItem>
                  <SelectItem value="Large">Large (&gt; 2m)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Select
                value={formData.soilType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, soilType: value }))}
              >
                <SelectTrigger className="glassmorphism">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clay">Clay</SelectItem>
                  <SelectItem value="Sand">Sand</SelectItem>
                  <SelectItem value="Silt">Silt</SelectItem>
                  <SelectItem value="Rock">Rock</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="vegetation">Vegetation Cover</Label>
              <Select
                value={formData.vegetation}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, vegetation: value }))}
              >
                <SelectTrigger className="glassmorphism">
                  <SelectValue placeholder="Select coverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None (0%)</SelectItem>
                  <SelectItem value="Sparse">Sparse (1-25%)</SelectItem>
                  <SelectItem value="Moderate">Moderate (26-75%)</SelectItem>
                  <SelectItem value="Dense">Dense (76-100%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full neon-glow pulse-glow" disabled={!isFormValid || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Prediction...
              </>
            ) : (
              "Generate Prediction"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

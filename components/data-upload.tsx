"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DataUploadProps {
  onUpload: (data: any) => void
}

export function DataUpload({ onUpload }: DataUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const csvFile = files.find((file) => file.name.endsWith(".csv"))

    if (csvFile) {
      setUploadedFile(csvFile)
      // Simulate CSV parsing
      const mockData = [
        { slope: 45, rockSize: "Large", soilType: "Clay", vegetation: "Sparse", rainfall: 120 },
        { slope: 30, rockSize: "Medium", soilType: "Sand", vegetation: "Dense", rainfall: 80 },
        { slope: 60, rockSize: "Small", soilType: "Rock", vegetation: "None", rainfall: 200 },
      ]
      setPreviewData(mockData)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.name.endsWith(".csv")) {
      setUploadedFile(file)
      const mockData = [
        { slope: 45, rockSize: "Large", soilType: "Clay", vegetation: "Sparse", rainfall: 120 },
        { slope: 30, rockSize: "Medium", soilType: "Sand", vegetation: "Dense", rainfall: 80 },
        { slope: 60, rockSize: "Small", soilType: "Rock", vegetation: "None", rainfall: 200 },
      ]
      setPreviewData(mockData)
    }
  }

  const handleUpload = () => {
    if (previewData.length > 0) {
      previewData.forEach((data) => onUpload(data))
      setUploadedFile(null)
      setPreviewData([])
    }
  }

  const clearFile = () => {
    setUploadedFile(null)
    setPreviewData([])
  }

  return (
    <Card className="glassmorphism neon-glow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5 text-primary" />
          <span>CSV Data Upload</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-primary bg-primary/10 neon-glow" : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop your CSV file here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
            <input type="file" accept=".csv" onChange={handleFileSelect} className="hidden" id="file-upload" />
            <Button asChild variant="outline" className="neon-glow-cyan bg-transparent">
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">{uploadedFile.name}</span>
                <Badge variant="secondary">{previewData.length} rows</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={clearFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {previewData.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Preview (first 3 rows):</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2">Slope (°)</th>
                        <th className="text-left p-2">Rock Size</th>
                        <th className="text-left p-2">Soil Type</th>
                        <th className="text-left p-2">Vegetation</th>
                        <th className="text-left p-2">Rainfall (mm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 3).map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="p-2">{row.slope}</td>
                          <td className="p-2">{row.rockSize}</td>
                          <td className="p-2">{row.soilType}</td>
                          <td className="p-2">{row.vegetation}</td>
                          <td className="p-2">{row.rainfall}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button onClick={handleUpload} className="w-full neon-glow">
                  Process {previewData.length} Records
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, ArrowUpDown } from "lucide-react"

interface ResultsTableProps {
  predictions: any[]
}

export function ResultsTable({ predictions }: ResultsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const filteredPredictions = predictions.filter((prediction) =>
    Object.values(prediction).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedPredictions = [...filteredPredictions].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const exportCSV = () => {
    const headers = ["Timestamp", "Slope", "Rock Size", "Soil Type", "Vegetation", "Rainfall", "Result", "Probability"]
    const csvContent = [
      headers.join(","),
      ...sortedPredictions.map((p) =>
        [
          new Date(p.timestamp).toLocaleString(),
          p.slope,
          p.rockSize,
          p.soilType,
          p.vegetation,
          p.rainfall,
          p.result,
          (p.probability * 100).toFixed(1) + "%",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "landslide_predictions.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className="glassmorphism neon-glow">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle>Prediction Results</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 glassmorphism"
              />
            </div>
            <Button variant="outline" onClick={exportCSV} className="neon-glow-cyan bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedPredictions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {predictions.length === 0
              ? "No predictions yet. Upload data or use manual input to get started."
              : "No results match your search criteria."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("timestamp")}
                      className="h-auto p-0 font-medium"
                    >
                      Timestamp
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("slope")}
                      className="h-auto p-0 font-medium"
                    >
                      Slope (°)
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-3">Rock Size</th>
                  <th className="text-left p-3">Soil Type</th>
                  <th className="text-left p-3">Vegetation</th>
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("rainfall")}
                      className="h-auto p-0 font-medium"
                    >
                      Rainfall (mm)
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("result")}
                      className="h-auto p-0 font-medium"
                    >
                      Result
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("probability")}
                      className="h-auto p-0 font-medium"
                    >
                      Probability
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPredictions.map((prediction) => (
                  <tr key={prediction.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="p-3 text-muted-foreground">{new Date(prediction.timestamp).toLocaleString()}</td>
                    <td className="p-3 font-mono">{prediction.slope}°</td>
                    <td className="p-3">{prediction.rockSize}</td>
                    <td className="p-3">{prediction.soilType}</td>
                    <td className="p-3">{prediction.vegetation}</td>
                    <td className="p-3 font-mono">{prediction.rainfall}mm</td>
                    <td className="p-3">
                      <Badge
                        variant={prediction.result === "Safe" ? "default" : "destructive"}
                        className={prediction.result === "Safe" ? "neon-glow" : "neon-glow-red"}
                      >
                        {prediction.result}
                      </Badge>
                    </td>
                    <td className="p-3 font-mono">{(prediction.probability * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

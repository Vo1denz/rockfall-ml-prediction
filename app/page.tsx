"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DataUpload } from "@/components/data-upload"
import { ManualInput } from "@/components/manual-input"
import { EarthVisualization } from "@/components/earth-visualization"
import { StatusCards } from "@/components/status-cards"
import { ResultsTable } from "@/components/results-table"

export default function Dashboard() {
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handlePrediction = async (data: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newPrediction = {
      id: Date.now(),
      ...data,
      result: Math.random() > 0.5 ? "Safe" : "Risky",
      probability: Math.random(),
      timestamp: new Date().toISOString(),
    }

    setPredictions((prev) => [newPrediction, ...prev])
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-16 lg:ml-64">
          <Header />

          <div className="p-6 space-y-6">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Left Column - Input Controls */}
              <div className="space-y-6">
                <DataUpload onUpload={handlePrediction} />
                <ManualInput onSubmit={handlePrediction} isLoading={isLoading} />
              </div>

              {/* Right Column - Visualization */}
              <div className="space-y-6">
                <EarthVisualization predictions={predictions} />
                <StatusCards predictions={predictions} />
              </div>
            </div>

            {/* Results Table */}
            <ResultsTable predictions={predictions} />
          </div>
        </main>
      </div>
    </div>
  )
}

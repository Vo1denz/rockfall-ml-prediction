import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simulate ML model prediction logic
    const { slope, rockSize, soilType, vegetation, rainfall } = data

    // Simple risk calculation (in real app, this would be ML model)
    let riskScore = 0

    // Slope factor (higher slope = higher risk)
    riskScore += Math.min(slope / 90, 1) * 0.3

    // Rock size factor
    const rockSizeFactors = { Small: 0.1, Medium: 0.2, Large: 0.3 }
    riskScore += rockSizeFactors[rockSize as keyof typeof rockSizeFactors] || 0.2

    // Soil type factor
    const soilFactors = { Rock: 0.1, Sand: 0.15, Silt: 0.2, Clay: 0.25, Mixed: 0.2 }
    riskScore += soilFactors[soilType as keyof typeof soilFactors] || 0.2

    // Vegetation factor (more vegetation = lower risk)
    const vegFactors = { Dense: 0.05, Moderate: 0.1, Sparse: 0.15, None: 0.2 }
    riskScore += vegFactors[vegetation as keyof typeof vegFactors] || 0.15

    // Rainfall factor
    riskScore += Math.min(rainfall / 200, 1) * 0.25

    const result = riskScore > 0.5 ? "Risky" : "Safe"
    const probability = riskScore

    return NextResponse.json({
      result,
      probability,
      riskScore,
      factors: {
        slope: Math.min(slope / 90, 1) * 0.3,
        rockSize: rockSizeFactors[rockSize as keyof typeof rockSizeFactors] || 0.2,
        soilType: soilFactors[soilType as keyof typeof soilFactors] || 0.2,
        vegetation: vegFactors[vegetation as keyof typeof vegFactors] || 0.15,
        rainfall: Math.min(rainfall / 200, 1) * 0.25,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process prediction" }, { status: 500 })
  }
}

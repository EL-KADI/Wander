"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataVisualizationProps {
  species: any[]
}

export default function DataVisualization({ species }: DataVisualizationProps) {
  const speciesTypes = species.reduce(
    (acc, item) => {
      const type = item.type || "Other"
      acc[type] = (acc[type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const conservationData = species.reduce(
    (acc, item) => {
      const status = item.conservationStatus || "Unknown"
      acc[status] = (acc[status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Ecosystem Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">{species.length}</div>
              <div className="text-sm text-gray-600">Total Species</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{Object.keys(speciesTypes).length}</div>
              <div className="text-sm text-gray-600">Different Types</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Species Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(speciesTypes).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(count / species.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Conservation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {
                  species.filter(
                    (s) =>
                      s.conservationStatus === "Vulnerable" ||
                      s.conservationStatus === "Near Threatened" ||
                      s.conservationStatus === "Endangered",
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Species at Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {species.filter((s) => s.conservationStatus === "Least Concern").length}
              </div>
              <div className="text-sm text-gray-600">Stable Species</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Biodiversity Index</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {((Object.keys(speciesTypes).length / species.length) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Diversity Score</div>
            <p className="text-xs text-gray-500 mt-2">Based on species variety and distribution</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

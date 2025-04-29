import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SkillGapReport from "@/components/skill-gap-report"
import SkillRadarChart from "@/components/skill-radar-chart"

export default function LearningPlanPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Learning Plan Page</h1>
      <p>This is the learning plan page.</p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>{params.id === "1" ? "Day 10 of 30" : "Completed on April 1, 2025"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${params.id === "1" ? "bg-gradient-to-r from-teal-400 to-blue-500" : "bg-green-500"}`}
                  style={{ width: params.id === "1" ? "33%" : "100%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{params.id === "1" ? "33% Complete" : "100% Complete"}</span>
                <span>{params.id === "1" ? "20 days remaining" : "Completed"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
            <CardDescription>Your progress in closing the skill gap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <SkillRadarChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Detailed Skill Gap Report</CardTitle>
          <CardDescription>Comprehensive analysis of your skills compared to requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <SkillGapReport />
        </CardContent>
      </Card>
    </div>
  )
}

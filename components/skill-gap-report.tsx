"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillGapData = [
  {
    skill: "JavaScript",
    current: 90,
    required: 80,
    status: "Proficient",
    recommendation: "You exceed the requirements for this skill.",
  },
  {
    skill: "React",
    current: 85,
    required: 75,
    status: "Proficient",
    recommendation: "You exceed the requirements for this skill.",
  },
  {
    skill: "Python",
    current: 40,
    required: 90,
    status: "Critical Gap",
    recommendation: "Focus on Python fundamentals and data science libraries.",
  },
  {
    skill: "Data Analysis",
    current: 30,
    required: 95,
    status: "Critical Gap",
    recommendation: "This is your largest skill gap. Prioritize learning data analysis techniques.",
  },
  {
    skill: "Machine Learning",
    current: 20,
    required: 85,
    status: "Critical Gap",
    recommendation: "Begin with ML fundamentals and gradually move to advanced topics.",
  },
  {
    skill: "SQL",
    current: 60,
    required: 80,
    status: "Moderate Gap",
    recommendation: "Focus on advanced queries and database optimization.",
  },
  {
    skill: "Communication",
    current: 75,
    required: 70,
    status: "Proficient",
    recommendation: "You exceed the requirements for this skill.",
  },
]

export default function SkillGapReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {skillGapData.map((skill) => (
          <Card key={skill.skill} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2 md:w-1/4">
                  <div className="flex items-center justify-between md:justify-start gap-2">
                    <h3 className="font-medium text-lg">{skill.skill}</h3>
                    <StatusBadge status={skill.status} />
                  </div>
                </div>

                <div className="md:w-2/4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {skill.current}%</span>
                      <span>Required: {skill.required}%</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div
                          className={`h-full rounded-full ${getProgressColor(skill.current, skill.required)}`}
                          style={{ width: `${skill.current}%` }}
                        ></div>
                        <div
                          className="absolute h-full w-px bg-gray-800 top-0 rounded-full"
                          style={{
                            left: `${skill.required}%`,
                            height: "8px",
                            marginTop: "4px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/4 text-sm text-gray-600">{skill.recommendation}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let color = ""

  switch (status) {
    case "Proficient":
      color = "bg-green-100 text-green-800"
      break
    case "Moderate Gap":
      color = "bg-yellow-100 text-yellow-800"
      break
    case "Critical Gap":
      color = "bg-red-100 text-red-800"
      break
    default:
      color = "bg-gray-100 text-gray-800"
  }

  return (
    <Badge variant="outline" className={`${color} border-0`}>
      {status}
    </Badge>
  )
}

function getProgressColor(current: number, required: number) {
  if (current >= required) {
    return "bg-green-500"
  } else if (current >= required * 0.7) {
    return "bg-yellow-500"
  } else {
    return "bg-red-500"
  }
}

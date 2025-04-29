import { Suspense } from "react"
import DashboardContent from "@/components/dashboard-content"
import DashboardSkeleton from "@/components/dashboard-skeleton"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

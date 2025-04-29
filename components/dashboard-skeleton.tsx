import { Skeleton } from "@/components/ui/skeleton"
import DashboardHeader from "@/components/dashboard-header"

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <aside className="hidden md:block w-64 bg-white border-r p-4">
          <nav className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-8 w-48 mb-6" />

            <Skeleton className="h-[300px] w-full mb-8" />

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Skeleton className="h-[350px] w-full" />
              <Skeleton className="h-[350px] w-full" />
            </div>

            <Skeleton className="h-[500px] w-full" />
          </div>
        </main>
      </div>
    </div>
  )
}

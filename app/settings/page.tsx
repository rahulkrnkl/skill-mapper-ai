"use client"

import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Suspense } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSkeleton from "@/components/dashboard-skeleton"

export default function SettingsPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/")
    }
  }, [status])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <aside className="hidden md:block w-64 bg-white border-r p-4">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/learning-plans"
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>My Learning Plans</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Settings</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md"
              as="button"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </Link>
          </nav>
        </aside>

        <Suspense fallback={<DashboardSkeleton />}>
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="mr-2">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Dashboard
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold">Settings</h1>
              </div>

              <Tabs defaultValue="account">
                <TabsList className="mb-6">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your account details and profile information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="current-role">Current Role</Label>
                          <Input id="current-role" defaultValue="Software Engineer" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" defaultValue="Acme Inc." />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button>Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how and when you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Receive daily learning reminders via email</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Learning Plan Updates</h3>
                            <p className="text-sm text-gray-500">Get notified when your learning plan is updated</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">New Resources</h3>
                            <p className="text-sm text-gray-500">Receive notifications about new learning resources</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Marketing Communications</h3>
                            <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button>Save Preferences</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Manage your data and privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Data Collection</h3>
                            <p className="text-sm text-gray-500">
                              Allow us to collect usage data to improve your experience
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Profile Visibility</h3>
                            <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Third-Party Sharing</h3>
                            <p className="text-sm text-gray-500">
                              Allow sharing of anonymized data with third-party services
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button>Save Privacy Settings</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Information</CardTitle>
                      <CardDescription>Manage your subscription and payment methods</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Premium Plan</h3>
                            <p className="text-sm text-gray-500">$9.99/month, billed monthly</p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">Next billing date: May 15, 2025</div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Payment Method</h3>
                        <div className="flex items-center space-x-3 p-3 border rounded-md">
                          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#1A1F71" />
                            <path d="M9.5 15h5L16 9H11L9.5 15z" fill="#FFFFFF" />
                          </svg>
                          <div>
                            <div className="font-medium">Visa ending in 4242</div>
                            <div className="text-sm text-gray-500">Expires 12/2026</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex space-x-4">
                        <Button>Update Payment Method</Button>
                        <Button variant="outline">View Billing History</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </Suspense>
      </div>
    </div>
  )
}

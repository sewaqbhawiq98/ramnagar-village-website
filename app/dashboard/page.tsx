"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  AlertCircle,
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  School,
  ShoppingBag,
  X,
} from "lucide-react"
import { useAuthContext } from "@/components/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"

interface DashboardSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  path: string
}

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, userProfile, logout } = useAuthContext()
  const [userName, setUserName] = useState("User")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)

    if (userProfile) {
      setUserName(userProfile.displayName || user?.displayName || "User")
    }
  }, [user, userProfile])

  const handleLogout = async () => {
    const { error } = await logout()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
      router.push("/")
    }
  }

  const sections: DashboardSection[] = [
    {
      id: "emergency",
      title: "Emergency Utilities",
      description: "Access emergency contacts and services",
      icon: <AlertCircle className="h-8 w-8" />,
      color: "bg-red-100 text-red-600",
      path: "/dashboard/emergency",
    },
    {
      id: "notices",
      title: "Notice & Events",
      description: "Village announcements and upcoming events",
      icon: <Bell className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600",
      path: "/dashboard/notices",
    },
    {
      id: "support",
      title: "Public Support System",
      description: "Submit complaints and track their status",
      icon: <HelpCircle className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600",
      path: "/dashboard/support",
    },
    {
      id: "education",
      title: "Education & Youth",
      description: "Resources for students and educational information",
      icon: <School className="h-8 w-8" />,
      color: "bg-green-100 text-green-600",
      path: "/dashboard/education",
    },
    {
      id: "government",
      title: "Government Services",
      description: "Information about government schemes and services",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-yellow-100 text-yellow-600",
      path: "/dashboard/government",
    },
    {
      id: "farmers",
      title: "Farmers & Market",
      description: "Agricultural information and market rates",
      icon: <ShoppingBag className="h-8 w-8" />,
      color: "bg-lime-100 text-lime-600",
      path: "/dashboard/farmers",
    },
  ]

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Ramnagar</h1>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/dashboard")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push(section.path)}
              >
                {React.cloneElement(section.icon as React.ReactElement, { className: "mr-2 h-4 w-4" })}
                {section.title}
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <button className="md:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {userName}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push(section.path)
                    setIsMenuOpen(false)
                  }}
                >
                  {React.cloneElement(section.icon as React.ReactElement, { className: "mr-2 h-4 w-4" })}
                  {section.title}
                </Button>
              ))}
            </div>
          )}

          {/* Dashboard Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">RamNagar(Khalil) Portal Dashboard</h2>
              <p className="text-gray-600">Access all Khalil services from one place</p>
            </div>

            {/* Weather and Time Widget */}
            <div className="mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M12 2v2"></path>
                          <path d="M12 20v2"></path>
                          <path d="m4.93 4.93 1.41 1.41"></path>
                          <path d="m17.66 17.66 1.41 1.41"></path>
                          <path d="M2 12h2"></path>
                          <path d="M20 12h2"></path>
                          <path d="m6.34 17.66-1.41 1.41"></path>
                          <path d="m19.07 4.93-1.41 1.41"></path>
                          <circle cx="12" cy="12" r="5"></circle>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Today's Weather</p>
                        <p className="text-xl font-semibold">32°C Sunny</p>
                        <p className="text-sm text-gray-600">Ramnagar (Khalil)</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-500">Current Time</p>
                      <p className="text-xl font-semibold" id="current-time">
                        {new Date().toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Card
                  key={section.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(section.path)}
                >
                  <CardHeader className="pb-2">
                    <div className={`p-3 rounded-full w-fit ${section.color}`}>{section.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-1">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Updates */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Updates</h3>
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200">
                    <li className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Bell className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Independence Day Celebration</p>
                          <p className="text-sm text-gray-600">Join us on August 15th at the school ground</p>
                          <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                        </div>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Health Camp Announcement</p>
                          <p className="text-sm text-gray-600">
                            Free health checkup on July 25th at the community center
                          </p>
                          <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                        </div>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                          <FileText className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">New Pension Scheme</p>
                          <p className="text-sm text-gray-600">Government announces new pension scheme for farmers</p>
                          <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

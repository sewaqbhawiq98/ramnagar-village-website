"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Bell,
  Calendar,
  Download,
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

interface Notice {
  id: number
  title: string
  date: string
  content: string
  category: string
  pdfUrl?: string
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  category: string
  image?: string
}

export default function NoticesPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [router])

  const notices: Notice[] = [
    {
      id: 1,
      title: "Water Supply Interruption",
      date: "2025-07-20",
      content:
        "Due to maintenance work, water supply will be interrupted on July 22nd from 10:00 AM to 2:00 PM. Please store water accordingly. We apologize for any inconvenience caused.",
      category: "Utility",
      pdfUrl: "#",
    },
    {
      id: 2,
      title: "School Exam Results",
      date: "2025-07-15",
      content:
        "The results for the annual school examinations have been published. Parents can collect the report cards from the school office between 9:00 AM and 1:00 PM on weekdays.",
      category: "Education",
      pdfUrl: "#",
    },
    {
      id: 3,
      title: "COVID-19 Vaccination Drive",
      date: "2025-07-10",
      content:
        "A COVID-19 vaccination drive will be conducted at the village community hall on July 25th. All residents above 18 years are eligible. Please bring your ID proof and registration number.",
      category: "Health",
      pdfUrl: "#",
    },
    {
      id: 4,
      title: "Gram Sabha Meeting",
      date: "2025-07-05",
      content:
        "The next Gram Sabha meeting will be held on July 30th at 11:00 AM at the Panchayat Bhawan. All villagers are requested to attend and participate in the discussion of village development plans.",
      category: "Administrative",
    },
  ]

  const events: Event[] = [
    {
      id: 1,
      title: "Independence Day Celebration",
      date: "2025-08-15",
      time: "8:00 AM - 12:00 PM",
      location: "School Ground",
      description:
        "Join us for flag hoisting, cultural performances, and community feast to celebrate India's Independence Day.",
      category: "Cultural",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Health Camp",
      date: "2025-07-25",
      time: "9:00 AM - 4:00 PM",
      location: "Community Center",
      description:
        "Free health checkup camp organized in collaboration with District Hospital. Services include general checkup, eye examination, and basic diagnostics.",
      category: "Health",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Farmers Training Workshop",
      date: "2025-08-05",
      time: "10:00 AM - 3:00 PM",
      location: "Agricultural Extension Center",
      description:
        "Workshop on modern farming techniques, organic farming, and government schemes for farmers. Agricultural experts will provide guidance.",
      category: "Agriculture",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Village Cleanliness Drive",
      date: "2025-07-28",
      time: "7:00 AM - 11:00 AM",
      location: "Village Center",
      description:
        "Community initiative to clean the village streets, public spaces, and water bodies. All residents are encouraged to participate.",
      category: "Community",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const documents = [
    {
      id: 1,
      title: "Village Development Plan 2025",
      category: "Administrative",
      date: "2025-06-15",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      title: "School Annual Report",
      category: "Education",
      date: "2025-06-10",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      title: "Water Conservation Guidelines",
      category: "Environment",
      date: "2025-05-22",
      fileSize: "1.2 MB",
    },
    {
      id: 4,
      title: "Pension Scheme Application Form",
      category: "Welfare",
      date: "2025-05-15",
      fileSize: "0.8 MB",
    },
  ]

  const toggleNoticeExpansion = (id: number) => {
    if (expandedNotice === id) {
      setExpandedNotice(null)
    } else {
      setExpandedNotice(id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-gray-800 ml-4">Notice & Events</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search notices, events, or documents..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="notices">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="notices">
                  <Bell className="h-4 w-4 mr-2" />
                  Notices
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>

              {/* Notices Tab */}
              <TabsContent value="notices">
                <div className="space-y-4">
                  {filteredNotices.length > 0 ? (
                    filteredNotices.map((notice) => (
                      <Card key={notice.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{notice.title}</CardTitle>
                              <CardDescription>{formatDate(notice.date)}</CardDescription>
                            </div>
                            <Badge variant="outline">{notice.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className={`text-gray-700 ${expandedNotice === notice.id ? "" : "line-clamp-2"}`}>
                            {notice.content}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <Button variant="ghost" size="sm" onClick={() => toggleNoticeExpansion(notice.id)}>
                            {expandedNotice === notice.id ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Read More
                              </>
                            )}
                          </Button>
                          {notice.pdfUrl && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download PDF
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">No notices found</h3>
                      <p className="text-gray-500">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="aspect-video bg-gray-200 relative">
                          <img
                            src={event.image || "/placeholder.svg?height=200&width=300"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2" variant="secondary">
                            {event.category}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(event.date)} | {event.time}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2 text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                          <p className="text-gray-700 line-clamp-3">{event.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Add to Calendar
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 col-span-2">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">No events found</h3>
                      <p className="text-gray-500">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Important Documents</CardTitle>
                    <CardDescription>Download official documents, forms, and reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                          <div key={doc.id} className="py-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-gray-900">{doc.title}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Badge variant="outline" className="mr-2">
                                  {doc.category}
                                </Badge>
                                <span>{doc.date}</span>
                                <span className="mx-2">•</span>
                                <span>{doc.fileSize}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
                          <p className="text-gray-500">Try adjusting your search terms</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View All Documents
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

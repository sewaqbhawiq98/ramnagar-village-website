"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  School,
  GraduationCap,
  BookOpen,
  Users,
  Computer,
  Award,
  MapPin,
  Phone,
  Clock,
  Download,
  ExternalLink,
  Search,
  Calendar,
  User,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ProtectedRoute } from "@/components/protected-route"

interface SchoolInfo {
  id: number
  name: string
  type: "Government" | "Private"
  address: string
  contact: string
  facilities: string[]
  classes: string
  strength: number
}

interface ScholarshipProgram {
  id: number
  name: string
  eligibility: string
  amount: string
  deadline: string
  status: "Active" | "Closed"
}

interface TrainingProgram {
  id: number
  name: string
  duration: string
  description: string
  nextBatch: string
  seats: number
  fee: string
}

interface Library {
  id: number
  name: string
  address: string
  timings: string
  facilities: string[]
  contact: string
}

export default function EducationPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
  }, [router])

  const schools: SchoolInfo[] = [
    {
      id: 1,
      name: "Ramnagar Primary School",
      type: "Government",
      address: "Village Center, Ramnagar",
      contact: "9876543210",
      facilities: ["Library", "Computer Lab", "Playground", "Mid-day Meal"],
      classes: "1st to 5th",
      strength: 150,
    },
    {
      id: 2,
      name: "Government High School Ramnagar",
      type: "Government",
      address: "Main Road, Ramnagar",
      contact: "9876543211",
      facilities: ["Science Lab", "Library", "Sports Ground", "Computer Lab"],
      classes: "6th to 12th",
      strength: 300,
    },
    {
      id: 3,
      name: "Bright Future Academy",
      type: "Private",
      address: "Station Road, Ramnagar",
      contact: "9876543212",
      facilities: ["Smart Classes", "Library", "Transport", "Hostel"],
      classes: "Nursery to 12th",
      strength: 200,
    },
  ]

  const scholarships: ScholarshipProgram[] = [
    {
      id: 1,
      name: "Merit Scholarship for SC/ST Students",
      eligibility: "Class 10th passed with 60% marks",
      amount: "₹5,000 per year",
      deadline: "2025-08-31",
      status: "Active",
    },
    {
      id: 2,
      name: "Girl Child Education Scholarship",
      eligibility: "Girls studying in Class 6th to 12th",
      amount: "₹3,000 per year",
      deadline: "2025-09-15",
      status: "Active",
    },
    {
      id: 3,
      name: "PM Scholarship for Higher Education",
      eligibility: "Class 12th passed with 75% marks",
      amount: "₹25,000 per year",
      deadline: "2025-07-30",
      status: "Closed",
    },
  ]

  const trainingPrograms: TrainingProgram[] = [
    {
      id: 1,
      name: "Basic Computer Skills",
      duration: "3 months",
      description: "Learn MS Office, Internet basics, and digital literacy",
      nextBatch: "2025-08-01",
      seats: 25,
      fee: "Free",
    },
    {
      id: 2,
      name: "Mobile Repair Training",
      duration: "6 months",
      description: "Hands-on training for mobile phone repair and maintenance",
      nextBatch: "2025-08-15",
      seats: 15,
      fee: "₹2,000",
    },
    {
      id: 3,
      name: "Tailoring & Fashion Design",
      duration: "4 months",
      description: "Learn tailoring, embroidery, and basic fashion design",
      nextBatch: "2025-07-25",
      seats: 20,
      fee: "₹1,500",
    },
  ]

  const libraries: Library[] = [
    {
      id: 1,
      name: "Village Public Library",
      address: "Community Center, Ramnagar",
      timings: "9:00 AM - 6:00 PM",
      facilities: ["Reading Room", "Computer Access", "Study Hall", "Children's Section"],
      contact: "9876543213",
    },
    {
      id: 2,
      name: "Digital Learning Center",
      address: "School Campus, Ramnagar",
      timings: "10:00 AM - 5:00 PM",
      facilities: ["Internet Access", "Online Courses", "Printing", "Video Tutorials"],
      contact: "9876543214",
    },
  ]

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully. We'll contact you soon.",
      })

      setApplicationForm({
        name: "",
        email: "",
        phone: "",
        program: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isClient) {
    return null
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
            <h1 className="text-xl font-semibold text-gray-800 ml-4">Education & Youth</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-12 w-12 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold">Education & Youth Development</h2>
                  <p className="text-blue-100">
                    Empowering the next generation through quality education and skill development
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-blue-100">Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">650+</div>
                  <div className="text-sm text-blue-100">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-blue-100">Training Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-blue-100">Libraries</div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search schools, programs, or scholarships..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="schools" className="space-y-6">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                <TabsTrigger value="schools">
                  <School className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Schools</span>
                </TabsTrigger>
                <TabsTrigger value="scholarships">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Scholarships</span>
                </TabsTrigger>
                <TabsTrigger value="training">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Training</span>
                </TabsTrigger>
                <TabsTrigger value="computer">
                  <Computer className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Computer</span>
                </TabsTrigger>
                <TabsTrigger value="libraries">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Libraries</span>
                </TabsTrigger>
                <TabsTrigger value="apply">
                  <User className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Apply</span>
                </TabsTrigger>
              </TabsList>

              {/* Schools Tab */}
              <TabsContent value="schools">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {schools.map((school) => (
                    <Card key={school.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{school.name}</CardTitle>
                            <Badge variant={school.type === "Government" ? "default" : "secondary"}>
                              {school.type}
                            </Badge>
                          </div>
                          <School className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {school.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1" />
                          {school.contact}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Classes: {school.classes}</p>
                          <p className="text-sm text-gray-600">Students: {school.strength}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Facilities:</p>
                          <div className="flex flex-wrap gap-1">
                            {school.facilities.map((facility, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Scholarships Tab */}
              <TabsContent value="scholarships">
                <div className="space-y-4">
                  {scholarships.map((scholarship) => (
                    <Card key={scholarship.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                            <CardDescription>{scholarship.eligibility}</CardDescription>
                          </div>
                          <Badge variant={scholarship.status === "Active" ? "default" : "secondary"}>
                            {scholarship.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Amount</p>
                            <p className="text-lg font-bold text-green-600">{scholarship.amount}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Deadline</p>
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(scholarship.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-end">
                            <Button
                              className="w-full"
                              disabled={scholarship.status === "Closed"}
                              onClick={() => {
                                setApplicationForm({ ...applicationForm, program: scholarship.name })
                                // Switch to apply tab
                                const applyTab = document.querySelector('[value="apply"]') as HTMLElement
                                applyTab?.click()
                              }}
                            >
                              <Award className="h-4 w-4 mr-1" />
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Training Tab */}
              <TabsContent value="training">
                <div className="grid md:grid-cols-2 gap-6">
                  {trainingPrograms.map((program) => (
                    <Card key={program.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-purple-600" />
                          {program.name}
                        </CardTitle>
                        <CardDescription>{program.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Duration</p>
                            <p>{program.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Fee</p>
                            <p className="text-green-600 font-bold">{program.fee}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Next Batch</p>
                            <p>{new Date(program.nextBatch).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Available Seats</p>
                            <p>{program.seats}</p>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => {
                            setApplicationForm({ ...applicationForm, program: program.name })
                            // Switch to apply tab
                            const applyTab = document.querySelector('[value="apply"]') as HTMLElement
                            applyTab?.click()
                          }}
                        >
                          Join Training
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Computer Learning Tab */}
              <TabsContent value="computer">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Computer className="h-6 w-6 mr-2 text-blue-600" />
                        Digital Learning Center
                      </CardTitle>
                      <CardDescription>Modern computer lab with high-speed internet</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Computers</p>
                          <p>20 Systems</p>
                        </div>
                        <div>
                          <p className="font-medium">Internet Speed</p>
                          <p>100 Mbps</p>
                        </div>
                        <div>
                          <p className="font-medium">Timings</p>
                          <p>9 AM - 6 PM</p>
                        </div>
                        <div>
                          <p className="font-medium">Fee</p>
                          <p className="text-green-600">₹200/month</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Available Courses:</p>
                        <div className="space-y-1">
                          <Badge variant="outline">Basic Computer</Badge>
                          <Badge variant="outline">MS Office</Badge>
                          <Badge variant="outline">Internet & Email</Badge>
                          <Badge variant="outline">Digital Payments</Badge>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Computer className="h-4 w-4 mr-1" />
                        Enroll Now
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Online Learning Resources</CardTitle>
                      <CardDescription>Free access to educational content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">NCERT Books</p>
                            <p className="text-sm text-gray-600">Class 1-12 Digital Books</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Video Lectures</p>
                            <p className="text-sm text-gray-600">Subject-wise tutorials</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Practice Tests</p>
                            <p className="text-sm text-gray-600">Mock exams & quizzes</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Libraries Tab */}
              <TabsContent value="libraries">
                <div className="grid md:grid-cols-2 gap-6">
                  {libraries.map((library) => (
                    <Card key={library.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                          {library.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {library.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {library.timings}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1" />
                          {library.contact}
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Facilities:</p>
                          <div className="flex flex-wrap gap-1">
                            {library.facilities.map((facility, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full" size="sm">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Visit Library
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Apply Tab */}
              <TabsContent value="apply">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Apply for Scholarship or Training</CardTitle>
                    <CardDescription>
                      Fill out this form to apply for scholarships or join training programs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleApplicationSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={applicationForm.name}
                            onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={applicationForm.email}
                            onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            value={applicationForm.phone}
                            onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="program" className="text-sm font-medium">
                            Program/Scholarship
                          </label>
                          <Input
                            id="program"
                            placeholder="Select program or scholarship"
                            value={applicationForm.program}
                            onChange={(e) => setApplicationForm({ ...applicationForm, program: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Additional Information
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your background and why you're interested..."
                          rows={4}
                          value={applicationForm.message}
                          onChange={(e) => setApplicationForm({ ...applicationForm, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

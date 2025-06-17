"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Home,
  Users,
  Vote,
  Baby,
  Search,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ProtectedRoute } from "@/components/protected-route"

interface GovernmentService {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  status: "Available" | "Limited" | "Offline"
  documents: string[]
  fee: string
  processingTime: string
  onlineAvailable: boolean
}

interface Scheme {
  id: string
  name: string
  description: string
  eligibility: string
  benefits: string
  applicationDeadline: string
  status: "Active" | "Closed"
}

interface Application {
  id: string
  service: string
  applicationId: string
  status: "Submitted" | "Under Review" | "Approved" | "Rejected"
  submittedDate: string
  lastUpdated: string
}

export default function GovernmentServicesPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [trackingId, setTrackingId] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
  }, [router])

  const services: GovernmentService[] = [
    {
      id: "aadhar",
      title: "Aadhar Services",
      description: "Update Aadhar details, download e-Aadhar, and address verification",
      icon: <CreditCard className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600",
      status: "Available",
      documents: ["Address Proof", "Identity Proof", "Photo"],
      fee: "Free",
      processingTime: "15-30 days",
      onlineAvailable: true,
    },
    {
      id: "ration",
      title: "Ration Card",
      description: "Apply for new ration card, add/remove members, and check eligibility",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-green-100 text-green-600",
      status: "Available",
      documents: ["Income Certificate", "Address Proof", "Family Photo"],
      fee: "₹50",
      processingTime: "30-45 days",
      onlineAvailable: true,
    },
    {
      id: "pension",
      title: "Pension Yojana",
      description: "Old age pension, widow pension, and disability pension schemes",
      icon: <Users className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600",
      status: "Available",
      documents: ["Age Proof", "Income Certificate", "Bank Details"],
      fee: "Free",
      processingTime: "45-60 days",
      onlineAvailable: false,
    },
    {
      id: "pmawas",
      title: "PM Awas Yojana",
      description: "Housing scheme for economically weaker sections and low-income groups",
      icon: <Home className="h-8 w-8" />,
      color: "bg-orange-100 text-orange-600",
      status: "Limited",
      documents: ["Income Certificate", "Caste Certificate", "Bank Details"],
      fee: "Free",
      processingTime: "90-120 days",
      onlineAvailable: true,
    },
    {
      id: "certificates",
      title: "Birth/Death Certificates",
      description: "Register births and deaths, obtain certificates and corrections",
      icon: <Baby className="h-8 w-8" />,
      color: "bg-pink-100 text-pink-600",
      status: "Available",
      documents: ["Hospital Certificate", "Identity Proof", "Address Proof"],
      fee: "₹25",
      processingTime: "7-15 days",
      onlineAvailable: true,
    },
    {
      id: "voter",
      title: "Voter ID Services",
      description: "New voter registration, corrections, and duplicate voter ID card",
      icon: <Vote className="h-8 w-8" />,
      color: "bg-red-100 text-red-600",
      status: "Available",
      documents: ["Age Proof", "Address Proof", "Photo"],
      fee: "Free",
      processingTime: "30-45 days",
      onlineAvailable: true,
    },
  ]

  const schemes: Scheme[] = [
    {
      id: "pmkisan",
      name: "PM-KISAN Samman Nidhi",
      description: "Financial assistance of ₹6000 per year to farmer families",
      eligibility: "Small and marginal farmers with cultivable land",
      benefits: "₹2000 every 4 months (₹6000/year)",
      applicationDeadline: "2025-12-31",
      status: "Active",
    },
    {
      id: "ayushman",
      name: "Ayushman Bharat",
      description: "Health insurance coverage up to ₹5 lakh per family per year",
      eligibility: "Families listed in SECC-2011 database",
      benefits: "₹5 lakh health insurance coverage",
      applicationDeadline: "2025-12-31",
      status: "Active",
    },
    {
      id: "ujjwala",
      name: "Pradhan Mantri Ujjwala Yojana",
      description: "Free LPG connections to women from BPL households",
      eligibility: "BPL families, priority to women applicants",
      benefits: "Free LPG connection + ₹1600 support",
      applicationDeadline: "2025-09-30",
      status: "Active",
    },
  ]

  const sampleApplications: Application[] = [
    {
      id: "1",
      service: "Ration Card",
      applicationId: "RC2025001234",
      status: "Under Review",
      submittedDate: "2025-07-15",
      lastUpdated: "2025-07-18",
    },
    {
      id: "2",
      service: "Voter ID",
      applicationId: "VID2025005678",
      status: "Approved",
      submittedDate: "2025-06-20",
      lastUpdated: "2025-07-10",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "Limited":
        return <Badge className="bg-yellow-100 text-yellow-800">Limited</Badge>
      case "Offline":
        return <Badge className="bg-red-100 text-red-800">Offline</Badge>
      case "Submitted":
        return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>
      case "Under Review":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
      case "Approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Under Review":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  const handleApplyService = (serviceId: string) => {
    toast({
      title: "Redirecting to Application",
      description: "You will be redirected to the official government portal.",
    })
    // In a real app, this would redirect to the actual government portal
  }

  const handleTrackApplication = () => {
    if (!trackingId) {
      toast({
        title: "Error",
        description: "Please enter a valid tracking ID",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Application Found",
      description: "Your application status has been updated.",
    })
  }

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <h1 className="text-xl font-semibold text-gray-800 ml-4">Government Services</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center mb-4">
                <FileText className="h-12 w-12 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold">Government Services</h2>
                  <p className="text-blue-100">Access all government services and schemes from one place</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm text-blue-100">Services</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-blue-100">Active Schemes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-100">Online Access</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm text-blue-100">Most Services</div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search government services..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="services" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="schemes">Schemes</TabsTrigger>
                <TabsTrigger value="track">Track</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
              </TabsList>

              {/* Services Tab */}
              <TabsContent value="services">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className={`p-3 rounded-full ${service.color}`}>{service.icon}</div>
                          {getStatusBadge(service.status)}
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Fee</p>
                            <p className="text-green-600 font-bold">{service.fee}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Processing Time</p>
                            <p>{service.processingTime}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Required Documents:</p>
                          <div className="flex flex-wrap gap-1">
                            {service.documents.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={() => handleApplyService(service.id)}
                            disabled={service.status === "Offline"}
                          >
                            {service.onlineAvailable ? (
                              <ExternalLink className="h-4 w-4 mr-1" />
                            ) : (
                              <FileText className="h-4 w-4 mr-1" />
                            )}
                            {service.onlineAvailable ? "Apply Online" : "Apply Offline"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Schemes Tab */}
              <TabsContent value="schemes">
                <div className="space-y-4">
                  {schemes.map((scheme) => (
                    <Card key={scheme.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{scheme.name}</CardTitle>
                            <CardDescription>{scheme.description}</CardDescription>
                          </div>
                          {getStatusBadge(scheme.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Eligibility</p>
                            <p className="text-sm">{scheme.eligibility}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Benefits</p>
                            <p className="text-sm font-bold text-green-600">{scheme.benefits}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Application Deadline</p>
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(scheme.applicationDeadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button disabled={scheme.status === "Closed"}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Apply for Scheme
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Track Applications Tab */}
              <TabsContent value="track">
                <div className="space-y-6">
                  {/* Track by ID */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Track Your Application</CardTitle>
                      <CardDescription>Enter your application ID to check the current status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <Input
                          placeholder="Enter Application ID (e.g., RC2025001234)"
                          value={trackingId}
                          onChange={(e) => setTrackingId(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleTrackApplication}>
                          <Search className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Applications */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Recent Applications</CardTitle>
                      <CardDescription>Track the status of your submitted applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sampleApplications.map((application) => (
                          <div key={application.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{application.service}</h3>
                                <p className="text-sm text-gray-600">ID: {application.applicationId}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(application.status)}
                                {getStatusBadge(application.status)}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <p>Submitted: {new Date(application.submittedDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p>Last Updated: {new Date(application.lastUpdated).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Help Tab */}
              <TabsContent value="help">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Get help with government services</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-blue-600" />
                        <div>
                          <p className="font-medium">Helpline</p>
                          <p className="text-sm text-gray-600">1800-XXX-XXXX (Toll Free)</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">Block Office</p>
                          <p className="text-sm text-gray-600">Main Road, Ramnagar</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-orange-600" />
                        <div>
                          <p className="font-medium">Office Hours</p>
                          <p className="text-sm text-gray-600">Mon-Fri: 10 AM - 5 PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-medium text-sm">How long does it take to process applications?</p>
                        <p className="text-sm text-gray-600">
                          Processing time varies by service, typically 15-60 days.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Can I track my application online?</p>
                        <p className="text-sm text-gray-600">Yes, use the Track tab with your application ID.</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">What documents are required?</p>
                        <p className="text-sm text-gray-600">Each service has specific document requirements listed.</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Are there any fees?</p>
                        <p className="text-sm text-gray-600">
                          Most services are free, some have nominal processing fees.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

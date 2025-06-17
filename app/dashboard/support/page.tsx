"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, Clock, FileText, HelpCircle, MessageSquare, Send, User, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ProtectedRoute } from "@/components/protected-route"

interface Complaint {
  id: number
  name: string
  phone: string
  type: string
  message: string
  status: "Received" | "In Progress" | "Resolved" | "Rejected"
  date: string
}

export default function SupportPage() {
  const [isClient, setIsClient] = useState(false)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [complaintForm, setComplaintForm] = useState({
    name: "",
    phone: "",
    type: "",
    message: "",
  })
  const [anonymousSuggestion, setAnonymousSuggestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
    // const isLoggedIn = localStorage.getItem("isLoggedIn")

    // if (!isLoggedIn) {
    //   router.push("/")
    //   return
    // }

    // Load sample complaints
    setComplaints([
      {
        id: 1,
        name: "Bhavik Sevak",
        phone: "9321497459",
        type: "Water",
        message: "Water supply in the eastern part of the village has been irregular for the past week.",
        status: "In Progress",
        date: "2025-07-15",
      },
      {
        id: 2,
        name: "Vicky",
        phone: "9876543211",
        type: "Electricity",
        message: "Frequent power cuts in the evening hours. Please look into this matter.",
        status: "Received",
        date: "2025-07-18",
      },
      {
        id: 3,
        name: "Ramesh",
        phone: "9876543212",
        type: "Road",
        message: "The road near the temple has large potholes which need immediate repair.",
        status: "Resolved",
        date: "2025-07-10",
      },
    ])
  }, [router])

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validate form
      if (!complaintForm.name || !complaintForm.phone || !complaintForm.type || !complaintForm.message) {
        throw new Error("Please fill all required fields")
      }

      // Create new complaint
      const newComplaint: Complaint = {
        id: complaints.length + 1,
        name: complaintForm.name,
        phone: complaintForm.phone,
        type: complaintForm.type,
        message: complaintForm.message,
        status: "Received",
        date: new Date().toISOString().split("T")[0],
      }

      // Add to complaints list
      setComplaints([newComplaint, ...complaints])

      // Reset form
      setComplaintForm({
        name: "",
        phone: "",
        type: "",
        message: "",
      })

      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit complaint",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!anonymousSuggestion) {
        throw new Error("Please enter your suggestion")
      }

      // Reset form
      setAnonymousSuggestion("")

      toast({
        title: "Suggestion Submitted",
        description: "Your anonymous suggestion has been successfully submitted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit suggestion",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Received":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Received
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            In Progress
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Resolved
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

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
            <h1 className="text-xl font-semibold text-gray-800 ml-4">Public Support System</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="complaint">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="complaint">
                  <FileText className="h-4 w-4 mr-2" />
                  File Complaint
                </TabsTrigger>
                <TabsTrigger value="history">
                  <Clock className="h-4 w-4 mr-2" />
                  Complaint History
                </TabsTrigger>
                <TabsTrigger value="suggestion">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Suggestion Box
                </TabsTrigger>
              </TabsList>

              {/* Complaint Form Tab */}
              <TabsContent value="complaint">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Complaint</CardTitle>
                    <CardDescription>
                      Fill out the form below to register your complaint with the village administration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleComplaintSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={complaintForm.name}
                            onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            value={complaintForm.phone}
                            onChange={(e) => setComplaintForm({ ...complaintForm, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium">
                          Complaint Type
                        </label>
                        <Select
                          value={complaintForm.type}
                          onValueChange={(value) => setComplaintForm({ ...complaintForm, type: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select complaint type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Water">Water Supply</SelectItem>
                            <SelectItem value="Electricity">Electricity</SelectItem>
                            <SelectItem value="Road">Road & Infrastructure</SelectItem>
                            <SelectItem value="Sanitation">Sanitation & Cleanliness</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Complaint Details
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Describe your complaint in detail"
                          rows={4}
                          value={complaintForm.message}
                          onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Complaint
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Complaint History Tab */}
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Complaint History</CardTitle>
                    <CardDescription>Track the status of your previously submitted complaints</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {complaints.length > 0 ? (
                      <div className="space-y-4">
                        {complaints.map((complaint) => (
                          <Card key={complaint.id}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg">{complaint.type} Issue</CardTitle>
                                  <CardDescription>
                                    {formatDate(complaint.date)} • Complaint #{complaint.id}
                                  </CardDescription>
                                </div>
                                {getStatusBadge(complaint.status)}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center text-sm text-gray-600 mb-2">
                                <User className="h-4 w-4 mr-1" />
                                {complaint.name} • {complaint.phone}
                              </div>
                              <p className="text-gray-700">{complaint.message}</p>
                            </CardContent>
                            <CardFooter className="border-t pt-4 text-sm text-gray-600">
                              {complaint.status === "Resolved" ? (
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Resolved on {formatDate(complaint.date)}
                                </div>
                              ) : complaint.status === "Rejected" ? (
                                <div className="flex items-center text-red-600">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Rejected on {formatDate(complaint.date)}
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Last updated on {formatDate(complaint.date)}
                                </div>
                              )}
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No complaints found</h3>
                        <p className="text-gray-500">You haven't submitted any complaints yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Suggestion Box Tab */}
              <TabsContent value="suggestion">
                <Card>
                  <CardHeader>
                    <CardTitle>Anonymous Suggestion Box</CardTitle>
                    <CardDescription>
                      Share your ideas and suggestions for village improvement anonymously
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <HelpCircle className="h-5 w-5 text-yellow-600 mr-2" />
                          <div>
                            <p className="text-sm text-yellow-700">
                              Your suggestion will be submitted anonymously. No personal information will be collected.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="suggestion" className="text-sm font-medium">
                          Your Suggestion
                        </label>
                        <Textarea
                          id="suggestion"
                          placeholder="Share your ideas for village improvement..."
                          rows={6}
                          value={anonymousSuggestion}
                          onChange={(e) => setAnonymousSuggestion(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name (Optional)</label>
                        <Input placeholder="Enter your name (optional)" />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Suggestion
                          </>
                        )}
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

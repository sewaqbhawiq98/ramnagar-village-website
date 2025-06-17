"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowLeft, Phone, MapPin, Ambulance, Shield, Flame } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  address: string
  icon: React.ReactNode
  color: string
}

export default function EmergencyPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [router])

  const emergencyContacts: EmergencyContact[] = [
    {
      id: "hospital",
      name: "District Hospital",
      phone: "108",
      address: "Main Road, Ramnagar",
      icon: <Ambulance className="h-8 w-8" />,
      color: "bg-red-100 text-red-600",
    },
    {
      id: "police",
      name: "Police Station",
      phone: "100",
      address: "Station Road, Ramnagar",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "fire",
      name: "Fire Station",
      phone: "101",
      address: "Central Area, Ramnagar",
      icon: <Flame className="h-8 w-8" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "panchayat",
      name: "Gram Panchayat",
      phone: "9876543210",
      address: "Village Center, Ramnagar",
      icon: <AlertCircle className="h-8 w-8" />,
      color: "bg-green-100 text-green-600",
    },
  ]

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`
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
            <h1 className="text-xl font-semibold text-gray-800 ml-4">Emergency Utilities</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Emergency Alert Banner */}
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-600">Emergency Services</h3>
                  <p className="text-red-700">
                    In case of emergency, use the quick-call buttons below to contact essential services immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contacts Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {emergencyContacts.map((contact) => (
                  <Card key={contact.id} className="overflow-hidden">
                    <CardHeader className={`${contact.color} py-3`}>
                      <div className="flex items-center">
                        {contact.icon}
                        <CardTitle className="ml-2">{contact.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">{contact.phone}</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">{contact.address}</span>
                      </div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleCall(contact.phone)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Village Map */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Village Map</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-600">Village Map Placeholder</p>
                      <p className="text-sm text-gray-500">
                        (In a real implementation, this would be an embedded Google Map)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Guidelines */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Guidelines</h2>
              <Tabs defaultValue="medical">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                  <TabsTrigger value="fire">Fire</TabsTrigger>
                  <TabsTrigger value="natural">Natural Disasters</TabsTrigger>
                </TabsList>
                <TabsContent value="medical" className="p-4 bg-white rounded-md shadow">
                  <h3 className="text-lg font-semibold mb-2">Medical Emergency Guidelines</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Call 108 for ambulance services immediately</li>
                    <li>Provide clear information about the patient's condition</li>
                    <li>Keep the patient calm and in a comfortable position</li>
                    <li>If trained, provide basic first aid until help arrives</li>
                    <li>Have the patient's medical history ready if available</li>
                  </ul>
                </TabsContent>
                <TabsContent value="fire" className="p-4 bg-white rounded-md shadow">
                  <h3 className="text-lg font-semibold mb-2">Fire Emergency Guidelines</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Call 101 to report a fire immediately</li>
                    <li>Evacuate the building or area as quickly as possible</li>
                    <li>Do not use elevators during a fire</li>
                    <li>Cover your nose and mouth with a wet cloth if there's smoke</li>
                    <li>If your clothes catch fire: Stop, Drop, and Roll</li>
                  </ul>
                </TabsContent>
                <TabsContent value="natural" className="p-4 bg-white rounded-md shadow">
                  <h3 className="text-lg font-semibold mb-2">Natural Disaster Guidelines</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Follow evacuation orders from local authorities</li>
                    <li>Have an emergency kit ready with essentials</li>
                    <li>Move to higher ground during floods</li>
                    <li>During an earthquake, drop, cover, and hold on</li>
                    <li>Stay informed through radio or emergency broadcasts</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

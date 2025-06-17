"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, MapPin, Plus, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Event {
  id: number
  date: string
  title: string
  description: string
  location: string
  createdAt: string
}

interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  message: string
  timestamp: string
}

export default function AdminPanel() {
  const [events, setEvents] = useState<Event[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadEvents()
    loadMessages()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      setEvents(data.events)
    } catch (error) {
      console.error("Error loading events:", error)
    }
  }

  const loadMessages = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      })

      if (response.ok) {
        toast({
          title: "Event Created!",
          description: "New event has been added successfully.",
        })
        setNewEvent({ title: "", date: "", description: "", location: "" })
        loadEvents()
      } else {
        throw new Error("Failed to create event")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ramnagar Admin Panel</h1>
          <p className="text-gray-600">Manage village events and view contact messages</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Events Management */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Event
                </CardTitle>
                <CardDescription>Create a new event for the village community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <Input
                      id="event-title"
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      required
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date
                    </label>
                    <Input
                      id="event-date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      id="event-location"
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      required
                      placeholder="Enter event location"
                    />
                  </div>

                  <div>
                    <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      id="event-description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                      placeholder="Enter event description"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Current Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Current Events ({events.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <Badge variant="outline">{formatDate(event.date)}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && <p className="text-gray-500 text-center py-4">No events found</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Messages */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Messages ({messages.length})
                </CardTitle>
                <CardDescription>Messages received from village website visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {messages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{message.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {message.email}
                            </div>
                            {message.phone && (
                              <div className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {message.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {formatDateTime(message.timestamp)}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{message.message}</p>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-gray-500 text-center py-4">No messages found</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

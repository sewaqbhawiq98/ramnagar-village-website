import { type NextRequest, NextResponse } from "next/server"

interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  message: string
  timestamp: string
  status: "new" | "read" | "replied"
}

// In-memory storage for contact messages
const contactMessages: ContactMessage[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create new contact message
    const newMessage: ContactMessage = {
      id: contactMessages.length + 1,
      name,
      email,
      phone: phone || "",
      message,
      timestamp: new Date().toISOString(),
      status: "new",
    }

    // Store the message
    contactMessages.push(newMessage)

    // Log the message for demonstration
    console.log("New contact message received:", newMessage)

    return NextResponse.json(
      {
        message: "Contact message submitted successfully",
        id: newMessage.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      messages: contactMessages,
      total: contactMessages.length,
    })
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

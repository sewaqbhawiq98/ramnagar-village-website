import { type NextRequest, NextResponse } from "next/server"

interface Event {
  id: number
  date: string
  title: string
  description: string
  location: string
  createdAt: string
}

// In-memory storage (in a real app, use a database)
const events: Event[] = [
  {
    id: 1,
    date: "2025-08-15",
    title: "Independence Day Celebration",
    description: "Join us for flag hoisting, cultural programs, and community feast",
    location: "School Ground",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    date: "2025-10-02",
    title: "Clean Village Drive",
    description: "Community initiative to keep our village clean and green",
    location: "Village Center",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    date: "2025-11-14",
    title: "Children's Day Cultural Program",
    description: "Special performances by village children and youth",
    location: "Community Hall",
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  // Sort events by date
  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return NextResponse.json({
    events: sortedEvents,
    total: events.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.date || !body.description || !body.location) {
      return NextResponse.json({ error: "Title, date, description, and location are required" }, { status: 400 })
    }

    // Create new event
    const newEvent: Event = {
      id: events.length + 1,
      title: body.title,
      date: body.date,
      description: body.description,
      location: body.location,
      createdAt: new Date().toISOString(),
    }

    events.push(newEvent)

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

interface User {
  id: number
  name: string
  email: string
  password: string
  phone: string
  role: string
  createdAt: string
}

// Import the users array from login route
const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@ramnagar.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    phone: "9876543210",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Test User",
    email: "test@gmail.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    phone: "9876543211",
    role: "user",
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone } = body

    console.log("Registration attempt for:", email)

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser: User = {
      id: users.length + 1,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    // Add user to database
    users.push(newUser)

    console.log("User registered successfully:", newUser.email)

    // Return success response (don't include password)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Get all users (for admin purposes)
export async function GET() {
  try {
    const usersWithoutPasswords = users.map(({ password, ...user }) => user)
    return NextResponse.json({
      users: usersWithoutPasswords,
      total: users.length,
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

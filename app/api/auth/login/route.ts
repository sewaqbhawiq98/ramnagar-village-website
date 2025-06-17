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

// In-memory database with sample users
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

// Function to add user (used by register route)
export function addUser(user: User) {
  users.push(user)
}

// Function to get users (used by register route)
export function getUsers() {
  return users
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("Login attempt for:", email)

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    console.log("User found:", user ? "Yes" : "No")

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    console.log("Password valid:", isPasswordValid)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Return success response (don't include password)
    const { password: _, ...userWithoutPassword } = user

    console.log("Login successful for:", userWithoutPassword.email)

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useAuth } from "@/hooks/useAuth"
import type { User } from "firebase/auth"

interface UserProfile {
  uid: string
  email: string
  displayName: string
  phone?: string
  role: "user" | "admin"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>
  signUp: (
    email: string,
    password: string,
    displayName: string,
    phone?: string,
  ) => Promise<{ user: User | null; error: string | null }>
  logout: () => Promise<{ error: string | null }>
  resetPassword: (email: string) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

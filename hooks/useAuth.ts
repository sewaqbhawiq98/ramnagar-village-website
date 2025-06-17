"use client"

import { useEffect, useState, useCallback } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

interface UserProfile {
  uid: string
  email: string
  displayName: string
  phone?: string
  role: "user" | "admin"
  createdAt: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Dynamic import to ensure client-side only
    const setupAuth = async () => {
      try {
        const { auth, db } = await import("@/lib/firebase")

        if (!auth) {
          setLoading(false)
          return
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            setUser(user)

            if (user && db) {
              // Fetch user profile from Firestore
              const userDoc = await getDoc(doc(db, "users", user.uid))
              if (userDoc.exists()) {
                setUserProfile(userDoc.data() as UserProfile)
              }
            } else {
              setUserProfile(null)
            }
          } catch (error) {
            console.error("Error in auth state change:", error)
          } finally {
            setLoading(false)
          }
        })

        return unsubscribe
      } catch (error) {
        console.error("Error setting up auth:", error)
        setLoading(false)
      }
    }

    let unsubscribe: (() => void) | undefined

    setupAuth().then((unsub) => {
      unsubscribe = unsub
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [isClient])

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!isClient) return { user: null, error: "Not available on server" }

      try {
        const { auth } = await import("@/lib/firebase")
        if (!auth) throw new Error("Auth not initialized")

        const result = await signInWithEmailAndPassword(auth, email, password)
        return { user: result.user, error: null }
      } catch (error: any) {
        return { user: null, error: error.message }
      }
    },
    [isClient],
  )

  const signUp = useCallback(
    async (email: string, password: string, displayName: string, phone?: string) => {
      if (!isClient) return { user: null, error: "Not available on server" }

      try {
        const { auth, db } = await import("@/lib/firebase")
        if (!auth || !db) throw new Error("Firebase not initialized")

        const result = await createUserWithEmailAndPassword(auth, email, password)

        // Update the user's display name
        await updateProfile(result.user, { displayName })

        // Create user profile in Firestore
        const userProfile: UserProfile = {
          uid: result.user.uid,
          email: result.user.email!,
          displayName,
          phone,
          role: "user",
          createdAt: new Date().toISOString(),
        }

        await setDoc(doc(db, "users", result.user.uid), userProfile)

        return { user: result.user, error: null }
      } catch (error: any) {
        return { user: null, error: error.message }
      }
    },
    [isClient],
  )

  const logout = useCallback(async () => {
    if (!isClient) return { error: "Not available on server" }

    try {
      const { auth } = await import("@/lib/firebase")
      if (!auth) throw new Error("Auth not initialized")

      await signOut(auth)
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }, [isClient])

  const resetPassword = useCallback(
    async (email: string) => {
      if (!isClient) return { error: "Not available on server" }

      try {
        const { auth } = await import("@/lib/firebase")
        if (!auth) throw new Error("Auth not initialized")

        await sendPasswordResetEmail(auth, email)
        return { error: null }
      } catch (error: any) {
        return { error: error.message }
      }
    },
    [isClient],
  )

  return {
    user,
    userProfile,
    loading: loading || !isClient,
    signIn,
    signUp,
    logout,
    resetPassword,
  }
}

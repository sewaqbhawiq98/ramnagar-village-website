"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  Camera,
  Star,
  Send,
  Menu,
  X,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/auth-provider"

interface Event {
  id: number
  date: string
  title: string
  description: string
  location: string
}

interface Person {
  id: number
  name: string
  title: string
  description: string
  image: string
}

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

interface AuthForm {
  name?: string
  email: string
  password: string
  confirmPassword?: string
  phone?: string
}

export default function RamnagarVillage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { signIn, signUp, resetPassword } = useAuthContext()
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [resetEmail, setResetEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Load initial data
    loadEvents()
    loadPeople()
  }, [])

  const loadEvents = () => {
    const initialEvents: Event[] = [
      {
        id: 1,
        date: "2025-08-15",
        title: "Independence Day Celebration",
        description: "Join us for flag hoisting, cultural programs, and community feast",
        location: "School Ground",
      },
      {
        id: 2,
        date: "2025-10-02",
        title: "Clean Village Drive",
        description: "Community initiative to keep our village clean and green",
        location: "Village Center",
      },
      {
        id: 3,
        date: "2025-11-14",
        title: "Children's Day Cultural Program",
        description: "Special performances by village children and youth",
        location: "Community Hall",
      },
    ]
    setEvents(initialEvents)
  }

  const loadPeople = () => {
    const initialPeople: Person[] = [
      {
        id: 1,
        name: "Mr. Dixit Pujari(Kisan Ka Beta)",
        title: "School Principal",
        description: "Dedicated educator promoting quality education in rural areas for over 15 years",
        image: "/di1.jpg?height=200&width=200",
      },
      {
        id: 2,
        name: "Mr.Ankit Sevak",
        title: "Folk Singer & Artist",
        description: "Renowned for preserving traditional folk music and cultural heritage",
        image: "/As1.jpg?height=200&width=200",
      },
      {
        id: 3,
        name: "Shri.Sachin Sevak",
        title: "Khalil Sarpanch",
        description: "Visionary leader with 10 years of dedicated service to village development",
         image: "/sa2.jpg?height=200&width=200",
      },
       {
        id: 4,
        name: "Dishan Sevak",
        title: "Khalil Dukandar",
        description: "Visionary leader with 10 years of dedicated service to village development",
        image: "/Di.jpg?height=200&width=200",
      },
    ]
    setPeople(initialPeople)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      })

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        })
        setContactForm({ name: "", email: "", phone: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { user, error } = await signIn(loginForm.email.trim(), loginForm.password)

      if (error) {
        toast({
          title: "Login failed",
          description: error,
          variant: "destructive",
        })
      } else if (user) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.displayName || user.email}!`,
        })

        setLoginForm({ email: "", password: "" })
        setIsLoginOpen(false)

        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "Network error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (registerForm.password !== registerForm.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      const { user, error } = await signUp(
        registerForm.email.trim(),
        registerForm.password,
        registerForm.name.trim(),
        registerForm.phone?.trim(),
      )

      if (error) {
        toast({
          title: "Registration failed",
          description: error,
          variant: "destructive",
        })
      } else if (user) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully. Please login.",
        })

        setRegisterForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
        })
        setIsRegisterOpen(false)

        setTimeout(() => {
          setIsLoginOpen(true)
        }, 1000)
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Error",
        description: "Network error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resetEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    const { error } = await resetPassword(resetEmail)

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Password reset email sent",
        description: "Check your email for password reset instructions",
      })
      setResetEmail("")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Ramnagar</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "about", label: "About" },
                { id: "gallery", label: "Gallery" },
                { id: "events", label: "Events" },
                { id: "people", label: "People" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login to Village Portal</DialogTitle>
                      <DialogDescription>Enter your credentials to access village services</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="login-email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="login-password" className="text-sm font-medium">
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                      <p className="text-center text-sm text-gray-600">
                        <button
                          type="button"
                          onClick={() => {
                            setIsLoginOpen(false)
                            // Add forgot password dialog logic here
                          }}
                          className="text-green-600 hover:underline mr-4"
                        >
                          Forgot Password?
                        </button>
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsLoginOpen(false)
                            setIsRegisterOpen(true)
                          }}
                          className="text-green-600 hover:underline"
                        >
                          Register here
                        </button>
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-orange-600">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Register
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Register for RamNagar(Khalil) Portal</DialogTitle>
                      <DialogDescription>Create an account to access all RamNagar(Khalil) services</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="register-name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input
                          id="register-name"
                          placeholder="Enter your full name"
                          value={registerForm.name || ""}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="register-email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="register-phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="register-phone"
                          placeholder="Enter your phone number"
                          value={registerForm.phone || ""}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="register-password" className="text-sm font-medium">
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="register-confirm-password" className="text-sm font-medium">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Input
                            id="register-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={registerForm.confirmPassword || ""}
                            onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                      </Button>
                      <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsRegisterOpen(false)
                            setIsLoginOpen(true)
                          }}
                          className="text-green-600 hover:underline"
                        >
                          Login here
                        </button>
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {[
                { id: "about", label: "About" },
                { id: "gallery", label: "Gallery" },
                { id: "events", label: "Events" },
                { id: "people", label: "People" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-green-600 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex space-x-2 mt-4">
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-orange-600">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Register
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
     <section
  className="relative h-screen flex items-center justify-center bg-cover bg-center text-white"
  style={{ backgroundImage: "url('/im8.avif')" }}
>
  <div className="absolute inset-0 bg-black/10"></div>
  <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
    <h1 className="text-5xl md:text-7xl font-bold mb-6">Welcome to Ramnagar(Khalil)</h1>
    <p className="text-xl md:text-2xl mb-8 opacity-90">A peaceful village where tradition meets progress</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        onClick={() => scrollToSection("about")}
        size="lg"
        className="bg-white text-green-600 hover:bg-gray-100"
      >
              Discover Our Village
            </Button>
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  Access Village Portal
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Ramnagar</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Ramnagar is a peaceful and culturally rich village located in the heart of India. Surrounded by lush
                green fields and natural beauty, Ramnagar is known for its simplicity, hospitality, and strong community
                values.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The village is home to hardworking farmers, traditional artisans, and a vibrant spirit of unity. With
                temples, local fairs, and age-old customs, Ramnagar holds onto its heritage while slowly embracing
                modern developments.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether it's the sound of temple bells in the morning or the sight of golden sunsets over the fields,
                Ramnagar offers a slice of rural life that's both beautiful and inspiring.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">1,500+</h3>
                <p className="text-gray-600">Residents</p>
              </Card>
              <Card className="text-center p-6">
                <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">150+</h3>
                <p className="text-gray-600">Years Old</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Village Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                src: "/sa.jpg?height=300&width=400",
                alt: "Sachin",
                title: "RamNagar Ke Ujaval Neta",
              },
              {
                src: "/mi3.jpg?height=300&width=400",
                alt: "Green farms in Ramnagar",
                title: "Greenry",
              },
              {
                src: "/im4.jpg?height=300&width=400",
                alt: "Local festival celebration",
                title: "Cultural Festivals",
              },
              { src: "/placeholder.svg?height=300&width=400", alt: "Village market", title: "Local Market" },
              { src: "/placeholder.svg?height=300&width=400", alt: "Traditional crafts", title: "Artisan Crafts" },
              { src: "/placeholder.svg?height=300&width=400", alt: "Village sunset", title: "Golden Sunsets" },
            ].map((image, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative group">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-800">{image.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {formatDate(event.date)}
                    </Badge>
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">{event.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* People Section */}
      <section id="people" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Notable People</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {people.map((person) => (
              <Card key={person.id} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <img
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-100"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{person.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{person.title}</p>
                  <p className="text-gray-600 text-sm">{person.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">ramnagarvillage@email.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91 9321497459</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">Ramnagar - Khalil, District Dungarpur, State Rajasthan, India</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-6">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <h3 className="text-xl font-bold">Ramnagar</h3>
              </div>
              <p className="text-gray-400">
                Preserving tradition while embracing progress. A village where community comes first.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { id: "about", label: "About" },
                  { id: "gallery", label: "Gallery" },
                  { id: "events", label: "Events" },
                  { id: "people", label: "People" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>ramnagarvillage@email.com</p>
                <p>+91 9321497459</p>
                <p>Ramnagar Khalil, District Dungarpur (314023)</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ramnagar Website. All rights reserved by Sewaq__Bhawiq.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

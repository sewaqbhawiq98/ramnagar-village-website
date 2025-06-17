"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowLeft,
  Wheat,
  TrendingUp,
  TrendingDown,
  Cloud,
  Sun,
  CloudRain,
  MapPin,
  Phone,
  ShoppingBag,
  AlertTriangle,
  Calendar,
  DollarSign,
  Thermometer,
  Droplets,
  Wind,
  Eye,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ProtectedRoute } from "@/components/protected-route"

interface CropRate {
  id: string
  name: string
  variety: string
  todayPrice: number
  yesterdayPrice: number
  unit: string
  trend: "up" | "down" | "stable"
  market: string
}

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
  forecast: {
    day: string
    temp: number
    condition: string
    icon: React.ReactNode
  }[]
}

interface GovernmentScheme {
  id: string
  name: string
  description: string
  eligibility: string
  benefits: string
  applicationDeadline: string
  status: "Active" | "Closed"
}

interface AgriculturalShop {
  id: string
  name: string
  address: string
  contact: string
  services: string[]
  timings: string
  distance: string
}

export default function FarmersMarketPage() {
  const [isClient, setIsClient] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
  }, [router])

  const cropRates: CropRate[] = [
    {
      id: "wheat",
      name: "Wheat",
      variety: "HD-2967",
      todayPrice: 2150,
      yesterdayPrice: 2100,
      unit: "per quintal",
      trend: "up",
      market: "Ramnagar Mandi",
    },
    {
      id: "rice",
      name: "Rice",
      variety: "Basmati",
      todayPrice: 3200,
      yesterdayPrice: 3250,
      unit: "per quintal",
      trend: "down",
      market: "Ramnagar Mandi",
    },
    {
      id: "sugarcane",
      name: "Sugarcane",
      variety: "Co-238",
      todayPrice: 350,
      yesterdayPrice: 350,
      unit: "per quintal",
      trend: "stable",
      market: "District Mandi",
    },
    {
      id: "cotton",
      name: "Cotton",
      variety: "Bt Cotton",
      todayPrice: 5800,
      yesterdayPrice: 5750,
      unit: "per quintal",
      trend: "up",
      market: "Regional Market",
    },
    {
      id: "maize",
      name: "Maize",
      variety: "Hybrid",
      todayPrice: 1850,
      yesterdayPrice: 1900,
      unit: "per quintal",
      trend: "down",
      market: "Ramnagar Mandi",
    },
    {
      id: "mustard",
      name: "Mustard",
      variety: "Pusa Bold",
      todayPrice: 4200,
      yesterdayPrice: 4150,
      unit: "per quintal",
      trend: "up",
      market: "District Mandi",
    },
  ]

  const weatherData: WeatherData = {
    temperature: 32,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    forecast: [
      { day: "Today", temp: 32, condition: "Partly Cloudy", icon: <Cloud className="h-6 w-6" /> },
      { day: "Tomorrow", temp: 34, condition: "Sunny", icon: <Sun className="h-6 w-6" /> },
      { day: "Day 3", temp: 29, condition: "Rainy", icon: <CloudRain className="h-6 w-6" /> },
      { day: "Day 4", temp: 31, condition: "Cloudy", icon: <Cloud className="h-6 w-6" /> },
      { day: "Day 5", temp: 33, condition: "Sunny", icon: <Sun className="h-6 w-6" /> },
    ],
  }

  const governmentSchemes: GovernmentScheme[] = [
    {
      id: "pmkisan",
      name: "PM-KISAN Samman Nidhi",
      description: "Direct income support to farmer families",
      eligibility: "Small and marginal farmers with cultivable land",
      benefits: "₹6,000 per year in three installments",
      applicationDeadline: "2025-12-31",
      status: "Active",
    },
    {
      id: "cropinsurance",
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme for farmers",
      eligibility: "All farmers growing notified crops",
      benefits: "Insurance coverage for crop losses",
      applicationDeadline: "2025-08-31",
      status: "Active",
    },
    {
      id: "kisancredit",
      name: "Kisan Credit Card",
      description: "Credit facility for agricultural needs",
      eligibility: "Farmers with land ownership documents",
      benefits: "Credit up to ₹3 lakh at subsidized rates",
      applicationDeadline: "2025-12-31",
      status: "Active",
    },
  ]

  const agriculturalShops: AgriculturalShop[] = [
    {
      id: "1",
      name: "Krishi Seva Kendra",
      address: "Main Market, Ramnagar",
      contact: "9876543210",
      services: ["Seeds", "Fertilizers", "Pesticides", "Tools"],
      timings: "8:00 AM - 7:00 PM",
      distance: "0.5 km",
    },
    {
      id: "2",
      name: "Bharat Agro Center",
      address: "Station Road, Ramnagar",
      contact: "9876543211",
      services: ["Organic Fertilizers", "Bio-pesticides", "Equipment Rental"],
      timings: "9:00 AM - 6:00 PM",
      distance: "1.2 km",
    },
    {
      id: "3",
      name: "Modern Farming Solutions",
      address: "Highway Road, Ramnagar",
      contact: "9876543212",
      services: ["Machinery", "Irrigation Equipment", "Solar Pumps"],
      timings: "8:30 AM - 6:30 PM",
      distance: "2.1 km",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const calculatePriceChange = (today: number, yesterday: number) => {
    const change = today - yesterday
    const percentage = ((change / yesterday) * 100).toFixed(1)
    return { change, percentage }
  }

  const filteredCrops = selectedCrop
    ? cropRates.filter((crop) => crop.name.toLowerCase().includes(selectedCrop.toLowerCase()))
    : cropRates

  if (!isClient) {
    return null
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
            <h1 className="text-xl font-semibold text-gray-800 ml-4">Farmers & Market</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center mb-4">
                <Wheat className="h-12 w-12 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold">Farmers & Market Information</h2>
                  <p className="text-green-100">
                    Stay updated with latest market rates, weather, and agricultural schemes
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Market Alert */}
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800">Today's Market Update</AlertTitle>
              <AlertDescription className="text-orange-700">
                Wheat prices increased by ₹50/quintal. Cotton showing upward trend. Check detailed rates below.
              </AlertDescription>
            </Alert>

            {/* Weather Widget */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-yellow-600" />
                  Weather Forecast - Ramnagar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800">{weatherData.temperature}°C</div>
                      <div className="text-gray-600">{weatherData.condition}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <Thermometer className="h-4 w-4 mx-auto mb-1 text-red-500" />
                        <div className="font-medium">Temperature</div>
                        <div>{weatherData.temperature}°C</div>
                      </div>
                      <div className="text-center">
                        <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                        <div className="font-medium">Humidity</div>
                        <div>{weatherData.humidity}%</div>
                      </div>
                      <div className="text-center">
                        <Wind className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                        <div className="font-medium">Wind</div>
                        <div>{weatherData.windSpeed} km/h</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">5-Day Forecast</h4>
                    <div className="space-y-2">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {day.icon}
                            <span className="ml-2 text-sm">{day.day}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">{day.condition}</span>
                            <span className="text-sm font-medium">{day.temp}°C</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="rates" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="rates">Market Rates</TabsTrigger>
                <TabsTrigger value="schemes">Schemes</TabsTrigger>
                <TabsTrigger value="shops">Shops</TabsTrigger>
                <TabsTrigger value="advisory">Advisory</TabsTrigger>
              </TabsList>

              {/* Market Rates Tab */}
              <TabsContent value="rates">
                <div className="space-y-6">
                  {/* Search and Filter */}
                  <div className="flex gap-4">
                    <Input
                      placeholder="Search crops..."
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="max-w-sm"
                    />
                    <Button variant="outline" onClick={() => setSelectedCrop("")}>
                      Clear
                    </Button>
                  </div>

                  {/* Market Rates Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                        Today's Market Rates
                      </CardTitle>
                      <CardDescription>
                        Updated as of {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Crop</th>
                              <th className="text-left py-3 px-4">Variety</th>
                              <th className="text-right py-3 px-4">Today's Price</th>
                              <th className="text-right py-3 px-4">Yesterday</th>
                              <th className="text-center py-3 px-4">Change</th>
                              <th className="text-left py-3 px-4">Market</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCrops.map((crop) => {
                              const { change, percentage } = calculatePriceChange(crop.todayPrice, crop.yesterdayPrice)
                              return (
                                <tr key={crop.id} className="border-b hover:bg-gray-50">
                                  <td className="py-3 px-4 font-medium">{crop.name}</td>
                                  <td className="py-3 px-4 text-gray-600">{crop.variety}</td>
                                  <td className="py-3 px-4 text-right font-bold">
                                    ₹{crop.todayPrice.toLocaleString()}
                                    <div className="text-xs text-gray-500">{crop.unit}</div>
                                  </td>
                                  <td className="py-3 px-4 text-right text-gray-600">
                                    ₹{crop.yesterdayPrice.toLocaleString()}
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <div className={`flex items-center justify-center ${getTrendColor(crop.trend)}`}>
                                      {getTrendIcon(crop.trend)}
                                      <span className="ml-1 text-sm font-medium">
                                        {change > 0 ? "+" : ""}₹{Math.abs(change)}
                                      </span>
                                    </div>
                                    <div className={`text-xs ${getTrendColor(crop.trend)}`}>
                                      ({change > 0 ? "+" : ""}
                                      {percentage}%)
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-sm text-gray-600">{crop.market}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Price Alerts */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Price Alerts</CardTitle>
                      <CardDescription>Set up alerts for your crops when prices reach target levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <Input placeholder="Select crop" className="flex-1" />
                        <Input placeholder="Target price" className="flex-1" />
                        <Button>
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Set Alert
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Government Schemes Tab */}
              <TabsContent value="schemes">
                <div className="space-y-4">
                  {governmentSchemes.map((scheme) => (
                    <Card key={scheme.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{scheme.name}</CardTitle>
                            <CardDescription>{scheme.description}</CardDescription>
                          </div>
                          <Badge variant={scheme.status === "Active" ? "default" : "secondary"}>{scheme.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Eligibility</p>
                            <p className="text-sm">{scheme.eligibility}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Benefits</p>
                            <p className="text-sm font-bold text-green-600">{scheme.benefits}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Application Deadline</p>
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(scheme.applicationDeadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button disabled={scheme.status === "Closed"}>Apply Now</Button>
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Agricultural Shops Tab */}
              <TabsContent value="shops">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agriculturalShops.map((shop) => (
                    <Card key={shop.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <ShoppingBag className="h-5 w-5 mr-2 text-blue-600" />
                          {shop.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {shop.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1" />
                          {shop.contact}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Distance: </span>
                          <span className="text-green-600">{shop.distance}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Timings: </span>
                          {shop.timings}
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Services:</p>
                          <div className="flex flex-wrap gap-1">
                            {shop.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Agricultural Advisory Tab */}
              <TabsContent value="advisory">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Crop Advisory</CardTitle>
                      <CardDescription>Expert recommendations for current season</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Wheat Cultivation</h4>
                        <p className="text-sm text-green-700">
                          Optimal time for wheat sowing. Ensure proper seed treatment and maintain adequate moisture
                          levels.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Irrigation Advisory</h4>
                        <p className="text-sm text-blue-700">
                          With current weather conditions, reduce irrigation frequency. Monitor soil moisture regularly.
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-medium text-orange-800 mb-2">Pest Alert</h4>
                        <p className="text-sm text-orange-700">
                          Watch out for aphids in mustard crops. Apply recommended pesticides if infestation exceeds
                          threshold.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fertilizer Availability</CardTitle>
                      <CardDescription>Current stock status at nearby centers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Urea</p>
                            <p className="text-sm text-gray-600">₹266 per bag</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">DAP</p>
                            <p className="text-sm text-gray-600">₹1,350 per bag</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Limited</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">NPK</p>
                            <p className="text-sm text-gray-600">₹1,200 per bag</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Organic Compost</p>
                            <p className="text-sm text-gray-600">₹8 per kg</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Check Nearby Stores
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

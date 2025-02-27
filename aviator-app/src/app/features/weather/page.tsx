"use client";

import { motion } from "framer-motion";
import { 
  Cloud, Wind, Droplets, ThermometerSun, 
  AlertTriangle, Mic, MapPin, RefreshCcw,
  Search, ChevronDown, ArrowRight, PlayCircle,
  Shield, Clock, CheckCircle
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const weatherData = {
  metar: "CYYZ 221700Z 27015G25KT 15SM FEW045 BKN220 08/M03 A2992 RMK SC2CI6",
  taf: "CYYZ 221338Z 2214/2314 27012G22KT P6SM FEW045 BKN220 TEMPO 2214/2216 5SM -RA BKN020",
  alerts: [
    {
      type: "AIRMET",
      severity: "moderate",
      description: "MOD TURB BLW 120",
      area: "Southern Ontario",
      validUntil: "2200Z",
    },
    {
      type: "SIGMET",
      severity: "severe",
      description: "SEV ICE BLW 080",
      area: "Eastern Ontario",
      validUntil: "2300Z",
    }
  ]
};

const recentSearches = [
  { code: "CYYZ", name: "Toronto Pearson Intl" },
  { code: "CYVR", name: "Vancouver Intl" },
  { code: "CYUL", name: "Montreal-Trudeau Intl" },
];

const weatherStats = [
  {
    label: "Wind",
    value: "270° at 15kt",
    gusts: "G25",
    trend: "steady",
    icon: Wind,
  },
  {
    label: "Visibility",
    value: "15SM",
    trend: "improving",
    icon: Cloud,
  },
  {
    label: "Temperature",
    value: "8°C",
    dewpoint: "-3°C",
    trend: "rising",
    icon: ThermometerSun,
  },
  {
    label: "Pressure",
    value: "29.92 inHg",
    trend: "falling",
    icon: Droplets,
  },
];

const riskAssessment = {
  overall: "Low Risk",
  confidence: 92,
  factors: [
    { name: "Turbulence", risk: "Moderate", area: "Below 12,000ft" },
    { name: "Icing", risk: "Low", area: "None reported" },
    { name: "Visibility", risk: "Low", area: "Good conditions" },
    { name: "Thunderstorms", risk: "None", area: "Clear of convection" },
  ]
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function WeatherPage() {
  const [isListening, setIsListening] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState("CYYZ");

  return (
    <div className="min-h-screen w-full bg-[#0A0118] text-white pb-24">
      {/* Hero Section with Voice Assistant */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              AI Weather Intelligence
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Real-time weather analysis and risk assessment powered by AI
            </p>
            
            {/* Voice Search */}
            <div className="relative max-w-xl mx-auto mb-12">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search any airport (e.g., CYYZ) or ask a question..."
                    className="w-full px-6 py-4 rounded-xl glass text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={cn(
                    "p-4 rounded-xl glass transition-all duration-300",
                    isListening && "bg-purple-500/20 ring-2 ring-purple-500/50"
                  )}
                >
                  <Mic className={cn(
                    "h-5 w-5 transition-colors",
                    isListening ? "text-purple-400" : "text-gray-400"
                  )} />
                </button>
              </div>
              
              {/* Recent Searches */}
              <div className="absolute top-full left-0 right-0 mt-2">
                <div className="glass rounded-xl p-2">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    Recent Searches
                  </div>
                  {recentSearches.map((airport) => (
                    <button
                      key={airport.code}
                      onClick={() => setSelectedAirport(airport.code)}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{airport.code}</div>
                        <div className="text-sm text-gray-400">{airport.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current Weather Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Current Conditions</h2>
            <div className="flex items-center gap-2 text-sm">
              <RefreshCcw className="h-4 w-4 text-purple-400" />
              <span className="text-gray-400">Updated 5 min ago</span>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Raw METAR
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {weatherStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gradient">
                    {stat.value}
                  </p>
                  {stat.gusts && (
                    <p className="text-sm text-yellow-400 mt-1">
                      Gusts: {stat.gusts}
                    </p>
                  )}
                  {stat.dewpoint && (
                    <p className="text-sm text-gray-400 mt-1">
                      Dewpoint: {stat.dewpoint}
                    </p>
                  )}
                </div>
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  stat.trend === "rising" && "bg-emerald-400",
                  stat.trend === "falling" && "bg-red-400",
                  stat.trend === "steady" && "bg-yellow-400"
                )} />
                <span className="text-gray-400 capitalize">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* AI Risk Assessment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">AI Risk Assessment</h2>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              {riskAssessment.overall}
            </span>
            <span className="text-sm text-gray-400">
              ({riskAssessment.confidence}% confidence)
            </span>
          </div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {riskAssessment.factors.map((factor) => (
            <motion.div
              key={factor.name}
              variants={item}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium mb-1">{factor.name}</h4>
                  <p className="text-sm text-gray-400">{factor.area}</p>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  factor.risk === "Low" && "bg-emerald-500/20 text-emerald-400",
                  factor.risk === "Moderate" && "bg-yellow-500/20 text-yellow-400",
                  factor.risk === "High" && "bg-red-500/20 text-red-400",
                  factor.risk === "None" && "bg-gray-500/20 text-gray-400"
                )}>
                  {factor.risk}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Weather Alerts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Active Alerts</h2>
          <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            View All
          </button>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {weatherData.alerts.map((alert) => (
            <motion.div
              key={alert.type}
              variants={item}
              className={cn(
                "glass-card p-6",
                alert.severity === "severe" && "border-red-500/50",
                alert.severity === "moderate" && "border-yellow-500/50"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-xl glass",
                  alert.severity === "severe" && "text-red-400",
                  alert.severity === "moderate" && "text-yellow-400"
                )}>
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{alert.type}</h4>
                    <span className="text-sm text-gray-400">
                      Valid until {alert.validUntil}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{alert.description}</p>
                  <p className="text-sm text-gray-400">Area: {alert.area}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Voice Assistant Demo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Try Voice Assistant
            </h3>
            <p className="text-gray-300 mb-8">
              Ask questions like "What's the wind at CYYZ?" or "Is it safe to fly VFR today?"
            </p>
            <button className="btn-premium group">
              <span className="flex items-center gap-2">
                Watch Demo
                <PlayCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Voice assistant is available in English and French
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
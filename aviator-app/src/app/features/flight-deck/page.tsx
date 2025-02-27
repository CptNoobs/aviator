"use client";

import { motion } from "framer-motion";
import { 
  Plane, BarChart2, FileCheck,
  Ruler, Fuel, Scale, Clock, Shield,
  Download, Zap, CheckCircle,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const quickTools = [
  {
    name: "W&B Calculator",
    description: "Instant weight & balance calculations",
    icon: Scale,
    action: "Calculate Now",
  },
  {
    name: "Fuel Planner",
    description: "Optimize fuel loads & reserves",
    icon: Fuel,
    action: "Plan Fuel",
  },
  {
    name: "Route Optimizer",
    description: "AI-powered route suggestions",
    icon: Ruler,
    action: "Optimize",
  },
  {
    name: "Compliance Check",
    description: "Automated regulatory verification",
    icon: Shield,
    action: "Verify",
  },
];

const recentFlights = [
  {
    route: "CYYZ → CYVR",
    date: "Today",
    status: "Ready for Review",
    type: "IFR",
  },
  {
    route: "CYVR → CYEG",
    date: "Yesterday",
    status: "Completed",
    type: "IFR",
  },
  {
    route: "CYEG → CYYZ",
    date: "2 days ago",
    status: "Archived",
    type: "IFR",
  },
];

const performanceMetrics = [
  {
    label: "Flight Plans Filed",
    value: "128",
    change: "+12 this month",
    icon: FileCheck,
  },
  {
    label: "Time Saved",
    value: "45h",
    change: "vs. manual planning",
    icon: Clock,
  },
  {
    label: "Fuel Saved",
    value: "2,450L",
    change: "through optimization",
    icon: Fuel,
  },
  {
    label: "Safety Score",
    value: "96%",
    change: "Top 5% of pilots",
    icon: Shield,
  },
];

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

export default function FlightDeckPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#0A0118] text-white pb-24">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Your Digital Flight Deck
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional tools for efficient flight operations and smarter decision-making
            </p>
            <div className="inline-block p-1 glass rounded-full mb-8">
              <div className="flex items-center gap-2 text-sm px-4 py-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">
                  Trusted by <span className="text-white font-semibold">5,000+ professional pilots</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Quick Tools</h2>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400">Instant calculations & checks</span>
          </div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {quickTools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={item}
              className={cn(
                "glass-card p-6 cursor-pointer transition-all duration-300",
                selectedTool === tool.name && "border-purple-500/50 bg-white/5"
              )}
              onClick={() => setSelectedTool(tool.name)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl glass">
                  <tool.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 rounded-lg glass text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-colors">
                {tool.action}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recent Flights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent Flight Plans</h2>
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
          {recentFlights.map((flight) => (
            <motion.div
              key={flight.route}
              variants={item}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl glass">
                    <Plane className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{flight.route}</h3>
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-white/5">
                        {flight.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{flight.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{flight.status}</span>
                  <button className="p-2 rounded-lg glass hover:bg-white/5 transition-colors">
                    <Download className="h-5 w-5 text-purple-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Your Performance</h2>
          <div className="flex items-center gap-2 text-sm">
            <BarChart2 className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400">Last 30 days</span>
          </div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {performanceMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={item}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gradient mb-2">
                    {metric.value}
                  </p>
                  <p className="text-sm text-emerald-400">
                    {metric.change}
                  </p>
                </div>
                <metric.icon className="h-6 w-6 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready for Smarter Flight Operations?
            </h3>
            <p className="text-gray-300 mb-8">
              Join thousands of professional pilots using our advanced flight deck tools
            </p>
            <button className="btn-premium group">
              <span className="flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <p className="text-sm text-gray-400 mt-4">
              No credit card required • Full access for 14 days
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
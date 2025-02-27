"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, Star, Clock, Shield, Cloud, BookOpen, 
  Compass, Sparkles, Plane, CheckCircle, 
  GraduationCap, Brain, Target, Award,
  ArrowRight, ChevronRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

const stats = [
  { 
    value: "4.9/5", 
    label: "Pilot Rating", 
    subtext: "Based on 1,200+ reviews",
    icon: Star 
  },
  { 
    value: "5,000+", 
    label: "Active Pilots", 
    subtext: "Across Canada",
    icon: Users 
  },
  { 
    value: "98%", 
    label: "Pass Rate", 
    subtext: "Transport Canada Exams",
    icon: Target 
  },
  { 
    value: "24/7", 
    label: "AI Support", 
    subtext: "Always available",
    icon: Brain 
  }
];

const pilotProfiles = [
  {
    title: "Student Pilots",
    description: "Master PSTAR, PPL, and groundschool with AI-powered study tools",
    icon: GraduationCap,
    features: ["Interactive study guides", "Practice exams", "Progress tracking"]
  },
  {
    title: "Commercial Pilots",
    description: "Enhance your CPL, IFR, and ATPL preparation",
    icon: Plane,
    features: ["Advanced weather analysis", "Route optimization", "Performance calculations"]
  },
  {
    title: "Flight Instructors",
    description: "Streamline your teaching with comprehensive resources",
    icon: Award,
    features: ["Student progress monitoring", "Lesson planning tools", "Teaching materials"]
  }
];

const features = [
  {
    title: "Comprehensive Weather Intelligence",
    description: "AI-powered weather analysis and risk assessment",
    icon: Cloud,
    items: [
      "Real-time METAR/TAF interpretation",
      "GFA, AIRMET, SIGMET analysis",
      "Route-specific weather planning"
    ]
  },
  {
    title: "Smart Study System",
    description: "Personalized learning paths for all certification levels",
    icon: BookOpen,
    items: [
      "PSTAR, PPL, CPL, IFR, ATPL materials",
      "AI-generated practice questions",
      "Performance analytics"
    ]
  },
  {
    title: "Advanced Flight Planning",
    description: "Efficient and compliant flight preparation",
    icon: Compass,
    items: [
      "Route optimization with weather",
      "Weight & balance calculations",
      "Fuel planning automation"
    ]
  }
];

const benefits = [
  {
    title: "Enhanced Safety",
    description: "TC-compliant risk assessment and real-time alerts",
    icon: Shield
  },
  {
    title: "Time Efficiency",
    description: "Reduce planning time by up to 60%",
    icon: Clock
  },
  {
    title: "Smarter Learning",
    description: "AI-powered personalization for faster progress",
    icon: Sparkles
  }
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0118]">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/20 via-blue-500/20 to-transparent rounded-full blur-[120px] mix-blend-screen animate-gradient" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/20 via-purple-600/20 to-transparent rounded-full blur-[120px] mix-blend-screen animate-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[100px] bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-transparent rounded-full blur-[60px] rotate-12 mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8"
        >
          {/* Enhanced Trust Badge */}
          <motion.div 
            variants={item}
            className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:top-12"
          >
            <div className="glass flex items-center gap-3 px-4 py-2 rounded-full">
              <div className="flex -space-x-2">
                <img src="/pilot1.jpg" alt="Pilot" className="w-6 h-6 rounded-full border-2 border-white/10" />
                <img src="/pilot2.jpg" alt="Pilot" className="w-6 h-6 rounded-full border-2 border-white/10" />
                <img src="/pilot3.jpg" alt="Pilot" className="w-6 h-6 rounded-full border-2 border-white/10" />
              </div>
              <div className="text-sm">
                <span className="text-white/90">Trusted by 5,000+ Canadian Pilots</span>
                <span className="text-green-400 ml-2">●</span>
                <span className="text-white/75 ml-2">Transport Canada Compliant</span>
              </div>
            </div>
          </motion.div>

          <div className="max-w-xl text-center lg:text-left lg:flex-1">
            <motion.span
              variants={item}
              className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-400 ring-1 ring-inset ring-purple-500/20 mb-6"
            >
              <span className="animate-pulse mr-2">🔥</span> New: AI-Powered Weather Analysis
            </motion.span>

            <motion.h1 
              variants={item}
              className="text-4xl font-bold sm:text-6xl text-premium"
            >
              Your Intelligent
              <span className="block mt-2 text-gradient animate-gradient">
                Aviation Co-Pilot
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg text-gray-400 sm:text-xl"
            >
              From student pilot to ATPL, elevate your aviation journey with AI-powered weather analysis, study tools, and flight planning - all Transport Canada compliant.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/signup"
                className="btn-premium group"
              >
                <span className="relative flex items-center">
                  Start My Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/pricing"
                className="glass group inline-flex items-center px-8 py-3 text-sm font-medium text-white rounded-full hover:bg-white/[0.05] transition-all"
              >
                View Pricing
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 flex items-center justify-center lg:justify-start gap-6 text-sm"
            >
              <div className="flex items-center text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Cancel anytime
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={item}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img src="/logo1.png" alt="Partner" className="h-8 w-auto" />
                  <img src="/logo2.png" alt="Partner" className="h-8 w-auto" />
                  <img src="/logo3.png" alt="Partner" className="h-8 w-auto" />
                </div>
                <div className="text-sm text-gray-400">
                  Trusted by leading flight schools across Canada
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Stats Card */}
          <motion.div
            variants={item}
            className="hidden lg:block lg:flex-1"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-transparent rounded-2xl blur-3xl" />
              <div className="glass-card p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={fadeIn}
                        className="glass-card group p-6 text-center"
                      >
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                          <Icon className="relative h-6 w-6 text-purple-400 mx-auto" />
                        </div>
                        <div className="text-2xl font-bold text-white text-premium">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Pilot Profiles Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-screen-xl px-4 py-16"
        >
          <div className="text-center mb-12">
            <motion.h2 
              variants={item}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Tailored for Every Stage
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-lg text-gray-400"
            >
              Supporting your aviation journey from first solo to airline transport pilot
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pilotProfiles.map((profile, index) => {
              const Icon = profile.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:bg-white/10 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="relative flex flex-col items-center text-center">
                    <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 mb-4">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{profile.title}</h3>
                    <p className="text-gray-400 mb-4">{profile.description}</p>
                    <ul className="space-y-2">
                      {profile.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                          <CheckCircle className="h-4 w-4 text-purple-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
        </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          id="features"
          className="mx-auto max-w-screen-xl px-4 py-16"
        >
          <div className="text-center mb-12">
            <motion.h2 
              variants={item}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Professional-Grade Features
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-lg text-gray-400"
            >
              Everything you need for safe and efficient aviation operations
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:bg-white/10 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="relative flex items-center gap-4 mb-6">
                    <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="relative space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <CheckCircle className="h-5 w-5 text-purple-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-screen-xl px-4 py-16"
        >
          <div className="text-center mb-12">
            <motion.h2 
              variants={item}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Why Pilots Trust Us
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-lg text-gray-400"
            >
              Experience the future of aviation with Transport Canada compliant AI technology
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:bg-white/10 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="relative flex flex-col items-center text-center">
                    <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 mb-4">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-screen-xl px-4 py-16"
        >
          <div className="glass-card p-8 lg:p-12 overflow-hidden">
            <div className="relative text-center">
              <motion.div
                variants={item}
                className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 ring-1 ring-inset ring-green-500/20 mb-6"
              >
                <span className="animate-pulse mr-2">⚡️</span> Limited Time Offer
              </motion.div>

              <motion.h2
                variants={item}
                className="text-3xl font-bold text-white sm:text-4xl mb-4 text-premium"
              >
                Ready to Transform Your Aviation Journey?
              </motion.h2>

              <motion.p
                variants={item}
                className="mx-auto max-w-2xl text-lg text-gray-400 mb-8"
              >
                Join thousands of Canadian pilots who trust Aviator.ai for safer, smarter, and more efficient aviation operations.
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Link href="/signup" className="btn-premium group">
                  <span className="relative flex items-center">
                    Start My Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="glass group inline-flex items-center px-8 py-3 text-sm font-medium text-white rounded-full hover:bg-white/[0.05] transition-all"
                >
                  Schedule Demo
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* FOMO Trigger */}
              <motion.div
                variants={item}
                className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-4"
              >
                <div className="flex items-center">
                  <div className="animate-pulse h-2 w-2 rounded-full bg-green-400 mr-2" />
                  <span>143 pilots joined this week</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span>Free trial offer ends soon</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, Brain, Target, Award, Star,
  GraduationCap, Zap, Flame, Plane, Cloud,
  BarChart, Clock, Users, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const studyPaths = [
  {
    id: "pstar",
    name: "PSTAR Exam",
    description: "Student Pilot Permit - Written Test",
    progress: 65,
    topics: 8,
    hoursRequired: 20,
    icon: GraduationCap,
  },
  {
    id: "ppl",
    name: "Private Pilot (PPL)",
    description: "Private Pilot License Written Exam",
    progress: 45,
    topics: 12,
    hoursRequired: 40,
    icon: Plane,
  },
  {
    id: "cpl",
    name: "Commercial (CPL)",
    description: "Commercial Pilot License Written Exam",
    progress: 30,
    topics: 15,
    hoursRequired: 60,
    icon: Target,
  },
  {
    id: "ifr",
    name: "IFR Rating",
    description: "Instrument Flight Rules Written Exam",
    progress: 20,
    topics: 10,
    hoursRequired: 35,
    icon: Cloud,
  },
];

const achievements = [
  {
    id: "streak",
    name: "7-Day Streak",
    description: "Study every day for a week",
    icon: Flame,
    progress: 5,
    total: 7,
  },
  {
    id: "mastery",
    name: "Topic Mastery",
    description: "Score 100% on 3 practice tests",
    icon: Award,
    progress: 2,
    total: 3,
  },
  {
    id: "speed",
    name: "Quick Learner",
    description: "Complete 5 study sessions",
    icon: Zap,
    progress: 4,
    total: 5,
  },
];

const stats = [
  {
    label: "Study Streak",
    value: "5 Days",
    change: "+2 days",
    icon: Flame,
  },
  {
    label: "Hours Studied",
    value: "28.5",
    change: "+2.5 today",
    icon: Clock,
  },
  {
    label: "Test Score Avg",
    value: "85%",
    change: "+5%",
    icon: BarChart,
  },
  {
    label: "Community Rank",
    value: "Top 15%",
    change: "↑ 5 spots",
    icon: Users,
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

export default function StudyPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#0A0118] text-white pb-24">
      {/* Hero Section with AI Study Assistant */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              AI-Powered Study Assistant
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join 5,000+ pilots achieving their aviation goals with personalized AI study paths
            </p>
            <div className="inline-block p-1 glass rounded-full mb-8">
              <div className="flex items-center gap-2 text-sm px-4 py-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300">
                  Pilots using our AI study tools have a <span className="text-white font-semibold">98% exam pass rate</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Study Progress Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gradient mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm">
                    <span className="text-emerald-400">{stat.change}</span>
                  </p>
                </div>
                <stat.icon className="h-5 w-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Study Paths */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Study Paths</h2>
          <div className="flex items-center gap-2 text-sm">
            <Brain className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400">AI-recommended based on your goals</span>
          </div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {studyPaths.map((path) => (
            <motion.div
              key={path.id}
              variants={item}
              className={cn(
                "glass-card p-6 cursor-pointer transition-all duration-300",
                selectedPath === path.id && "border-purple-500/50 bg-white/5"
              )}
              onClick={() => setSelectedPath(path.id)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl glass">
                  <path.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{path.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{path.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-300">Progress</div>
                    <div className="text-sm font-medium">{path.progress}%</div>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.topics} topics
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ~{path.hoursRequired}h
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Achievements Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Your Achievements</h2>
          <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            View All
          </button>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={item}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg glass">
                  <achievement.icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-medium">{achievement.name}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="font-medium">
                  {achievement.progress}/{achievement.total}
                </span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"
                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Start Learning CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-300 mb-8">
              Get personalized study recommendations and track your progress with our AI study assistant.
            </p>
            <button className="btn-premium group">
              <span className="flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Limited time offer - Start your journey today!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
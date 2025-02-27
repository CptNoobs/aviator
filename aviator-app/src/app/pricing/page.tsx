"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plane, BookOpen, Cloud, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PilotQuiz } from '@/components/PilotQuiz';
import PricingPlan from '@/components/pricing/PricingPlan';
import TestimonialCarousel from '@/components/pricing/TestimonialCarousel';

// Move static data and types outside component
export type BillingCycle = 'monthly' | 'annual';
export type PlanType = 'free' | 'pro';

interface FeatureCategory {
  icon: React.ComponentType<{ className?: string }>;
  features: {
    [key in PlanType]: string[];
  };
}

const featureCategories: Record<string, FeatureCategory> = {
  "Flight Planning": {
    icon: Plane,
    features: {
      free: ["Basic flight plan creation", "Essential weather briefings", "Standard route planning"],
      pro: ["AI-powered route optimization", "Real-time weather integration", "Advanced flight analytics"]
    }
  },
  "Training & Study": {
    icon: BookOpen,
    features: {
      free: ["Core study materials", "3 practice tests/month", "Basic progress tracking"],
      pro: ["Complete study library", "Unlimited practice tests", "Personalized study paths"]
    }
  },
  "Weather Intelligence": {
    icon: Cloud,
    features: {
      free: ["Basic weather reports", "Standard forecasts", "Essential METAR access"],
      pro: ["Real-time weather updates", "Advanced weather visualization", "Custom weather alerts"]
    }
  }
};

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for exploring and learning",
    features: {
      highlight: "Includes weekly AI weather insights",
      basic: ["Basic flight planning", "Core study materials", "Community access"],
    },
    cta: "Start Free Forever",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "Recommended for serious pilots",
    badge: "Most Popular • 50% Off",
    features: {
      highlight: "Everything in Starter, plus:",
      pro: ["Advanced AI features", "Unlimited practice tests", "Priority support"],
    },
    cta: "Start 14-Day Free Trial",
    href: "/signup?plan=pro",
    popular: true,
  },
];

const trustLogos = [
  { name: "Air Canada", image: "/logos/air-canada.png" },
  { name: "Transport Canada", image: "/logos/tc.png" },
  { name: "Flight Safety", image: "/logos/flight-safety.png" },
];

const testimonials = [
  {
    quote: "Aviator.ai helped me pass my CPL on the first try. The AI co-pilot is like having a personal instructor 24/7.",
    author: "Capt. Sarah Mitchell",
    role: "Commercial Pilot",
    image: "/testimonials/sarah.jpg"
  },
  {
    quote: "The weather insights are incredible. I&apos;ve never felt more confident in my flight planning.",
    author: "John Anderson",
    role: "Private Pilot",
    image: "/testimonials/john.jpg"
  },
  {
    quote: "As an instructor, this is a game-changer for my students. The study tools are exceptional.",
    author: "Maria Rodriguez",
    role: "Flight Instructor",
    image: "/testimonials/maria.jpg"
  }
];

const stats = [
  { number: "5,000+", label: "Active Pilots" },
  { number: "98%", label: "Pass Rate" },
  { number: "24/7", label: "AI Support" },
];

const Circuit = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white/[0.02]">
    <div className="absolute h-full w-full bg-[radial-gradient(#332042_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
  </div>
);

// Move static data outside component to prevent recreation on each render
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
};

export default function PricingPage() {
  // State management with proper types
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 59
  });
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  // Memoized calculations and handlers
  const prices = useMemo(() => ({
    monthly: { free: 0, pro: 29 },
    annual: { free: 0, pro: 24 }
  }), []);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(prev => prev === category ? null : category);
  }, []);

  const handleBillingCycle = useCallback((cycle: BillingCycle) => {
    setBillingCycle(cycle);
  }, []);

  const handleTestimonialClick = useCallback((index: number) => {
    setCurrentTestimonial(index);
  }, []);

  const handleQuizShow = useCallback(() => {
    setShowQuiz(true);
  }, []);

  const handleQuizComplete = useCallback(() => {
    setShowQuiz(false);
  }, []);

  // Use RAF for smooth countdown animation
  React.useEffect(() => {
    let rafId: number;
    let lastUpdate = Date.now();

    const updateTimer = () => {
      const now = Date.now();
      const delta = now - lastUpdate;

      if (delta >= 1000) {
        setTimeLeft(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          }
          return prev;
        });
        lastUpdate = now;
      }

      rafId = requestAnimationFrame(updateTimer);
    };

    rafId = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Memoize testimonial rotation interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Memoize the billing cycle toggle UI
  const billingToggle = useMemo(() => (
    <div className="flex items-center justify-center gap-4 mb-8">
      <button
        onClick={() => handleBillingCycle('monthly')}
        className={cn(
          "px-4 py-2 rounded-lg transition-all",
          billingCycle === 'monthly' 
            ? "bg-white/10 text-white" 
            : "text-gray-400 hover:text-white"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => handleBillingCycle('annual')}
        className={cn(
          "px-4 py-2 rounded-lg transition-all",
          billingCycle === 'annual'
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:text-white"
        )}
      >
        Annual
        <span className="ml-2 text-xs text-emerald-400">Save 17%</span>
      </button>
    </div>
  ), [billingCycle, handleBillingCycle]);

  return (
    <div className="min-h-screen w-full bg-[#0A0118] text-white overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <Circuit />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="inline-block mb-6"
          >
            <div className="p-2 rounded-2xl glass hover:bg-white/5 transition-all duration-300">
              <div className="flex items-center gap-4 px-4">
                <span className="text-sm font-medium text-accent-gradient">
                  Limited Time Offer • 50% Off Pro Plan
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <div className="px-2 py-1 rounded-md glass text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  :
                  <div className="px-2 py-1 rounded-md glass text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  :
                  <div className="px-2 py-1 rounded-md glass text-white font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Fly Smarter, Train Faster{" "}
            <span className="block mt-2 text-gradient">
              with AI-Powered Aviation Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of pilots who are saving time, reducing stress, and passing exams with confidence using our intelligent co-pilot.
          </p>

          <motion.div
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={ANIMATION_VARIANTS.item}
                custom={index}
                className="relative p-6 rounded-xl glass-card hover-lift"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-3xl font-bold text-gradient mb-1"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm font-medium text-gray-300">{stat.label}</div>
                {index === 0 && (
                  <div className="absolute -top-2 -right-2">
                    <span className="animate-pulse px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/20">
                      +3 today
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto mb-16"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/50 via-pink-500/30 to-blue-500/50 blur-lg opacity-20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative p-8 glass-card rounded-2xl hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-sm opacity-50" />
                    <div className="relative rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-200 mb-4 leading-relaxed">
                      <Star className="inline-block h-5 w-5 text-yellow-400 mr-2" />
                      {testimonials[currentTestimonial].quote}
                    </p>
                    <div>
                      <div className="font-medium text-white text-premium">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-sm text-gray-300">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === currentTestimonial
                      ? "bg-purple-500 w-4"
                      : "bg-white/20 hover:bg-white/40"
                  )}
                  onClick={() => handleTestimonialClick(i)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <TestimonialCarousel
          testimonials={testimonials}
          currentTestimonial={currentTestimonial}
          onTestimonialClick={handleTestimonialClick}
        />

        {/* Billing Toggle */}
        {billingToggle}

        {/* Pricing Plans */}
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {plans.map((plan) => (
            <PricingPlan
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
              prices={prices}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
              onQuizShow={handleQuizShow}
              featureCategories={featureCategories}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm font-medium text-gray-300 mb-6">Trusted by leading aviation organizations</p>
          <div className="flex justify-center items-center gap-8 mb-12">
            {trustLogos.map((logo) => (
              <div key={logo.name} className="relative w-24 h-12 opacity-70 hover:opacity-100 transition-all duration-300 hover-lift">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full glass hover:bg-white/5 transition-all duration-300">
            <span className="flex items-center text-sm text-gray-300 font-medium">
              <Check className="h-5 w-5 text-accent mr-2" />
              No credit card required
            </span>
            <span className="flex items-center text-sm text-gray-300 font-medium">
              <Check className="h-5 w-5 text-accent mr-2" />
              Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <PilotQuiz
            onComplete={handleQuizComplete}
            onClose={() => setShowQuiz(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 
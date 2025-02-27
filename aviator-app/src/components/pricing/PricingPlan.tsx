"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BillingCycle, PlanType } from '@/app/pricing/page';

interface PricingPlanProps {
  plan: {
    name: string;
    description: string;
    badge?: string;
    popular?: boolean;
    features: {
      highlight?: string;
      basic?: string[];
      pro?: string[];
    };
    cta: string;
  };
  billingCycle: BillingCycle;
  prices: Record<BillingCycle, Record<PlanType, number>>;
  activeCategory: string | null;
  onCategoryClick: (category: string) => void;
  onQuizShow: () => void;
  featureCategories: Record<string, any>;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const PricingPlan = memo(function PricingPlan({
  plan,
  billingCycle,
  prices,
  activeCategory,
  onCategoryClick,
  onQuizShow,
  featureCategories
}: PricingPlanProps) {
  return (
    <motion.div
      variants={item}
      className={cn(
        "relative rounded-2xl p-8 transition-all duration-300",
        plan.popular
          ? "glass-card bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent border border-purple-500/20 shadow-[0_0_30px_rgba(147,51,234,0.1)]"
          : "glass-card"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 px-4 py-1 rounded-full text-sm font-medium shadow-xl">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-premium">{plan.name}</h3>
        <div className="flex items-baseline justify-center gap-x-2">
          <span className="text-4xl font-bold text-gradient">
            ${prices[billingCycle][plan.name.toLowerCase() as PlanType]}
          </span>
          <span className="text-gray-300">
            /{billingCycle === 'monthly' ? 'month' : 'mo, billed annually'}
          </span>
        </div>
        <p className="mt-4 text-gray-300 font-medium">{plan.description}</p>
        {plan.features.highlight && (
          <div className="mt-4 p-2 rounded-lg bg-white/5">
            <p className="text-sm font-medium text-accent">
              {plan.features.highlight}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6 mb-8">
        {Object.entries(featureCategories).map(([category, { icon: Icon, features }]) => (
          <div key={category} className="space-y-3">
            <button
              onClick={() => onCategoryClick(category)}
              className="w-full flex items-center justify-between p-3 rounded-lg glass hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-accent" />
                <span className="font-medium text-white">{category}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-gray-400 transition-transform duration-300",
                  activeCategory === category ? "rotate-180" : ""
                )}
              />
            </button>
            
            {activeCategory === category && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 pl-10"
              >
                {features[plan.name.toLowerCase() as PlanType].map((feature: string) => (
                  <div key={feature} className="flex items-center gap-x-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-accent" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onQuizShow}
        className={cn(
          "block w-full text-center rounded-full py-3 font-medium transition-all duration-300",
          plan.popular
            ? "btn-premium"
            : "glass hover:bg-white/10 hover:scale-102"
        )}
      >
        {plan.cta}
      </button>

      {plan.popular && (
        <div className="mt-4 space-y-2">
          <p className="text-center text-sm text-gray-300 font-medium">
            Join 5,000+ successful pilots today
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[#0A0118] bg-gradient-to-r from-purple-500 to-blue-500"
                />
              ))}
            </div>
            <span>3 pilots joined in the last hour</span>
          </div>
        </div>
      )}
    </motion.div>
  );
});

export default PricingPlan; 
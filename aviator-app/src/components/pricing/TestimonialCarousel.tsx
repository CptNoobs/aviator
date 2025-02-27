"use client";

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  onTestimonialClick: (index: number) => void;
}

const TestimonialCarousel = memo(function TestimonialCarousel({
  testimonials,
  currentTestimonial,
  onTestimonialClick
}: TestimonialCarouselProps) {
  return (
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
                  sizes="64px"
                  priority={currentTestimonial === 0}
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
            onClick={() => onTestimonialClick(i)}
          />
        ))}
      </div>
    </motion.div>
  );
});

export default TestimonialCarousel; 
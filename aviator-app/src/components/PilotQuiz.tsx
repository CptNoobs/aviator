import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plane, Target, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const pilotLevels = [
  { id: 'student', label: 'Student Pilot', icon: Plane },
  { id: 'commercial', label: 'Commercial Pilot', icon: Target },
  { id: 'instructor', label: 'Flight Instructor', icon: CheckCircle },
];

const pilotChallenges = [
  { id: 'weather', label: 'Weather Planning' },
  { id: 'test-prep', label: 'Test Preparation' },
  { id: 'compliance', label: 'Compliance Tracking' },
  { id: 'efficiency', label: 'Flight Efficiency' },
];

interface PilotQuizProps {
  onComplete: (data: { level: string; challenge: string }) => void;
  onClose: () => void;
}

export function PilotQuiz({ onComplete, onClose }: PilotQuizProps) {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState('');
  const [challenge, setChallenge] = useState('');

  const handleNext = () => {
    if (step === 1 && level) {
      setStep(2);
    } else if (step === 2 && challenge) {
      onComplete({ level, challenge });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/50 via-pink-500/30 to-blue-500/50 blur-lg opacity-20" />
        <motion.div
          className="relative overflow-hidden rounded-2xl glass-card"
          layoutId="quiz-container"
        >
          <div className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-premium">
                    Customize Your Pilot Experience
                  </h3>
                  <p className="text-sm text-gray-300">
                    {step}/2 • Tailoring your experience
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    🚀 143 pilots signed up this week
                  </span>
                </div>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 2) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-medium text-white mb-4">
                    What's your current pilot level?
                  </h4>
                  <div className="grid gap-3">
                    {pilotLevels.map((pilotLevel) => {
                      const Icon = pilotLevel.icon;
                      return (
                        <button
                          key={pilotLevel.id}
                          onClick={() => setLevel(pilotLevel.id)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl transition-all duration-300",
                            level === pilotLevel.id
                              ? "glass bg-white/10 border-purple-500/50"
                              : "glass hover:bg-white/5"
                          )}
                        >
                          <Icon className={cn(
                            "h-5 w-5",
                            level === pilotLevel.id ? "text-accent" : "text-gray-400"
                          )} />
                          <span className={cn(
                            "font-medium",
                            level === pilotLevel.id ? "text-white" : "text-gray-300"
                          )}>
                            {pilotLevel.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-medium text-white mb-4">
                    What's your biggest challenge right now?
                  </h4>
                  <div className="grid gap-3">
                    {pilotChallenges.map((pilotChallenge) => (
                      <button
                        key={pilotChallenge.id}
                        onClick={() => setChallenge(pilotChallenge.id)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl transition-all duration-300",
                          challenge === pilotChallenge.id
                            ? "glass bg-white/10 border-purple-500/50"
                            : "glass hover:bg-white/5"
                        )}
                      >
                        <span className={cn(
                          "font-medium",
                          challenge === pilotChallenge.id ? "text-white" : "text-gray-300"
                        )}>
                          {pilotChallenge.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <button
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={handleNext}
                disabled={step === 1 ? !level : !challenge}
                className={cn(
                  "btn-premium flex items-center gap-2",
                  (step === 1 ? !level : !challenge) && "opacity-50 cursor-not-allowed"
                )}
              >
                <span>{step === 1 ? 'Next' : 'See Your Results'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 
"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Send, Loader2, ArrowDown } from "lucide-react";
import { ProgressBar } from "./progress-bar";
import { ThemeToggle } from "./theme-toggle";
import { SuccessScreen } from "./success-screen";
import {
  Section1BasicInfo,
  Section2AreaOfInterest,
  Section3Experience,
  Section4Focus,
  Section5Commitment,
} from "./form-sections";
import { FormData, initialFormData } from "./types";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

// Landing section component
function LandingSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent relative overflow-hidden">
      <div 
        className="absolute inset-0 z-[-2] bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      />
      <div className="absolute inset-0 z-[-1] bg-[#0F0F1A]/70" />
      <AnimatedBackground />

      <div className="relative max-w-xl w-full text-center space-y-8 z-10">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            M&M Talent Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Платформа за мапирање на интересите и вештините на младите
          </p>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 text-left space-y-4">
          <p className="text-foreground leading-relaxed">
            <strong>M&M Talent Hub</strong> е иницијатива на M&M Media наменета за млади од 16 до 25 години.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Целта е да се добие појасна слика за интересите, вештините и потенцијалот на младите во области како медиуми, дигитална содржина, дизајн, фотографија, видео, AI алатки и веб.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Преку ова пријавување, помагаш да се изгради реална база на млади таленти, која во следни фази може да послужи за активности, соработки и проектни вклучувања.
          </p>
          
          {/* Important note */}
          <p className="text-sm text-muted-foreground/80 italic border-t border-border pt-4 mt-4">
            Ова не претставува апликација за работа, ниту гаранција за ангажман.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl 
                     bg-primary text-primary-foreground font-semibold text-lg
                     hover:brightness-110 active:scale-[0.98] transition-all
                     shadow-lg shadow-primary/25"
        >
          <span>Започни</span>
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

const STORAGE_KEY = "talent-form-draft";
const TOTAL_SECTIONS = 5;

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email === "" || emailRegex.test(email);
}

function canSubmit(formData: FormData): boolean {
  return formData.fullName.trim() !== "" || formData.email.trim() !== "";
}

export function TalentForm() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isDark, setIsDark] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        // We no longer skip landing if there's saved data, per user request.
        // setShowLanding(false);
      } catch (e) {
        console.error("Error loading saved form data:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setLastSaved(new Date());
  }, [formData]);

  const handleThemeToggle = useCallback(() => {
    setIsDark((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle("dark", newValue);
      return newValue;
    });
  }, []);

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (field === "email") {
        setEmailError("");
      }
    },
    []
  );

  const goToNextSection = () => {
    if (currentSection === 1 && formData.email && !isValidEmail(formData.email)) {
      setEmailError("Внеси валидна е-пошта");
      return;
    }

    if (currentSection < TOTAL_SECTIONS) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit(formData)) {
      return;
    }

    if (formData.email && !isValidEmail(formData.email)) {
      setEmailError("Внеси валидна е-пошта");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      localStorage.removeItem(STORAGE_KEY);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Се случи грешка. Те молиме обиди се повторно.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    const sectionProps = { formData, updateField };

    switch (currentSection) {
      case 1:
        return (
          <>
            <Section1BasicInfo {...sectionProps} />
            {emailError && (
              <p className="text-sm text-destructive mt-2">{emailError}</p>
            )}
          </>
        );
      case 2:
        return <Section2AreaOfInterest {...sectionProps} />;
      case 3:
        return <Section3Experience {...sectionProps} />;
      case 4:
        return <Section4Focus {...sectionProps} />;
      case 5:
        return <Section5Commitment {...sectionProps} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <SuccessScreen 
        primaryArea={formData.primaryArea || formData.areas[0] || ""} 
        level={formData.level}
      />
    );
  }

  if (showLanding) {
    return <LandingSection onStart={() => setShowLanding(false)} />;
  }

  const isLastSection = currentSection === TOTAL_SECTIONS;
  const canSubmitForm = canSubmit(formData) && formData.dataConsent;

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      />
      <div className="fixed inset-0 z-[-1] bg-[#0F0F1A]/80 pointer-events-none" />
      <AnimatedBackground />

      <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />

      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            M&M Talent Hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Мапирање на млади таленти
          </p>
        </header>

        {/* Progress bar */}
        <ProgressBar
          currentSection={currentSection}
          totalSections={TOTAL_SECTIONS}
        />

        {/* Form card */}
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-lg shadow-black/5">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="min-h-[400px]">
              {renderSection()}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-border">
              {currentSection > 1 && (
                <button
                  type="button"
                  onClick={goToPrevSection}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl 
                             bg-secondary text-foreground font-medium
                             hover:bg-accent active:scale-[0.98] transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Назад</span>
                </button>
              )}

              {!isLastSection ? (
                <button
                  type="button"
                  onClick={goToNextSection}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl 
                             bg-primary text-primary-foreground font-semibold
                             hover:brightness-110 active:scale-[0.98] transition-all
                             shadow-md shadow-primary/25"
                >
                  <span>Следно</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmitForm || isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl 
                             bg-primary text-primary-foreground font-semibold
                             hover:brightness-110 active:scale-[0.98] transition-all
                             shadow-md shadow-primary/25
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:brightness-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Се испраќа...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Испрати</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {isLastSection && !canSubmit(formData) && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                Внеси барем име или е-пошта за да испратиш.
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Зачувано автоматски
          </p>
        </footer>
      </div>
    </div>
  );
}

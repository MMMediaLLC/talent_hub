"use client";

import { CheckCircle2, User, Target } from "lucide-react";
import { areaOptions, levelOptions } from "./types";

interface SuccessScreenProps {
  primaryArea?: string;
  level?: string;
}

export function SuccessScreen({ primaryArea, level }: SuccessScreenProps) {
  const areaLabel = areaOptions.find((a) => a.id === primaryArea)?.label || "";
  const levelLabel = levelOptions.find((l) => l.id === level)?.label || "";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-success/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-success/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full text-center space-y-8">
        {/* Success animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-success/15 flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-success" />
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Твојата пријава е зачувана
          </h1>
          <p className="text-lg text-muted-foreground">
            Твоите информации се дел од процесот за мапирање на интереси и вештини.
          </p>
        </div>

        {/* Summary */}
        {(areaLabel || levelLabel) && (
          <div className="bg-card rounded-2xl border border-border p-6 text-left space-y-4">
            <h3 className="font-semibold text-foreground text-center mb-4">
              Твој профил
            </h3>
            
            {areaLabel && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Област</p>
                  <p className="font-medium text-foreground">{areaLabel}</p>
                </div>
              </div>
            )}
            
            {levelLabel && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ниво</p>
                  <p className="font-medium text-foreground">{levelLabel.split("(")[0].trim()}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info text */}
        <div className="bg-card rounded-2xl border border-border p-6 text-left">
          <p className="text-muted-foreground leading-relaxed">
            Може да бидеш контактиран/а во иднина ако има релевантна активност.
          </p>
        </div>

        {/* Note */}
        <p className="text-sm text-muted-foreground">
          Провери го и спам фолдерот ако не добиеш одговор.
        </p>
      </div>
    </div>
  );
}

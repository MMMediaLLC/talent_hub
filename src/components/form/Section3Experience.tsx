"use client";

import { useFormContext } from "react-hook-form";
import { FormData } from "@/lib/schema";
import { Label } from "@/components/ui/label";

export function Section3Experience() {
  const { register, watch } = useFormContext<FormData>();
  const level = watch("experienceLevel");

  const isBeginner = level === "Почетник";
  const hasSelectedLevel = !!level;

  return (
    <div className="glass-card p-8 md:p-10 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold mb-2">Искуство и активност 🚀</h2>
        <p className="text-gray-400 text-sm mb-6">Го разбираме твоето искуство</p>
      </div>

      <div className="space-y-8">
        {/* Field 1: Level */}
        <div className="space-y-4">
          <Label className="text-white/80 text-lg">1. Како би го опишал/а твоето ниво?</Label>
          <div className="flex flex-col gap-3">
            {[
              "Почетник",
              "Аматер со хоби проекти",
              "Полу-професионалец",
              "Искусен"
            ].map(opt => (
              <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                <input
                  type="radio"
                  value={opt}
                  className="w-4 h-4 accent-blue-500"
                  {...register("experienceLevel")}
                />
                <span className="text-white/80">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {hasSelectedLevel && (
          <>
            {/* Field 2: Prior Experience */}
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <Label className="text-white/80 text-lg">2. Дали досега имаш пробано нешто поврзано со оваа област?</Label>
              <div className="flex flex-col gap-3">
                {[
                  "Не, но сакам да почнам",
                  "Да, самостојно (видеа, курсеви, експерименти)",
                  "Да, имам направено нешто конкретно",
                  "Да, имам работено на реален проект"
                ].map(opt => (
                  <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value={opt}
                      className="w-4 h-4 accent-blue-500"
                      {...register("priorExperience")}
                    />
                    <span className="text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Field 3: Learning Style */}
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <Label className="text-white/80 text-lg">3. Како најчесто учиш или работиш?</Label>
              <div className="flex flex-col gap-3">
                {[
                  "Сам истражувам и пробувам",
                  "Следам насоки и учам чекор по чекор",
                  "Работам подобро во тим",
                  "Комбинирам од повеќе пристапи"
                ].map(opt => (
                  <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value={opt}
                      className="w-4 h-4 accent-blue-500"
                      {...register("learningStyle")}
                    />
                    <span className="text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Field 4: Last Activity */}
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <Label className="text-white/80 text-lg">4. Кога последно направи нешто во оваа област?</Label>
              <div className="flex flex-col gap-3">
                {[
                  "Во последните 7 дена",
                  "Во последниот месец",
                  "Во последните 3 месеци",
                  "Повеќе од 3 месеци",
                  "Сè уште ништо"
                ].map(opt => (
                  <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value={opt}
                      className="w-4 h-4 accent-blue-500"
                      {...register("lastActivity")}
                    />
                    <span className="text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional Fields based on Level */}
            {isBeginner ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <Label htmlFor="whatToLearn" className="text-white/80 text-lg">5. Што би сакал/а да пробаш или научиш?</Label>
                <textarea
                  id="whatToLearn"
                  rows={3}
                  placeholder="На пр. сакам да научам како се монтира видео..."
                  className="w-full px-4 py-3 rounded-xl glass-input outline-none resize-none"
                  {...register("whatToLearn")}
                />
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <Label htmlFor="workLink" className="text-white/80 text-lg">5. Линк до нешто што си направил/а (ако имаш)</Label>
                <p className="text-sm text-white/50 mb-2">Не мора да биде професионално — важно е да покажува што си пробал/а.</p>
                <input
                  id="workLink"
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl glass-input outline-none"
                  {...register("workLink")}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

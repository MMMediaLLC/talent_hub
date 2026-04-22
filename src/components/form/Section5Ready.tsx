"use client";

import { useFormContext } from "react-hook-form";
import { FormData } from "@/lib/schema";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ACTIVITY_TYPES = [
  "учење",
  "практична работа",
  "кратки задачи",
  "тимска работа"
];

const SOURCES = [
  "Instagram",
  "TikTok",
  "Пријател / Познаник",
  "Професор / Училиште",
  "Друго"
];

export function Section5Ready() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<FormData>();
  
  const activityTypes = watch("activityTypes") || [];
  
  const handleActivityToggle = (type: string) => {
    let newTypes = [...activityTypes];
    if (newTypes.includes(type)) {
      newTypes = newTypes.filter(t => t !== type);
    } else {
      newTypes.push(type);
    }
    setValue("activityTypes", newTypes, { shouldValidate: true });
  };

  return (
    <div className="glass-card p-8 md:p-10 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold mb-2">Последен чекор 🎬</h2>
        <p className="text-gray-400 text-sm mb-6">Речиси готово!</p>
      </div>

      <div className="space-y-8">
        {/* Field 1: Future Involvement */}
        <div className="space-y-4">
          <Label className="text-white/80 text-lg">1. Дали би сакал/а во иднина да се вклучиш во активности или проекти ако се отвори можност?</Label>
          <div className="flex flex-col gap-3">
            {["Да", "Можеби", "Засега не"].map(opt => (
              <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                <input
                  type="radio"
                  value={opt}
                  className="w-4 h-4 accent-blue-500"
                  {...register("futureInvolvement")}
                />
                <span className="text-white/80">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Field 2: Activity Types */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <Label className="text-white/80 text-lg">2. Каков тип активности најмногу ти одговараат?</Label>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_TYPES.map(type => {
              const isSelected = activityTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleActivityToggle(type)}
                  className={cn(
                    "px-4 py-2 rounded-full border text-sm transition-all",
                    isSelected
                      ? "border-green-400 bg-green-400/20 text-white"
                      : "border-white/10 hover:border-white/30 text-white/70"
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 3: Source */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <Label className="text-white/80 text-lg">3. Како слушна за ова?</Label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-xl glass-input outline-none appearance-none"
              {...register("source")}
            >
              <option value="" className="text-black">Избери опција</option>
              {SOURCES.map(source => (
                <option key={source} value={source} className="text-black">{source}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/50">
              ▼
            </div>
          </div>
        </div>

        {/* Field 4: About Me */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex justify-between items-end">
            <Label htmlFor="aboutMe" className="text-white/80 text-lg">4. Кажи ни нешто за себе</Label>
            <span className="text-xs text-white/40">Максимум 300 карактери</span>
          </div>
          <textarea
            id="aboutMe"
            rows={4}
            placeholder="Твоите хобија, страсти, што те инспирира..."
            className="w-full px-4 py-3 rounded-xl glass-input outline-none resize-none"
            maxLength={300}
            {...register("aboutMe")}
          />
          {errors.aboutMe && <p className="text-red-400 text-sm">{errors.aboutMe.message}</p>}
        </div>

        {/* Field 5: Consent */}
        <div className="pt-6 border-t border-white/10">
          <label className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 mt-1 accent-blue-500 flex-shrink-0"
              {...register("consent")}
            />
            <span className="text-sm text-white/80 leading-relaxed">
              5. Се согласувам моите податоци да бидат зачувани за целите на M&M Talent Hub и да бидам контактиран/а доколку се отвори можност за соработка или активност соодветна на мојот профил.
            </span>
          </label>
          {errors.consent && <p className="text-red-400 text-sm mt-2 ml-9">{errors.consent.message}</p>}
        </div>
      </div>
    </div>
  );
}

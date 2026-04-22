"use client";

import { useFormContext } from "react-hook-form";
import { FormData } from "@/lib/schema";
import { CREATIVE_AREAS, AREA_SUBCATEGORIES } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Section2Interests() {
  const { register, watch, setValue } = useFormContext<FormData>();

  const allAreas = watch("allAreas") || [];
  const primaryArea = watch("primaryArea");
  const subcategories = watch("subcategories") || [];

  const handleAreaToggle = (areaId: string) => {
    let newAreas = [...allAreas];
    if (newAreas.includes(areaId)) {
      newAreas = newAreas.filter(a => a !== areaId);
    } else {
      newAreas.push(areaId);
    }
    setValue("allAreas", newAreas, { shouldValidate: true });

    // Auto-set primary area if only 1 is selected
    if (newAreas.length === 1) {
      setValue("primaryArea", newAreas[0]);
    } else if (!newAreas.includes(primaryArea || "")) {
      // Clear primary if it was unselected
      setValue("primaryArea", "");
    }
  };

  const handleSubcategoryToggle = (sub: string) => {
    let newSubs = [...subcategories];
    if (newSubs.includes(sub)) {
      newSubs = newSubs.filter(s => s !== sub);
    } else {
      newSubs.push(sub);
    }
    setValue("subcategories", newSubs, { shouldValidate: true });
  };

  // The effective primary area is either the explicitly chosen one, or the only one selected
  const effectivePrimaryArea = allAreas.length === 1 ? allAreas[0] : primaryArea;
  const availableSubcategories = effectivePrimaryArea ? AREA_SUBCATEGORIES[effectivePrimaryArea] || [] : [];

  return (
    <div className="glass-card p-8 md:p-10 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold mb-2">Област на интерес ✨</h2>
        <p className="text-gray-400 text-sm mb-6">Го бележиме твојот интерес</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-white/80 text-lg">1. Кои области те опишуваат најдобро?</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CREATIVE_AREAS.map(area => {
              const isSelected = allAreas.includes(area.id);
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleAreaToggle(area.id)}
                  className={cn(
                    "flex flex-col text-left p-4 rounded-xl border transition-all duration-200",
                    isSelected 
                      ? `${area.borderClass} ${area.colorClass}/10 ${area.glowClass} ring-1 ring-offset-0` 
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{area.emoji}</span>
                    <span className="font-semibold">{area.name}</span>
                  </div>
                  <span className="text-xs text-white/50">{area.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {allAreas.length >= 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <Label className="text-white/80 text-lg">2. Која е твојата ПРИМАРНА област?</Label>
            <div className="flex flex-wrap gap-3">
              {allAreas.map(areaId => {
                const area = CREATIVE_AREAS.find(a => a.id === areaId);
                if (!area) return null;
                const isPrimary = primaryArea === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setValue("primaryArea", area.id)}
                    className={cn(
                      "px-5 py-2.5 rounded-full border transition-all",
                      isPrimary
                        ? `${area.colorClass} border-transparent text-white font-medium shadow-lg`
                        : "border-white/10 hover:border-white/30 hover:bg-white/5 text-white/70"
                    )}
                  >
                    {area.emoji} {area.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {effectivePrimaryArea && availableSubcategories.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <Label className="text-white/80 text-lg">3. Избери 1-2 подкатегории</Label>
            <div className="flex flex-wrap gap-2">
              {availableSubcategories.map(sub => {
                const isSelected = subcategories.includes(sub);
                const area = CREATIVE_AREAS.find(a => a.id === effectivePrimaryArea);
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => handleSubcategoryToggle(sub)}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm transition-all",
                      isSelected
                        ? `${area?.borderClass} bg-white/10 text-white`
                        : "border-white/10 hover:border-white/20 text-white/60"
                    )}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {effectivePrimaryArea && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 pt-4 border-t border-white/10">
            <Label className="text-white/80 text-lg">4. Колку сериозно сакаш да се занимаваш со избраната област?</Label>
            <div className="flex flex-col gap-3">
              {[
                "Само ме интересира",
                "Сакам да научам повеќе",
                "Сакам активно да работам во оваа област"
              ].map(level => (
                <label key={level} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    value={level}
                    className="w-4 h-4 accent-blue-500"
                    {...register("seriousnessLevel")}
                  />
                  <span className="text-white/80">{level}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

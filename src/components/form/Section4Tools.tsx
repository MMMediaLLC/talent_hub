"use client";

import { useFormContext } from "react-hook-form";
import { FormData } from "@/lib/schema";
import { AREA_TOOLS, CREATIVE_AREAS } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Креативни кампањи",
  "Видео продукција",
  "Дизајн проекти",
  "Технолошки решенија",
  "Организација на настани",
  "Социјални мрежи",
  "Истражувачки проекти"
];

export function Section4Tools() {
  const { register, watch, setValue } = useFormContext<FormData>();

  const allAreas = watch("allAreas") || [];
  const primaryArea = watch("primaryArea");
  const tools = watch("tools") || [];
  const projectTypes = watch("projectTypes") || [];

  const effectivePrimaryArea = allAreas.length === 1 ? allAreas[0] : primaryArea;
  
  const handleToolToggle = (tool: string) => {
    let newTools = [...tools];
    if (newTools.includes(tool)) {
      newTools = newTools.filter(t => t !== tool);
    } else {
      newTools.push(tool);
    }
    setValue("tools", newTools, { shouldValidate: true });
  };

  const handleProjectTypeToggle = (type: string) => {
    let newTypes = [...projectTypes];
    if (newTypes.includes(type)) {
      newTypes = newTypes.filter(t => t !== type);
    } else {
      if (newTypes.length < 3) {
        newTypes.push(type);
      }
    }
    setValue("projectTypes", newTypes, { shouldValidate: true });
  };

  const areaObj = CREATIVE_AREAS.find(a => a.id === effectivePrimaryArea);
  const availableTools = effectivePrimaryArea ? AREA_TOOLS[effectivePrimaryArea] || [] : [];

  return (
    <div className="glass-card p-8 md:p-10 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold mb-2">Алатки и фокус 🛠️</h2>
        <p className="text-gray-400 text-sm mb-6">Го мапираме твојот фокус</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-white/80 text-lg">Кои од овие алатки ги имаш користено или ти се познати?</Label>
          <p className="text-sm text-white/50 mb-4">Не мора да ги знаеш сите — избери што ти е познато или што си пробал/а.</p>

          {!effectivePrimaryArea ? (
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center text-white/60">
              Избери област во Чекор 2 за да видиш листа на алатки.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {availableTools.map(tool => {
                  const isSelected = tools.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => handleToolToggle(tool)}
                      className={cn(
                        "px-4 py-2 rounded-lg border text-sm transition-all",
                        isSelected
                          ? `${areaObj?.borderClass} bg-white/10 text-white shadow-lg`
                          : "border-white/10 hover:border-white/20 text-white/60 hover:bg-white/5"
                      )}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <Label htmlFor="customTools" className="text-white/80 text-sm mb-2 block">Друго (внеси сам)</Label>
                <input
                  id="customTools"
                  type="text"
                  placeholder="На пр. Final Cut, Webflow, Notion..."
                  className="w-full px-4 py-3 rounded-xl glass-input outline-none"
                  {...register("customTools")}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <Label className="text-white/80 text-lg block mb-2">Какви проекти би сакал/а да се приклучиш?</Label>
          <p className="text-sm text-white/50 mb-4">Избери до 3 опции</p>
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map(type => {
              const isSelected = projectTypes.includes(type);
              const isDisabled = !isSelected && projectTypes.length >= 3;
              
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleProjectTypeToggle(type)}
                  disabled={isDisabled}
                  className={cn(
                    "px-4 py-2 rounded-full border text-sm transition-all",
                    isSelected
                      ? "border-blue-400 bg-blue-400/20 text-white"
                      : isDisabled
                      ? "border-white/5 text-white/20 cursor-not-allowed"
                      : "border-white/10 hover:border-white/30 text-white/70"
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

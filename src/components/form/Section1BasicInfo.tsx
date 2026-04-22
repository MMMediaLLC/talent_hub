"use client";

import { useFormContext } from "react-hook-form";
import { FormData } from "@/lib/schema";
import { CITIES } from "@/lib/constants";
import { Label } from "@/components/ui/label";

export function Section1BasicInfo() {
  const { register, watch, formState: { errors } } = useFormContext<FormData>();

  const ages = Array.from({ length: 10 }, (_, i) => 16 + i); // 16 to 25

  return (
    <div className="glass-card p-8 md:p-10 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold mb-2">Основни информации 👋</h2>
        <p className="text-gray-400 text-sm mb-6">Кажи ни малку за себе</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white/80">Име и презиме</Label>
            <input
              id="fullName"
              type="text"
              placeholder="Како се викаш?"
              className="w-full px-4 py-3 rounded-xl glass-input outline-none"
              {...register("fullName")}
            />
            {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-white/80">Години</Label>
            <div className="relative">
              <select
                id="age"
                className="w-full px-4 py-3 rounded-xl glass-input outline-none appearance-none"
                {...register("age")}
              >
                <option value="" className="text-black">Избери години</option>
                {ages.map(age => (
                  <option key={age} value={age} className="text-black">{age}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/50">
                ▼
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-white/80">Град</Label>
          <div className="relative border-none">
            <select
              id="city"
              className="w-full px-4 py-3 rounded-xl glass-input outline-none appearance-none"
              {...register("city")}
            >
              <option value="" className="text-black">Избери град</option>
              {CITIES.map(city => (
                <option key={city} value={city} className="text-black">{city}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/50">
              ▼
            </div>
          </div>
        </div>

        {watch("city") === "Друго" && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
            <Label htmlFor="customCity" className="text-white/80">Внеси град</Label>
            <input
              id="customCity"
              type="text"
              placeholder="Твојот град..."
              className="w-full px-4 py-3 rounded-xl glass-input outline-none"
              {...register("customCity")}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email адреса</Label>
            <input
              id="email"
              type="email"
              placeholder="hello@example.com"
              className="w-full px-4 py-3 rounded-xl glass-input outline-none"
              {...register("email")}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact" className="text-white/80 flex items-center justify-between">
              <span>Телефон / Telegram / Viber</span>
              <span className="text-xs text-white/40 font-normal border border-white/10 px-2 py-0.5 rounded-full">Optional</span>
            </Label>
            <input
              id="contact"
              type="text"
              placeholder="+389 / @username"
              className="w-full px-4 py-3 rounded-xl glass-input outline-none"
              {...register("contact")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

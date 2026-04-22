export const CREATIVE_AREAS = [
  {
    id: "media",
    name: "Медиуми и новинарство",
    subtitle: "Media & Journalism",
    description: "Пишување вести, интервјуа, репортажи, подкастинг",
    color: "#FF6B6B",
    colorClass: "bg-[#FF6B6B]",
    borderClass: "border-[#FF6B6B]",
    textClass: "text-[#FF6B6B]",
    glowClass: "focus:ring-[#FF6B6B] shadow-[#FF6B6B]/20",
    emoji: "📰"
  },
  {
    id: "content",
    name: "Содржина и социјални мрежи",
    subtitle: "Content & Social Media",
    description: "Instagram, TikTok, YouTube, community, стратегија за раст",
    color: "#EC4899",
    colorClass: "bg-[#EC4899]",
    borderClass: "border-[#EC4899]",
    textClass: "text-[#EC4899]",
    glowClass: "focus:ring-[#EC4899] shadow-[#EC4899]/20",
    emoji: "📱"
  },
  {
    id: "design",
    name: "Дизајн и визуелна комуникација",
    subtitle: "Design & Visual Communication",
    description: "Графички дизајн, брендинг, илустрација, UI/UX",
    color: "#A855F7",
    colorClass: "bg-[#A855F7]",
    borderClass: "border-[#A855F7]",
    textClass: "text-[#A855F7]",
    glowClass: "focus:ring-[#A855F7] shadow-[#A855F7]/20",
    emoji: "🎨"
  },
  {
    id: "photo-video",
    name: "Фото, видео и дрон продукција",
    subtitle: "Photo, Video & Drone Production",
    description: "Фотографија, видео снимање и editing, дрон, документарна",
    color: "#FB923C",
    colorClass: "bg-[#FB923C]",
    borderClass: "border-[#FB923C]",
    textClass: "text-[#FB923C]",
    glowClass: "focus:ring-[#FB923C] shadow-[#FB923C]/20",
    emoji: "🎥"
  },
  {
    id: "ai",
    name: "AI алатки и автоматизација",
    subtitle: "AI Tools & Automation",
    description: "ChatGPT, Claude, Midjourney, Make, Zapier, AI агенти",
    color: "#10B981",
    colorClass: "bg-[#10B981]",
    borderClass: "border-[#10B981]",
    textClass: "text-[#10B981]",
    glowClass: "focus:ring-[#10B981] shadow-[#10B981]/20",
    emoji: "🤖"
  },
  {
    id: "web",
    name: "Веб и технологија",
    subtitle: "Web & Technology",
    description: "Веб развој, no-code сајтови, скриптирање, интеграции",
    color: "#3B82F6",
    colorClass: "bg-[#3B82F6]",
    borderClass: "border-[#3B82F6]",
    textClass: "text-[#3B82F6]",
    glowClass: "focus:ring-[#3B82F6] shadow-[#3B82F6]/20",
    emoji: "💻"
  }
];

export const AREA_SUBCATEGORIES: Record<string, string[]> = {
  "media": ["Пишување вести", "Интервјуа", "Истражувачко новинарство", "Подкастинг", "Колумни"],
  "content": ["Instagram", "TikTok", "YouTube", "LinkedIn", "Community management", "Стратегија и раст"],
  "design": ["Графички дизајн", "Брендинг", "Илустрација", "UI/UX", "Motion графика", "Типографија"],
  "photo-video": ["Фотографија", "Видео снимање", "Видео editing", "Дрон", "Звук и колор", "Документарна"],
  "ai": ["Prompt инженеринг", "AI за содржина", "No-code автоматизации", "AI агенти", "AI за бизнис"],
  "web": ["Frontend", "Backend", "No-code веб", "Интеграции", "Скриптирање", "DevOps основи"]
};

export const AREA_TOOLS: Record<string, string[]> = {
  "design": ["Canva", "Photoshop", "Illustrator", "Figma"],
  "web": ["WordPress", "HTML/CSS", "JavaScript", "React", "Webflow"],
  "ai": ["ChatGPT", "Midjourney", "DALL·E", "Runway ML", "ElevenLabs"],
  "photo-video": ["Premiere Pro", "After Effects", "DaVinci Resolve", "Lightroom"],
  "content": ["CapCut", "Canva", "TikTok Editor", "Instagram tools", "YouTube Studio"],
  "media": ["CapCut", "Canva", "TikTok Editor", "Instagram tools", "YouTube Studio"]
};

export const CITIES = [
  "Скопје", "Битола", "Куманово", "Прилеп", "Тетово", "Велес", "Штип", 
  "Охрид", "Гостивар", "Струмица", "Кавадарци", "Кочани", "Кичево", 
  "Струга", "Радовиш", "Друго"
];

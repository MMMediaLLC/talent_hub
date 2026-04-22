// Types for the Talent Discovery Form

export interface FormData {
  // Section 1: Basic Information
  fullName: string;
  age: string;
  city: string;
  cityOther: string;
  email: string;
  phone: string;

  // Section 2: Area of Interest
  areas: string[];
  primaryArea: string;
  subcategories: string[];
  seriousnessLevel: string;

  // Section 3: Experience & Activity
  level: string;
  priorExperience: string;
  learningStyle: string;
  lastActivity: string;
  workLink: string;
  motivation: string;

  // Section 4: Specific Focus
  tools: string[];
  toolsOther: string;
  projectTypes: string[];

  // Section 5: Commitment
  futureInvolvement: string;
  activityTypes: string[];
  referralSource: string;
  aboutYourself: string;
  dataConsent: boolean;
}

export const initialFormData: FormData = {
  fullName: "",
  age: "",
  city: "",
  cityOther: "",
  email: "",
  phone: "",
  areas: [],
  primaryArea: "",
  subcategories: [],
  seriousnessLevel: "",
  level: "",
  priorExperience: "",
  learningStyle: "",
  lastActivity: "",
  workLink: "",
  motivation: "",
  tools: [],
  toolsOther: "",
  projectTypes: [],
  futureInvolvement: "",
  activityTypes: [],
  referralSource: "",
  aboutYourself: "",
  dataConsent: false,
};

// Area options — labels are LOCKED, do not paraphrase
export const areaOptions = [
  {
    id: "media",
    label: "Медиуми и новинарство",
    description: "Пишување вести, интервјуа, репортажи, подкасти, колумни",
  },
  {
    id: "content",
    label: "Социјални мрежи",
    description: "Instagram, TikTok, YouTube, заедница, стратегија за раст",
  },
  {
    id: "design",
    label: "Дизајн и визуелна комуникација",
    description: "Графички дизајн, брендирање, илустрација, UI/UX, постери",
  },
  {
    id: "production",
    label: "Фото, видео и дрон продукција",
    description: "Фотографија, снимање и монтажа, дрон, документарни",
  },
  {
    id: "ai",
    label: "Вештачка интелигенција (AI)",
    description: "ChatGPT/Claude, Midjourney, Make/Zapier, AI алатки",
  },
  {
    id: "web",
    label: "Веб и технологија",
    description: "Веб развој, no-code сајтови, скриптирање, интеграции",
  },
];

// Subcategories per area
export const subcategoriesByArea: Record<string, string[]> = {
  media: [
    "Пишување вести",
    "Интервјуа и репортажи",
    "Истражувачко новинарство",
    "Подкастирање",
    "Колумни и мислења",
  ],
  content: [
    "Креирање содржина (постови, reels, TikTok)",
    "Поставување и управување со профили",
    "Видео едитинг (short-form)",
    "Стратегија и раст на профили",
    "Копирајтинг (caption, текстови)",
    "Анализа и следење резултати",
  ],
  design: [
    "Графички дизајн",
    "Брендирање",
    "Илустрација",
    "UI/UX",
    "Motion graphics",
    "Типографија",
  ],
  production: [
    "Фотографија",
    "Снимање видео",
    "Монтажа",
    "Дрон",
    "Звук и боја",
    "Документарни",
  ],
  ai: [
    "AI за веб и апликации",
    "Видео со AI",
    "Креирање содржина со AI",
    "AI проекти и идеи",
    "Автоматизација на задачи",
    "AI за бизнис",
  ],
  web: [
    "Frontend",
    "Backend",
    "No-code веб",
    "Интеграции",
    "Скриптирање",
    "DevOps основи",
  ],
};

// Tool group interface
export interface ToolGroup {
  category: string;
  tools: string[];
}

// Grouped tools by area – ordered beginner-friendly first
export const toolGroupsByArea: Record<string, ToolGroup[]> = {
  media: [
    { category: "Пишување и организација", tools: ["Google Docs", "Microsoft Word", "Notion", "Evernote"] },
    { category: "Платформи и блогови", tools: ["WordPress", "Medium", "Substack"] },
    { category: "Подкаст и аудио", tools: ["Audacity", "Adobe Audition", "Riverside", "Zencastr"] },
  ],
  content: [
    { category: "Креирање и едитирање", tools: ["Canva", "CapCut", "InShot", "VN Editor", "Adobe Express"] },
    { category: "Менаџирање профили", tools: ["Meta Business Suite", "Hootsuite", "Buffer", "Later", "Metricool"] },
    { category: "Социјални мрежи", tools: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X (Twitter)"] },
  ],
  design: [
    { category: "Брз дизајн", tools: ["Canva", "Adobe Express"] },
    { category: "Векторски и Графички дизајн", tools: ["Adobe Photoshop", "Adobe Illustrator", "Affinity Designer", "CorelDRAW"] },
    { category: "UI/UX и Прототипирање", tools: ["Figma", "Adobe XD", "Sketch", "Framer"] },
    { category: "Анимација и Motion", tools: ["After Effects", "Lottie"] },
  ],
  production: [
    { category: "Видео монтажа", tools: ["Adobe Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "CapCut (Desktop)"] },
    { category: "Обработка на фотографии", tools: ["Adobe Lightroom", "Photoshop", "Capture One"] },
    { category: "Звук и ефекти", tools: ["After Effects", "Adobe Audition", "Logic Pro"] },
  ],
  ai: [
    { category: "Текст и истражување", tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"] },
    { category: "Генерација на слики", tools: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Leonardo.ai"] },
    { category: "Видео и Звук", tools: ["Runway ML", "HeyGen", "ElevenLabs", "Suno"] },
    { category: "Автоматизација", tools: ["Zapier", "Make", "Custom GPTs", "GitHub Copilot"] },
  ],
  web: [
    { category: "No-code & Low-code", tools: ["WordPress", "Webflow", "Shopify", "Framer", "Wix"] },
    { category: "Програмирање (Frontend/Backend)", tools: ["HTML/CSS", "JavaScript/TypeScript", "React/Next.js", "Node.js", "Python", "PHP"] },
    { category: "Алатки за развој (Dev Tools)", tools: ["VS Code", "Git/GitHub", "Vercel", "Firebase", "Supabase"] },
  ],
};

// Flat tools by area (for backwards compatibility)
export const toolsByArea: Record<string, string[]> = Object.fromEntries(
  Object.entries(toolGroupsByArea).map(([area, groups]) => [
    area,
    groups.flatMap((g) => g.tools),
  ])
);

// Cities in North Macedonia
export const cities = [
  "Скопје",
  "Битола",
  "Куманово",
  "Прилеп",
  "Тетово",
  "Велес",
  "Штип",
  "Охрид",
  "Гостивар",
  "Струмица",
  "Кавадарци",
  "Кочани",
  "Кичево",
  "Струга",
  "Радовиш",
];

// Age options
export const ages = [
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
];

// Prior experience options
export const priorExperienceOptions = [
  { id: "no", label: "Не, но сакам да почнам" },
  { id: "self", label: "Да, самостојно (видеа, курсеви, експерименти)" },
  { id: "concrete", label: "Да, имам направено нешто конкретно" },
  { id: "real", label: "Да, имам работено на реален проект" },
];

// Learning style options
export const learningStyleOptions = [
  { id: "explore", label: "Сам истражувам и пробувам" },
  { id: "guided", label: "Следам насоки и учам чекор по чекор" },
  { id: "team", label: "Работам подобро во тим" },
  { id: "mixed", label: "Комбинирам од повеќе пристапи" },
];

// Level options
export const levelOptions = [
  { id: "beginner", label: "Почетник (учам, сè уште немам реални проекти)" },
  {
    id: "amateur",
    label: "Аматер со хоби проекти (правев работи, но не за клиенти)",
  },
  {
    id: "semi-pro",
    label: "Полу-професионалец (работев на 1-3 реални проекти)",
  },
  { id: "experienced", label: "Искусен (редовно работам, имам портфолио)" },
];

// Activity options
export const activityOptions = [
  { id: "week", label: "Во последните 7 дена" },
  { id: "month", label: "Во последниот месец" },
  { id: "3months", label: "Во последните 3 месеци" },
  { id: "older", label: "Повеќе од 3 месеци" },
  { id: "nothing", label: "Сè уште ништо" },
];

// Project type options
export const projectTypeOptions = [
  { id: "short", label: "Кратки платени задачи (1-3 дена)" },
  { id: "long", label: "Подолги проекти (1-4 недели)" },
  { id: "internship", label: "Пракса / менторство" },
  { id: "team", label: "Тимска работа со други кандидати" },
  { id: "solo", label: "Самостојни задачи" },
  { id: "open", label: "Отворен/а сум за сè" },
];

// Seriousness level options
export const seriousnessOptions = [
  { id: "curious", label: "Само ме интересира" },
  { id: "learn", label: "Сакам да научам повеќе" },
  { id: "active", label: "Сакам активно да работам во оваа област" },
];

// Future involvement options
export const futureInvolvementOptions = [
  { id: "yes", label: "Да" },
  { id: "maybe", label: "Можеби" },
  { id: "not-now", label: "Засега не" },
];

// Activity types options
export const activityTypeOptions = [
  { id: "learning", label: "Учење" },
  { id: "practical", label: "Практична работа" },
  { id: "short-tasks", label: "Кратки задачи" },
  { id: "teamwork", label: "Тимска работа" },
];

// Referral source options
export const referralOptions = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok / YouTube" },
  { id: "friend", label: "Пријател / препорака" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "other", label: "Друго" },
];

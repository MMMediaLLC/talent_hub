import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(2, "Внеси валидно име").optional().or(z.literal("")),
  age: z.string().optional(),
  city: z.string().optional(),
  customCity: z.string().optional(), // For "other" city
  email: z.string().email("Внеси валиден email").optional().or(z.literal("")),
  contact: z.string().optional(),
  
  allAreas: z.array(z.string()).default([]), // Removed max(3)
  primaryArea: z.string().optional(),
  subcategories: z.array(z.string()).default([]), // Removed max(2)
  seriousnessLevel: z.string().optional(),
  
  experienceLevel: z.string().optional(),
  priorExperience: z.string().optional(),
  learningStyle: z.string().optional(),
  lastActivity: z.string().optional(),
  workLink: z.string().optional().or(z.literal("")), // Removed URL strictness just in case
  whatToLearn: z.string().optional(),
  
  tools: z.array(z.string()).default([]),
  customTools: z.string().optional(),
  projectTypes: z.array(z.string()).max(3, "Максимум 3 типа").default([]),
  
  futureInvolvement: z.string().optional(),
  activityTypes: z.array(z.string()).default([]),
  source: z.string().optional(),
  aboutMe: z.string().max(300, "Најмногу 300 карактери").optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "Мора да се согласите за да продолжите"
  })
}).refine(data => data.fullName || data.email, {
  message: "Мора да се внесе барем Име или Email",
  path: ["fullName"]
});

export type FormData = z.infer<typeof formSchema>;

export const defaultValues: FormData = {
  fullName: "",
  age: "",
  city: "",
  customCity: "",
  email: "",
  contact: "",
  allAreas: [],
  primaryArea: "",
  subcategories: [],
  seriousnessLevel: "",
  experienceLevel: "",
  priorExperience: "",
  learningStyle: "",
  lastActivity: "",
  workLink: "",
  whatToLearn: "",
  tools: [],
  customTools: "",
  projectTypes: [],
  futureInvolvement: "",
  activityTypes: [],
  source: "",
  aboutMe: "",
  consent: false,
};

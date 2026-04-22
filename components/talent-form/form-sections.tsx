"use client";

import { User, Target, Briefcase, Wrench, Rocket } from "lucide-react";
import {
  TextInput,
  TextArea,
  SelectInput,
  MultiSelectCard,
  SingleSelectCard,
  GroupedToolsSelect,
  Checkbox,
} from "./form-inputs";
import {
  FormData,
  areaOptions,
  subcategoriesByArea,
  toolGroupsByArea,
  cities,
  ages,
  levelOptions,
  priorExperienceOptions,
  learningStyleOptions,
  activityOptions,
  projectTypeOptions,
  seriousnessOptions,
  futureInvolvementOptions,
  activityTypeOptions,
  referralOptions,
} from "./types";

interface SectionProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function SectionHeader({ icon, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <div className="text-primary">{icon}</div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

// ==========================================
// SECTION 1: Basic Information
// ==========================================
export function Section1BasicInfo({ formData, updateField }: SectionProps) {
  const cityOptions = [
    ...cities.map((c) => ({ value: c, label: c })),
    { value: "other", label: "Друго (внеси)" },
  ];

  const ageOptions = ages.map((a) => ({ value: a, label: a }));

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<User className="w-6 h-6" />}
        title="Основни информации"
        subtitle="Кажи ни малку за себе"
      />

      <TextInput
        label="Име и презиме"
        value={formData.fullName}
        onChange={(v) => updateField("fullName", v)}
        placeholder="Твое целосно име"
      />

      <SelectInput
        label="Години"
        value={formData.age}
        onChange={(v) => updateField("age", v)}
        options={ageOptions}
        placeholder="Избери возраст"
      />

      <div className="space-y-2">
        <SelectInput
          label="Град"
          value={formData.city}
          onChange={(v) => {
            updateField("city", v);
            if (v !== "other") updateField("cityOther", "");
          }}
          options={cityOptions}
          placeholder="Избери град"
        />
        {formData.city === "other" && (
          <TextInput
            label=""
            value={formData.cityOther}
            onChange={(v) => updateField("cityOther", v)}
            placeholder="Внеси го твојот град"
          />
        )}
      </div>

      <TextInput
        label="Е-пошта"
        value={formData.email}
        onChange={(v) => updateField("email", v)}
        type="email"
        placeholder="example@email.com"
      />

      <TextInput
        label="Телефон / Telegram / Viber"
        value={formData.phone}
        onChange={(v) => updateField("phone", v)}
        type="tel"
        placeholder="+389 XX XXX XXX"
        helperText="Опционално - за побрз контакт"
      />
    </div>
  );
}

// ==========================================
// SECTION 2: Area of Interest
// ==========================================
export function Section2AreaOfInterest({
  formData,
  updateField,
}: SectionProps) {
  const effectivePrimaryArea =
    formData.areas.length === 1 ? formData.areas[0] : formData.primaryArea;

  const availableSubcategories = effectivePrimaryArea
    ? subcategoriesByArea[effectivePrimaryArea] || []
    : [];

  const primaryAreaOptions = formData.areas.map((areaId) => {
    const area = areaOptions.find((a) => a.id === areaId);
    return { id: areaId, label: area?.label || areaId };
  });

  const handleAreasChange = (newAreas: string[]) => {
    updateField("areas", newAreas);

    if (!newAreas.includes(formData.primaryArea)) {
      updateField("primaryArea", "");
    }

    if (newAreas.length <= 1) {
      updateField("subcategories", []);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<Target className="w-6 h-6" />}
        title="Област на интерес"
        subtitle="Го бележиме твојот интерес"
      />

      <MultiSelectCard
        label="Кои области те опишуваат најдобро?"
        options={areaOptions.map((a) => ({
          id: a.id,
          label: a.label,
          description: a.description,
        }))}
        selected={formData.areas}
        onChange={handleAreasChange}
      />

      {formData.areas.length >= 2 && (
        <SingleSelectCard
          label="Која е твојата ПРИМАРНА област?"
          options={primaryAreaOptions}
          selected={formData.primaryArea}
          onChange={(v) => {
            updateField("primaryArea", v);
            updateField("subcategories", []);
          }}
        />
      )}

      {formData.areas.length >= 2 && !effectivePrimaryArea && (
        <div className="px-4 py-3 rounded-xl bg-secondary/30 border border-border">
          <p className="text-sm text-muted-foreground">
            Избери примарна област за да ги видиш подкатегориите.
          </p>
        </div>
      )}

      {effectivePrimaryArea && availableSubcategories.length > 0 && (
        <MultiSelectCard
          label="Избери подкатегории"
          options={availableSubcategories.map((s) => ({ id: s, label: s }))}
          selected={formData.subcategories}
          onChange={(v) => updateField("subcategories", v)}
        />
      )}

      <SingleSelectCard
        label="Колку сериозно сакаш да се занимаваш со избраната област?"
        options={seriousnessOptions}
        selected={formData.seriousnessLevel}
        onChange={(v) => updateField("seriousnessLevel", v)}
      />
    </div>
  );
}

// ==========================================
// SECTION 3: Experience & Activity
// ==========================================
export function Section3Experience({ formData, updateField }: SectionProps) {
  const isBeginner = formData.level === "beginner";

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<Briefcase className="w-6 h-6" />}
        title="Искуство и активност"
        subtitle="Го разбираме твоето искуство"
      />

      <SingleSelectCard
        label="Како би го опишал/а твоето ниво?"
        options={levelOptions}
        selected={formData.level}
        onChange={(v) => updateField("level", v)}
      />

      <SingleSelectCard
        label="Дали досега имаш пробано нешто поврзано со оваа област?"
        options={priorExperienceOptions}
        selected={formData.priorExperience}
        onChange={(v) => updateField("priorExperience", v)}
      />

      <SingleSelectCard
        label="Како најчесто учиш или работиш?"
        options={learningStyleOptions}
        selected={formData.learningStyle}
        onChange={(v) => updateField("learningStyle", v)}
      />

      <SingleSelectCard
        label="Кога последно направи нешто во оваа област?"
        options={activityOptions}
        selected={formData.lastActivity}
        onChange={(v) => updateField("lastActivity", v)}
      />

      {formData.level && !isBeginner && (
        <TextInput
          label="Линк до нешто што си направил/а (ако имаш)"
          value={formData.workLink}
          onChange={(v) => updateField("workLink", v)}
          type="url"
          placeholder="https://..."
          helperText="Не мора да биде професионално — важно е да покажува што си пробал/а."
        />
      )}

      {isBeginner && (
        <TextArea
          label="Што би сакал/а да пробаш или научиш?"
          value={formData.motivation}
          onChange={(v) => updateField("motivation", v)}
          placeholder="Кажи ни во кратки црти..."
          maxLength={200}
        />
      )}
    </div>
  );
}

// ==========================================
// SECTION 4: Specific Focus
// ==========================================
export function Section4Focus({ formData, updateField }: SectionProps) {
  const effectivePrimaryArea =
    formData.areas.length === 1 ? formData.areas[0] : formData.primaryArea;

  const availableToolGroups = effectivePrimaryArea
    ? toolGroupsByArea[effectivePrimaryArea] || []
    : [];

  // Get area label for display
  const areaLabel = areaOptions.find(a => a.id === effectivePrimaryArea)?.label || "";

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<Wrench className="w-6 h-6" />}
        title="Алатки и фокус"
        subtitle="Го мапираме твојот фокус"
      />

      {availableToolGroups.length > 0 && (
        <GroupedToolsSelect
          label="Кои од овие алатки ги имаш користено или ти се познати?"
          helperText="Не мора да ги знаеш сите — избери што ти е познато или што си пробал/а."
          toolGroups={availableToolGroups}
          selected={formData.tools}
          onChange={(v) => updateField("tools", v)}
          showOther
          otherValue={formData.toolsOther}
          onOtherChange={(v) => updateField("toolsOther", v)}
        />
      )}

      {!effectivePrimaryArea && (
        <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
          <p className="text-muted-foreground text-sm">
            Прво избери примарна област за да видиш релевантни алатки
          </p>
        </div>
      )}

      <MultiSelectCard
        label="Какви проекти би сакал/а да се приклучиш?"
        options={projectTypeOptions}
        selected={formData.projectTypes}
        onChange={(v) => updateField("projectTypes", v)}
      />
    </div>
  );
}

// ==========================================
// SECTION 5: Commitment & Next Step
// ==========================================
export function Section5Commitment({ formData, updateField }: SectionProps) {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<Rocket className="w-6 h-6" />}
        title="Последен чекор"
        subtitle="Речиси готово"
      />

      <SingleSelectCard
        label="Дали би сакал/а во иднина да се вклучиш во активности или проекти ако се отвори можност?"
        options={futureInvolvementOptions}
        selected={formData.futureInvolvement}
        onChange={(v) => updateField("futureInvolvement", v)}
      />

      <MultiSelectCard
        label="Каков тип активности најмногу ти одговараат?"
        options={activityTypeOptions}
        selected={formData.activityTypes}
        onChange={(v) => updateField("activityTypes", v)}
      />

      <SingleSelectCard
        label="Како слушна за ова?"
        options={referralOptions}
        selected={formData.referralSource}
        onChange={(v) => updateField("referralSource", v)}
      />

      <TextArea
        label="Кажи ни нешто за себе"
        value={formData.aboutYourself}
        onChange={(v) => updateField("aboutYourself", v)}
        placeholder="Што сакаш да знаеме за тебе? Што те прави уникатен/на? Кои се твоите амбиции?"
        maxLength={300}
      />

      <div className="pt-6 mt-2 border-t border-border">
        <Checkbox
          label="Се согласувам моите податоци да бидат зачувани за целите на оваа иницијатива."
          checked={formData.dataConsent}
          onChange={(v) => updateField("dataConsent", v)}
        />
      </div>
    </div>
  );
}

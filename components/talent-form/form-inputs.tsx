"use client";

import { Check, ChevronDown } from "lucide-react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url" | "tel";
  placeholder?: string;
  helperText?: string;
  maxLength?: number;
}

export function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  helperText,
  maxLength,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border 
                   text-foreground placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                   hover:border-primary/30 transition-all text-base"
      />
      {helperText && (
        <p className="text-xs text-muted-foreground leading-relaxed">{helperText}</p>
      )}
      {maxLength && (
        <p className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  helperText?: string;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  helperText,
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border 
                   text-foreground placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                   hover:border-primary/30 transition-all text-base resize-none"
      />
      <div className="flex justify-between items-center">
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {maxLength && (
          <p className="text-xs text-muted-foreground ml-auto">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder = "Избери...",
}: SelectInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border 
                     text-foreground appearance-none cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                     hover:border-primary/30 transition-all text-base pr-10"
        >
          <option value="" className="bg-card text-muted-foreground">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card text-foreground">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

interface MultiSelectCardProps {
  options: { id: string; label: string; description?: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
  label: string;
}

export function MultiSelectCard({
  options,
  selected,
  onChange,
  maxSelections,
  label,
}: MultiSelectCardProps) {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (!maxSelections || selected.length < maxSelections) {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-foreground">
        {label}
        {maxSelections && (
          <span className="text-muted-foreground font-normal ml-1">
            (избери до {maxSelections})
          </span>
        )}
      </label>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          const isDisabled =
            !isSelected && maxSelections && selected.length >= maxSelections;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleToggle(option.id)}
              disabled={isDisabled}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all group
                ${isSelected
                  ? "border-primary bg-primary/10 shadow-sm shadow-primary/10"
                  : isDisabled
                    ? "border-border bg-secondary/30 opacity-40 cursor-not-allowed"
                    : "border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/50"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                    ${isSelected
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/40 group-hover:border-primary/60"
                    }
                  `}
                >
                  {isSelected && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${isSelected ? "text-foreground" : "text-foreground/90"}`}>
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SingleSelectCardProps {
  options: { id: string; label: string }[];
  selected: string;
  onChange: (selected: string) => void;
  label: string;
}

export function SingleSelectCard({
  options,
  selected,
  onChange,
  label,
}: SingleSelectCardProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all group
                ${isSelected
                  ? "border-primary bg-primary/10 shadow-sm shadow-primary/10"
                  : "border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/50"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${isSelected
                      ? "border-primary"
                      : "border-muted-foreground/40 group-hover:border-primary/60"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <p className={`font-medium ${isSelected ? "text-foreground" : "text-foreground/90"}`}>
                  {option.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left group"
    >
      <div
        className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
          ${checked
            ? "bg-success border-success"
            : "border-muted-foreground/40 group-hover:border-success/60"
          }
        `}
      >
        {checked && <Check className="w-3 h-3 text-success-foreground" />}
      </div>
      <span className="text-sm text-foreground leading-relaxed">{label}</span>
    </button>
  );
}

interface MultiSelectChipsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  showOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function MultiSelectChips({
  options,
  selected,
  onChange,
  label,
  showOther = false,
  otherValue = "",
  onOtherChange,
}: MultiSelectChipsProps) {
  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const isOtherSelected = selected.includes("other");

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              className={`
                px-4 py-2.5 rounded-full text-sm font-medium transition-all
                ${isSelected
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                  : "bg-secondary/50 text-foreground border border-border hover:border-primary/40 hover:bg-secondary"
                }
              `}
            >
              {option}
            </button>
          );
        })}
        {showOther && (
          <button
            type="button"
            onClick={() => handleToggle("other")}
            className={`
              px-4 py-2.5 rounded-full text-sm font-medium transition-all
              ${isOtherSelected
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                : "bg-secondary/50 text-foreground border border-border hover:border-primary/40 hover:bg-secondary"
              }
            `}
          >
            Друго
          </button>
        )}
      </div>
      {showOther && isOtherSelected && onOtherChange && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Внеси друга алатка..."
          className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border 
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                     hover:border-primary/30 transition-all text-base mt-2"
        />
      )}
    </div>
  );
}

// Grouped tools display component
interface ToolGroup {
  category: string;
  tools: string[];
}

interface GroupedToolsSelectProps {
  toolGroups: ToolGroup[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  helperText?: string;
  showOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function GroupedToolsSelect({
  toolGroups,
  selected,
  onChange,
  label,
  helperText,
  showOther = false,
  otherValue = "",
  onOtherChange,
}: GroupedToolsSelectProps) {
  const handleToggle = (tool: string) => {
    if (selected.includes(tool)) {
      onChange(selected.filter((s) => s !== tool));
    } else {
      onChange([...selected, tool]);
    }
  };

  const isOtherSelected = selected.includes("other");

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-foreground">
          {label}
        </label>
        {helperText && (
          <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {toolGroups.map((group) => (
          <div key={group.category} className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.tools.map((tool) => {
                const isSelected = selected.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => handleToggle(tool)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${isSelected
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                        : "bg-secondary/50 text-foreground border border-border hover:border-primary/40 hover:bg-secondary"
                      }
                    `}
                  >
                    {tool}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        {showOther && (
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => handleToggle("other")}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${isOtherSelected
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                  : "bg-secondary/50 text-foreground border border-border hover:border-primary/40 hover:bg-secondary"
                }
              `}
            >
              + Друго
            </button>
            {isOtherSelected && onOtherChange && (
              <input
                type="text"
                value={otherValue}
                onChange={(e) => onOtherChange(e.target.value)}
                placeholder="Внеси други алатки што ги користиш..."
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border 
                           text-foreground placeholder:text-muted-foreground
                           focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                           hover:border-primary/30 transition-all text-sm"
              />
            )}
          </div>
        )}
      </div>
      
      {selected.length > 0 && (
        <p className="text-xs text-success">
          Избрано: {selected.filter(s => s !== "other").length} алатки
        </p>
      )}
    </div>
  );
}

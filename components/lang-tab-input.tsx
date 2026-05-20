"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const LANGS = [
  { key: "uz", label: "O'zbekcha" },
  { key: "oz", label: "Ўзбекча" },
  { key: "ru", label: "Русский" },
  { key: "en", label: "English" },
] as const;

type LangKey = "uz" | "oz" | "ru" | "en";

interface LangTabInputProps {
  label: string;
  fieldBase: string;
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

/**
 * Admin form component that renders a labeled input/textarea
 * with language tabs (uz / oz / ru / en).
 *
 * `fieldBase` is the root name, e.g. "title".
 * It stores uz in `title`, oz in `title_oz`, ru in `title_ru`, en in `title_en`.
 */
export default function LangTabInput({
  label,
  fieldBase,
  values,
  onChange,
  multiline = false,
  rows = 4,
  placeholder = "",
}: LangTabInputProps) {
  const [activeLang, setActiveLang] = useState<LangKey>("uz");

  const fieldKey = activeLang === "uz" ? fieldBase : `${fieldBase}_${activeLang}`;
  const currentValue = values[fieldKey] ?? "";

  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden w-fit mb-1">
        {LANGS.map((l) => (
          <button
            key={l.key}
            type="button"
            onClick={() => setActiveLang(l.key)}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              activeLang === l.key
                ? "bg-[#0047AB] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
      {multiline ? (
        <Textarea
          value={currentValue}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          placeholder={`${placeholder} (${LANGS.find((l) => l.key === activeLang)?.label})`}
          rows={rows}
        />
      ) : (
        <Input
          value={currentValue}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          placeholder={`${placeholder} (${LANGS.find((l) => l.key === activeLang)?.label})`}
        />
      )}
    </div>
  );
}

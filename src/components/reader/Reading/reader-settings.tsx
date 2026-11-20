
"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  Minus,
  Plus,
  RotateCcw,
  AlignJustify,
  Maximize2,
  Type,
} from "lucide-react";

type ReaderSettingsProps = {
  children: ReactNode;
};

type ReaderStyle = CSSProperties & {
  "--reader-font-size": string;
  "--reader-line-height": string;
  "--reader-max-width": string;
};

type Settings = {
  fontSize: number;
  lineHeight: number;
  maxWidth: number;
};

const STORAGE_KEY = "microservices-reader-settings";

const DEFAULT_SETTINGS: Settings = {
  fontSize: 18,
  lineHeight: 2,
  maxWidth: 760,
};

const LINE_HEIGHT_OPTIONS = [1.7, 2, 2.3];
const WIDTH_OPTIONS = [640, 760, 900];

function isValidSettings(value: unknown): value is Settings {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const settings = value as Record<string, unknown>;

  return (
    typeof settings.fontSize === "number" &&
    settings.fontSize >= 16 &&
    settings.fontSize <= 24 &&
    typeof settings.lineHeight === "number" &&
    LINE_HEIGHT_OPTIONS.includes(settings.lineHeight) &&
    typeof settings.maxWidth === "number" &&
    WIDTH_OPTIONS.includes(settings.maxWidth)
  );
}

export function ReaderSettings({ children }: ReaderSettingsProps) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    let isCancelled = false;

    const frameId = window.requestAnimationFrame(() => {
        try {
        const storedSettings = localStorage.getItem(STORAGE_KEY);

        if (storedSettings) {
            const parsed: unknown = JSON.parse(storedSettings);

            if (isValidSettings(parsed)) {
            setSettings(parsed);
            }
        }
        } catch {
        // در صورت نامعتبر بودن داده‌های ذخیره‌شده، تنظیمات پیش‌فرض استفاده می‌شوند.
        } finally {
        if (!isCancelled) {
            setIsLoaded(true);
        }
        }
    });

    return () => {
        isCancelled = true;
        window.cancelAnimationFrame(frameId);
    };
    }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // اگر ذخیره‌سازی در دسترس نباشد، تنظیمات تا زمان باز بودن صفحه فعال می‌مانند.
    }
  }, [settings, isLoaded]);

  function updateSettings(updates: Partial<Settings>) {
    setSettings((current) => ({
      ...current,
      ...updates,
    }));
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
  }

  const readerStyle: ReaderStyle = {
    "--reader-font-size": `${settings.fontSize}px`,
    "--reader-line-height": String(settings.lineHeight),
    "--reader-max-width": `${settings.maxWidth}px`,
  };

  return (
    <div style={readerStyle} className="min-w-0">
      <section
        aria-label="تنظیمات مطالعه"
        className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-4"
      >
        <div className="flex items-center gap-2">
          <Type size={18} aria-hidden="true" />
          <span className="text-sm font-medium">اندازه متن</span>

          <button
            type="button"
            onClick={() =>
              updateSettings({ fontSize: Math.max(16, settings.fontSize - 1) })
            }
            disabled={settings.fontSize <= 16}
            aria-label="کوچک کردن متن"
            className="rounded-lg border border-border p-2 transition hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={16} />
          </button>

          <span className="min-w-10 text-center text-sm tabular-nums">
            {settings.fontSize}px
          </span>

          <button
            type="button"
            onClick={() =>
              updateSettings({ fontSize: Math.min(24, settings.fontSize + 1) })
            }
            disabled={settings.fontSize >= 24}
            aria-label="بزرگ کردن متن"
            className="rounded-lg border border-border p-2 transition hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <AlignJustify size={18} aria-hidden="true" />
          <label htmlFor="reader-line-height" className="text-sm font-medium">
            فاصله خطوط
          </label>

          <select
            id="reader-line-height"
            value={settings.lineHeight}
            onChange={(event) =>
              updateSettings({ lineHeight: Number(event.target.value) })
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {LINE_HEIGHT_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Maximize2 size={18} aria-hidden="true" />
          <label htmlFor="reader-width" className="text-sm font-medium">
            عرض متن
          </label>

          <select
            id="reader-width"
            value={settings.maxWidth}
            onChange={(event) =>
              updateSettings({ maxWidth: Number(event.target.value) })
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {WIDTH_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value === 640
                  ? "باریک"
                  : value === 760
                    ? "متوسط"
                    : "عریض"}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="ms-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-surface-secondary hover:text-foreground"
        >
          <RotateCcw size={16} />
          بازنشانی
        </button>
      </section>

      {children}
    </div>
  );
}

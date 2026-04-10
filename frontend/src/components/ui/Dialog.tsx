"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  className,
}: DialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog content */}
      <div
        className={cn(
          "relative w-full max-w-lg bg-[var(--surface-container-lowest)] shadow-2xl rounded-[2rem] overflow-hidden animate-in fade-in zoom-in duration-300",
          className,
        )}
      >
        <div className="flex items-center justify-between p-8">
          <h2 className="text-2xl font-bold text-[var(--on-surface)] tracking-tight font-heading">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] rounded-xl hover:bg-[var(--surface-container-low)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 pt-0">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { label: string; value: string | number }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-black text-[var(--on-surface-variant)] ml-2 uppercase tracking-widest">
            {label}
          </label>
        )}
        <div className="relative group/select">
          <select
            className={cn(
              "flex h-14 w-full rounded-[1.5rem] border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-6 py-2 text-base text-[var(--on-surface)] transition-all appearance-none focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              error &&
                "border-red-500 focus:ring-red-500/10 focus:border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.05)]",
              className,
            )}
            ref={ref}
            {...props}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--on-surface-variant)] transition-colors group-focus-within/select:text-primary">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && (
          <p className="text-xs font-bold text-red-500 ml-4 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };

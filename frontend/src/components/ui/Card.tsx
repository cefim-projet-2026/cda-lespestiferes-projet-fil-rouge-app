"use client";

import { cn } from "@/lib/utils";

// ─── CARD ────────────────────────────────────────────────────────────────────

/**
 * Digital Atrium Card
 * - White surface (light mode default)
 * - Large radius
 * - Ambient shadow instead of borders
 * - Optional left status border
 */
export function Card({
  className,
  children,
  status = "none",
}: {
  className?: string;
  children: React.ReactNode;
  status?: "none" | "primary" | "secondary" | "warning";
}) {
  const statusStyles = {
    none: "",
    primary: "border border-primary",
    secondary: "border border-secondary",
    warning: "border border-warning",
  };

  return (
    <div
      className={cn(
        "bg-[var(--surface-container-lowest)] rounded-[1.5rem] shadow-ambient transition-all",
        statusStyles[status],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  title,
  description,
  action,
}: {
  className?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn("p-8 flex items-start justify-between", className)}>
      <div>
        <h3 className="text-xl font-bold text-[var(--on-surface)] tracking-tight font-heading">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--on-surface-variant)] mt-2 font-medium">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-8 pt-0", className)}>{children}</div>;
}

// ─── TABLE ────────────────────────────────────────────────────────────────────

export function Table({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-[1.5rem] bg-[var(--surface-container-lowest)]">
      <table
        className={cn(
          "w-full text-sm text-left text-[var(--on-surface)]",
          className,
        )}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-[var(--surface-container-low)] text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest border-b border-[var(--outline-variant)]">
      {children}
    </thead>
  );
}

export function TableRow({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <tr
      className={cn(
        "border-b border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]/50 transition-colors",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  className,
  children,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td className={cn("px-8 py-4 font-medium", className)} {...props}>
      {children}
    </td>
  );
}

export function TableHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "px-8 py-4 font-bold text-[var(--on-surface-variant)]",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

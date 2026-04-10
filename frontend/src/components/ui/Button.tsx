import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-4 focus-visible:ring-amber-500/10 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-[#D97706] shadow-sm",
        primary: "bg-primary text-white hover:bg-[#D97706] shadow-sm",
        secondary: "bg-[#835500]/10 text-[#835500] hover:bg-[#835500]/20",
        outline:
          "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] hover:bg-[var(--surface-container-low)]",
        ghost:
          "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] hover:text-[var(--on-surface)]",
        destructive: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 rounded-2xl gap-2",
        sm: "h-9 px-4 rounded-xl gap-1.5 text-xs",
        lg: "h-13 px-8 rounded-[1.5rem] gap-2.5 text-base",
        icon: "size-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      leftIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : leftIcon}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

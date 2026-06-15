"use client";

import { cn } from "@/lib/utils";
import {
  RemixiconComponentType,
  RiArrowRightSFill,
  RiArrowRightSLine,
} from "@remixicon/react";
import React, {
  createContext,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

interface CollapsibleProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDetailsElement>,
  HTMLDetailsElement
> {
  defaultOpen?: boolean;
  children?: ReactNode;
}
interface CollapsibleTriggerProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> {
  children?: ReactNode;
}

interface CollapsibleContentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  children?: ReactNode;
}

// ─── Context ────────────────────────────────────────────────────────────────

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsible(componentName: string): CollapsibleContextValue {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error(
      `<${componentName}> must be used within a <CollapsibleBase>`,
    );
  }
  return ctx;
}

// ─── Base (state lives here) ────────────────────────────────────────────────

const CollapsibleBase = ({
  defaultOpen = false,
  className,
  children,
  ...props
}: CollapsibleProps): React.ReactElement => {
  const [open, setOpen] = useState(defaultOpen);

  // Once opened, it stays open — ignore any close attempts
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) return;
    setOpen(true);
  };

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const isNowOpen = e.currentTarget.open;

    setOpen(isNowOpen);
  };
  useEffect(() => {
    if (defaultOpen) setOpen(defaultOpen);
  }, [defaultOpen]);
  return (
    <CollapsibleContext.Provider
      value={{ open, onOpenChange: handleOpenChange }}
    >
      <details
        open={open}
        data-slot="collapsible"
        data-state={open ? "open" : "closed"}
        className={cn(className)}
        onToggle={handleToggle}
        {...props}
      >
        {children}
      </details>
    </CollapsibleContext.Provider>
  );
};

// ─── Collapsible ────────────────────────────────────────────────────────────

function Collapsible({
  className,
  ...props
}: CollapsibleProps): React.ReactElement {
  return (
    <CollapsibleBase
      className={cn(
        "group/collapsible border-b border-transparent open:border-theme-stroke last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

const CollapsibleSub = ({
  className,
  ...props
}: CollapsibleProps): React.ReactElement => {
  return (
    <CollapsibleBase
      className={cn("group/sub-collapsible", className)}
      {...props}
    />
  );
};

// ─── Triggers ───────────────────────────────────────────────────────────────

const CollapsibleBaseTrigger = ({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) => {
  // Consumed so child triggers can optionally react to open state
  useCollapsible("CollapsibleBaseTrigger");

  return (
    <summary
      data-slot="collapsible-trigger"
      className={cn(
        "list-none flex text-slate-50 items-center gap-3 cursor-pointer select-none",
        "hover:text-white transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-500",
        className,
      )}
      {...props}
    >
      {children}
    </summary>
  );
};

function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsibleTriggerProps): React.ReactElement {
  return (
    <CollapsibleBaseTrigger
      className={cn(
        "bg-slate-700 md:bg-theme-background",
        "py-3 px-6",
        "border-b border-theme-stroke",
        "group-open/collapsible:font-retina",
        className,
      )}
      {...props}
    >
      <RiArrowRightSFill className="size-4 group-open/collapsible:rotate-90" />
      {children}
    </CollapsibleBaseTrigger>
  );
}

function CollapsibleSubTrigger({
  children,
  className,
  ...props
}: CollapsibleTriggerProps): React.ReactElement {
  return (
    <CollapsibleBaseTrigger
      className={cn(
        "group-open/sub-collapsible:text-theme-heading-foreground text-theme-foreground pl-6 py-0.5 hover:bg-theme-foreground/20",
        className,
      )}
      {...props}
    >
      <RiArrowRightSLine className="size-4 group-open/sub-collapsible:rotate-90" />
      {children}
    </CollapsibleBaseTrigger>
  );
}

// ─── Content ────────────────────────────────────────────────────────────────

function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps): React.ReactElement {
  return (
    <div
      data-slot="collapsible-content"
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  );
}

const CollapsibleSubContent = ({
  className,
  children,
  ...props
}: CollapsibleContentProps): React.ReactElement => {
  return (
    <div
      data-slot="collapsible-sub-content"
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// ─── Item ────────────────────────────────────────────────────────────────────

const CollapsibleItem = ({
  icon: Icon,
  label,
}: {
  icon: RemixiconComponentType;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-2 py-0.5 text-theme-foreground">
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
    </div>
  );
};

// ─── Hook (for consumers who need raw state) ─────────────────────────────────

export { useCollapsible };

export {
  Collapsible,
  CollapsibleSub,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleSubTrigger,
  CollapsibleSubContent,
  CollapsibleItem,
};

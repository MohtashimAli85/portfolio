"use client";

import { cn } from "@/lib/utils";
import {
  RemixiconComponentType,
  RiArrowDownSFill,
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiArrowRightSLine,
} from "@remixicon/react";
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

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
const CollapsibleBase = ({
  defaultOpen = false,
  className,
  children,
  ...props
}: CollapsibleProps): React.ReactElement => {
  return (
    <details
      open={defaultOpen}
      data-slot="collapsible"
      className={cn(className)}
      {...props}
    >
      {children}
    </details>
  );
};
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
const CollapsibleBaseTrigger = ({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) => {
  return (
    <summary
      data-slot="collapsible-trigger"
      className={cn(
        "list-none flex text-slate-50 items-center gap-3 cursor-pointer select-none ",
        "hover:text-white transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-500 ",
        // "group-open/collapsible:font-retina",
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
        "py-3 px-6",
        "border-b border-theme-stroke  ",
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
        "group-open/sub-collapsible:text-theme-heading-foreground text-theme-foreground",
        className,
      )}
      {...props}
    >
      <RiArrowRightSLine
        className="size-4 group-open/sub-collapsible:rotate-90
      
      "
      />
      {children}
    </CollapsibleBaseTrigger>
  );
}
function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps): React.ReactElement {
  return (
    <div
      data-slot="collapsible-content"
      className={cn("pl-6 py-3 mt-0.5", className)}
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
      className={cn("pl-7", className)}
      {...props}
    >
      {children}
    </div>
  );
};
const CollapsibleItem = ({
  icon: Icon,
  label,
}: {
  icon: RemixiconComponentType;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-2 py-0.5 text-theme-foreground">
      <Icon className="size-4 shrink-0 " />
      <span>{label}</span>
    </div>
  );
};
export {
  Collapsible,
  CollapsibleSub,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleSubTrigger,
  CollapsibleSubContent,
  CollapsibleItem,
};

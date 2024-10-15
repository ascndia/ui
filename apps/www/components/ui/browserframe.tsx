import React, { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

interface Props extends PropsWithChildren {
  tabColors?: string[]
  className?: string
  contentClassName?: string
}

const BrowserFrame: React.FC<Props> = ({
  tabColors = ["bg-border", "bg-border", "bg-border"],
  children,
  className,
  contentClassName,
}) => {
  return (
    <div
      className={cn(
        "bg-alternative-200 relative flex h-full w-full flex-col rounded-2xl border p-2 pt-0 shadow-lg",
        className
      )}
    >
      <div className="relative flex w-full items-center gap-1.5 px-2 py-3 lg:gap-2">
        {tabColors.map((color, index) => (
          <div key={index} className={cn("h-2 w-2 rounded-full", color)} />
        ))}
      </div>
      <div className={cn("h-full w-full rounded-lg", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

export default BrowserFrame

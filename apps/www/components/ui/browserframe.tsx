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
        "relative rounded-2xl shadow-lg p-2 pt-0 w-full h-full bg-alternative-200 border flex flex-col",
        className
      )}
    >
      <div className="w-full px-2 py-3 relative flex items-center gap-1.5 lg:gap-2">
        {tabColors.map((color, index) => (
          <div key={index} className={cn("w-2 h-2 rounded-full", color)} />
        ))}
      </div>
      <div className={cn("h-full w-full rounded-lg", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

export default BrowserFrame

"use client"

import * as React from "react"

import { useConfig } from "@/hooks/use-config"

interface StyleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StyleWrapper({ children }: StyleWrapperProps) {
  const [config] = useConfig()

  return <>{children}</>
}

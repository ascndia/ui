"use client"

import * as React from "react"
import { CircleHelp, Monitor, Smartphone, Tablet } from "lucide-react"
import { ImperativePanelHandle } from "react-resizable-panels"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { useLiftMode } from "@/hooks/use-lift-mode"
import { BlockCopyButton } from "@/components/block-copy-button"
import { V0Button } from "@/components/v0-button"
import { Block } from "@/registry/schema"
import { Badge } from "@/registry/ui/badge"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Separator } from "@/registry/ui/separator"
import { Switch } from "@/registry/ui/switch"
import { TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export function BlockToolbar({
  block,
  resizablePanelRef,
}: {
  block: Block & { hasLiftMode: boolean }
  resizablePanelRef: React.RefObject<ImperativePanelHandle>
}) {
  const { isLiftMode, toggleLiftMode } = useLiftMode(block.name)

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <TabsList className="hidden h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
          <TabsTrigger
            value="preview"
            className="h-[1.45rem] rounded-sm px-2 text-xs"
            disabled={isLiftMode}
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="h-[1.45rem] rounded-sm px-2 text-xs"
            disabled={isLiftMode}
          >
            Code
          </TabsTrigger>
        </TabsList>
        <Separator orientation="vertical" className="mx-2 hidden h-4 md:flex" />
        <div className="hidden items-center gap-2 sm:flex">
          <Separator
            orientation="vertical"
            className="mx-2 mr-0 hidden h-4 md:flex"
          />
          <div className="flex items-center gap-2">
            <a href={`#${block.name}`}>
              <Badge
                variant="secondary"
                className={cn("bg-transparent", isLiftMode && "opacity-50")}
              >
                {block.name}
              </Badge>
            </a>
          </div>
        </div>
      </div>
      {block.code && (
        <div className="ml-auto flex items-center gap-2 md:pr-[14px]">
          {block.hasLiftMode && (
            <>
              <div className="hidden h-7 items-center justify-between gap-2 md:flex">
                <Label htmlFor={`lift-mode-${block.name}`} className="text-xs">
                  Lift Mode
                </Label>
                <Switch
                  id={`lift-mode-${block.name}`}
                  checked={isLiftMode}
                  onCheckedChange={(value) => {
                    resizablePanelRef.current?.resize(100)
                    toggleLiftMode(block.name)

                    if (value) {
                      trackEvent({
                        name: "enable_lift_mode",
                        properties: {
                          name: block.name,
                        },
                      })
                    }
                  }}
                />
              </div>
              <Separator
                orientation="vertical"
                className="mx-2 hidden h-4 lg:inline-flex"
              />
            </>
          )}
          <div className="hidden h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm md:flex">
            <ToggleGroup
              disabled={isLiftMode}
              type="single"
              defaultValue="100"
              onValueChange={(value) => {
                if (resizablePanelRef.current) {
                  resizablePanelRef.current.resize(parseInt(value))
                }
              }}
            >
              <ToggleGroupItem
                value="100"
                className="h-[22px] w-[22px] rounded-sm p-0"
              >
                <Monitor className="h-3.5 w-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="60"
                className="h-[22px] w-[22px] rounded-sm p-0"
              >
                <Tablet className="h-3.5 w-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="30"
                className="h-[22px] w-[22px] rounded-sm p-0"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Separator
            orientation="vertical"
            className="mx-2 hidden h-4 md:flex"
          />
          <BlockCopyButton
            event="copy_block_code"
            name={block.name}
            code={block.code}
            disabled={isLiftMode}
          />
          <V0Button
            className="hidden md:flex"
            id={`v0-button-${block.name}`}
            disabled={
              isLiftMode || ["login-01", "sidebar-01"].includes(block.name)
            }
            block={{
              name: block.name,
              description: block.description || "Edit in v0",
              code: block.code,
            }}
          />
        </div>
      )}
    </div>
  )
}

import { Registry } from "@/registry/schema"

export const section: Registry = [
  {
    name: "hero-1",
    type: "registry:section",
    files: ["section/hero-1.tsx"],
    dependencies: ["framer-motion"],
  },
  {
    name: "screen-1",
    type: "registry:section",
    files: ["section/screen-1.tsx"],
    dependencies: ["framer-motion"],
  },
]

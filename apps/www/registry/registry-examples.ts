import { Registry } from "@/registry/schema"

export const examples: Registry = [
  {
    name: "hero-1-example",
    type: "registry:example",
    dependencies: ["framer-motion"],
    registryDependencies: ["hero-1"],
    files: ["example/hero-1.tsx"],
  },
  {
    name: "screen-1-example",
    type: "registry:example",
    dependencies: ["framer-motion"],
    files: ["example/screen-1.tsx"],
  },
]

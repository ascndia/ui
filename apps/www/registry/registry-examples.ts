import { Registry } from "@/registry/schema"

export const examples: Registry = [
  {
    name: "screen-1-example",
    type: "registry:example",
    dependencies: ["framer-motion"],
    files: ["example/screen-1.tsx"],
  },
  {
    name: "browserframe-example",
    type: "registry:example",
    dependencies: ["framer-motion"],
    files: ["example/browserframe-example.tsx"],
  },
]

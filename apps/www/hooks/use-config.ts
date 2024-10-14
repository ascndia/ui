import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Config = {
  radius: number
}

const configAtom = atomWithStorage<Config>("config", {
  radius: 0.5,
})

export function useConfig() {
  return useAtom(configAtom)
}

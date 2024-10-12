import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/ascndia.png" alt="@ascndia" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

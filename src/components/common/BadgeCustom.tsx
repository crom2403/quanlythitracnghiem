import React from "react"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"

export interface BadgeCustomProps {
  text: string
  type: "active" | "block"
}
const BadgeCustom = ({ text = "Hoạt động", type = "active" }: BadgeCustomProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        type === "active" ? "bg-green-100 text-green-600" : "bg-violet-100 text-violet-600",
        "rounded-full"
      )}
    >
      {text}
    </Badge>
  )
}

export default BadgeCustom

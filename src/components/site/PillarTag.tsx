import { Badge } from "@/components/ui/badge"
import type { Pillar } from "@/lib/types"

export function PillarTag({ pillar }: { pillar: Pillar }) {
  return (
    <Badge variant="outline" className="border-border/80 text-muted-foreground">
      {pillar}
    </Badge>
  )
}

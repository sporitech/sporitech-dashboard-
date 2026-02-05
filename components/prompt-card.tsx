import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Star, Play, Lock } from "lucide-react"

interface PromptCardProps {
  title: string
  description: string
  category: string
  isPremium: boolean
  usageCount: number
}

export function PromptCard({ title, description, category, isPremium, usageCount }: PromptCardProps) {
  return (
    <Card className="relative overflow-hidden group">
      {isPremium && (
        <div className="absolute top-0 right-0 p-2 z-10">
          <Badge variant="secondary" className="bg-primary text-primary-foreground gap-1">
            <Lock className="w-3 h-3" />
            Premium
          </Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2 uppercase text-[10px] tracking-wider">
            {category}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px]">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            4.8
          </span>
          <span>{usageCount.toLocaleString()} uses</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 border-t pt-4">
        <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
          <Copy className="w-3 h-3" />
          Copy
        </Button>
        <Button size="sm" className="flex-1 gap-2">
          <Play className="w-3 h-3" />
          Use
        </Button>
      </CardFooter>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Code2, ImageIcon, Zap, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Tokens Used",
    value: "42.5k",
    description: "+12% from last week",
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    border: "border-orange-500/20",
  },
  {
    title: "Content Pieces",
    value: "128",
    description: "24 new this month",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Code Snippets",
    value: "56",
    description: "Avg. 85% efficiency",
    icon: Code2,
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-500/10 to-indigo-500/10",
    border: "border-purple-500/20",
  },
  {
    title: "Media Assets",
    value: "34",
    description: "1.2GB generated",
    icon: ImageIcon,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/20",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={cn(
            "relative border overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm",
            stat.border
          )}
        >
          {/* Decorative Background Gradient */}
          <div className={cn(
            "absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-150",
            stat.gradient
          )} />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10 border-0">
            <CardTitle className="text-sm font-bold tracking-tight text-slate-600 dark:text-slate-400 uppercase">{stat.title}</CardTitle>
            <div className={cn(
              "p-2.5 rounded-xl bg-gradient-to-br text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-300",
              stat.gradient
            )}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>

          <CardContent className="relative z-10 pt-2">
            <div className="text-4xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-[10px] font-bold">12%</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { month: "January", usage: 186 },
  { month: "February", usage: 305 },
  { month: "March", usage: 237 },
  { month: "April", usage: 73 },
  { month: "May", usage: 209 },
  { month: "June", usage: 214 },
]

export function UsageChart() {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <CardTitle className="text-2xl">AI Resource Usage</CardTitle>
        <CardDescription className="text-sm">January - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ED985F" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ED985F" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Month</span>
                          <span className="font-bold text-slate-900 dark:text-white">{payload[0].payload.month}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Usage</span>
                          <span className="font-bold text-primary text-lg">{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="usage" fill="url(#colorUsage)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm border-t border-slate-200 dark:border-slate-800 pt-4">
        <div className="flex gap-2 font-semibold leading-none text-slate-900 dark:text-white">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-slate-600 dark:text-slate-400">Showing total tool usage for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}

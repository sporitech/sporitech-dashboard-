"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Square, Download, Mic, Trash2, Settings2, Volume2, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function VoiceLabPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, _setDuration] = useState(124) // Mock duration in seconds
  const [activeVoice, setActiveVoice] = useState("voice-1")

  // Animation for waveform
  const [waveformBars, setWaveformBars] = useState<number[]>([])

  useEffect(() => {
    // Generate initial random bars
    setWaveformBars(Array.from({ length: 60 }, () => Math.random() * 80 + 20))

    let interval: NodeJS.Timeout
    if (isRecording || isPlaying) {
      interval = setInterval(() => {
        setWaveformBars((prev) => {
          const newBars = [...prev]
          newBars.shift()
          newBars.push(Math.random() * 80 + 20)
          return newBars
        })
        if (isPlaying) {
          setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1))
        }
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPlaying, duration])

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Voice Lab</h1>
          <p className="text-muted-foreground">Professional AI voice synthesis and processing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button variant="outline" size="sm">
            <Settings2 className="w-4 h-4 mr-2" />
            Config
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Workspace</CardTitle>
                <CardDescription>Synthesize or record voice in real-time</CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full text-xs font-medium">
                <span
                  className={cn("w-2 h-2 rounded-full", isRecording ? "bg-red-500 animate-pulse" : "bg-green-500")}
                />
                {isRecording ? "RECORDING" : "READY"}
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Waveform Visualization */}
              <div className="h-48 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center gap-[2px] px-8 relative overflow-hidden group">
                {waveformBars.map((height, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1 rounded-full transition-all duration-100",
                      isRecording ? "bg-destructive" : "bg-primary/60",
                      isPlaying && i < (currentTime / duration) * 60 && "bg-primary",
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}

                {/* Time Indicator */}
                <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] font-mono opacity-50">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full w-12 h-12 bg-transparent"
                  onClick={() => {
                    setIsRecording(false)
                    setIsPlaying(false)
                    setCurrentTime(0)
                  }}
                >
                  <Square className="w-5 h-5 fill-current" />
                </Button>

                <Button
                  size="icon"
                  className={cn(
                    "rounded-full w-16 h-16 shadow-lg transition-transform hover:scale-105 active:scale-95",
                    isRecording ? "bg-destructive hover:bg-destructive/90" : "bg-primary",
                  )}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 fill-current text-destructive-foreground" />
                  ) : (
                    <Mic className="w-8 h-8 text-primary-foreground" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full w-12 h-12 bg-transparent"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={isRecording}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </Button>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Synthesize Speech
                </Button>
                <Button variant="secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text to Speech</TabsTrigger>
              <TabsTrigger value="clone">Voice Cloning</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-4">
              <textarea
                className="w-full h-40 bg-muted/50 border rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter the text you want to convert to professional AI voice..."
              />
            </TabsContent>
            <TabsContent value="clone" className="mt-4">
              <div className="border-2 border-dashed rounded-xl p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Mic className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Sample</h3>
                  <p className="text-xs text-muted-foreground">Upload 30-60 seconds of clear audio to clone a voice</p>
                </div>
                <Button variant="outline">Select Audio File</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Voice Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-50">Model</label>
                <Select value={activeVoice} onValueChange={setActiveVoice}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a voice model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voice-1">Sporitech Elite (Male)</SelectItem>
                    <SelectItem value="voice-2">Aurora Smooth (Female)</SelectItem>
                    <SelectItem value="voice-3">Cyborg Neutral (Robot)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider opacity-50">Stability</label>
                    <span className="text-xs font-mono">65%</span>
                  </div>
                  <Slider defaultValue={[65]} max={100} step={1} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider opacity-50">Clarity</label>
                    <span className="text-xs font-mono">82%</span>
                  </div>
                  <Slider defaultValue={[82]} max={100} step={1} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider opacity-50">Pace</label>
                    <span className="text-xs font-mono">1.0x</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm">Usage Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Characters remaining</span>
                  <span className="font-bold">42,500 / 50k</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[85%]" />
                </div>
                <p className="text-[10px] text-muted-foreground pt-1">Resets in 14 days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

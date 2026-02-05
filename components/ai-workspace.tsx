"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Copy, RotateCcw, Save, Sparkles, Download } from "lucide-react"

interface AIWorkspaceProps {
  title: string
  description: string
  placeholder: string
  toolType: "content" | "code" | "voice" | "media"
}

export function AIWorkspace({ title, description, placeholder, toolType }: AIWorkspaceProps) {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleGenerate = async () => {
    if (!input.trim()) return
    setIsGenerating(true)
    setOutput("")

    try {
      const systemPrompts = {
        content: "You are a professional content architect. Write high-quality, engaging, and well-structured content.",
        code: "You are an expert software engineer. Provide clean, efficient, and well-documented code snippets.",
        voice: "You are an AI voice synthesis expert. Provide descriptive text for voice generation.",
        media: "You are an AI image generation expert. Provide detailed prompts for DALL-E or Midjourney."
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: systemPrompts[toolType] || systemPrompts.content
            },
            {
              role: 'user',
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        })
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        setOutput(data.choices[0].message.content);
      } else {
        setOutput("Error: Failed to generate output. Please check your API key or connection.");
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      setOutput("An error occurred while connecting to the AI service.");
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="grid gap-6 h-full">
      <header>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2 flex-1 min-h-[500px]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Input & Parameters
            </CardTitle>
            <CardDescription>Describe what you want to create.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <Textarea
              placeholder={placeholder}
              className="flex-1 min-h-[200px] resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Button onClick={handleGenerate} disabled={isGenerating || !input} className="flex-1 gap-2">
                {isGenerating ? "Generating..." : "Generate"}
                <Send className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setInput("")}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 z-10 flex gap-2">
            <Button variant="ghost" size="icon" disabled={!output}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" disabled={!output}>
              <Save className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" disabled={!output}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <Tabs defaultValue="preview" className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <TabsList className="w-fit">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <TabsContent value="preview" className="mt-0 h-full">
                {output ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {toolType === "media" && output.includes("/placeholder.svg") ? (
                      <img src="/generated-ai-image.jpg" alt="Generated" className="rounded-lg w-full" />
                    ) : (
                      <pre className="p-4 bg-muted rounded-lg whitespace-pre-wrap font-sans">{output}</pre>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                    <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                    <p>Generated output will appear here.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="raw">
                <pre className="p-4 bg-muted rounded-lg text-xs font-mono">
                  {output
                    ? JSON.stringify({ tool: toolType, output, timestamp: new Date().toISOString() }, null, 2)
                    : "No data available."}
                </pre>
              </TabsContent>
              <TabsContent value="history">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Recent generations will appear here.</p>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

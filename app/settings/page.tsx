"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState("gpt-4o")
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    })
    setLoading(false)
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and system settings.</p>
        </header>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure your AI model endpoints and access keys.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">OpenAI API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Default Model</Label>
                <Input
                  id="model"
                  placeholder="gpt-4o"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose how you want to be notified about your usage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Usage Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts when reaching 80% of your token limit.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Prompt Notifications</Label>
                  <p className="text-sm text-muted-foreground">Be notified when new premium prompts are added.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

import { AIWorkspace } from "@/components/ai-workspace"

export default function CodeToolPage() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <AIWorkspace
        title="Code Tool"
        description="Write, refactor, and debug code snippets across multiple languages."
        placeholder="Describe the function or component you need..."
        toolType="code"
      />
    </main>
  )
}

"use client";

import React, { useState } from 'react';
import { Send, Loader2, FileText, Sparkles, Download, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateContent = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setContent('');

    try {
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
              content: 'You are a professional content architect. Write high-quality, engaging, and well-structured content.'
            },
            {
              role: 'user',
              content: `Write a comprehensive, high-quality blog post or article about: "${topic}". 

Include:
- An engaging introduction
- Well-structured main content with key points
- Relevant examples or insights
- A strong conclusion

Make it informative, engaging, and professionally written.`
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        })
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        setContent(data.choices[0].message.content);
      } else if (data.error) {
        setError(`API Error: ${data.error.message}`);
      } else {
        setError('Failed to generate content. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the AI service.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateContent();
    }
  };

  const downloadContent = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic || 'content'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-lg bg-gradient-to-br from-[#ED985F] to-[#F7B980]">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
              Content Architect
            </h1>
            <p className="text-lg text-muted-foreground">
              Generate professional blog posts, articles, and copy powered by AI
            </p>
          </div>
        </div>

        {/* Input Card */}
        <Card className="mb-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800">
            <CardTitle>Create Your Content</CardTitle>
            <CardDescription>Enter a topic and let AI generate high-quality content</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
              What topic would you like to write about?
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., The Future of AI in Healthcare, Best Practices for Remote Teams..."
                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded-lg outline-none transition-all focus:ring-2 focus:ring-[#ED985F] focus:border-transparent"
                disabled={loading}
              />
              <Button
                onClick={generateContent}
                disabled={loading || !topic.trim()}
                className="px-6 gap-2 bg-gradient-to-r from-[#ED985F] to-[#F7B980] hover:shadow-lg text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Output Card */}
        {(content || loading) && (
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-[#ED985F]/5 to-[#F7B980]/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-[#ED985F] to-[#F7B980] rounded-lg text-white">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle>Generated Content</CardTitle>
                    <CardDescription>{topic}</CardDescription>
                  </div>
                </div>
                {content && !loading && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="gap-1.5"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadContent}
                      className="gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setContent('')}
                      className="gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="mb-4">
                    <Loader2 className="w-12 h-12 animate-spin text-[#ED985F]" />
                  </div>
                  <p className="text-muted-foreground">Creating your content...</p>
                </div>
              ) : (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200 text-base">
                    {content}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!content && !loading && (
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
            <CardContent className="pt-12 pb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-gradient-to-br from-[#ED985F]/10 to-[#F7B980]/10">
                <Sparkles className="w-12 h-12 text-[#ED985F]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                Ready to Create Amazing Content?
              </h3>
              <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
                Enter any topic above and let AI generate professional, engaging content optimized for your needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                  <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-200">Blog Posts</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">Engaging articles for your audience</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                  <h4 className="font-semibold mb-1 text-orange-900 dark:text-orange-200">Articles</h4>
                  <p className="text-sm text-orange-800 dark:text-orange-300">In-depth professional content</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                  <h4 className="font-semibold mb-1 text-purple-900 dark:text-purple-200">Copy</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-300">Marketing and promotional text</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
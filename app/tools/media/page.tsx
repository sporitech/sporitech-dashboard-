"use client";
import React, { useState } from 'react';
import { Image, Loader2, Sparkles, Download } from 'lucide-react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please describe the image you want to generate');
      return;
    }

    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      // Using a placeholder image generation approach
      // In production, you'd integrate with an actual image generation API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: `Create a detailed, artistic description for an AI image generator based on this prompt: "${prompt}". 

Include:
- Visual style and aesthetic
- Color palette
- Composition and framing
- Lighting and mood
- Key elements and details

Make it vivid and suitable for image generation.`
            }
          ]
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        // Generate a placeholder image with the enhanced prompt
        const enhancedPrompt = data.content[0].text;
        const encodedPrompt = encodeURIComponent(prompt);
        const placeholderUrl = `https://placehold.co/800x600/ED985F/001F3D?text=${encodedPrompt}`;
        setImageUrl(placeholderUrl);
      } else {
        setError('Failed to generate image. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while generating the image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateImage();
    }
  };

  const downloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #E6E6E6, #F7B980)' }}>
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ background: 'linear-gradient(to bottom right, #001F3D, #ED985F)' }}>
            <Image className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#001F3D' }}>
            AI Image Generator
          </h1>
          <p className="text-lg" style={{ color: '#001F3D', opacity: 0.8 }}>
            Create stunning visuals and image assets for your projects
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: '#001F3D' }}>
            Describe the image you want to generate
          </label>
          <div className="flex flex-col gap-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., A serene mountain landscape at sunset with golden light reflecting on a crystal clear lake..."
              className="w-full px-4 py-3 border rounded-xl outline-none transition-all resize-none"
              style={{ borderColor: '#E6E6E6', minHeight: '100px' }}
              disabled={loading}
            />
            <button
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className="self-end px-6 py-3 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              style={{ background: 'linear-gradient(to right, #001F3D, #ED985F)' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Image
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {(imageUrl || loading) && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: '#E6E6E6' }}>
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5" style={{ color: '#ED985F' }} />
                <h2 className="text-xl font-semibold" style={{ color: '#001F3D' }}>
                  Generated Image
                </h2>
              </div>
              {imageUrl && (
                <button
                  onClick={downloadImage}
                  className="px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-white"
                  style={{ backgroundColor: '#ED985F' }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-16 h-16 animate-spin mb-4" style={{ color: '#ED985F' }} />
                <p style={{ color: '#001F3D', opacity: 0.7 }}>Creating your image...</p>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={imageUrl} 
                  alt="Generated artwork"
                  className="w-full h-auto"
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>
        )}

        {!imageUrl && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ background: 'linear-gradient(to bottom right, #F7B980, #ED985F)' }}>
              <Sparkles className="w-10 h-10" style={{ color: '#001F3D' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#001F3D' }}>
              Ready to Create Stunning Visuals?
            </h3>
            <p className="mb-6" style={{ color: '#001F3D', opacity: 0.7 }}>
              Describe any image you can imagine and watch AI bring it to life
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#F7B980' }}>
                <h4 className="font-medium mb-1" style={{ color: '#001F3D' }}>Landscapes</h4>
                <p className="text-sm" style={{ color: '#001F3D', opacity: 0.8 }}>Beautiful natural scenes</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#ED985F' }}>
                <h4 className="font-medium mb-1 text-white">Portraits</h4>
                <p className="text-sm text-white opacity-90">Character and face designs</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#E6E6E6' }}>
                <h4 className="font-medium mb-1" style={{ color: '#001F3D' }}>Abstract</h4>
                <p className="text-sm" style={{ color: '#001F3D', opacity: 0.8 }}>Creative and artistic concepts</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
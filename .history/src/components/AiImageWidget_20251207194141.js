import React, { useState } from 'react';

// This widget is API-agnostic so you can plug in any AI image
// provider (OpenAI, Stability, etc.). Replace `fakeGenerateImage` with
// a real API call when you are ready.

async function fakeGenerateImage(prompt) {
  // Simulate latency for demo purposes.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Placeholder gradient image using a public pattern from https://picsum.photos
  // Replace this URL with one coming from your real AI backend.
  const encoded = encodeURIComponent(prompt || 'abstract digital art');
  return `https://picsum.photos/seed/${encoded}/512/320`;
}

const AiImageWidget = () => {
  const [prompt, setPrompt] = useState('Futuristic digital city, neon, cinematic');
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (event) => {
    event.preventDefault();
    setError(null);

    if (!prompt.trim()) {
      setError('Please enter a prompt first.');
      return;
    }

    try {
      setIsLoading(true);
      const url = await fakeGenerateImage(prompt.trim());
      setImageUrl(url);
    } catch (err) {
      setError('Failed to generate image. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleGenerate} className="space-y-3">
        <label className="block text-xs font-medium text-slate-300" htmlFor="prompt">
          Image prompt
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="prompt"
            type="text"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-transparent"
            placeholder="Describe what you want to see..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-emerald-950 shadow hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>

      {error && (
        <p className="text-xs text-rose-400">{error}</p>
      )}

      <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-950/60 flex items-center justify-center min-h-[8rem] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-xs text-slate-500 px-4 text-center">
            Generated image preview will appear here once you submit a prompt.
          </p>
        )}
      </div>

      <p className="text-[11px] leading-relaxed text-slate-500">
        To connect this widget to a real AI backend, replace the
        <code className="mx-1 px-1 rounded bg-slate-800/70 text-[10px]">fakeGenerateImage</code>
        function with an API call and handle the returned image URL.
      </p>
    </div>
  );
};

export default AiImageWidget;

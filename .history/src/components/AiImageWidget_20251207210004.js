import React, { useState } from 'react';

// Pollinations AI image generator
async function generateWithPollinations(prompt) {
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://pollinations.ai/p/${encodedPrompt}`;
}

const AiImageWidget = () => {
  const [prompt, setPrompt] = useState('Futuristic digital city, neon, cinematic');
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleGenerate = async (event) => {
    event.preventDefault();
    setError(null);
    setImageLoaded(false);

    if (!prompt.trim()) {
      setError('Please enter a prompt first.');
      return;
    }

    try {
      setIsLoading(true);
      const url = await generateWithPollinations(prompt.trim());
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

      <div className="relative rounded-xl border border-dashed border-slate-700/80 bg-slate-950/60 flex items-center justify-center min-h-[8rem] overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900/50">
            {/* Animated dots loader */}
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-300"></span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-450"></span>
            </div>
          </div>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt={prompt}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {!imageUrl && !isLoading && (
          <p className="text-xs text-slate-500 px-4 text-center">
            Generated image preview will appear here once you submit a prompt.
          </p>
        )}
      </div>

      <p className="text-[11px] leading-relaxed text-slate-500">
        This widget now uses Pollinations AI. Change the prompt and generate images instantly.
      </p>

      {/* Tailwind custom animation for delay */}
      <style>
        {`
          .delay-150 { animation-delay: 0.15s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-450 { animation-delay: 0.45s; }
        `}
      </style>
    </div>
  );
};

export default AiImageWidget;

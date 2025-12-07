import React, { useState } from 'react';
import { Sparkles, RefreshCw, Download, Image as ImageIcon } from 'lucide-react';

const AIWidget = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Combined loading state

  const generateImage = async () => {
    if (!prompt) return;
    
    setLoading(true);
    setImage(null);

    // 1. Create the URL immediately
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 10000);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&seed=${seed}`;

    // 2. Set image immediately, but keep "loading" true until it loads
    setImage(url);
  };

  return (
    <div className="w-full font-sans text-white">
      
      {/* --- INPUT AREA --- */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Sparkles size={18} className="text-pink-400" />
          </div>
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe an image (e.g., 'Cyberpunk city with neon rain')..."
            className="w-full bg-[#0f172a] border border-gray-700 text-gray-200 text-sm rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent block pl-10 p-3 outline-none transition-all"
            onKeyDown={(e) => e.key === 'Enter' && generateImage()}
          />
        </div>
        
        <button 
          onClick={generateImage}
          disabled={loading || !prompt}
          className={`
            flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all
            ${loading || !prompt 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-500/25'
            }
          `}
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate Art
            </>
          )}
        </button>
      </div>

      {/* --- DISPLAY AREA --- */}
      <div className="relative aspect-video bg-[#0f172a] rounded-2xl border border-gray-700 overflow-hidden flex items-center justify-center group">
        
        {/* 1. LOADING SPINNER (Shows if loading is true) */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f172a] z-10">
             <div className="w-12 h-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-3"></div>
             <p className="text-gray-400 text-sm animate-pulse">Creating masterpiece...</p>
          </div>
        )}

        {/* 2. IMAGE (Hidden until loaded) */}
        {image ? (
          <>
            <img 
              src={image} 
              alt="Generated AI" 
              // FIXED: Only show when loading is false
              className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
              // FIXED: When browser finishes downloading, turn off loading
              onLoad={() => setLoading(false)}
            />
            
            {!loading && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Prompt</p>
                  <p className="text-sm font-medium text-white line-clamp-1">{prompt}</p>
                </div>
                <a 
                  href={image} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm transition"
                  title="Download"
                >
                  <Download size={18} />
                </a>
              </div>
            )}
          </>
        ) : (
          // 3. EMPTY STATE (Shows only if no image and not loading)
          !loading && (
            <div className="text-center text-gray-600">
              <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Enter a prompt above to create magic.</p>
            </div>
          )
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Powered by Pollinations.ai (No API Key Required)
      </p>
    </div>
  );
};

export default AIWidget;
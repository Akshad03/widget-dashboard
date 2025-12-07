import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Trash2, CheckCircle } from 'lucide-react';

const FileUploadWidget = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // --- 1. FILE HANDLING LOGIC ---
  const processFiles = (newFiles) => {
    const processed = Array.from(newFiles).map(file => ({
      id: Math.random().toString(36).substring(7), // Unique ID for React keys
      obj: file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type,
      // "Little Detail": Create a temporary URL for image previews
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    
    // Add new files to existing list
    setFiles(prev => [...prev, ...processed]);
  };

  // --- 2. DRAG & DROP EVENTS (Task Requirement) ---
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent browser from opening the file
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (id) => {
    // Revoke object URL to avoid memory leaks (Senior dev detail)
    const fileToRemove = files.find(f => f.id === id);
    if (fileToRemove?.preview) URL.revokeObjectURL(fileToRemove.preview);
    
    setFiles(files.filter(f => f.id !== id));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
  }, []);

  return (
    <div className="w-full font-sans text-white">
      
      {/* --- DROP ZONE AREA --- */}
      <div 
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-teal-400 bg-teal-400/10 scale-[1.02]' 
            : 'border-gray-600 bg-[#0f172a] hover:border-gray-500'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => processFiles(e.target.files)}
        />
        
        <div className="flex flex-col items-center gap-3">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-teal-500/20' : 'bg-gray-800'}`}>
            <Upload size={24} className={isDragging ? 'text-teal-400' : 'text-gray-400'} />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-medium text-gray-200">
              Drag & Drop files here
            </p>
            <p className="text-sm text-gray-500">
              or <button onClick={() => fileInputRef.current.click()} className="text-teal-400 hover:underline font-medium">browse</button> to upload
            </p>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Supports: JPG, PNG, PDF, DOCX (Max 10MB)
          </p>
        </div>
      </div>

      {/* --- FILE LIST (Task Requirement) --- */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Attached Documents ({files.length})
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {files.map((file) => (
              <div 
                key={file.id} 
                className="group flex items-center justify-between bg-[#1e293b] border border-gray-700 p-3 rounded-xl hover:border-gray-500 transition-colors"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  {/* File Preview / Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-700">
                    {file.preview ? (
                      <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="text-blue-400" size={24} />
                    )}
                  </div>
                  
                  {/* File Details */}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-200 truncate pr-4">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pr-2">
                  {/* Success Indicator */}
                  <CheckCircle size={16} className="text-teal-500" />
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                    title="Remove file"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadWidget;
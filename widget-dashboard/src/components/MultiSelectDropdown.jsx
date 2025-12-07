import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Check, Search, Loader2 } from 'lucide-react';

const MultiSelectDropdown = () => {
  // --- STATE MANAGEMENT ---
  const [options, setOptions] = useState([]);          // All available data from API
  const [selected, setSelected] = useState([]);        // Items user has picked
  const [search, setSearch] = useState("");            // Text in the search bar
  const [isOpen, setIsOpen] = useState(false);         // Dropdown open/close
  const [isLoading, setIsLoading] = useState(false);   // Loading state for async
  
  const dropdownRef = useRef(null); // To detect clicks outside

  // --- 1. ASYNC DATA SIMULATION (Task Requirement) ---
  // In a real interview, you say: "I'm simulating a 1.5s API call here."
  useEffect(() => {
    setIsLoading(true);
    const fetchOptions = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Data (e.g., Property Types from your PDF example)
      const data = [
        { id: 1, label: "Office Space" },
        { id: 2, label: "Industrial Plot" },
        { id: 3, label: "Residential Apartment" },
        { id: 4, label: "Commercial Shop" },
        { id: 5, label: "Agricultural Land" },
        { id: 6, label: "Warehouse" },
        { id: 7, label: "Villa" },
      ];
      setOptions(data);
      setIsLoading(false);
    };

    fetchOptions();
    
    // "Little Detail": Close dropdown if clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- 2. FILTER LOGIC ---
  // Filter options based on search text AND hide already selected items
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase()) && 
    !selected.find(s => s.id === opt.id)
  );

  // --- 3. HANDLERS ---
  const toggleSelect = (option) => {
    setSelected([...selected, option]);
    setSearch(""); // Reset search after picking
  };

  const removeOption = (optionId) => {
    setSelected(selected.filter(item => item.id !== optionId));
  };

  return (
    <div className="w-full max-w-md mx-auto font-sans" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Property Sub-Type <span className="text-red-500">*</span>
      </label>

      {/* Main Container */}
      <div 
        className={`relative bg-[#1e293b] border transition-all rounded-xl p-2 pr-24 min-h-[50px] cursor-text
          ${isOpen ? 'border-teal-500 ring-1 ring-teal-500' : 'border-gray-600 hover:border-gray-500'}
        `}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-wrap gap-2">
          {/* SELECTED CHIPS (Task Requirement) */}
          {selected.map(item => (
            <div key={item.id} className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-teal-500/30">
              <span>{item.label}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening dropdown when clicking X
                  removeOption(item.id);
                }}
                className="hover:text-white transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* SEARCH INPUT */}
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={selected.length === 0 ? "Select properties..." : ""}
            className="bg-transparent outline-none flex-1 min-w-[120px] text-white placeholder-gray-500 py-1"
            onFocus={() => setIsOpen(true)}
          />

          {/* ACTIONS RIGHT SIDE */}
          <div className="absolute right-3 top-3 flex items-center gap-2 text-gray-400">
            {isLoading ? (
              <Loader2 size={18} className="animate-spin text-teal-500" />
            ) : (
              <>
                {selected.length > 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected([]);
                    }}
                    className="hover:text-red-400 transition mr-1"
                    title="Clear All"
                  >
                    <X size={18} />
                  </button>
                )}
                <ChevronDown size={20} className={`transition duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </>
            )}
          </div>
        </div>

        {/* DROPDOWN MENU */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-[#1e293b] border border-gray-600 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading options...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {search ? "No matching results" : "All items selected"}
              </div>
            ) : (
              filteredOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => toggleSelect(opt)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700/50 text-gray-200 transition flex justify-between items-center group"
                >
                  {opt.label}
                  <Check size={16} className="opacity-0 group-hover:opacity-50 text-teal-500" />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
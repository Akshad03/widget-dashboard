import React, { useState } from 'react';
import { format } from 'date-fns';
import DateTimePicker from './components/DateTimePicker';
import MultiSelectDropdown from './components/MultiSelectDropdown';

function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans pb-20">
      
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Frontend Task Showcase
          </h1>
          <p className="text-gray-400">React Modular Components • Tailwind CSS</p>
        </div>

        {/* TASK 1: DATE WIDGET */}
        <section className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700/50 shadow-xl">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-xl font-semibold text-blue-400">01. DateTime Customization</h2>
            <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded">Completed</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Current Selection</p>
              <div className="text-2xl font-mono text-white">
                {format(selectedDate, 'dd MMM yyyy • hh:mm a')}
              </div>
            </div>
            
            <button 
              onClick={() => setShowPicker(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition shadow-lg shadow-blue-500/20"
            >
              Open Picker
            </button>
          </div>
        </section>

        {/* TASK 2: DROPDOWN WIDGET */}
        <section className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700/50 shadow-xl relative z-10">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-xl font-semibold text-teal-400">02. Async Multi-Select</h2>
            <span className="text-xs bg-teal-500/10 text-teal-300 px-2 py-1 rounded">New</span>
          </div>
          
          <div className="py-4">
            <MultiSelectDropdown />
          </div>
          
          <p className="text-xs text-gray-500 mt-4 italic">
            * Tapping input simulates a 1.5s API fetch. Try typing to search.
          </p>
        </section>

      </div>

      {/* Task 1 Modal (Rendered outside layout) */}
      {showPicker && (
        <DateTimePicker 
          initialDate={selectedDate}
          onSave={(date) => {
            setSelectedDate(date);
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}

export default App;
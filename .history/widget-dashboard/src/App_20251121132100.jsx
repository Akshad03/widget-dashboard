import React, { useState } from 'react';
import DateTimePicker from './components/DatePicker.jsx';
import { format } from 'date-fns';

function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white p-4">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
        React Widget Dashboard
      </h1>

      {/* Date Display Card */}
      <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 shadow-2xl text-center w-full max-w-md">
        <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Current Selection</p>
        
        <div className="text-5xl font-mono font-bold text-white mb-2">
          {format(selectedDate, 'dd MMM')}
        </div>
        <div className="text-xl text-teal-400 mb-8 font-medium">
          {format(selectedDate, 'yyyy • hh:mm a')}
        </div>

        {/* Trigger Button */}
        <button 
          onClick={() => setShowPicker(true)}
          className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
        >
          Open Date Picker
        </button>
      </div>

      {/* Render Widget Conditionally */}
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
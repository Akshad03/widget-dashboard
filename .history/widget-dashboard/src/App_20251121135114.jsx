import React, { useState } from 'react';
import { format } from 'date-fns';
import DateTimePicker from './components/DatePicker';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import ChartWidget from './components/ChartWidget';
import FileUploadWidget from './components/FileUploadWidget';
import NotificationWidget from './components/NotificationWidget';
import AIWidget from './components/AIWidget'; // Import Task 5

function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 sm:p-8 font-sans pb-20">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* ... Header ... */}
        <div className="text-center space-y-2 mt-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                Frontend Task Showcase
            </h1>
        </div>

        {/* ... Previous Tasks ... */}
        
        {/* TASK 1: DATE */}
        <section className="bg-[#1e293b] p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
             <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-blue-400">01. DateTime Customization</h2>
            </div>
             {/* ... content ... */}
             <button onClick={() => setShowPicker(true)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition">
              Open Picker
            </button>
        </section>

        {/* TASK 2: DROPDOWN */}
        <section className="bg-[#1e293b] p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl z-10 relative">
           <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-teal-400">02. Async Multi-Select</h2>
            </div>
            <MultiSelectDropdown />
        </section>

        {/* TASK 3: CHART */}
        <section className="bg-[#1e293b] p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-purple-400">03. Dynamic Analytics Chart</h2>
            </div>
            <ChartWidget />
        </section>

        {/* TASK 4: FILE UPLOAD */}
        <section className="bg-[#1e293b] p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-pink-400">04. Drag & Drop Upload</h2>
            </div>
            <FileUploadWidget />
        </section>

        {/* TASK 5: FIREBASE NOTIFICATIONS */}
        <section className="bg-[#1e293b] p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-xl font-semibold text-yellow-400">05. Notification & Crashlytics</h2>
            <span className="text-xs bg-yellow-500/10 text-yellow-300 px-2 py-1 rounded">Service Integration</span>
          </div>
          <NotificationWidget />
        </section>

      </div>

       {/* ... Modal ... */}
       {showPicker && (
        <DateTimePicker 
          initialDate={selectedDate}
          onSave={(date) => { setSelectedDate(date); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}

export default App;
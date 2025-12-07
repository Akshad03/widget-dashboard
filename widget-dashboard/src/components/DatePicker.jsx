import React, { useState } from 'react';
import { 
  format, addDays, subMonths, addMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, 
  isBefore, startOfDay 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateTimePicker = ({ onSave, onClose, initialDate = new Date() }) => {
  const [tempDate, setTempDate] = useState(initialDate);
  const [viewDate, setViewDate] = useState(initialDate); // Controls the month being viewed

  // --- 1. CALENDAR LOGIC ---
  // This generates all the days to display in the grid (including grayed-out days from prev/next months)
  const generateCalendarDays = (date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const days = generateCalendarDays(viewDate);
  const today = startOfDay(new Date());

  // --- 2. HANDLERS ---
  const handleTimeChange = (type, value) => {
    const newDate = new Date(tempDate);
    let val = parseInt(value, 10);
    if (isNaN(val)) return;

    if (type === 'hour') {
      if (val > 23) val = 23;
      if (val < 0) val = 0;
      newDate.setHours(val);
    } else {
      if (val > 59) val = 59;
      if (val < 0) val = 0;
      newDate.setMinutes(val);
    }
    setTempDate(newDate);
  };

  const handleQuickOption = (option) => {
    const now = new Date();
    let newDate = new Date(now);
    
    // Preserve current time selection, just change the date
    newDate.setHours(tempDate.getHours(), tempDate.getMinutes());

    if (option === 'Tomorrow') newDate = addDays(now, 1);
    if (option === 'Next Week') newDate = addDays(now, 7);
    // 'Today' is default

    setTempDate(newDate);
    setViewDate(newDate); // Jump calendar to that date
  };

  return (
    // Overlay
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      
      {/* Main Widget Card */}
      <div className="bg-[#111827] w-full max-w-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden font-sans">
        
        {/* Header: Month Navigation */}
        <div className="flex justify-between items-center p-4 bg-[#1f2937]">
          <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 hover:bg-gray-700 rounded-full text-white transition">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-white tracking-wide">
            {format(viewDate, 'MMMM yyyy')}
          </h2>
          <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 hover:bg-gray-700 rounded-full text-white transition">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="p-4">
          {/* Day Labels */}
          <div className="grid grid-cols-7 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {days.map((day) => {
              const isCurrentMonth = isSameMonth(day, viewDate);
              const isSelected = isSameDay(day, tempDate);
              const isPast = isBefore(day, today);

              return (
                <button
                  key={day.toString()}
                  disabled={isPast}
                  onClick={() => {
                    const newDate = new Date(day);
                    newDate.setHours(tempDate.getHours(), tempDate.getMinutes());
                    setTempDate(newDate);
                  }}
                  className={`
                    h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all duration-200
                    ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300'}
                    ${isPast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-700'}
                    ${isSelected ? 'bg-teal-500 text-white font-bold shadow-lg shadow-teal-500/30 hover:bg-teal-400' : ''}
                  `}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {/* Quick Options (Task Requirement) */}
          <div className="flex justify-center gap-3 mb-6">
            {['Today', 'Tomorrow', 'Next Week'].map(opt => (
              <button 
                key={opt}
                onClick={() => handleQuickOption(opt)}
                className="px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-full text-xs text-gray-300 hover:bg-gray-700 hover:border-gray-500 transition"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Time Selection */}
          <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex flex-col items-center">
              <input 
                type="number" 
                value={format(tempDate, 'HH')} 
                onChange={(e) => handleTimeChange('hour', e.target.value)}
                className="bg-transparent text-2xl font-bold text-white text-center w-12 outline-none border-b-2 border-transparent focus:border-teal-500 transition-colors"
              />
              <span className="text-[10px] text-gray-500 uppercase mt-1">Hour</span>
            </div>
            <span className="text-2xl font-bold text-gray-500 -mt-4">:</span>
            <div className="flex flex-col items-center">
              <input 
                type="number" 
                value={format(tempDate, 'mm')} 
                onChange={(e) => handleTimeChange('minute', e.target.value)}
                className="bg-transparent text-2xl font-bold text-white text-center w-12 outline-none border-b-2 border-transparent focus:border-teal-500 transition-colors"
              />
              <span className="text-[10px] text-gray-500 uppercase mt-1">Minute</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onClose}
              className="py-2.5 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button 
              onClick={() => onSave(tempDate)}
              className="py-2.5 rounded-lg text-sm font-semibold bg-teal-600 text-white shadow-lg shadow-teal-900/20 hover:bg-teal-500 transition transform active:scale-95"
            >
              Set Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
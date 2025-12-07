import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { Filter, Calendar, PieChart as PieIcon, BarChart3, TrendingUp } from 'lucide-react';

const ChartWidget = () => {
  const [chartType, setChartType] = useState('bar'); // 'bar', 'line', 'pie'
  const [timeRange, setTimeRange] = useState('7d');  // '7d', '1m', '1y'

  // --- 1. DYNAMIC DATA SIMULATION ---
  // In an interview, explain: "I'm using useMemo so data recalculates only when filters change."
  const data = useMemo(() => {
    // Simulating different data ranges
    const count = timeRange === '7d' ? 7 : timeRange === '1m' ? 12 : 5;
    return Array.from({ length: count }).map((_, i) => ({
      name: timeRange === '7d' ? `Day ${i + 1}` : timeRange === '1m' ? `Week ${i + 1}` : `202${i}`,
      sales: Math.floor(Math.random() * 5000) + 2000,
      revenue: Math.floor(Math.random() * 8000) + 3000,
      leads: Math.floor(Math.random() * 1000) + 500,
    }));
  }, [timeRange]);

  // Colors for Pie Chart
  const COLORS = ['#14b8a6', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'];

  // --- 2. CUSTOM TOOLTIP (Task Requirement) ---
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e293b] border border-gray-700 p-4 rounded-xl shadow-2xl text-sm">
          <p className="text-gray-400 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color || entry.payload.fill }}
              />
              <span className="text-gray-200 capitalize">{entry.name}:</span>
              <span className="font-bold font-mono text-white">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full font-sans text-white">
      
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        
        {/* Left: Chart Type Selector (Task Requirement) */}
        <div className="bg-[#0f172a] p-1 rounded-lg flex border border-gray-700">
          <button 
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              chartType === 'bar' ? 'bg-[#1e293b] text-teal-400 shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 size={16} /> Bar
          </button>
          <button 
            onClick={() => setChartType('line')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              chartType === 'line' ? 'bg-[#1e293b] text-blue-400 shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp size={16} /> Line
          </button>
          <button 
            onClick={() => setChartType('pie')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              chartType === 'pie' ? 'bg-[#1e293b] text-purple-400 shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <PieIcon size={16} /> Pie
          </button>
        </div>

        {/* Right: Date Range Filter (Task Requirement) */}
        <div className="flex items-center gap-2 bg-[#0f172a] px-3 py-2 rounded-lg border border-gray-700 text-sm">
          <Calendar size={16} className="text-gray-400" />
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent outline-none text-gray-200 cursor-pointer"
          >
            <option value="7d">Last 7 Days</option>
            <option value="1m">Last Month</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* --- CHART RENDERING AREA --- */}
      <div className="h-[350px] w-full bg-[#1e293b]/50 rounded-2xl border border-gray-700/50 p-2 md:p-6 relative">
        <ResponsiveContainer width="100%" height="100%">
          {/* CONDITIONAL RENDERING based on chartType */}
          
          {chartType === 'bar' && (
            <BarChart data={data} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.2 }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="sales" name="Sales" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}

          {chartType === 'line' && (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} fillOpacity={0} fill="transparent" />
            </AreaChart>
          )}

          {chartType === 'pie' && (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="revenue"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle"/>
            </PieChart>
          )}

        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        Dynamic Re-rendering Active • {data.length} data points loaded
      </div>
    </div>
  );
};

export default ChartWidget;
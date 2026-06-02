"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "@/lib/data";

const fmt = (v: number) => `₦${(v / 1000000).toFixed(1)}M`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-zinc-700 rounded-xl p-4 shadow-2xl backdrop-blur-md">
        <p className="text-blue-950 font-medium mb-3 text-sm">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="flex items-center gap-2 text-sm mb-1 last:mb-0" style={{ color: p.color }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></span>
            {p.name}: <strong className="text-black/90 font-semibold">{fmt(p.value)}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <div className=" bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 flex items-start justify-between bg-zinc-950">
        <div>
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            Revenue vs Expenses
          </h3>
          <p className=" text-zinc-400 mt-1 text-sm">
            6-month financial overview
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="rev-pill rev-pill--green bg-emerald-500/10 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full border border-emerald-500/20 flex items-center gap-1">
            ↑ 8.9% vs last period
          </span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="px-8 pb-8 bg-black">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart 
            data={revenueData} 
            margin={{top: 8, right: 8, left: 0, bottom: 0}}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e40af" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#db2777" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#db2777" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#27272a" 
              strokeOpacity={0.6}
            />
            
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: "#71717a" }} 
              axisLine={false} 
              tickLine={false}
            />
            
            <YAxis 
              tickFormatter={fmt} 
              tick={{ fontSize: 11, fill: "#71717a" }} 
              axisLine={false} 
              tickLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              wrapperStyle={{ 
                fontSize: 13, 
                paddingTop: 18,
                color: "#a1a1aa"
              }} 
            />
            
            <Area 
              type="monotone" 
              dataKey="revenue" 
              name="Revenue" 
              stroke="#1e40af" 
              strokeWidth={3} 
              fill="url(#colorRevenue)" 
            />
            
            <Area 
              type="monotone" 
              dataKey="expenses" 
              name="Expenses" 
              stroke="#db2777" 
              strokeWidth={3} 
              fill="url(#colorExpenses)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
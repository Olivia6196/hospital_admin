"use client";

import { patientTrendData } from "@/lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl px-4 py-3 text-sm">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((p: any, index: number) => (
          <p key={index} className="flex items-center gap-2 text-gray-700">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: p.color }}
            ></span>
            <span>{p.name}:</span>
            <strong className="ml-auto">{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PatientTrendChart() {
  return (
    <div className="bg-black/35 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl h-full lg:h-93">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Patient Flow</h3>
          <p className="text-blue-200 text-sm mt-1">
            6-month admission & discharge trend
          </p>
        </div>
         <div className="bg-white rounded-2xl font-medium">
        <select className="bg-white/10 border border-white/20 text-blue-950 rounded-2xl px-4.5 py-2 text-[0.95rem] focus:outline-none focus:border-blue-400 transition-colors">
          <option>Last 6 months</option>
          <option>Last year</option>
          <option>Last 12 months</option>
        </select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          data={patientTrendData}
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 13, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 13, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              fontSize: "14px",
              color: "#e2e8f0",
              paddingTop: "20px",
            }}
            iconType="circle"
          />

          {/* Lines with your requested colors */}
          <Line
            type="monotone"
            dataKey="admitted"
            name="Admitted"
            stroke="#1e40af"        // Dark Blue
            strokeWidth={3}
            dot={{ r: 5, fill: "#1e40af", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 7, fill: "#1e40af" }}
          />

          <Line
            type="monotone"
            dataKey="discharged"
            name="Discharged"
            stroke="#10b981"        // Green
            strokeWidth={3}
            dot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 7, fill: "#10b981" }}
          />

          <Line
            type="monotone"
            dataKey="outpatient"
            name="Outpatient"
            stroke="#db2777"        // Dark Pink
            strokeWidth={3}
            dot={{ r: 5, fill: "#db2777", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 7, fill: "#db2777" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
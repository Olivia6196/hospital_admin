"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { departmentData } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl px-4 py-3 text-sm">
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        <p className="flex items-center gap-2 text-gray-700">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: payload[0].payload.color }}
          ></span>
          <span>Patients:</span>
          <strong className="ml-auto">{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default function DepartmentChart() {
  return (
    <div className="bg-black/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl h-full lg:h-93">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Department Load</h3>
          <p className="text-blue-200 text-sm mt-1">
            Current patient distribution
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={departmentData}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={70}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />

          <Bar dataKey="patients" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {departmentData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
                fillOpacity={0.92}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
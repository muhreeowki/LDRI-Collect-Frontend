"use client";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

export function SectionPerformanceChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid stroke="white" strokeOpacity={0.3} />
        <PolarAngleAxis dataKey="name" tick={{ fill: "grey", fontSize: 12 }} />
        <PolarRadiusAxis angle={90} tick={{ fill: "white", fontSize: 10 }} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="white"
          strokeWidth={1}
          fill="white"
          fillOpacity={0.3}
        />
        <Legend wrapperStyle={{ color: "grey" }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function OverallPerformanceChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid stroke="white" strokeOpacity={0.5} />
        <PolarAngleAxis
          dataKey="metric"
          tick={{ fill: "grey", fontSize: 12 }}
        />
        <PolarRadiusAxis angle={90} tick={{ fill: "white", fontSize: 10 }} />
        <Radar
          name="Performance"
          dataKey="value"
          stroke="white"
          strokeWidth={1}
          fill="white"
          fillOpacity={0.3}
          className="animate-in"
        />
        <Legend wrapperStyle={{ color: "white" }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

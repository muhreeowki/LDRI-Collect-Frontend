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
    <ResponsiveContainer width="100%" height={420}>
      <RadarChart data={data}>
        <PolarGrid className="dark:stroke-white" strokeOpacity={0.5} />
        <PolarAngleAxis
          dataKey="name"
          tick={{ className: "dark:fill-white", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          tick={{ className: "dark:stroke-white", fontSize: 10 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="hsl(0 0% 50% / 0.8)"
          strokeWidth={2}
          fill="hsl(0 0% 50% / 0.15)"
          fillOpacity={0.5}
          className="dark:stroke-white dark:fill-white"
        />
        <Legend className="dark:text-white" />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function OverallPerformanceChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <RadarChart data={data}>
        <PolarGrid className="dark:stroke-white" strokeOpacity={0.5} />
        <PolarAngleAxis
          dataKey="metric"
          tick={{ fontSize: 12, className: "dark:fill-white " }}
        />
        <PolarRadiusAxis
          angle={90}
          tick={{ className: "dark:fill-white", fontSize: 10 }}
        />
        <Radar
          name="Performance"
          dataKey="value"
          stroke="hsl(0 0% 50% / 0.8)"
          strokeWidth={2}
          fill="hsl(0 0% 50% / 0.15)"
          fillOpacity={0.5}
          className="dark:stroke-white dark:fill-white"
        />
        <Legend className="dark:text-white" />
      </RadarChart>
    </ResponsiveContainer>
  );
}

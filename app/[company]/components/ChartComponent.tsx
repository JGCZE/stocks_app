"use client";

import { TFormatedChardData } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TPayload = {
  payload: {
    min: number;
    max: number;
  };
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<TPayload>;
  label?: string;
}

interface IProps {
  chartsData: Array<TFormatedChardData>
}

const ChartComponent = ({ chartsData }: IProps ) => {

  const dataWithRange = chartsData.map((d) => ({
    ...d,
    min: d.min,
    max: d.max - d.min,
  }));


  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (!active || !payload || !payload.length) {
      return null;
    }
    
    const { min, max } = payload[0].payload;
    const diff = Math.round(max * 100) / 100;
 
    return (
      <div className="bg-white p-2 border shadow-sm">
        <p className="font-semibold">{label}</p>
        <p>Min price: {min} usd</p>
        <p>Max price: {min + max} usd</p>
        <p>Diff: {diff} usd</p>
      </div>
    );
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={500} className={"bg-white"}>
        <BarChart
          data={dataWithRange}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />

          <Tooltip content={<CustomTooltip />} />

          <Legend />

          <Bar
            dataKey="min"
            stackId="a"
            fill="transparent"
            name="MIN price"
            barSize={20}
            className="text-black"
          />

          <Bar
            dataKey="max"
            stackId="a"
            fill="green"
            name="MIN and MAX price"
            radius={[6, 6, 6, 6]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

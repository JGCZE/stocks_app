"use client";

import { TFormatedChardData } from "@/lib/types";
import { useState } from "react";
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
import SelectTimeRange from "./SelectTimeRange";

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
  chartData: Array<TFormatedChardData>
  granularity: string;
}

const getTimeRangeMultiplier = (granularity: string): number => {
  switch (granularity) {
    case "3mo":
      return 4;
    case "6mo":
      return 2;
  }
  return 0;
};

const ChartComponent = ({ chartData, granularity }: IProps) => {
  const [selectedChartsData, setSelectedChartsData] = useState<Array<TFormatedChardData>>(chartData)

  const dataWithRange = selectedChartsData.map((d) => ({
    ...d,
    min: d.min,
    max: d.max - d.min,
  }));


  const handleCategoryChange = (year: number) => {
    const timeRange = getTimeRangeMultiplier(granularity);
    const newData = chartData.slice(- (timeRange * year));
    setSelectedChartsData(newData);
  }

  const handleSelectedTimeRange = (year: string) => {
    switch (year) {
      case "1y":
        return handleCategoryChange(1);
      case "2y":
        return handleCategoryChange(2);
      case "3y":
        return handleCategoryChange(3);
      case "4y":
        return handleCategoryChange(4);
      case "5y":
        return handleCategoryChange(5);
      case "10y":
        return handleCategoryChange(10);
    }
  }


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
      <SelectTimeRange handleSelectedTimeRange={handleSelectedTimeRange} />

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

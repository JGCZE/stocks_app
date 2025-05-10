"use client";

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

export const TESTComponent = () => {
  const mockedChartData = [
    { period: "1Q - 2023", max: 35, min: 30 },
    { period: "2Q - 2023", max: 199, min: 179 },
    { period: "3Q - 2023", max: 193, min: 164 },
    { period: "4Q - 2023", max: 237, min: 192 },
    { period: "1Q - 2024", max: 237, min: 213 },
    { period: "2Q - 2024", max: 260, min: 219 },
    { period: "3Q - 2024", max: 244, min: 169 },
    { period: "4Q - 2024", max: 200, min: 197 },
    { period: "1Q - 2023", max: 192, min: 165 },
    { period: "2Q - 2023", max: 199, min: 179 },
    { period: "3Q - 2023", max: 193, min: 164 },
    { period: "4Q - 2023", max: 237, min: 192 },
    { period: "1Q - 2024", max: 237, min: 213 },
    { period: "2Q - 2024", max: 260, min: 219 },
    { period: "3Q - 2024", max: 244, min: 169 },
    { period: "4Q - 2024", max: 200, min: 197 },
  ];

  const dataWithRange = mockedChartData.map((d) => ({
    ...d,
    min: d.min,
    max: d.max - d.min,
  }));

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

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (!active || !payload || !payload.length) {
      return null;
    }
    console.log(payload);

    const { min, max } = payload[0].payload;

    return (
      <div className="bg-white p-2 border shadow-sm">
        <p className="font-semibold">{label}</p>
        <p>Min price: {min} usd</p>
        <p>Max price: {min + max} usd</p>
        <p>Diff: {max} usd</p>
      </div>
    );
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
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
            fill="green"
            name="MIN price"
            barSize={30}
          />

          <Bar
            dataKey="max"
            stackId="a"
            fill="#2563eb"
            name="MAX price"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

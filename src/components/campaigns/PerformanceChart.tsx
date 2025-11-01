import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

interface PerformanceChartProps {
  data: Array<{
    name: string;
    opened: number;
    clicked: number;
  }>;
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Campaign Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Legend />
          <Bar 
            dataKey="opened" 
            fill="hsl(var(--chart-1))" 
            name="Opened"
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey="clicked" 
            fill="hsl(var(--chart-2))" 
            name="Clicked"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CampaignPerformanceChartProps {
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
}

export function CampaignPerformanceChart({ stats }: CampaignPerformanceChartProps) {
  const maxValue = stats.sent;

  const metrics = [
    { label: "Sent", value: stats.sent, color: "bg-info", percentage: 100 },
    { label: "Delivered", value: stats.delivered, color: "bg-primary", percentage: (stats.delivered / maxValue) * 100 },
    { label: "Opened", value: stats.opened, color: "bg-success", percentage: (stats.opened / maxValue) * 100 },
    { label: "Clicked", value: stats.clicked, color: "bg-chart-3", percentage: (stats.clicked / maxValue) * 100 },
    { label: "Unsubscribed", value: stats.unsubscribed, color: "bg-destructive", percentage: (stats.unsubscribed / maxValue) * 100 },
    { label: "Bounced", value: stats.bounced, color: "bg-warning", percentage: (stats.bounced / maxValue) * 100 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Overall Performance Metrics</h3>
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{metric.label}</span>
              <span className="text-sm font-semibold text-foreground">{metric.value.toLocaleString()}</span>
            </div>
            <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${metric.color} rounded-full transition-all duration-500`}
                style={{ width: `${metric.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

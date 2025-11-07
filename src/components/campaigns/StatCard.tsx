import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  colorClass: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const StatCard = ({ icon: Icon, label, value, colorClass, onClick, isActive }: StatCardProps) => {
  return (
    <Card 
      className={`p-6 cursor-pointer transition-all hover:shadow-md ${isActive ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">{value.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};

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
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${isActive ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-xs text-muted-foreground leading-tight">{label}</p>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </div>
    </Card>
  );
};

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mail, Calendar, Users, TrendingUp, Eye, MousePointerClick } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CampaignCardProps {
  id?: number;
  title: string;
  date: string;
  status: "SENT" | "DRAFT" | "SCHEDULED";
  recipients: number;
  conversion: number;
  opened: number;
  clicked: number;
  openRate: number;
}

export const CampaignCard = ({
  id = 1,
  title,
  date,
  status,
  recipients,
  conversion,
  opened,
  clicked,
  openRate,
}: CampaignCardProps) => {
  const navigate = useNavigate();
  const statusColor = {
    SENT: "bg-success text-success-foreground",
    DRAFT: "bg-muted text-muted-foreground",
    SCHEDULED: "bg-info text-info-foreground",
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
        </div>
        <Badge className={statusColor[status]}>{status}</Badge>
      </div>

      {status !== "DRAFT" && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Recipients</p>
                <p className="text-xl font-bold">{recipients}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Conversion</p>
                <p className="text-xl font-bold text-success">{conversion.toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Opened</p>
                <p className="text-lg font-semibold">{opened}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Clicked</p>
                <p className="text-lg font-semibold">{clicked}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Open Rate</span>
              <span className="font-semibold">{openRate.toFixed(1)}%</span>
            </div>
            <Progress value={openRate} className="h-2" />
          </div>
        </>
      )}

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate(`/campaign/${id}`)}
        >
          View Details
        </Button>
        {status === "DRAFT" && (
          <Button className="flex-1">Edit</Button>
        )}
      </div>
    </Card>
  );
};

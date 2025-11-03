import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CampaignTypeSectionProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export function CampaignTypeSection({ data, onChange, onNext }: CampaignTypeSectionProps) {
  return (
    <Card className="p-6 border-2 backdrop-blur-sm bg-card/50">
      <h2 className="text-2xl font-semibold mb-6">Email Campaign Details</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="campaignName">Campaign Title *</Label>
          <Input
            id="campaignName"
            placeholder="Enter campaign title"
            value={data.name || ""}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sender">Sender Email *</Label>
          <Select
            value={data.sender}
            onValueChange={(value) => onChange({ sender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sender email" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="noreply@wayvida.com">noreply@wayvida.com</SelectItem>
              <SelectItem value="support@wayvida.com">support@wayvida.com</SelectItem>
              <SelectItem value="marketing@wayvida.com">marketing@wayvida.com</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mailLabel">Mail Label (Optional)</Label>
          <Input
            id="mailLabel"
            placeholder="Enter custom mail label if required"
            value={data.mailLabel || ""}
            onChange={(e) => onChange({ mailLabel: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Campaign Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Brief description of this campaign"
            value={data.description || ""}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onNext}
            disabled={!data.name || !data.sender}
            size="lg"
          >
            Next: Select Audience
          </Button>
        </div>
      </div>
    </Card>
  );
}

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2 } from "lucide-react";

interface TargetAudienceSectionProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TargetAudienceSection({ data, onChange, onNext, onBack }: TargetAudienceSectionProps) {
  const [activeTab, setActiveTab] = useState("institutes");
  
  // Institutes filters
  const [marketplaceActive, setMarketplaceActive] = useState(false);
  const [marketplaceInactive, setMarketplaceInactive] = useState(false);
  
  // White-label Basic
  const [wlBasicActive, setWlBasicActive] = useState(false);
  const [wlBasicInactive, setWlBasicInactive] = useState(false);
  
  // White-label Professional
  const [wlProWithShareActive, setWlProWithShareActive] = useState(false);
  const [wlProWithShareInactive, setWlProWithShareInactive] = useState(false);
  const [wlProWithShareExpired, setWlProWithShareExpired] = useState(false);
  const [wlProWithoutShareActive, setWlProWithoutShareActive] = useState(false);
  const [wlProWithoutShareInactive, setWlProWithoutShareInactive] = useState(false);
  const [wlProWithoutShareExpired, setWlProWithoutShareExpired] = useState(false);
  
  // White-label Enterprise
  const [wlEntWithShareActive, setWlEntWithShareActive] = useState(false);
  const [wlEntWithShareInactive, setWlEntWithShareInactive] = useState(false);
  const [wlEntWithShareExpired, setWlEntWithShareExpired] = useState(false);
  const [wlEntWithoutShareActive, setWlEntWithoutShareActive] = useState(false);
  const [wlEntWithoutShareInactive, setWlEntWithoutShareInactive] = useState(false);
  const [wlEntWithoutShareExpired, setWlEntWithoutShareExpired] = useState(false);
  
  // Learners filters
  const [learnersActive, setLearnersActive] = useState(false);
  const [learnersInactive, setLearnersInactive] = useState(false);
  const [learnersExpired, setLearnersExpired] = useState(false);

  return (
    <Card className="p-6 border-2 backdrop-blur-sm bg-card/50">
      <h2 className="text-2xl font-semibold mb-6">Select Target Audience</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="institutes" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Institutes
          </TabsTrigger>
          <TabsTrigger value="learners" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Learners
          </TabsTrigger>
        </TabsList>

        <TabsContent value="institutes" className="space-y-6">
          {/* Marketplace Institutes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Marketplace Institutes</h3>
            <div className="pl-4 space-y-3">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                <Checkbox
                  id="marketplace-active"
                  checked={marketplaceActive}
                  onCheckedChange={(checked) => setMarketplaceActive(checked as boolean)}
                />
                <Label htmlFor="marketplace-active" className="cursor-pointer flex-1">
                  Active Institutes
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                <Checkbox
                  id="marketplace-inactive"
                  checked={marketplaceInactive}
                  onCheckedChange={(checked) => setMarketplaceInactive(checked as boolean)}
                />
                <Label htmlFor="marketplace-inactive" className="cursor-pointer flex-1">
                  Inactive Institutes
                </Label>
              </div>
            </div>
          </div>

          {/* White-label Institutes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">White-label Institutes</h3>
            
            {/* Basic Plan */}
            <div className="pl-4 space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Basic Plan</h4>
              <div className="pl-4 space-y-2">
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                  <Checkbox
                    id="wl-basic-active"
                    checked={wlBasicActive}
                    onCheckedChange={(checked) => setWlBasicActive(checked as boolean)}
                  />
                  <Label htmlFor="wl-basic-active" className="cursor-pointer flex-1">
                    Active
                  </Label>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                  <Checkbox
                    id="wl-basic-inactive"
                    checked={wlBasicInactive}
                    onCheckedChange={(checked) => setWlBasicInactive(checked as boolean)}
                  />
                  <Label htmlFor="wl-basic-inactive" className="cursor-pointer flex-1">
                    Inactive
                  </Label>
                </div>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="pl-4 space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Professional Plan</h4>
              
              {/* With Share */}
              <div className="pl-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">With Share</p>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-pro-share-active"
                      checked={wlProWithShareActive}
                      onCheckedChange={(checked) => setWlProWithShareActive(checked as boolean)}
                    />
                    <Label htmlFor="wl-pro-share-active" className="cursor-pointer flex-1">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-pro-share-inactive"
                      checked={wlProWithShareInactive}
                      onCheckedChange={(checked) => setWlProWithShareInactive(checked as boolean)}
                    />
                    <Label htmlFor="wl-pro-share-inactive" className="cursor-pointer flex-1">
                      Inactive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-pro-share-expired"
                      checked={wlProWithShareExpired}
                      onCheckedChange={(checked) => setWlProWithShareExpired(checked as boolean)}
                    />
                    <Label htmlFor="wl-pro-share-expired" className="cursor-pointer flex-1">
                      Expired
                    </Label>
                  </div>
                </div>
              </div>

              {/* Without Share */}
              <div className="pl-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Without Share</p>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-pro-noshare-active"
                      checked={wlProWithoutShareActive}
                      onCheckedChange={(checked) => setWlProWithoutShareActive(checked as boolean)}
                    />
                    <Label htmlFor="wl-pro-noshare-active" className="cursor-pointer flex-1">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-pro-noshare-inactive"
                      checked={wlProWithoutShareInactive}
                      onCheckedChange={(checked) => setWlProWithoutShareInactive(checked as boolean)}
                    />
                    <Label htmlFor="wl-pro-noshare-inactive" className="cursor-pointer flex-1">
                      Inactive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-pro-noshare-expired"
                      checked={wlProWithoutShareExpired}
                      onCheckedChange={(checked) => setWlProWithoutShareExpired(checked as boolean)}
                    />
                    <Label htmlFor="wl-pro-noshare-expired" className="cursor-pointer flex-1">
                      Expired
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="pl-4 space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Enterprise Plan</h4>
              
              {/* With Share */}
              <div className="pl-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">With Share</p>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-ent-share-active"
                      checked={wlEntWithShareActive}
                      onCheckedChange={(checked) => setWlEntWithShareActive(checked as boolean)}
                    />
                    <Label htmlFor="wl-ent-share-active" className="cursor-pointer flex-1">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-ent-share-inactive"
                      checked={wlEntWithShareInactive}
                      onCheckedChange={(checked) => setWlEntWithShareInactive(checked as boolean)}
                    />
                    <Label htmlFor="wl-ent-share-inactive" className="cursor-pointer flex-1">
                      Inactive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-ent-share-expired"
                      checked={wlEntWithShareExpired}
                      onCheckedChange={(checked) => setWlEntWithShareExpired(checked as boolean)}
                    />
                    <Label htmlFor="wl-ent-share-expired" className="cursor-pointer flex-1">
                      Expired
                    </Label>
                  </div>
                </div>
              </div>

              {/* Without Share */}
              <div className="pl-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Without Share</p>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-ent-noshare-active"
                      checked={wlEntWithoutShareActive}
                      onCheckedChange={(checked) => setWlEntWithoutShareActive(checked as boolean)}
                    />
                    <Label htmlFor="wl-ent-noshare-active" className="cursor-pointer flex-1">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-ent-noshare-inactive"
                      checked={wlEntWithoutShareInactive}
                      onCheckedChange={(checked) => setWlEntWithoutShareInactive(checked as boolean)}
                    />
                    <Label htmlFor="wl-ent-noshare-inactive" className="cursor-pointer flex-1">
                      Inactive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                    <Checkbox
                      id="wl-ent-noshare-expired"
                      checked={wlEntWithoutShareExpired}
                      onCheckedChange={(checked) => setWlEntWithoutShareExpired(checked as boolean)}
                    />
                    <Label htmlFor="wl-ent-noshare-expired" className="cursor-pointer flex-1">
                      Expired
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="learners" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
              <Checkbox
                id="learners-active"
                checked={learnersActive}
                onCheckedChange={(checked) => setLearnersActive(checked as boolean)}
              />
              <Label htmlFor="learners-active" className="cursor-pointer flex-1">
                Active Learners
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
              <Checkbox
                id="learners-inactive"
                checked={learnersInactive}
                onCheckedChange={(checked) => setLearnersInactive(checked as boolean)}
              />
              <Label htmlFor="learners-inactive" className="cursor-pointer flex-1">
                Inactive Learners
              </Label>
            </div>

            <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
              <Checkbox
                id="learners-expired"
                checked={learnersExpired}
                onCheckedChange={(checked) => setLearnersExpired(checked as boolean)}
              />
              <Label htmlFor="learners-expired" className="cursor-pointer flex-1">
                Expired Learners
              </Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-6 border-t mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} size="lg">
          Next: Select Content
        </Button>
      </div>
    </Card>
  );
}

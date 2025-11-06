import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Archive, Delete, Mail, MoreVertical, Reply, Star, WifiOff, BatteryFull, Signal, Monitor, Smartphone } from "lucide-react";

interface EmailPreviewProps {
  subject?: string;
  senderName?: string;
  senderEmail?: string;
  message?: string;
}

export function EmailPreview({ subject, senderName, senderEmail, message }: EmailPreviewProps) {
  const displaySubject = subject || "Subject comes here...";
  const displaySenderName = senderName || "Sender";
  const displaySenderEmail = senderEmail || "sender@example.com";
  const displayMessage = message || "Body text comes here...";
  const senderInitial = displaySenderName.charAt(0).toUpperCase();

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <Tabs defaultValue="mobile" className="w-full">
        <div className="flex justify-center mb-4">
          <TabsList>
            <TabsTrigger value="mobile" className="gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="desktop" className="gap-2">
              <Monitor className="h-4 w-4" />
              Desktop
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="mobile" className="flex flex-col items-center">
          {/* Phone Mockup */}
          <div className="relative w-[280px] h-[560px] bg-background rounded-[32px] shadow-2xl border-[12px] border-foreground/90 overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-foreground/90 rounded-b-3xl z-10"></div>
            
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-[44px] px-5 flex items-end justify-between pb-2 text-xs z-0">
              <span className="font-medium">9:00</span>
              <div className="flex items-center gap-1">
                <Signal className="h-3 w-3" />
                <WifiOff className="h-3 w-3" />
                <BatteryFull className="h-3 w-3" />
              </div>
            </div>

            {/* Email Header */}
            <div className="mt-[44px] px-3 py-2 border-b flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <div className="flex-1"></div>
              <Archive className="h-4 w-4" />
              <Delete className="h-4 w-4" />
              <Mail className="h-4 w-4" />
            </div>

            {/* Subject Line */}
            <div className="px-3 py-2 border-b">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xs text-muted-foreground line-clamp-1">{displaySubject}</h3>
                <Star className="h-3 w-3 text-muted-foreground ml-auto" />
              </div>
            </div>

            {/* Sender Info */}
            <div className="px-3 py-2 border-b">
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8 bg-purple-500">
                  <AvatarFallback className="bg-purple-500 text-white text-xs">
                    {senderInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-xs">{displaySenderName}</p>
                    <span className="text-[10px] text-muted-foreground">5d ago</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">to me</p>
                </div>
                <Reply className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>

            {/* Email Body */}
            <div className="px-3 py-3 overflow-auto" style={{ maxHeight: "320px" }}>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                {displayMessage}
              </p>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-12 border-t bg-background flex items-center justify-around">
              <Mail className="h-4 w-4" />
              <Archive className="h-4 w-4" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="desktop" className="flex flex-col items-center">
          {/* Desktop Mockup */}
          <div className="relative w-full max-w-[600px] bg-background rounded-lg shadow-2xl border overflow-hidden">
            {/* Email Header */}
            <div className="px-6 py-4 border-b flex items-center gap-4 bg-muted/30">
              <ArrowLeft className="h-5 w-5" />
              <div className="flex-1"></div>
              <Archive className="h-5 w-5" />
              <Delete className="h-5 w-5" />
              <Mail className="h-5 w-5" />
              <MoreVertical className="h-5 w-5" />
            </div>

            {/* Subject Line */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold flex-1">{displaySubject}</h2>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded text-sm text-blue-700 dark:text-blue-300 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Inbox
                  </div>
                  <Star className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Sender Info */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 bg-purple-500">
                  <AvatarFallback className="bg-purple-500 text-white">
                    {senderInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{displaySenderName}</p>
                    <span className="text-sm text-muted-foreground">5 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">to me</p>
                </div>
                <div className="flex gap-3">
                  <Reply className="h-5 w-5 text-muted-foreground" />
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="px-6 py-6" style={{ maxHeight: "400px", overflow: "auto" }}>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words leading-relaxed">
                {displayMessage}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Archive, Delete, Mail, MoreVertical, Reply, Star, WifiOff, BatteryFull, Signal } from "lucide-react";

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
      <div className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-4">Email Preview</p>
        
        {/* Phone Mockup */}
        <div className="relative w-[340px] h-[680px] bg-background rounded-[40px] shadow-2xl border-[14px] border-foreground/90 overflow-hidden">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[28px] bg-foreground/90 rounded-b-3xl z-10"></div>
          
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-[52px] px-6 flex items-end justify-between pb-2 text-xs z-0">
            <span className="font-medium">9:00</span>
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <WifiOff className="h-3 w-3" />
              <BatteryFull className="h-3 w-3" />
            </div>
          </div>

          {/* Email Header */}
          <div className="mt-[52px] px-4 py-3 border-b flex items-center gap-3">
            <ArrowLeft className="h-5 w-5" />
            <div className="flex-1"></div>
            <Archive className="h-5 w-5" />
            <Delete className="h-5 w-5" />
            <Mail className="h-5 w-5" />
            <MoreVertical className="h-5 w-5" />
          </div>

          {/* Subject Line */}
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm text-muted-foreground line-clamp-1">{displaySubject}</h3>
              <div className="flex items-center gap-1 ml-auto">
                <div className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 rounded text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Inbox
                </div>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Sender Info */}
          <div className="px-4 py-3 border-b">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 bg-purple-500">
                <AvatarFallback className="bg-purple-500 text-white">
                  {senderInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{displaySenderName}</p>
                  <span className="text-xs text-muted-foreground">5 days ago</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">to me</p>
              </div>
              <div className="flex gap-2">
                <Reply className="h-4 w-4 text-muted-foreground" />
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="px-4 py-4 overflow-auto" style={{ maxHeight: "400px" }}>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
              {displayMessage}
            </p>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 h-16 border-t bg-background flex items-center justify-around">
            <Mail className="h-5 w-5" />
            <Archive className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Card>
  );
}

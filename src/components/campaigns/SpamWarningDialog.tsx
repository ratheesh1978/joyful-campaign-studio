import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SpamWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: string;
}

export function SpamWarningDialog({ open, onOpenChange, reason }: SpamWarningDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Issues found in content
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground space-y-4 pt-2">
            <p>
              We reviewed your email content and found a risk of it being marked as spam. 
              To protect the domain reputation, we recommend revisiting the content to reduce 
              the likelihood of it being flagged as spam or phishing. You can{" "}
              <a 
                href="https://www.emailonacid.com/blog/article/email-development/avoiding-spam-filters/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Learn more here
              </a>.
            </p>
            {reason && (
              <p className="text-sm bg-muted p-3 rounded-md">
                <span className="font-medium">Reason:</span> {reason}
              </p>
            )}
            <p>
              If you believe we&apos;ve made a mistake, please contact us at{" "}
              <a 
                href="mailto:care@graphy.com" 
                className="text-primary hover:underline font-medium"
              >
                care@graphy.com
              </a>{" "}
              with the content and campaign name.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-primary hover:bg-primary/90 px-8">
            Got it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

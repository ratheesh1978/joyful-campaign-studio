export interface AutomationRule {
  id: string;
  name: string;
  active: boolean;
  trigger: string;
  waitDays: number;
  channel: string;
  message: string;
  subAutomations?: AutomationRule[];
}

export type TriggerCondition = 
  | "not-opened" 
  | "opened" 
  | "link-clicked" 
  | "not-clicked";

export type ChannelType = 
  | "email" 
  | "sms" 
  | "push";

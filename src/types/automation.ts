export interface AutomationRule {
  id: string;
  name: string;
  active: boolean;
  trigger: string;
  waitDays: number;
  timeUnit: string;
  message: string;
  subAutomations?: AutomationRule[];
}

export type TriggerCondition = 
  | "not-opened" 
  | "opened" 
  | "link-clicked" 
  | "not-clicked";

export type TimeUnit = 
  | "minutes" 
  | "hours" 
  | "days";

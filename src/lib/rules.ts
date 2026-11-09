import type { Incident, Role, Status } from "./types";
export const messages = {
  MSG1:"Email or password is incorrect.",
  MSG2:"Please complete all required fields.",
  MSG3:"You do not have access to this page.",
  MSG4:"Incident submitted successfully.",
  MSG5:"Technician assigned successfully.",
  MSG6:"Incident status updated successfully.",
  MSG7:"Add a resolution summary of at least 10 characters.",
  MSG8:"You are offline. Reconnect and try again.",
  MSG9:"We could not load this information. Please try again.",
  MSG10:"We could not save your changes. Please try again."
} as const;
export function isRepeatFault(count:number):boolean { return count >= 3; }
export function canSeeIncident(role:Role, userId:string, branchId:string|null|undefined, incident:Incident):boolean {
  if (role === "administrator" || role === "support_coordinator") return true;
  if (role === "branch_reporter") return Boolean(branchId && incident.branch_id === branchId);
  return role === "technician" && incident.assigned_to === userId;
}
export function canTransition(from:Status,to:Status):boolean {
  return (from === "Assigned" && to === "In Progress") || (from === "In Progress" && to === "Resolved");
}
export function validResolution(summary:string):boolean { return summary.trim().length >= 10; }
export function withinRolling30Days(date:string, now=new Date()):boolean {
  const d=new Date(date).getTime(), n=now.getTime();
  return d <= n && d >= n - 30*24*60*60*1000;
}
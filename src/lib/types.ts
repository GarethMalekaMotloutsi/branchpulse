export type Role = "administrator" | "support_coordinator" | "technician" | "branch_reporter";
export type Status = "New" | "Assigned" | "In Progress" | "Resolved";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export interface Branch { id: string; store_code: string; name: string; city: string; province: string; is_active: boolean }
export interface Asset { id: string; branch_id: string; asset_tag: string; display_name: string; category: string; manufacturer?: string; model?: string; is_active: boolean }
export interface Incident {
  id: string; branch_id: string; asset_id: string; reported_by: string; assigned_to?: string | null;
  title: string; description: string; category: string; priority: Priority; status: Status;
  resolution_summary?: string | null; created_at: string; updated_at: string;
}
export interface Staff { id: string; full_name: string; email: string; role: Role; branch_id?: string | null; is_active: boolean }
export const roleLabels: Record<Role,string> = {
  administrator:"Administrator", support_coordinator:"Support Coordinator",
  technician:"Technician", branch_reporter:"Branch Reporter"
};
import type { Asset, Branch, Incident, Staff } from "./types";
export const demoBranches:Branch[]=[
 {id:"b1",store_code:"GP-MID-001",name:"Midrand Central",city:"Midrand",province:"Gauteng",is_active:true},
 {id:"b2",store_code:"GP-SAN-002",name:"Sandton North",city:"Sandton",province:"Gauteng",is_active:true},
 {id:"b3",store_code:"GP-PTA-003",name:"Pretoria East",city:"Pretoria",province:"Gauteng",is_active:true}
];
export const demoStaff:Staff[]=[
 {id:"u1",full_name:"Thandi Mokoena",email:"thandi@northline.demo",role:"administrator",is_active:true},
 {id:"u2",full_name:"Sipho Dlamini",email:"sipho@northline.demo",role:"support_coordinator",is_active:true},
 {id:"u3",full_name:"Lerato Nkosi",email:"lerato@northline.demo",role:"technician",is_active:true},
 {id:"u4",full_name:"Daniel Molefe",email:"daniel@northline.demo",role:"branch_reporter",branch_id:"b1",is_active:true}
];
export const demoAssets:Asset[]=[
 {id:"a1",branch_id:"b1",asset_tag:"AST-1001",display_name:"Front Desk Barcode Scanner",category:"Scanner",manufacturer:"Zebra",model:"DS2208",is_active:true},
 {id:"a2",branch_id:"b1",asset_tag:"AST-1002",display_name:"Back Office Network Printer",category:"Printer",manufacturer:"HP",model:"LaserJet Pro",is_active:true},
 {id:"a3",branch_id:"b2",asset_tag:"AST-2001",display_name:"POS Workstation 01",category:"Workstation",manufacturer:"Dell",model:"OptiPlex",is_active:true},
 {id:"a4",branch_id:"b3",asset_tag:"AST-3001",display_name:"Branch Router",category:"Network Device",manufacturer:"Cisco",model:"ISR",is_active:true}
];
const now=Date.now();
const ago=(days:number)=>new Date(now-days*86400000).toISOString();
export const demoIncidents:Incident[]=[
 {id:"i1",branch_id:"b1",asset_id:"a1",reported_by:"u4",assigned_to:"u3",title:"Scanner disconnects from Wi-Fi",description:"The front desk scanner disconnects several times during the shift.",category:"Scanner",priority:"High",status:"In Progress",created_at:ago(1),updated_at:ago(1)},
 {id:"i2",branch_id:"b1",asset_id:"a2",reported_by:"u4",assigned_to:null,title:"Printer not producing receipts",description:"Print jobs remain queued and nothing comes out.",category:"Printer",priority:"Urgent",status:"New",created_at:ago(0),updated_at:ago(0)},
 {id:"i3",branch_id:"b2",asset_id:"a3",reported_by:"u4",assigned_to:"u3",title:"Workstation loses network access",description:"Workstation drops connection after sign in.",category:"Workstation",priority:"Medium",status:"Assigned",created_at:ago(3),updated_at:ago(3)},
 {id:"i4",branch_id:"b1",asset_id:"a1",reported_by:"u4",assigned_to:"u3",title:"Scanner pairing failure",description:"Scanner needs repeated pairing.",category:"Scanner",priority:"Medium",status:"Resolved",resolution_summary:"Repaired pairing and tested device.",created_at:ago(8),updated_at:ago(8)},
 {id:"i5",branch_id:"b1",asset_id:"a1",reported_by:"u4",assigned_to:"u3",title:"Intermittent scan response",description:"Delayed barcode scan response.",category:"Scanner",priority:"Low",status:"Resolved",resolution_summary:"Updated device configuration.",created_at:ago(15),updated_at:ago(15)}
];
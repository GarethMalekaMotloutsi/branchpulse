import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Activity, AlertCircle, ArrowUpRight, Bell, Building2, Check, ChevronDown, CircleHelp, ClipboardList, Clock3, Cpu, Filter, Gauge, LayoutDashboard, LogOut, Menu, Plus, Search, ShieldCheck, Users, Wrench, X } from "lucide-react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";
import { demoAssets, demoBranches, demoIncidents, demoStaff } from "./lib/data";
import { canSeeIncident, isRepeatFault, messages, validResolution } from "./lib/rules";
import type { Asset, Branch, Incident, Priority, Role, Staff, Status } from "./lib/types";
import { roleLabels } from "./lib/types";

type View="Overview"|"Incidents"|"Assets"|"Branches"|"My Work"|"Reports"|"Staff";
const nav: {name:View;icon:typeof LayoutDashboard;roles:Role[]}[]=[
 {name:"Overview",icon:LayoutDashboard,roles:["administrator","support_coordinator"]},
 {name:"Incidents",icon:ClipboardList,roles:["administrator","support_coordinator","branch_reporter","technician"]},
 {name:"Assets",icon:Cpu,roles:["administrator","support_coordinator","branch_reporter","technician"]},
 {name:"Branches",icon:Building2,roles:["administrator"]},
 {name:"My Work",icon:Wrench,roles:["technician"]},
 {name:"Reports",icon:Activity,roles:["administrator","support_coordinator"]},
 {name:"Staff",icon:Users,roles:["administrator"]}
];
const priorityClass=(p:string)=>p.toLowerCase();
const dbCategory=(v:string)=>(({ "POS Terminal":"pos","Network Device":"network","Workstation":"workstation","Scanner":"scanner","Printer":"printer","Other":"other","Network":"network","POS":"pos" } as Record<string,string>)[v]??v.toLowerCase());
const fmt=(d:string)=>new Intl.DateTimeFormat("en-ZA",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(d));
const initials=(s:string)=>s.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();

export default function App(){
 const [role,setRole]=useState<Role>("administrator");
 const [authReady,setAuthReady]=useState(!isSupabaseConfigured);
 const [authUser,setAuthUser]=useState(false);
 const [loginEmail,setLoginEmail]=useState("");
 const [loginPassword,setLoginPassword]=useState("");
 const [loginError,setLoginError]=useState("");
 const [loginBusy,setLoginBusy]=useState(false);
 const [user,setUser]=useState<Staff>(demoStaff[0]);
 const [view,setView]=useState<View>("Overview");
 const [mobileOpen,setMobileOpen]=useState(false);
 const [query,setQuery]=useState("");
 const [statusFilter,setStatusFilter]=useState("All statuses");
 const [branchFilter,setBranchFilter]=useState("All branches");
 const [modal,setModal]=useState<"incident"|"asset"|"branch"|"assign"|"resolve"|"visit"|"staff"|"note"|null>(null);
 const [selected,setSelected]=useState<Incident|null>(null);
 const [toast,setToast]=useState("");
 const [branches,setBranches]=useState<Branch[]>(demoBranches);
 const [assets,setAssets]=useState<Asset[]>(demoAssets);
 const [incidents,setIncidents]=useState<Incident[]>(demoIncidents);
 const [staff,setStaff]=useState<Staff[]>(demoStaff);
 const [updates,setUpdates]=useState<{id:string;incident_id:string;author_id:string;note:string;created_at:string}[]>([]);
 const [form,setForm]=useState<Record<string,string>>({});
 const demoMode=!isSupabaseConfigured;
 const branchId=user.branch_id??"b1";
 const visibleIncidents=useMemo(()=>incidents.filter(i=>canSeeIncident(role,user.id,user.branch_id,i)),[incidents,role,user]);
 const filtered=visibleIncidents.filter(i=>{
  const asset=assets.find(a=>a.id===i.asset_id);
  const branch=branches.find(b=>b.id===i.branch_id);
  const hay=[i.title,i.description,i.category,asset?.asset_tag,branch?.name].join(" ").toLowerCase();
  return hay.includes(query.toLowerCase())&&(statusFilter==="All statuses"||i.status===statusFilter)&&(branchFilter==="All branches"||i.branch_id===branchFilter);
 });
 const repeatAssets=assets.map(a=>({...a,count:incidents.filter(i=>i.asset_id===a.id&&Date.now()-new Date(i.created_at).getTime()>=0&&Date.now()-new Date(i.created_at).getTime()<=30*86400000).length})).filter(a=>isRepeatFault(a.count));
 const activeCount=incidents.filter(i=>i.status!=="Resolved").length;
 const urgentCount=incidents.filter(i=>i.priority==="Urgent"&&i.status!=="Resolved").length;
 const assignedCount=incidents.filter(i=>i.assigned_to&&i.status!=="Resolved").length;
 useEffect(()=>{if(!toast)return;const t=window.setTimeout(()=>setToast(""),3200);return()=>window.clearTimeout(t)},[toast]);
 useEffect(()=>{
  if(!supabase){setAuthReady(true);return}
  let mounted=true;
  supabase.auth.getSession().then(async ({data})=>{
   if(!mounted)return;
   if(data.session){
    setAuthUser(true);setAuthReady(false);
    const {data:p}=await supabase!.from("profiles").select("*").eq("id",data.session.user.id).single();
    if(p&&p.is_active&&mounted){setUser(p as Staff);setRole(p.role as Role)}
    else if(mounted){await supabase!.auth.signOut();setAuthUser(false);setLoginError(messages.MSG3)}
   }
   if(mounted)setAuthReady(true);
  });
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{
   if(!mounted)return;
   setAuthUser(Boolean(session));
   if(!session){setAuthReady(true);return}
   setAuthReady(false);
   window.setTimeout(async()=>{
    const {data:p}=await supabase!.from("profiles").select("*").eq("id",session.user.id).single();
    if(p&&p.is_active&&mounted){setUser(p as Staff);setRole(p.role as Role)}
    else if(mounted){await supabase!.auth.signOut();setAuthUser(false);setLoginError(messages.MSG3)}
    if(mounted)setAuthReady(true);
   },0);
  });
  return()=>{mounted=false;subscription.unsubscribe()};
 },[]);
 useEffect(()=>{
  if(!supabase||!authUser)return;
  Promise.all([
   supabase.from("branches").select("*"),
   supabase.from("assets").select("*"),
   supabase.from("incidents").select("*"),
   supabase.from("profiles").select("*")
  ]).then(async ([b,a,i,s])=>{
   if(b.data)setBranches(b.data as Branch[]);
   if(a.data)setAssets(a.data as Asset[]);
   if(i.data)setIncidents(i.data as Incident[]);
   if(s.data&&role==="administrator")setStaff(s.data as Staff[]);

   const client = supabase;
if (!client) return;
const { data: u } = await client.from("incident_updates").select("*");

   if(u)setUpdates(u as {id:string;incident_id:string;author_id:string;note:string;created_at:string}[]);
  });
 },[authUser,role]);
 const notify=(s:string)=>setToast(s);
 const switchRole=(r:Role)=>{const found=demoStaff.find(s=>s.role===r)??demoStaff[0];setRole(r);setUser(found);setView(r==="technician"?"My Work":r==="branch_reporter"?"Incidents":"Overview");setMobileOpen(false)};
 const addIncident=async()=>{
  if(!form.title?.trim()||!form.description?.trim()||!form.asset_id){notify(messages.MSG2);return}
  const asset=assets.find(a=>a.id===form.asset_id);if(!asset)return;
  const item:Incident={id:crypto.randomUUID(),branch_id:asset.branch_id,asset_id:asset.id,reported_by:user.id,title:form.title.trim(),description:form.description.trim(),category:form.category||asset.category,priority:(form.priority||"Medium") as Priority,status:"New",created_at:new Date().toISOString(),updated_at:new Date().toISOString()};
  if(supabase){const {data,error}=await supabase.from("incidents").insert({branch_id:item.branch_id,asset_id:item.asset_id,reported_by:item.reported_by,title:item.title,description:item.description,category:dbCategory(item.category),priority:item.priority,status:"New"}).select().single();if(error||!data){notify(messages.MSG10);return}item.id=data.id;item.created_at=data.created_at;item.updated_at=data.updated_at}
  setIncidents(v=>[item,...v]);setModal(null);setForm({});notify(messages.MSG4);
 };
 const addAsset=async()=>{if(!form.asset_tag?.trim()||!form.display_name?.trim()){notify(messages.MSG2);return}const a:Asset={id:crypto.randomUUID(),branch_id:form.branch_id||branchId,asset_tag:form.asset_tag.trim(),display_name:form.display_name.trim(),category:form.category||"Other",manufacturer:form.manufacturer,is_active:true};if(supabase){const {error}=await supabase.from("assets").insert({...a,category:dbCategory(a.category)});if(error){notify(messages.MSG10);return}}setAssets(v=>[a,...v]);setModal(null);setForm({});notify("Asset saved successfully.")};
 const addBranch=async()=>{if(!form.store_code?.trim()||!form.name?.trim()||!form.city?.trim()){notify(messages.MSG2);return}const b:Branch={id:crypto.randomUUID(),store_code:form.store_code.toUpperCase(),name:form.name,city:form.city,province:form.province||"Gauteng",is_active:true};if(supabase){const {error}=await supabase.from("branches").insert(b);if(error){notify(messages.MSG10);return}}setBranches(v=>[b,...v]);setModal(null);setForm({});notify("Branch saved successfully.")};
 const assign=async()=>{if(!selected||!form.assigned_to){notify(messages.MSG2);return}const id=form.assigned_to;if(supabase){const {error}=await supabase.rpc("assign_incident",{p_incident_id:selected.id,p_technician_id:id});if(error){notify(messages.MSG10);return}}setIncidents(v=>v.map(i=>i.id===selected.id?{...i,assigned_to:id,status:"Assigned",updated_at:new Date().toISOString()}:i));setModal(null);notify(messages.MSG5)};
 const resolve=async()=>{if(!selected)return;if(!validResolution(form.resolution_summary||"")){notify(messages.MSG7);return}if(supabase){const {error}=await supabase.rpc("change_incident_status",{p_incident_id:selected.id,p_new_status:"Resolved",p_resolution_summary:form.resolution_summary});if(error){notify(messages.MSG10);return}}setIncidents(v=>v.map(i=>i.id===selected.id?{...i,status:"Resolved",resolution_summary:form.resolution_summary,updated_at:new Date().toISOString()}:i));setModal(null);notify(messages.MSG6)};
 const startWork=async(i:Incident)=>{if(supabase){const {error}=await supabase.rpc("change_incident_status",{p_incident_id:i.id,p_new_status:"In Progress",p_resolution_summary:null});if(error){notify(messages.MSG10);return}}setIncidents(v=>v.map(x=>x.id===i.id?{...x,status:"In Progress",updated_at:new Date().toISOString()}:x));notify(messages.MSG6)};
 const addStaff=async()=>{
  if(!form.full_name?.trim()||!form.email?.trim()||!form.password||!form.role){notify(messages.MSG2);return}
  if(!supabase){notify("Staff account creation requires a connected Supabase project.");return}
  const {error}=await supabase.functions.invoke("admin-manage-staff",{body:{action:"create",fullName:form.full_name,email:form.email,password:form.password,role:form.role,branchId:form.branch_id||null}});
  if(error){notify(messages.MSG10);return}
  const {data}=await supabase.from("profiles").select("*");
  if(data)setStaff(data as Staff[]);
  setModal(null);setForm({});notify("Staff account created successfully.");
 };
 const addUpdate=async()=>{
  if(!selected||!form.note?.trim()){notify(messages.MSG2);return}
  const update={id:crypto.randomUUID(),incident_id:selected.id,author_id:user.id,note:form.note.trim(),created_at:new Date().toISOString()};
  if(supabase){const {data,error}=await supabase.from("incident_updates").insert({incident_id:selected.id,author_id:user.id,note:update.note}).select().single();if(error||!data){notify(messages.MSG10);return}update.id=data.id;update.created_at=data.created_at}
  setUpdates(v=>[update,...v]);setModal(null);setForm({});notify("Progress note added.");
 };
 const deactivateStaff=async(id:string)=>{
  if(!window.confirm("Deactivate this staff account? Existing incident history will be preserved."))return;
  if(supabase){const {error}=await supabase.functions.invoke("admin-manage-staff",{body:{action:"deactivate",userId:id}});if(error){notify(messages.MSG10);return}}
  setStaff(v=>v.map(s=>s.id===id?{...s,is_active:false}:s));notify("Staff account deactivated.");
 };
 const addVisit=async()=>{if(!selected||!form.outcome?.trim()||!form.minutes){notify(messages.MSG2);return}if(supabase){const {error}=await supabase.from("technician_visits").insert({incident_id:selected.id,technician_id:user.id,activity_type:form.activity_type||"remote",activity_date:new Date().toISOString(),outcome:form.outcome,time_spent_minutes:Number(form.minutes)});if(error){notify(messages.MSG10);return}}setModal(null);setForm({});notify("Service activity recorded.")};
 const doSignOut=async()=>{if(supabase){await supabase.auth.signOut();setAuthUser(false)}else{switchRole("administrator")}notify("Signed out.")};
 const signIn=async(e:FormEvent)=>{e.preventDefault();if(!supabase)return;setLoginBusy(true);setLoginError("");const {error}=await supabase.auth.signInWithPassword({email:loginEmail,password:loginPassword});setLoginBusy(false);if(error)setLoginError(messages.MSG1)};
 const openModal=(m:typeof modal,i?:Incident)=>{setSelected(i??null);setForm({});setModal(m)};
 const stat=(label:string,value:number,change:string,icon:typeof Activity)=> { const StatIcon=icon; return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon"><StatIcon size={18}/></span></div><div className="stat-value">{value}</div><div className="stat-foot"><span className="muted">{change}</span></div></div>};
 const renderIncidentTable=(rows:Incident[])=><div className="table-wrap"><table><thead><tr><th>Incident</th><th>Branch / Asset</th><th>Priority</th><th>Status</th><th>Reported</th><th>Action</th></tr></thead><tbody>{rows.map(i=>{const a=assets.find(x=>x.id===i.asset_id),b=branches.find(x=>x.id===i.branch_id);return <tr key={i.id}><td><button className="link-button" onClick={()=>{setSelected(i);setView("Incidents")}}>{i.title}</button><small>#{i.id.slice(0,8)}</small></td><td><strong>{b?.name??"Branch"}</strong><small>{a?.asset_tag??"Asset"} · {a?.display_name??""}</small></td><td><span className={`priority ${priorityClass(i.priority)}`}>{i.priority}</span></td><td><span className={`status ${i.status.toLowerCase().replace(" ","-")}`}>{i.status}</span></td><td>{fmt(i.created_at)}</td><td><button className="icon-button" aria-label="View incident" onClick={()=>{setSelected(i);setView("Incidents")}}><ChevronDown size={16}/></button></td></tr>})}</tbody></table>{rows.length===0&&<div className="empty"><ClipboardList size={28}/><strong>No incidents found</strong><span>Try adjusting your search or filters.</span></div>}</div>;
 const pageTitle=view==="Overview"?"Operations overview":view==="My Work"?"My work":view;
 if(!authReady)return <div className="auth-screen"><div className="auth-card"><div className="brand-mark"><Activity/></div><h1>BranchPulse</h1><p>Preparing your secure workspace…</p></div></div>;
 if(isSupabaseConfigured&&!authUser)return <div className="auth-screen"><form className="auth-card" onSubmit={signIn}><div className="brand-mark"><Activity/></div><div className="eyebrow">RETAIL OPERATIONS</div><h1>Welcome back</h1><p>Sign in to access your BranchPulse workspace.</p><label className="field"><span>Email address</span><input type="email" required value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} autoComplete="username"/></label><label className="field"><span>Password</span><input type="password" required value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} autoComplete="current-password"/></label>{loginError&&<div className="login-error">{loginError}</div>}<button className="btn primary auth-submit" disabled={loginBusy}>{loginBusy?"Signing in…":"Sign in"}</button><small>Accounts are provisioned by an Administrator. Public registration is disabled.</small></form></div>;
 return <div className="app-shell">
  <aside className={`sidebar ${mobileOpen?"open":""}`}>
   <div className="brand"><div className="brand-mark"><Activity size={21}/></div><div><b>BranchPulse</b><small>RETAIL OPERATIONS</small></div><button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={18}/></button></div>
   <div className="workspace"><div className="workspace-logo">N</div><div><b>Northline Retail</b><small>Demo organisation</small></div><ChevronDown size={15}/></div>
   <div className="nav-label">WORKSPACE</div>
   <nav>{nav.filter(n=>n.roles.includes(role)).map(n=><button key={n.name} className={`nav-item ${view===n.name?"active":""}`} onClick={()=>{setView(n.name);setSelected(null);setMobileOpen(false)}}><n.icon size={18}/><span>{n.name}</span>{n.name==="Incidents"&&<em>{visibleIncidents.filter(i=>i.status!=="Resolved").length}</em>}</button>)}</nav>
   <div className="sidebar-bottom"><div className="help-card"><CircleHelp size={17}/><div><b>Need assistance?</b><small>Contact your support team</small></div></div><div className="profile"><div className="avatar">{initials(user.full_name)}</div><div className="profile-info"><b>{user.full_name}</b><small>{roleLabels[role]}</small></div><button className="icon-button" aria-label="Sign out" onClick={doSignOut}><LogOut size={17}/></button></div></div>
  </aside>
  {mobileOpen&&<button className="scrim" onClick={()=>setMobileOpen(false)} aria-label="Close navigation"/>}
  <main className="main">
   <header className="topbar"><button className="menu-button" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="breadcrumbs">Workspace <span>/</span> <b>{pageTitle}</b></div><div className="top-actions"><span className={`mode-pill ${demoMode?"demo":"live"}`}>{demoMode?"DEMO DATA":"SUPABASE CONNECTED"}</span><button className="icon-button notification" aria-label="Notifications"><Bell size={18}/><i/></button><div className="top-avatar">{initials(user.full_name)}</div></div></header>
   <section className="content">
    <div className="page-heading"><div><div className="eyebrow">MONDAY, 09 NOVEMBER 2026</div><h1>{selected&&view==="Incidents"?"Incident details":pageTitle}</h1><p>{view==="Overview"?"Here's what's happening across your retail branches today.":view==="Incidents"?"Review, track and coordinate reported technology issues.":view==="Reports"?"Operational performance and recurring equipment issues.":`Manage ${view.toLowerCase()} across your organisation.`}</p></div><div className="heading-actions">{view==="Incidents"&&role==="branch_reporter"&&<button className="btn primary" onClick={()=>openModal("incident")}><Plus size={17}/> Report incident</button>}{view==="Assets"&&["administrator","support_coordinator"].includes(role)&&<button className="btn primary" onClick={()=>openModal("asset")}><Plus size={17}/> Add asset</button>}{view==="Branches"&&<button className="btn primary" onClick={()=>openModal("branch")}><Plus size={17}/> Add branch</button>}{view==="Staff"&&<button className="btn primary" onClick={()=>openModal("staff")}><Plus size={17}/> Add staff</button>}</div></div>
    {view==="Overview"&&<><div className="stats-grid">{stat("Open incidents",activeCount,"Across all branches",ClipboardList)}{stat("Urgent priority",urgentCount,"Requires attention",AlertCircle)}{stat("Assigned to technicians",assignedCount,"Currently allocated",Wrench)}{stat("Repeat fault assets",repeatAssets.length,"3+ incidents in 30 days",Gauge)}</div><div className="section-grid"><div className="panel"><div className="panel-head"><div><h2>Recent incidents</h2><p>Latest activity across your branches</p></div><button className="text-action" onClick={()=>setView("Incidents")}>View all <ArrowUpRight size={15}/></button></div>{renderIncidentTable(incidents.slice(0,4))}</div><div className="panel"><div className="panel-head"><div><h2>Repeat Fault Watch</h2><p>Assets with 3+ incidents in 30 days</p></div><span className="watch-icon"><Gauge size={18}/></span></div>{repeatAssets.length?repeatAssets.map(a=><div className="watch-row" key={a.id}><div className="asset-icon"><Cpu size={17}/></div><div className="watch-info"><b>{a.display_name}</b><small>{a.asset_tag} · {branches.find(b=>b.id===a.branch_id)?.name}</small></div><span className="fault-count">{a.count} faults</span></div>):<div className="empty compact">No repeat faults detected.</div>}<div className="watch-note"><AlertCircle size={15}/> Review recurring faults before they disrupt branch operations.</div></div></div></>}
    {view==="Incidents"&&<>{selected?<div className="panel detail-panel"><div className="detail-top"><div><span className={`status ${selected.status.toLowerCase().replace(" ","-")}`}>{selected.status}</span><span className={`priority ${priorityClass(selected.priority)}`}>{selected.priority} priority</span><h2>{selected.title}</h2><p>{selected.description}</p></div><button className="btn secondary" onClick={()=>setSelected(null)}>Back to incidents</button></div><div className="detail-meta"><div><small>Branch</small><b>{branches.find(b=>b.id===selected.branch_id)?.name}</b></div><div><small>Asset</small><b>{assets.find(a=>a.id===selected.asset_id)?.asset_tag}</b></div><div><small>Reported</small><b>{fmt(selected.created_at)}</b></div><div><small>Assigned technician</small><b>{staff.find(s=>s.id===selected.assigned_to)?.full_name??"Unassigned"}</b></div></div><div className="detail-actions">{["administrator","support_coordinator"].includes(role)&&<button className="btn secondary" onClick={()=>openModal("assign",selected)}>Assign technician</button>}{role==="technician"&&selected.assigned_to===user.id&&selected.status==="Assigned"&&<button className="btn primary" onClick={()=>startWork(selected)}>Start work</button>}{role==="technician"&&selected.assigned_to===user.id&&selected.status==="In Progress"&&<><button className="btn secondary" onClick={()=>openModal("note",selected)}>Add progress note</button><button className="btn secondary" onClick={()=>openModal("visit",selected)}>Log service activity</button><button className="btn primary" onClick={()=>openModal("resolve",selected)}>Resolve incident</button></>}</div>{selected.resolution_summary&&<div className="resolution"><Check size={18}/><div><b>Resolution summary</b><p>{selected.resolution_summary}</p></div></div>}{updates.filter(u=>u.incident_id===selected.id).length>0&&<div className="updates-list"><h3>Progress updates</h3>{updates.filter(u=>u.incident_id===selected.id).map(u=><div className="update-row" key={u.id}><span className="update-dot"/><div><p>{u.note}</p><small>{staff.find(s=>s.id===u.author_id)?.full_name??"Staff member"} · {fmt(u.created_at)}</small></div></div>)}</div>}</div>:<><div className="filterbar"><div className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search incidents, assets or branches..."/></div><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>All statuses</option>{(["New","Assigned","In Progress","Resolved"] as Status[]).map(s=><option key={s}>{s}</option>)}</select><select value={branchFilter} onChange={e=>setBranchFilter(e.target.value)}><option value="All branches">All branches</option>{branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select><button className="btn secondary small"><Filter size={15}/> Filters</button></div><div className="panel">{renderIncidentTable(filtered)}</div></>}</>}
    {view==="Assets"&&<div className="panel"><div className="panel-head"><div><h2>Equipment register</h2><p>Technology assets registered across branches</p></div></div><div className="asset-grid">{assets.filter(a=>role!=="branch_reporter"||a.branch_id===branchId).map(a=><div className="asset-card" key={a.id}><div className="asset-card-top"><div className="asset-icon"><Cpu size={19}/></div><span className="active-tag">Active</span></div><h3>{a.display_name}</h3><p>{a.asset_tag} · {a.category}</p><div className="asset-card-foot"><span>{branches.find(b=>b.id===a.branch_id)?.name}</span><span>{incidents.filter(i=>i.asset_id===a.id).length} incidents</span></div></div>)}</div></div>}
    {view==="Branches"&&<div className="panel"><div className="panel-head"><div><h2>Branch directory</h2><p>Manage locations in the demo organisation</p></div></div><div className="branch-grid">{branches.map(b=><div className="branch-card" key={b.id}><div className="branch-icon"><Building2 size={20}/></div><div><b>{b.name}</b><small>{b.store_code}</small><p>{b.city}, {b.province}</p></div><span className="active-tag">Active</span></div>)}</div></div>}
    {view==="My Work"&&<div className="panel"><div className="panel-head"><div><h2>Assigned to me</h2><p>Incidents requiring your attention</p></div></div>{renderIncidentTable(incidents.filter(i=>i.assigned_to===user.id))}</div>}
    {view==="Reports"&&<><div className="stats-grid">{stat("Total incidents",incidents.length,"All recorded incidents",ClipboardList)}{stat("Resolved",incidents.filter(i=>i.status==="Resolved").length,"Completed work",Check)}{stat("In progress",incidents.filter(i=>i.status==="In Progress").length,"Technician activity",Clock3)}{stat("Repeat fault assets",repeatAssets.length,"Rolling 30-day rule",Gauge)}</div><div className="panel"><div className="panel-head"><div><h2>Repeat Fault Watch</h2><p>Threshold: three or more incidents in the rolling 30-day period</p></div></div>{repeatAssets.map(a=><div className="watch-row" key={a.id}><div className="asset-icon"><Cpu size={17}/></div><div className="watch-info"><b>{a.display_name}</b><small>{a.asset_tag} · {branches.find(b=>b.id===a.branch_id)?.name}</small></div><span className="fault-count">{a.count} faults</span></div>)}</div></>}
    {view==="Staff"&&<div className="panel"><div className="panel-head"><div><h2>Staff directory</h2><p>Application users and access roles</p></div></div><div className="staff-grid">{staff.map(s=><div className="staff-row" key={s.id}><div className="avatar">{initials(s.full_name)}</div><div><b>{s.full_name}</b><small>{s.email}</small></div><span className="role-tag">{roleLabels[s.role]}</span><span className={s.is_active?"active-tag":"inactive-tag"}>{s.is_active?"Active":"Inactive"}</span>{s.is_active&&s.id!==user.id&&<button className="deactivate-button" onClick={()=>deactivateStaff(s.id)}>Deactivate</button>}</div>)}</div><div className="notice"><ShieldCheck size={17}/> Staff creation and deactivation require the secured Supabase Edge Function.</div></div>}
    {demoMode&&<div className="role-preview"><span>Preview role</span><select value={role} onChange={e=>switchRole(e.target.value as Role)}>{Object.entries(roleLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select><small>Demo role switcher for presentation only; not a security test.</small></div>}
   </section>
  </main>
  {modal&&<div className="modal-backdrop" onClick={()=>setModal(null)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><h2>{modal==="incident"?"Report an incident":modal==="asset"?"Register an asset":modal==="branch"?"Add a branch":modal==="assign"?"Assign technician":modal==="resolve"?"Resolve incident":modal==="staff"?"Create staff account":modal==="note"?"Add progress note":"Log service activity"}</h2><p>Enter the details below to continue.</p></div><button className="icon-button" onClick={()=>setModal(null)}><X/></button></div>
   {modal==="incident"&&<><Field label="Incident title" name="title" form={form} setForm={setForm}/><Field label="Description" name="description" form={form} setForm={setForm} area/><label className="field"><span>Asset</span><select value={form.asset_id||""} onChange={e=>setForm({...form,asset_id:e.target.value})}><option value="">Select asset</option>{assets.filter(a=>role!=="branch_reporter"||a.branch_id===branchId).map(a=><option key={a.id} value={a.id}>{a.asset_tag} — {a.display_name}</option>)}</select></label><label className="field"><span>Priority</span><select value={form.priority||"Medium"} onChange={e=>setForm({...form,priority:e.target.value})}>{["Low","Medium","High","Urgent"].map(x=><option>{x}</option>)}</select></label><div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={addIncident}>Submit incident</button></div></>}
   {modal==="asset"&&<><Field label="Asset tag" name="asset_tag" form={form} setForm={setForm}/><Field label="Display name" name="display_name" form={form} setForm={setForm}/><label className="field"><span>Branch</span><select value={form.branch_id||"b1"} onChange={e=>setForm({...form,branch_id:e.target.value})}>{branches.map(b=><option value={b.id}>{b.name}</option>)}</select></label><label className="field"><span>Category</span><select value={form.category||"Scanner"} onChange={e=>setForm({...form,category:e.target.value})}>{["Scanner","Printer","POS Terminal","Workstation","Network Device","Other"].map(x=><option>{x}</option>)}</select></label><div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={addAsset}>Save asset</button></div></>}
   {modal==="branch"&&<><Field label="Store code" name="store_code" form={form} setForm={setForm}/><Field label="Branch name" name="name" form={form} setForm={setForm}/><Field label="City" name="city" form={form} setForm={setForm}/><Field label="Province" name="province" form={form} setForm={setForm}/><div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={addBranch}>Save branch</button></div></>}
   {modal==="assign"&&<><label className="field"><span>Technician</span><select value={form.assigned_to||""} onChange={e=>setForm({...form,assigned_to:e.target.value})}><option value="">Select technician</option>{staff.filter(s=>s.role==="technician"&&s.is_active).map(s=><option value={s.id}>{s.full_name}</option>)}</select></label><div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={assign}>Assign technician</button></div></>}
   {modal==="resolve"&&<><Field label="Resolution summary (minimum 10 characters)" name="resolution_summary" form={form} setForm={setForm} area/><div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={resolve}>Confirm resolution</button></div></>}
   {modal==="staff"&&<><Field label="Full name" name="full_name" form={form} setForm={setForm}/><Field label="Email address" name="email" form={form} setForm={setForm}/><Field label="Temporary password (minimum 10 characters)" name="password" form={form} setForm={setForm}/><label className="field"><span>Role</span><select value={form.role||"technician"} onChange={e=>setForm({...form,role:e.target.value})}>{Object.entries(roleLabels).map(([k,v])=><option value={k}>{v}</option>)}</select></label>{form.role==="branch_reporter"&&<label className="field"><span>Assigned branch</span><select value={form.branch_id||""} onChange={e=>setForm({...form,branch_id:e.target.value})}><option value="">Select branch</option>{branches.map(b=><option value={b.id}>{b.name}</option>)}</select></label>}<div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={addStaff}>Create account</button></div></>}
   {modal==="note"&&<><Field label="Progress note" name="note" form={form} setForm={setForm} area/><div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={addUpdate}>Add note</button></div></>}
   {modal==="visit"&&<><label className="field"><span>Activity type</span><select value={form.activity_type||"remote"} onChange={e=>setForm({...form,activity_type:e.target.value})}><option value="remote">Remote</option><option value="on_site">On site</option></select></label><Field label="Time spent (minutes)" name="minutes" form={form} setForm={setForm}/><Field label="Outcome" name="outcome" form={form} setForm={setForm} area/><div className="modal-actions"><button className="btn secondary" onClick={()=>setModal(null)}>Cancel</button><button className="btn primary" onClick={addVisit}>Save activity</button></div></>}
  </div></div>}
  {toast&&<div className="toast"><Check size={17}/>{toast}<button onClick={()=>setToast("")}><X size={15}/></button></div>}
 </div>
}
function Field({label,name,form,setForm,area=false}:{label:string;name:string;form:Record<string,string>;setForm:(v:Record<string,string>)=>void;area?:boolean}){return <label className="field"><span>{label}</span>{area?<textarea value={form[name]||""} onChange={e=>setForm({...form,[name]:e.target.value})} rows={3}/>:<input value={form[name]||""} onChange={e=>setForm({...form,[name]:e.target.value})}/>}</label>}
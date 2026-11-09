import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) throw new Error("Authentication required.");

    const callerClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user: caller }, error: authError } = await callerClient.auth.getUser();
    if (authError || !caller) throw new Error("Authentication required.");

    const admin = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: profile, error: profileError } = await admin.from("profiles").select("role,is_active").eq("id", caller.id).single();
    if (profileError || profile?.role !== "administrator" || profile?.is_active !== true) {
      return new Response(JSON.stringify({ error: "Administrator access required." }), { status: 403, headers: { ...cors, "Content-Type": "application/json" } });
    }

    const body = await req.json();
    if (body.action === "deactivate") {
      if (!body.userId) throw new Error("User ID is required.");
      const { error } = await admin.from("profiles").update({ is_active: false }).eq("id", body.userId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: { ...cors, "Content-Type": "application/json" } });
    }

    if (body.action !== "create") throw new Error("Unsupported action.");
    const { fullName, email, password, role, branchId } = body;
    if (!fullName?.trim() || !email?.trim() || !password || password.length < 10) throw new Error("Name, email and a password of at least 10 characters are required.");
    if (!["administrator", "support_coordinator", "technician", "branch_reporter"].includes(role)) throw new Error("Invalid role.");
    if (role === "branch_reporter" && !branchId) throw new Error("A Branch Reporter must be linked to a branch.");

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { full_name: fullName }
    });
    if (createError || !created.user) throw createError ?? new Error("Could not create account.");

    const { error: insertError } = await admin.from("profiles").insert({
      id: created.user.id, full_name: fullName.trim(), email: email.trim().toLowerCase(),
      role, branch_id: role === "branch_reporter" ? branchId : null, is_active: true
    });
    if (insertError) {
      await admin.auth.admin.deleteUser(created.user.id);
      throw insertError;
    }
    return new Response(JSON.stringify({ success: true, userId: created.user.id }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return new Response(JSON.stringify({ error: message }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
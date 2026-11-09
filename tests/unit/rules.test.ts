import { describe, expect, it } from "vitest";
import { canSeeIncident, canTransition, isRepeatFault, messages, validResolution } from "../../src/lib/rules";
import { demoIncidents } from "../../src/lib/data";
describe("BranchPulse business rules",()=>{
 it("flags repeat faults at three incidents",()=>{expect(isRepeatFault(2)).toBe(false);expect(isRepeatFault(3)).toBe(true)});
 it("limits branch reporters to their own branch",()=>{expect(canSeeIncident("branch_reporter","u4","b1",demoIncidents[0])).toBe(true);expect(canSeeIncident("branch_reporter","u4","b2",demoIncidents[2])).toBe(false)});
 it("limits technicians to assigned incidents",()=>{expect(canSeeIncident("technician","u3",null,demoIncidents[0])).toBe(true);expect(canSeeIncident("technician","u8",null,demoIncidents[0])).toBe(false)});
 it("permits only planned technician transitions",()=>{expect(canTransition("Assigned","In Progress")).toBe(true);expect(canTransition("In Progress","Resolved")).toBe(true);expect(canTransition("New","Resolved")).toBe(false)});
 it("requires a ten-character resolution summary",()=>{expect(validResolution("short")).toBe(false);expect(validResolution("Repaired device")).toBe(true)});
 it("preserves exact approved messages",()=>{expect(messages.MSG1).toBe("Email or password is incorrect.");expect(messages.MSG7).toBe("Add a resolution summary of at least 10 characters.")});
});
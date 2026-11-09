import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../src/App";
describe("BranchPulse application shell",()=>{
 it("renders the product and operational overview",()=>{render(<App/>);expect(screen.getByText("BranchPulse")).toBeInTheDocument();expect(screen.getByText("Operations overview")).toBeInTheDocument()});
 it("shows seeded repeat fault watch",()=>{render(<App/>);expect(screen.getByText("Repeat Fault Watch")).toBeInTheDocument()});
});
export const AI_DISCLAIMER =
  "AI provides recommendations only. Final procurement decisions and statutory approvals remain with the authorized government officer and applicable rules.";

export const DEPARTMENTS = [
  "Municipal Infrastructure Department",
  "Public Health Department",
  "Urban Development Department",
  "Smart City Operations",
] as const;

export const SECTORS = [
  "Water Management",
  "Smart Healthcare",
  "Waste Management",
  "Traffic",
  "Energy",
] as const;

export const LOCATIONS = [
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Kochi, Kerala",
  "Bhopal, Madhya Pradesh",
  "Surat, Gujarat",
] as const;

export type ProblemStatus =
  | "Draft"
  | "Published"
  | "In Evaluation"
  | "Pilot"
  | "Completed";

export type Problem = {
  id: string;
  title: string;
  department: (typeof DEPARTMENTS)[number];
  sector: (typeof SECTORS)[number];
  location: string;
  budgetMin: number;
  budgetMax: number;
  timelineDays: number;
  status: ProblemStatus;
  proposals: number;
  updated: string;
  summary: string;
};

export const PROBLEMS: Problem[] = [
  {
    id: "PRB-2041",
    title: "Urban Water Leakage Detection",
    department: "Municipal Infrastructure Department",
    sector: "Water Management",
    location: "Pune, Maharashtra",
    budgetMin: 600000,
    budgetMax: 1200000,
    timelineDays: 90,
    status: "Draft",
    proposals: 0,
    updated: "2 hours ago",
    summary:
      "Non-revenue water loss across municipal distribution lines is estimated at 28%. Field teams detect leakages only after visible surface damage.",
  },
  {
    id: "PRB-2038",
    title: "Smart Water Monitoring for Government Buildings",
    department: "Municipal Infrastructure Department",
    sector: "Water Management",
    location: "Pune, Maharashtra",
    budgetMin: 700000,
    budgetMax: 900000,
    timelineDays: 90,
    status: "Pilot",
    proposals: 102,
    updated: "Yesterday",
    summary:
      "Government building complexes lack real-time consumption visibility, causing unnoticed overflow and pump wastage.",
  },
  {
    id: "PRB-2035",
    title: "Predictive Bed Allocation for District Hospitals",
    department: "Public Health Department",
    sector: "Smart Healthcare",
    location: "Jaipur, Rajasthan",
    budgetMin: 1500000,
    budgetMax: 2500000,
    timelineDays: 120,
    status: "In Evaluation",
    proposals: 64,
    updated: "3 days ago",
    summary:
      "Emergency admissions peak unpredictably, leading to bed shortage and patient diversion across district hospitals.",
  },
  {
    id: "PRB-2031",
    title: "Ward-Level Waste Collection Route Optimisation",
    department: "Urban Development Department",
    sector: "Waste Management",
    location: "Kochi, Kerala",
    budgetMin: 900000,
    budgetMax: 1800000,
    timelineDays: 100,
    status: "Published",
    proposals: 27,
    updated: "5 days ago",
    summary:
      "Collection vehicles follow static routes, causing missed bins in dense wards and empty runs in low-generation wards.",
  },
  {
    id: "PRB-2028",
    title: "Adaptive Signal Control at Congested Junctions",
    department: "Smart City Operations",
    sector: "Traffic",
    location: "Surat, Gujarat",
    budgetMin: 2000000,
    budgetMax: 4000000,
    timelineDays: 150,
    status: "Published",
    proposals: 41,
    updated: "1 week ago",
    summary:
      "Fixed-time signals at 18 junctions cause peak-hour queue spillback onto arterial corridors.",
  },
  {
    id: "PRB-2024",
    title: "Streetlight Energy Consumption Reduction",
    department: "Smart City Operations",
    sector: "Energy",
    location: "Bhopal, Madhya Pradesh",
    budgetMin: 1200000,
    budgetMax: 2200000,
    timelineDays: 120,
    status: "Completed",
    proposals: 58,
    updated: "3 weeks ago",
    summary:
      "Streetlight circuits run at full load through the night with no dimming or fault reporting.",
  },
  {
    id: "PRB-2019",
    title: "Air Quality Micro-Sensing Network",
    department: "Urban Development Department",
    sector: "Energy",
    location: "Jaipur, Rajasthan",
    budgetMin: 800000,
    budgetMax: 1600000,
    timelineDays: 110,
    status: "Draft",
    proposals: 0,
    updated: "4 days ago",
    summary:
      "Only three reference stations cover the city, leaving ward-level pollution hotspots unmeasured.",
  },
  {
    id: "PRB-2016",
    title: "Sewage Overflow Early Warning",
    department: "Municipal Infrastructure Department",
    sector: "Water Management",
    location: "Kochi, Kerala",
    budgetMin: 1000000,
    budgetMax: 1900000,
    timelineDays: 130,
    status: "In Evaluation",
    proposals: 33,
    updated: "6 days ago",
    summary:
      "Monsoon overflow events are reported by citizens after contamination has already occurred.",
  },
];

export type Startup = {
  id: string;
  name: string;
  match: number;
  city: string;
  founded: number;
  team: number;
  sector: string;
  readiness: "Deployment Ready" | "Pilot Ready" | "Field Tested";
  blurb: string;
  capabilities: string[];
  stack: string[];
  certifications: string[];
  pastPilots: { name: string; client: string; outcome: string }[];
  people: { name: string; role: string }[];
  documents: string[];
};

export const STARTUPS: Startup[] = [
  {
    id: "aquasense",
    name: "AquaSense Technologies",
    match: 94,
    city: "Pune, Maharashtra",
    founded: 2019,
    team: 34,
    sector: "Water Management",
    readiness: "Deployment Ready",
    blurb:
      "Non-invasive acoustic and flow-analytics platform for municipal water networks, deployed across 4 Indian cities.",
    capabilities: [
      "Acoustic leak detection",
      "Flow anomaly analytics",
      "Pressure zone modelling",
      "Building-level consumption dashboards",
      "SCADA and GIS integration",
    ],
    stack: ["LoRaWAN sensors", "Edge gateway (ARM)", "Python analytics", "PostgreSQL + TimescaleDB", "React dashboard"],
    certifications: ["ISO 27001", "BIS registered hardware", "CE marked sensors", "STQC security audit cleared"],
    pastPilots: [
      { name: "Ward 14 Leak Mapping", client: "Nagpur Municipal Corporation", outcome: "22% reduction in non-revenue water" },
      { name: "Campus Water Audit", client: "State Engineering College", outcome: "Payback achieved in 11 months" },
      { name: "Pump House Monitoring", client: "Kochi Water Authority", outcome: "98.6% telemetry uptime over 8 months" },
    ],
    people: [
      { name: "Ananya Deshpande", role: "Founder & CEO" },
      { name: "Rohit Menon", role: "CTO, Sensor Systems" },
      { name: "Farhan Qureshi", role: "Head of Deployments" },
    ],
    documents: ["Company profile.pdf", "Technical datasheet.pdf", "Pilot case study - Nagpur.pdf", "Data protection policy.pdf"],
  },
  {
    id: "hydrotrack",
    name: "HydroTrack Labs",
    match: 89,
    city: "Bengaluru, Karnataka",
    founded: 2020,
    team: 21,
    sector: "Water Management",
    readiness: "Pilot Ready",
    blurb:
      "Machine-learning platform for district metered area analysis and burst prediction on ageing pipelines.",
    capabilities: ["Burst prediction", "DMA analytics", "Smart meter ingestion", "Mobile field app"],
    stack: ["NB-IoT meters", "Kafka pipeline", "Go services", "ClickHouse", "Flutter field app"],
    certifications: ["ISO 9001", "BIS registered hardware"],
    pastPilots: [
      { name: "DMA Analytics Pilot", client: "Hubballi Water Board", outcome: "14% loss reduction in 6 months" },
      { name: "Burst Prediction Trial", client: "Mysuru City Corporation", outcome: "Predicted 7 of 9 burst events" },
    ],
    people: [
      { name: "Kavya Iyer", role: "Co-founder" },
      { name: "Siddharth Rao", role: "Head of Data Science" },
    ],
    documents: ["Company profile.pdf", "Model validation report.pdf"],
  },
  {
    id: "flowguard",
    name: "FlowGuard Systems",
    match: 86,
    city: "Ahmedabad, Gujarat",
    founded: 2018,
    team: 47,
    sector: "Water Management",
    readiness: "Field Tested",
    blurb:
      "Industrial-grade valve automation and telemetry hardware for water utilities and large campuses.",
    capabilities: ["Automated valve control", "Tank level telemetry", "Pump efficiency analytics", "On-site maintenance network"],
    stack: ["Modbus controllers", "GSM telemetry", "Java backend", "MySQL", "Angular console"],
    certifications: ["ISO 9001", "ISO 14001", "CE marked controllers"],
    pastPilots: [
      { name: "Campus Valve Automation", client: "Gujarat Housing Board", outcome: "Manual interventions down 60%" },
      { name: "Tank Telemetry Rollout", client: "Surat Municipal Corporation", outcome: "120 tanks instrumented" },
    ],
    people: [
      { name: "Meera Shah", role: "Managing Director" },
      { name: "Vivek Patel", role: "Head of Engineering" },
    ],
    documents: ["Company profile.pdf", "Hardware compliance pack.pdf"],
  },
];

export type ComplianceFinding = {
  id: string;
  title: string;
  severity: "High" | "Medium" | "Low";
  clause: string;
  detail: string;
  suggestion: string;
};

export const COMPLIANCE_FINDINGS: ComplianceFinding[] = [
  {
    id: "cf-1",
    title: "Prior Experience Restriction",
    severity: "High",
    clause: "Clause 4.2 — Eligibility",
    detail:
      "The clause requires bidders to have completed at least three municipal projects of similar value in the last five years. This excludes newly incorporated innovators without a comparable track record.",
    suggestion:
      "Replace the prior-project requirement with demonstrated capability evidence: a working prototype, a field trial report, or a reference deployment of any scale.",
  },
  {
    id: "cf-2",
    title: "Ambiguous Technical Requirement",
    severity: "Medium",
    clause: "Clause 6.1 — Technical Scope",
    detail:
      "'High accuracy leak detection' is not quantified, which risks inconsistent evaluation and post-award disputes.",
    suggestion:
      "State a measurable threshold: detection of leaks above 0.5 litres/second within 10 minutes, with a false-positive rate below 10%.",
  },
  {
    id: "cf-3",
    title: "Data Ownership",
    severity: "High",
    clause: "Clause 9.4 — Data and IP",
    detail:
      "The draft does not state who owns sensor data generated during the pilot, or what happens to it after the engagement ends.",
    suggestion:
      "Add a clause vesting ownership of all operational data with the department, granting the vendor a limited processing licence and requiring export in open formats on exit.",
  },
  {
    id: "cf-4",
    title: "Missing Metric",
    severity: "Medium",
    clause: "Clause 7.3 — Evaluation",
    detail:
      "System availability is described as 'reliable operation' with no uptime metric, so pilot success cannot be objectively assessed.",
    suggestion:
      "Add a KPI of 95% minimum monthly system uptime, measured from platform heartbeat logs and reviewed at each milestone.",
  },
];

export const STRUCTURED_OUTPUT = {
  outcome:
    "Reduce unaccounted water loss in selected government building complexes by at least 15% within 90 days, using continuously measured consumption data rather than manual meter reads.",
  scope:
    "Instrumentation of inlet and zone-level water lines across 5 government buildings, continuous data capture, anomaly alerting, and a departmental dashboard. Excludes civil replacement of pipelines and any change to existing billing systems.",
  constraints:
    "Installation must not interrupt building water supply for more than 2 hours per site. No civil excavation permitted inside heritage-listed blocks. All data must reside within India. Works to be executed outside public service hours.",
  deliverables:
    "Site survey report, installed and calibrated sensing setup, live dashboard with departmental logins, weekly consumption and anomaly report, milestone evidence pack, final evaluation report with raw data export.",
  requirements:
    "Solution-neutral: any technology capable of measuring flow and detecting anomalies without mandating a specific sensor type, vendor platform, or communication protocol. Must expose data through an open API and export in CSV/JSON.",
  kpis:
    "1. Water consumption reduction ≥ 15% against a 30-day baseline. 2. System uptime ≥ 95% monthly. 3. Leak detection and alert time < 10 minutes. 4. At least 90% of installed sensing points reporting daily.",
};

export const OFFICER_INPUT = `Our government buildings waste a lot of water. We only find out about leaks and overflowing tanks when someone complains or when the monthly bill looks high. We want some way to see water usage as it happens and get alerted early. Budget is limited and we cannot break walls or dig inside the older heritage block. We would like to try it in about five buildings first before doing anything larger.`;

export type Proposal = {
  id: string;
  startup: string;
  title: string;
  technicalFit: number;
  outcomeAlignment: number;
  cost: number;
  scalability: number;
  pilotReadiness: number;
  budget: number;
  status: "Shortlisted" | "Under Review" | "Not Shortlisted";
};

export const PROPOSALS: Proposal[] = [
  { id: "PRP-8801", startup: "AquaSense Technologies", title: "Building-level acoustic and flow monitoring", technicalFit: 94, outcomeAlignment: 92, cost: 88, scalability: 90, pilotReadiness: 95, budget: 800000, status: "Shortlisted" },
  { id: "PRP-8802", startup: "HydroTrack Labs", title: "ML burst prediction with NB-IoT metering", technicalFit: 89, outcomeAlignment: 87, cost: 84, scalability: 88, pilotReadiness: 82, budget: 880000, status: "Shortlisted" },
  { id: "PRP-8803", startup: "FlowGuard Systems", title: "Valve automation and tank telemetry package", technicalFit: 86, outcomeAlignment: 80, cost: 79, scalability: 85, pilotReadiness: 88, budget: 940000, status: "Shortlisted" },
  { id: "PRP-8804", startup: "MeterMind Analytics", title: "Meter data analytics overlay", technicalFit: 78, outcomeAlignment: 76, cost: 91, scalability: 72, pilotReadiness: 70, budget: 620000, status: "Under Review" },
  { id: "PRP-8805", startup: "Nirmal Water Works", title: "Manual audit plus periodic sensing", technicalFit: 64, outcomeAlignment: 61, cost: 94, scalability: 55, pilotReadiness: 74, budget: 480000, status: "Under Review" },
  { id: "PRP-8806", startup: "UrbanPulse IoT", title: "Multi-utility sensing gateway", technicalFit: 81, outcomeAlignment: 74, cost: 70, scalability: 86, pilotReadiness: 68, budget: 1020000, status: "Under Review" },
  { id: "PRP-8807", startup: "Sarita Systems", title: "Tank overflow prevention controllers", technicalFit: 72, outcomeAlignment: 69, cost: 87, scalability: 63, pilotReadiness: 77, budget: 560000, status: "Not Shortlisted" },
  { id: "PRP-8808", startup: "Drishti Infra Tech", title: "CCTV-assisted leak spotting", technicalFit: 58, outcomeAlignment: 52, cost: 80, scalability: 49, pilotReadiness: 60, budget: 700000, status: "Not Shortlisted" },
];

export const PILOT = {
  name: "Smart Water Monitoring Pilot",
  vendor: "AquaSense Technologies",
  sites: 5,
  durationDays: 90,
  budget: 800000,
  progress: 72,
  startDate: "12 June 2026",
  endDate: "10 September 2026",
  officer: "Smt. R. Nanda, Executive Engineer",
};

export const MILESTONES = [
  { id: "m1", name: "Initiated", detail: "Kick-off, site access approvals and baseline sign-off", status: "Complete", date: "12 Jun 2026" },
  { id: "m2", name: "Deployment", detail: "Sensing installed and calibrated across 5 buildings", status: "Complete", date: "04 Jul 2026" },
  { id: "m3", name: "Data Collection", detail: "Continuous telemetry and weekly anomaly reporting", status: "In Progress", date: "Ongoing" },
  { id: "m4", name: "Mid-Review", detail: "Joint review of KPI trends and issue log", status: "Upcoming", date: "18 Aug 2026" },
  { id: "m5", name: "Final Evaluation", detail: "Evidence pack, data export and success determination", status: "Upcoming", date: "10 Sep 2026" },
];

export const KPIS = [
  { id: "k1", name: "Water consumption reduction", target: "15%", actual: "18%", status: "Met", note: "Measured against a 30-day pre-installation baseline." },
  { id: "k2", name: "System uptime", target: "95%", actual: "98%", status: "Met", note: "Platform heartbeat across all sensing points." },
  { id: "k3", name: "Leak detection time", target: "< 10 min", actual: "6 min", status: "Met", note: "Median time from anomaly onset to officer alert." },
  { id: "k4", name: "Reporting points active daily", target: "90%", actual: "93%", status: "Met", note: "Two sensors replaced in week 6 after power fault." },
];

export const KPI_TREND = [
  { week: "W1", consumption: 4, uptime: 91, detection: 14 },
  { week: "W2", consumption: 7, uptime: 94, detection: 12 },
  { week: "W3", consumption: 9, uptime: 96, detection: 11 },
  { week: "W4", consumption: 11, uptime: 95, detection: 9 },
  { week: "W5", consumption: 13, uptime: 97, detection: 8 },
  { week: "W6", consumption: 14, uptime: 93, detection: 8 },
  { week: "W7", consumption: 16, uptime: 98, detection: 7 },
  { week: "W8", consumption: 17, uptime: 98, detection: 7 },
  { week: "W9", consumption: 18, uptime: 99, detection: 6 },
  { week: "W10", consumption: 18, uptime: 98, detection: 6 },
];

export const PIPELINE_CHART = [
  { stage: "Problems", count: 42 },
  { stage: "Published", count: 31 },
  { stage: "In Evaluation", count: 19 },
  { stage: "Pilots", count: 11 },
  { stage: "Successful", count: 14 },
  { stage: "Procured", count: 7 },
];

export const SECTOR_CHART = [
  { sector: "Water", pilots: 9 },
  { sector: "Health", pilots: 5 },
  { sector: "Waste", pilots: 4 },
  { sector: "Traffic", pilots: 6 },
  { sector: "Energy", pilots: 3 },
];

export const PIPELINE_STEPS = [
  { step: 1, name: "Problem Intake", detail: "Officer describes the challenge in plain language." },
  { step: 2, name: "AI Structuring", detail: "Draft is structured into outcomes, scope and KPIs." },
  { step: 3, name: "Compliance Check", detail: "Restrictive or ambiguous clauses are flagged for review." },
  { step: 4, name: "Startup Discovery", detail: "Eligible innovators are matched against the requirement." },
  { step: 5, name: "Proposal Evaluation", detail: "Proposals are analysed and compared on a common matrix." },
  { step: 6, name: "Controlled Pilot", detail: "A limited, time-bound deployment with defined KPIs." },
  { step: 7, name: "Evidence & Decision", detail: "Officer determines whether success criteria were met." },
  { step: 8, name: "Scale-Up Procurement", detail: "Applicable statutory route, approvals and contract." },
];

export const CHECKLIST = [
  { id: "c1", name: "Pilot evaluation report signed by evaluating officer", status: "Complete" },
  { id: "c2", name: "KPI evidence pack with raw data export attached", status: "Complete" },
  { id: "c3", name: "Administrative approval for scale-up expenditure", status: "In Progress" },
  { id: "c4", name: "Applicable procurement route recorded with justification", status: "In Progress" },
  { id: "c5", name: "Technical specification finalised for 250-building rollout", status: "Pending" },
  { id: "c6", name: "Budget head and fund availability certificate", status: "Pending" },
  { id: "c7", name: "Vendor compliance and tax clearance verification", status: "Pending" },
  { id: "c8", name: "Draft contract vetted by legal cell", status: "Pending" },
];

export const SCALE_STEPS = [
  { name: "Pilot Success", detail: "All four KPIs met and recorded in the evaluation summary.", state: "done" },
  { name: "Review Evidence", detail: "Evidence pack, raw data and site reports examined by the technical committee.", state: "done" },
  { name: "Applicable Route", detail: "Competent authority records the procurement route applicable under prevailing rules.", state: "active" },
  { name: "Approvals", detail: "Administrative and financial approvals obtained for the sanctioned outlay.", state: "pending" },
  { name: "Contract", detail: "Specification, terms and service levels finalised and vetted.", state: "pending" },
  { name: "250 Buildings Scale", detail: "Phased rollout across 250 government buildings over 18 months.", state: "pending" },
];

export const ACTIVITY = [
  { id: "a1", text: "AI compliance check completed for Urban Water Leakage Detection", meta: "12 minutes ago", tone: "info" },
  { id: "a2", text: "Milestone evidence uploaded by AquaSense Technologies", meta: "1 hour ago", tone: "success" },
  { id: "a3", text: "3 new proposals received for Adaptive Signal Control", meta: "4 hours ago", tone: "info" },
  { id: "a4", text: "Mid-review scheduled for Smart Water Monitoring Pilot", meta: "Yesterday", tone: "warning" },
  { id: "a5", text: "Streetlight Energy Consumption Reduction marked completed", meta: "2 days ago", tone: "success" },
];

export const formatINR = (value: number) =>
  "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const formatINRShort = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return formatINR(value);
};

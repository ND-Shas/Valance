import React, { useState } from 'react';

interface IndustriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMeet: () => void;
  initialTab?: 'industries' | 'capabilities';
}

interface IndustryItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  solutions: string[];
  icon: string;
}

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  deliverables: string;
  tag: string;
}

const industriesData: IndustryItem[] = [
  {
    id: 'recruitment',
    number: '01',
    name: 'Recruitment & Staffing',
    tagline: 'Candidate tracking, recruiter performance & placement automation',
    solutions: ['Recruitment CRM', 'Candidate Pipeline Tracking', 'Recruiter Desks & Dashboards', 'Interview Scheduling Automation'],
    icon: '👥'
  },
  {
    id: 'real-estate',
    number: '02',
    name: 'Real Estate',
    tagline: 'High-velocity property pipeline & site visit coordination',
    solutions: ['Property CRM', 'Lead Management & Attribution', 'Site Visit Tracking', 'Sales & Booking Automation'],
    icon: '🏢'
  },
  {
    id: 'ecommerce',
    number: '03',
    name: 'E-commerce & Retail',
    tagline: 'Connected order fulfillment, customer lifecycle & inventory sync',
    solutions: ['Order Processing Dashboards', 'Inventory Systems', 'Customer Lifecycle Management', 'Multi-channel Integrations'],
    icon: '🛍️'
  },
  {
    id: 'finance',
    number: '04',
    name: 'Finance & Consulting',
    tagline: 'Secure client portals, automated deliverables & financial KPI tracking',
    solutions: ['Client Portals', 'Automated Reporting Systems', 'Workflow Automation', 'Executive Business Dashboards'],
    icon: '📈'
  },
  {
    id: 'education',
    number: '05',
    name: 'Education & Training',
    tagline: 'Centralized admissions funnel, student records & automated follow-ups',
    solutions: ['Student Management Systems', 'Admission CRM', 'Enquiry Funnel Tracking', 'Automated Student Communication'],
    icon: '🎓'
  },
  {
    id: 'logistics',
    number: '06',
    name: 'Logistics & Operations',
    tagline: 'Real-time shipment dispatch, SLA monitors & multi-depot visibility',
    solutions: ['Shipment & Fleet Tracking', 'Operational Dashboards', 'Internal Dispatch Systems', 'Automated Vendor Escalations'],
    icon: '🚚'
  },
  {
    id: 'healthcare',
    number: '07',
    name: 'Healthcare',
    tagline: 'Structured patient intake, appointment scheduling & clinic ops',
    solutions: ['Appointment Booking Systems', 'Patient Enquiry CRM', 'Administrative Automation', 'Staff Roster & Task Coordination'],
    icon: '🏥'
  },
  {
    id: 'manufacturing',
    number: '08',
    name: 'Manufacturing',
    tagline: 'Production run monitoring, materials tracking & machine downtime alerts',
    solutions: ['Production Monitoring Dashboards', 'Inventory & Raw Material Tracking', 'Process Automation', 'Shopfloor Operational Reporting'],
    icon: '⚙️'
  }
];

const capabilitiesData: CapabilityItem[] = [
  {
    id: 'crm',
    number: '01',
    title: 'Custom CRM Systems',
    deliverables: 'Sales, recruitment, client, lead & employee management built around your actual operating rules.',
    tag: 'PIPELINES & REVENUE'
  },
  {
    id: 'websites',
    number: '02',
    title: 'Business Websites & Portals',
    deliverables: 'Premium client-facing websites, high-conversion landing pages, and interactive client portals.',
    tag: 'BRAND & PORTALS'
  },
  {
    id: 'custom-software',
    number: '03',
    title: 'Custom Software Engineering',
    deliverables: 'Internal operational platforms, custom administrative consoles, and business-specific tools.',
    tag: 'PURPOSE-BUILT TECH'
  },
  {
    id: 'automation',
    number: '04',
    title: 'Workflow & Process Automation',
    deliverables: 'Automated task assignments, WhatsApp/email notifications, client follow-ups, and scheduled reports.',
    tag: 'ZERO MANUAL EFFORT'
  },
  {
    id: 'bi',
    number: '05',
    title: 'Business Intelligence & Dashboards',
    deliverables: 'Power BI-style interactive executive dashboards, real-time KPI metrics, and multi-team reporting.',
    tag: 'OPERATIONAL INTELLIGENCE'
  },
  {
    id: 'integrations',
    number: '06',
    title: 'API Integrations & Connected Apps',
    deliverables: 'Seamless bridges between databases, third-party SaaS tools, payment gateways, and communication channels.',
    tag: 'CONNECTED ECOSYSTEM'
  },
  {
    id: 'ai',
    number: '07',
    title: 'AI-Powered Workflows',
    deliverables: 'AI-assisted operations, automated inquiry parsing, intelligent data summarization, and smart chatbots.',
    tag: 'INTELLIGENT SYSTEMS'
  }
];

export const IndustriesModal: React.FC<IndustriesModalProps> = ({
  isOpen,
  onClose,
  onOpenMeet,
  initialTab = 'industries'
}) => {
  const [activeTab, setActiveTab] = useState<'industries' | 'capabilities'>(initialTab);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('recruitment');

  if (!isOpen) return null;

  const currentInd = industriesData.find((i) => i.id === selectedIndustry) || industriesData[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Industries We Serve & Architecture Capabilities"
      className="fixed inset-0 z-50 bg-[#120a05]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8 select-none animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-[#edece8] text-[#1d150c] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-[#1d150c]/10 my-auto flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#1d150c]/12 pb-5 flex-shrink-0">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#a54d25] font-semibold block">
              VALENCE SYSTEMS MATRIX
            </span>
            <h2
              style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
              className="text-xl sm:text-2xl md:text-3xl font-light text-[#1d150c] tracking-tight uppercase"
            >
              Technology Tailored To Your Operations
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#1d150c]/5 hover:bg-[#1d150c]/15 text-[#1d150c] flex items-center justify-center transition-colors cursor-pointer text-sm"
            aria-label="Close matrix"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 pt-5 pb-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('industries')}
            className={`text-xs font-mono uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'industries'
                ? 'bg-[#1d150c] text-white font-semibold shadow-md'
                : 'bg-white/60 text-[#1d150c]/70 hover:bg-white'
            }`}
          >
            Industries We Serve (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('capabilities')}
            className={`text-xs font-mono uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'capabilities'
                ? 'bg-[#1d150c] text-white font-semibold shadow-md'
                : 'bg-white/60 text-[#1d150c]/70 hover:bg-white'
            }`}
          >
            What VALENCE Can Build (7)
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-4">
          
          {/* TAB 1: INDUSTRIES WE SERVE */}
          {activeTab === 'industries' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Left Column: 8 Industry Pills */}
              <div className="md:col-span-5 grid grid-cols-1 gap-2">
                {industriesData.map((ind) => {
                  const isSelected = ind.id === selectedIndustry;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setSelectedIndustry(ind.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#a54d25] shadow-md -translate-r-1'
                          : 'bg-white/50 border-transparent hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{ind.icon}</span>
                        <div>
                          <p className="text-xs font-serif font-bold text-[#1d150c]">
                            {ind.name}
                          </p>
                          <p className="text-[10px] font-mono text-[#1d150c]/60">
                            Pillar {ind.number}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs font-mono ${isSelected ? 'text-[#a54d25] font-bold' : 'text-[#1d150c]/40'}`}>
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Industry Deep Dive */}
              <div className="md:col-span-7 bg-white/80 rounded-2xl p-6 border border-[#1d150c]/10 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1d150c]/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-[#edece8]">{currentInd.icon}</span>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#a54d25] font-semibold">
                          INDUSTRY SOLUTIONS
                        </span>
                        <h3 className="text-xl font-serif font-bold text-[#1d150c]">
                          {currentInd.name}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#1d150c]/5 text-[#1d150c]/70">
                      {currentInd.number} / 08
                    </span>
                  </div>

                  <p className="text-sm font-light text-[#1d150c]/85 leading-relaxed font-editorial-sans">
                    {currentInd.tagline}. We eliminate spreadsheet clutter, missed client follow-ups, and repetitive human labor by building dedicated software tuned to your specific operations.
                  </p>

                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#a54d25] font-semibold">
                      Key Systems We Deploy For {currentInd.name}:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentInd.solutions.map((sol, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#edece8]/70 border border-[#1d150c]/8"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a54d25]" />
                          <span className="text-xs font-mono font-medium text-[#1d150c]">
                            {sol}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1d150c]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#1d150c]/60">
                    Full code & data ownership · Zero seat bloat
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenMeet();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a54d25] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#1d150c] transition-colors cursor-pointer"
                  >
                    <span>Request Demo →</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHAT VALENCE CAN BUILD FOR ANY BUSINESS */}
          {activeTab === 'capabilities' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {capabilitiesData.map((cap) => (
                  <div
                    key={cap.id}
                    className="p-4 rounded-2xl bg-white/80 border border-[#1d150c]/10 hover:border-[#a54d25]/50 transition-all shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#a54d25] font-semibold px-2 py-0.5 rounded bg-[#a54d25]/10">
                        {cap.tag}
                      </span>
                      <span className="text-[11px] font-mono text-[#1d150c]/40">
                        {cap.number}
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#1d150c]">
                      {cap.title}
                    </h3>
                    <p className="text-xs font-light text-[#1d150c]/80 leading-relaxed font-editorial-sans">
                      {cap.deliverables}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Action Footer */}
        <div className="pt-4 mt-2 border-t border-[#1d150c]/12 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#1d150c]/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently taking new project consultations for Q1 & Q2</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenMeet();
              }}
              className="px-6 py-2.5 rounded-full bg-[#1d150c] text-white hover:bg-[#a54d25] text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow hover:scale-105 active:scale-95 cursor-pointer"
            >
              Discuss Your Architecture with Founders →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};


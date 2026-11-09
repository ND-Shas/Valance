export interface IndustryDetail {
  id: string;
  number: string;
  name: string;
  shortName: string;
  targetAudience: string;
  icon: string;
  badge?: string;
  themeColor: string;
  problem: string[];
  challenges: string[];
  howWeHelp: string[];
  outcome: string;
  note?: string;
}

export const industriesData: IndustryDetail[] = [
  {
    id: 'recruitment',
    number: '01',
    name: 'Recruitment & Staffing',
    shortName: 'Recruitment',
    targetAudience: 'Recruitment Agencies · Staffing Firms · Talent Acquisition Companies · Executive Search Firms',
    icon: '👥',
    badge: 'FLAGSHIP NICHE',
    themeColor: '#fa712a',
    problem: [
      'Recruitment businesses operate through complex workflows involving candidates, recruiters, clients, vacancies, interviews, feedback, offers, and placements.',
      'Many agencies struggle with disconnected spreadsheets, scattered candidate databases, repetitive recruiter follow-ups, and limited visibility into team performance.',
      'As recruitment volume increases, operational complexity grows. Candidate information becomes fragmented, follow-ups are missed, client communication slows down, and management loses visibility into recruitment performance.'
    ],
    challenges: [
      'Candidate data scattered across Excel, email, and WhatsApp.',
      'Recruiters manually tracking interviews and candidate progress.',
      'Missed client feedback and interview follow-ups.',
      'Difficulty tracking multiple vacancies and client requirements.',
      'No centralized visibility into recruiter productivity.',
      'Duplicate candidate records and inconsistent data.',
      'Manual placement reporting and revenue tracking.',
      'Poor coordination between recruiters, sales, and management.'
    ],
    howWeHelp: [
      'Recruitment CRM — Centralized candidate and client information.',
      'Candidate Tracking System — Complete candidate lifecycle visibility.',
      'Vacancy Management — Organized job requirements and assignments.',
      'Interview Automation — Automated scheduling and reminders.',
      'Feedback Management — Structured client and candidate feedback.',
      'Recruiter Dashboards — Productivity and performance visibility.',
      'Placement Analytics — Track submissions, interviews, offers, and placements.',
      'Workflow Automation — Reduce repetitive operational tasks.'
    ],
    outcome: 'Better recruitment visibility, more organized operations, reduced manual coordination, and improved scalability.'
  },
  {
    id: 'real-estate',
    number: '02',
    name: 'Real Estate',
    shortName: 'Real Estate',
    targetAudience: 'Real Estate Agencies · Property Developers · Brokers · Commercial Property Firms',
    icon: '🏢',
    badge: 'PIPELINES & VISITS',
    themeColor: '#e85a12',
    problem: [
      'Real estate businesses generate leads from multiple sources — property portals, advertisements, social media, referrals, and website enquiries.',
      'Without a connected system, sales teams struggle to manage enquiries, coordinate property visits, maintain follow-ups, and understand which opportunities are converting.',
      'Potential customers frequently lose interest when communication is delayed or inconsistent.'
    ],
    challenges: [
      'Leads scattered across WhatsApp and property portals.',
      'Slow response to new enquiries.',
      'Missed follow-ups and site visits.',
      'Difficulty matching customers with suitable properties.',
      'Poor visibility into sales agent performance.',
      'Confusing property inventory management.',
      'Lack of conversion and revenue analytics.'
    ],
    howWeHelp: [
      'Real Estate CRM — Centralized property enquiries and customer profiles.',
      'Lead Distribution — Assign enquiries to appropriate sales agents.',
      'Follow-up Automation — Automated reminders and communication workflows.',
      'Property Management — Organize inventory, availability, and property details.',
      'Site Visit Tracking — Manage appointments and visit outcomes.',
      'Sales Analytics — Track conversion rates, agent productivity, and pipeline.',
      'Customer Portals — Provide structured property information and enquiry experiences.'
    ],
    outcome: 'Faster enquiry handling, organized sales operations, and better visibility into property sales performance.'
  },
  {
    id: 'ecommerce',
    number: '03',
    name: 'E-commerce & Retail',
    shortName: 'E-commerce',
    targetAudience: 'Online Stores · D2C Brands · Retail Chains · Consumer Businesses',
    icon: '🛍️',
    badge: 'ORDER & INVENTORY',
    themeColor: '#d94b0e',
    problem: [
      'E-commerce businesses manage customers, orders, products, inventory, payments, deliveries, marketing campaigns, and customer support simultaneously.',
      'As order volumes grow, disconnected systems and manual processes create operational bottlenecks.',
      'Businesses often have access to enormous amounts of data but lack a unified view of their performance.'
    ],
    challenges: [
      'Inventory discrepancies between sales channels.',
      'Manual order tracking and processing.',
      'Fragmented customer information.',
      'Difficulty identifying repeat customers.',
      'Poor visibility into sales performance.',
      'Repetitive customer support enquiries.',
      'Manual reconciliation of orders and payments.',
      'Difficulty coordinating multiple sales channels.'
    ],
    howWeHelp: [
      'Order Management Systems — Centralized order tracking and workflows.',
      'Inventory Dashboards — Monitor inventory levels and stock movement.',
      'Customer CRM — Manage customer relationships and purchase history.',
      'Business Analytics — Track sales, revenue, and product performance.',
      'Automated Notifications — Order updates and customer communication.',
      'Platform Integrations — Connect websites, APIs, and business tools.',
      'Operational Automation — Reduce repetitive administrative work.'
    ],
    outcome: 'Connected commerce operations, improved operational visibility, and more efficient business workflows.'
  },
  {
    id: 'finance',
    number: '04',
    name: 'Finance & Consulting',
    shortName: 'Finance',
    targetAudience: 'Consulting Firms · Financial Advisory · Business Consultants · Professional Services',
    icon: '📈',
    badge: 'CLIENT PORTALS',
    themeColor: '#c8501e',
    problem: [
      'Professional service businesses depend heavily on client relationships, project execution, reporting, billing, and recurring communication.',
      'When these processes are managed manually, teams spend valuable time coordinating information rather than delivering services.',
      'Management often struggles to understand project profitability, client performance, outstanding payments, and operational efficiency.'
    ],
    challenges: [
      'Client information distributed across multiple tools.',
      'Manual proposal and invoice tracking.',
      'Poor visibility into project progress.',
      'Repetitive client reporting.',
      'Payment follow-up difficulties.',
      'Limited understanding of business profitability.',
      'Lack of centralized project documentation.'
    ],
    howWeHelp: [
      'Client Management Systems — Centralized client records and interactions.',
      'Project Management Platforms — Track deliverables, milestones, and responsibilities.',
      'Financial Dashboards — Monitor revenue, payments, and outstanding invoices.',
      'Automated Reporting — Generate structured business reports.',
      'Client Portals — Improve access to project information and deliverables.',
      'Workflow Automation — Automate recurring tasks and reminders.',
      'Business Intelligence — Connect operational and financial data.'
    ],
    outcome: 'Better client visibility, structured project execution, and improved business control.'
  },
  {
    id: 'education',
    number: '05',
    name: 'Education & Training',
    shortName: 'Education',
    targetAudience: 'Educational Institutes · Coaching Centres · EdTech · Training Organisations',
    icon: '🎓',
    badge: 'ADMISSIONS & FUNNELS',
    themeColor: '#b84218',
    problem: [
      'Educational institutions manage admissions, enquiries, students, faculty, attendance, fees, academic schedules, and communication.',
      'Many institutions still rely on manual registers, spreadsheets, and disconnected applications.',
      'As student numbers increase, administrative workload increases, and important information becomes harder to manage.'
    ],
    challenges: [
      'Admission enquiries lost or poorly tracked.',
      'Manual student registration.',
      'Difficult fee collection tracking.',
      'Fragmented student information.',
      'Repetitive communication with students and parents.',
      'Manual attendance reporting.',
      'Limited visibility into admissions and institutional performance.'
    ],
    howWeHelp: [
      'Admission CRM — Track enquiries and admission conversion.',
      'Student Management Systems — Centralize student information.',
      'Fee Management — Organize payment records and outstanding balances.',
      'Attendance Dashboards — Track attendance and generate reports.',
      'Communication Automation — Send reminders and institutional updates.',
      'Performance Analytics — Monitor admission trends and operations.',
      'Student Portals — Provide organized access to information.'
    ],
    outcome: 'Simplified administration, better admission tracking, and connected institutional operations.'
  },
  {
    id: 'logistics',
    number: '06',
    name: 'Logistics & Supply Chain',
    shortName: 'Logistics',
    targetAudience: 'Logistics Companies · Freight Forwarders · Distribution Businesses · Transportation Firms',
    icon: '🚚',
    badge: 'DISPATCH & FLEET',
    themeColor: '#fa712a',
    problem: [
      'Logistics businesses coordinate shipments, vehicles, drivers, warehouses, customers, delivery schedules, and operational teams.',
      'When information is spread across spreadsheets, calls, and messaging applications, tracking becomes difficult and operational delays become harder to identify.',
      'Businesses need reliable visibility into shipment progress, operational responsibilities, and delivery performance.'
    ],
    challenges: [
      'Manual shipment tracking.',
      'Delayed operational updates.',
      'Poor coordination between departments.',
      'Lack of real-time delivery visibility.',
      'Repetitive status communication.',
      'Manual billing and reporting.',
      'Limited fleet and resource utilization analytics.'
    ],
    howWeHelp: [
      'Shipment Management Systems — Track shipments and delivery stages.',
      'Operations Dashboards — Centralize operational visibility.',
      'Automated Notifications — Communicate shipment updates.',
      'Fleet Tracking Integrations — Connect supported tracking systems.',
      'Delivery Analytics — Monitor delivery performance.',
      'Billing Automation — Organize shipment billing workflows.',
      'API Integrations — Connect logistics platforms and internal systems.'
    ],
    outcome: 'Improved operational visibility, structured coordination, and more efficient logistics workflows.'
  },
  {
    id: 'healthcare',
    number: '07',
    name: 'Healthcare & Clinics',
    shortName: 'Healthcare',
    targetAudience: 'Clinics · Diagnostic Centres · Healthcare Administrators · Medical Organisations',
    icon: '🏥',
    badge: 'CLINICAL OPS',
    themeColor: '#e85a12',
    problem: [
      'Healthcare organisations manage appointments, patient enquiries, scheduling, administrative records, billing, and communication.',
      'Disconnected administrative workflows can create delays, repetitive work, and poor visibility into operational performance.',
      'Healthcare teams need systems that support efficient administration without compromising privacy or security.'
    ],
    challenges: [
      'Manual appointment scheduling.',
      'Missed appointment reminders.',
      'Repetitive administrative work.',
      'Disconnected enquiry management.',
      'Difficulty tracking appointment utilization.',
      'Manual operational reporting.',
      'Limited integration between administrative systems.'
    ],
    howWeHelp: [
      'Appointment Management — Organize scheduling and appointment workflows.',
      'Patient Enquiry CRM — Track enquiries and administrative communication.',
      'Reminder Automation — Support appointment reminders.',
      'Operations Dashboards — Monitor appointment and administrative metrics.',
      'Billing Integrations — Connect supported financial workflows.',
      'Administrative Automation — Reduce repetitive tasks.',
      'System Integrations — Connect compatible healthcare applications.'
    ],
    outcome: 'More organized administration, improved appointment coordination, and better operational visibility.',
    note: 'Healthcare solutions require appropriate privacy, security, and regulatory safeguards. These requirements are scoped before development.'
  },
  {
    id: 'manufacturing',
    number: '08',
    name: 'Manufacturing & Industrial',
    shortName: 'Manufacturing',
    targetAudience: 'Manufacturing Companies · Industrial Businesses · Production Facilities · B2B Manufacturers',
    icon: '⚙️',
    badge: 'SHOPFLOOR & INVENTORY',
    themeColor: '#c8501e',
    problem: [
      'Manufacturing businesses coordinate production, inventory, suppliers, orders, quality processes, and operational teams.',
      'When information is fragmented, management struggles to identify bottlenecks, track production performance, and make timely decisions.',
      'Many businesses need better visibility into their operations without replacing every existing system.'
    ],
    challenges: [
      'Production information maintained manually.',
      'Limited visibility into inventory.',
      'Supplier coordination difficulties.',
      'Manual production reporting.',
      'Difficulty tracking operational bottlenecks.',
      'Fragmented data across departments.',
      'Poor visibility into order fulfilment.'
    ],
    howWeHelp: [
      'Production Dashboards — Monitor production metrics.',
      'Inventory Management Systems — Organize stock and material information.',
      'Supplier Management — Centralize supplier records and workflows.',
      'Operational Reporting — Generate structured reports.',
      'Order Tracking — Monitor order fulfilment.',
      'Workflow Automation — Automate repetitive administrative processes.',
      'System Integrations — Connect compatible ERP and operational platforms.'
    ],
    outcome: 'Better operational visibility, more organized workflows, and data-informed management.'
  },
  {
    id: 'legal',
    number: '09',
    name: 'Legal & Professional Firms',
    shortName: 'Legal & Advisory',
    targetAudience: 'Law Firms · Legal Consultants · Professional Advisory Firms',
    icon: '⚖️',
    badge: 'MATTER MANAGEMENT',
    themeColor: '#b84218',
    problem: [
      'Professional firms manage clients, cases, documents, deadlines, billing, and communication.',
      'Without structured systems, important information becomes difficult to locate and teams struggle to maintain consistent operational visibility.'
    ],
    challenges: [
      'Fragmented client records.',
      'Manual case and matter tracking.',
      'Difficult document organization.',
      'Missed deadline reminders.',
      'Manual billing and reporting.',
      'Repetitive administrative workflows.'
    ],
    howWeHelp: [
      'Client CRM — Centralized client information.',
      'Matter Management — Organize cases and assignments.',
      'Document Workflows — Structured document management.',
      'Deadline Automation — Automated reminders and notifications.',
      'Billing Dashboards — Track invoices and payments.',
      'Business Reporting — Monitor operational performance.'
    ],
    outcome: 'Organized client operations, improved administrative visibility, and structured workflows.'
  },
  {
    id: 'hospitality',
    number: '10',
    name: 'Hospitality & Travel',
    shortName: 'Hospitality',
    targetAudience: 'Hotels · Travel Agencies · Resorts · Hospitality Businesses',
    icon: '🏨',
    badge: 'RESERVATIONS & GUESTS',
    themeColor: '#fa712a',
    problem: [
      'Hospitality businesses coordinate bookings, guest enquiries, reservations, customer communication, payments, and service operations.',
      'Disconnected workflows can lead to delayed communication, booking inconsistencies, and repetitive administrative work.'
    ],
    challenges: [
      'Manual reservation tracking.',
      'Missed guest enquiries.',
      'Repetitive customer communication.',
      'Fragmented booking information.',
      'Poor visibility into business performance.',
      'Manual operational reporting.'
    ],
    howWeHelp: [
      'Booking Management Systems — Organize reservation workflows.',
      'Guest CRM — Centralize guest information.',
      'Communication Automation — Support confirmations and reminders.',
      'Operations Dashboards — Monitor bookings and business metrics.',
      'Customer Portals — Provide digital booking experiences.',
      'System Integrations — Connect supported booking and payment platforms.'
    ],
    outcome: 'Better reservation visibility, streamlined communication, and organized hospitality operations.'
  },
  {
    id: 'marketing',
    number: '11',
    name: 'Marketing & Creative Agencies',
    shortName: 'Marketing Agencies',
    targetAudience: 'Digital Marketing Agencies · Advertising Firms · Creative Studios',
    icon: '🎯',
    badge: 'CLIENT REPORTING & ATTRIBUTION',
    themeColor: '#e85a12',
    problem: [
      'Agencies manage campaigns, clients, leads, deliverables, reporting, budgets, and multiple team members.',
      'Manual reporting and disconnected project workflows consume time that could otherwise be spent on strategy and creative execution.'
    ],
    challenges: [
      'Manual campaign reporting.',
      'Fragmented client communication.',
      'Difficulty tracking leads and opportunities.',
      'Repetitive report generation.',
      'Poor visibility into campaign performance.',
      'Disconnected project management systems.'
    ],
    howWeHelp: [
      'Agency CRM — Manage leads, clients, and sales opportunities.',
      'Campaign Dashboards — Centralize performance metrics.',
      'Automated Reporting — Generate recurring client reports.',
      'Workflow Automation — Simplify repetitive tasks.',
      'Client Portals — Provide structured reporting access.',
      'API Integrations — Connect supported marketing platforms.'
    ],
    outcome: 'Better client visibility, reduced reporting overhead, and connected agency workflows.'
  },
  {
    id: 'construction',
    number: '12',
    name: 'Construction & Infrastructure',
    shortName: 'Construction',
    targetAudience: 'Construction Companies · Contractors · Infrastructure Businesses · Architecture Firms',
    icon: '🏗️',
    badge: 'MILESTONES & CONTRACTORS',
    themeColor: '#c8501e',
    problem: [
      'Construction businesses coordinate projects, contractors, materials, schedules, budgets, documentation, and multiple stakeholders.',
      'Disconnected information makes project visibility difficult and increases administrative complexity.'
    ],
    challenges: [
      'Manual project progress tracking.',
      'Fragmented contractor communication.',
      'Difficult document coordination.',
      'Limited visibility into project milestones.',
      'Manual budget and reporting workflows.',
      'Poor coordination between office and field teams.'
    ],
    howWeHelp: [
      'Project Tracking Systems — Organize project milestones.',
      'Contractor Management — Centralize contractor information.',
      'Document Workflows — Structure project documentation.',
      'Operations Dashboards — Monitor project progress.',
      'Reporting Automation — Generate structured reports.',
      'System Integrations — Connect supported operational tools.'
    ],
    outcome: 'Better project visibility, organized coordination, and streamlined administrative workflows.'
  }
];


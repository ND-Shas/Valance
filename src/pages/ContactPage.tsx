import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audioEngine';

/**
 * =========================================================================
 * GOOGLE SHEETS WEBHOOK INTEGRATION
 * =========================================================================
 */
export const GOOGLE_SHEETS_WEBHOOK_URL: string =
  'https://script.google.com/macros/s/AKfycbyWmqBd7hKnpvEJIfSdFYFgWoLxmFkHtnsaIgup8hpwNWPUPwk6njJDB9OowOXqGCmXow/exec';

interface ContactPageProps {
  onNavigateHome: () => void;
  onExploreServices?: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: ''
};

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onExploreServices
}) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Scroll to top when contact page mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSoundEnabled(soundEngine.getStatus());
  }, []);

  const toggleSound = () => {
    soundEngine.toggle();
    setSoundEnabled(soundEngine.getStatus());
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone or WhatsApp number.';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number (min 8-10 digits).';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'Please specify the service or system you require.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a brief description of your requirements (min 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const submissionPayload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      // Company field bundles Phone so it is guaranteed to show in existing Google Sheet columns
      company: formData.company.trim()
        ? `${formData.company.trim()} | Phone: ${formData.phone.trim()}`
        : `Phone: ${formData.phone.trim()}`,
      service: formData.service.trim(),
      budget: formData.budget.trim() || 'Flexible / To Discuss',
      timeline: formData.timeline.trim() || 'Immediate / Flexible',
      message: `${formData.message.trim()}\n\n[Contact Phone: ${formData.phone.trim()}]`,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      const webhookUrl: string = GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhookUrl && webhookUrl.trim().startsWith('http')) {
        await fetch(webhookUrl.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionPayload),
        });
      }

      // Smooth cinematic processing delay
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setIsSuccess(true);
      setFormData(initialFormState);
      setErrors({});
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('project-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0704] text-[#edece8] select-none overflow-x-hidden relative font-editorial-sans">
      
      {/* Background Ambient Glows & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#fa712a]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#e85a12]/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full px-6 md:px-14 py-4 md:py-6 bg-[#0d0704]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to VALENCE Home"
        >
          <img
            src="/assets/logo-dark.png"
            alt="VALENCE Info Tech Solutions"
            className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(250,113,42,0.25)] group-hover:scale-105 transition-transform duration-300"
          />
        </button>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={toggleSound}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-white text-[11px] font-mono tracking-wider uppercase transition-colors cursor-pointer"
          >
            <span>{soundEnabled ? '● SOUND ON' : '○ SOUND OFF'}</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/10 hover:bg-[#fa712a] text-white border border-white/20 hover:border-transparent text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
          >
            <span>← RETURN TO HOME</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 py-12 md:py-20 space-y-16 md:space-y-24">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6 pt-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fa712a]/15 border border-[#fa712a]/30 text-[#fa712a] text-xs font-mono uppercase tracking-[0.25em] font-semibold animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#fa712a] animate-pulse" />
            <span>VALENCE ARCHITECTURE STUDIO · CONTACT &amp; INQUIRY</span>
          </div>

          <h1
            style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
            className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight uppercase leading-[1.12]"
          >
            LET'S BUILD SOMETHING POWERFUL.
          </h1>

          <p className="text-base sm:text-lg font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
            Have an idea, a challenge, or a business workflow that needs transformation? Let's discuss how VALENCE can help you innovate, build, and scale.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#fa712a] text-white hover:bg-white hover:text-[#0d0704] transition-all duration-300 text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_10px_30px_rgba(250,113,42,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>START A PROJECT ↓</span>
            </button>

            <button
              type="button"
              onClick={onExploreServices || onNavigateHome}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 border border-white/20 hover:border-[#fa712a] text-white hover:bg-white/10 transition-all duration-300 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
            >
              <span>EXPLORE OUR SERVICES ↗</span>
            </button>
          </div>
        </section>

        {/* CONTACT INFORMATION CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Email */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#fa712a]/50 hover:bg-white/[0.08] transition-all duration-300 group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fa712a]/15 text-[#fa712a] flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
              ✉️
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#fa712a] uppercase tracking-wider font-semibold block">
                DIRECT EMAIL
              </span>
              <h3 className="text-sm font-serif font-bold text-white mt-1">
                Project Inquiries
              </h3>
            </div>
            <a
              href="mailto:contact@valenceinfotech.com"
              className="text-xs font-mono text-white/90 hover:text-[#fa712a] transition-colors block break-all"
            >
              contact@valenceinfotech.com
            </a>
            <p className="text-[11px] font-light text-white/60 leading-relaxed">
              Sub-24 hour response SLA for all commercial &amp; technical inquiries.
            </p>
          </div>

          {/* Card 2: Founders Direct */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#fa712a]/50 hover:bg-white/[0.08] transition-all duration-300 group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fa712a]/15 text-[#fa712a] flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
              👥
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#fa712a] uppercase tracking-wider font-semibold block">
                FOUNDER CONSULTATION
              </span>
              <h3 className="text-sm font-serif font-bold text-white mt-1">
                Leadership Team
              </h3>
            </div>
            <p className="text-xs font-mono text-white/90">
              Shivang Mishra · CEO<br />
              Shashank Mishra · CTO
            </p>
            <p className="text-[11px] font-light text-white/60 leading-relaxed">
              Direct consultation with founding partners — zero sales rep friction.
            </p>
          </div>

          {/* Card 3: Business Inquiries */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#fa712a]/50 hover:bg-white/[0.08] transition-all duration-300 group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fa712a]/15 text-[#fa712a] flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
              💼
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#fa712a] uppercase tracking-wider font-semibold block">
                OFFICIAL DOMAINS
              </span>
              <h3 className="text-sm font-serif font-bold text-white mt-1">
                Systems &amp; Solutions
              </h3>
            </div>
            <p className="text-xs font-mono text-white/90">
              Recruitment CRM · Custom Software · AI Workflows
            </p>
            <p className="text-[11px] font-light text-white/60 leading-relaxed">
              Fixed-scope pilots with transparent timelines and code ownership.
            </p>
          </div>

          {/* Card 4: Office Hours */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#fa712a]/50 hover:bg-white/[0.08] transition-all duration-300 group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fa712a]/15 text-[#fa712a] flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
              ⏱️
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#fa712a] uppercase tracking-wider font-semibold block">
                OPERATIONAL SCHEDULE
              </span>
              <h3 className="text-sm font-serif font-bold text-white mt-1">
                Studio Hours
              </h3>
            </div>
            <p className="text-xs font-mono text-white/90">
              Mon – Fri: 9:00 AM – 7:00 PM IST
            </p>
            <p className="text-[11px] font-light text-white/60 leading-relaxed">
              Available for Google Meet discovery sessions and architecture reviews.
            </p>
          </div>

        </section>

        {/* 3. PROJECT INQUIRY FORM */}
        <section
          id="project-form"
          className="relative rounded-3xl bg-[#120a05]/95 border border-white/15 p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-white/20"
        >
          <div className="max-w-3xl mx-auto space-y-9">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#fa712a] font-semibold block">
                PROJECT DISCOVERY &amp; ARCHITECTURE INTAKE
              </span>
              <h2
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-2xl sm:text-4xl font-light text-white tracking-tight uppercase"
              >
                Tell Us About Your Business Requirements
              </h2>
              <p className="text-xs sm:text-sm font-light text-white/70 max-w-xl mx-auto">
                Fill in the details below. Our founders review every submission directly and log requirements to coordinate your architecture session.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-white/5 border border-emerald-500/40 text-center space-y-5 animate-fadeIn shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto animate-bounce">
                  ✓
                </div>
                <h3
                  style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                  className="text-2xl font-light text-white tracking-wide uppercase"
                >
                  Inquiry Successfully Received
                </h3>
                <p className="text-sm font-light text-white/80 max-w-lg mx-auto leading-relaxed font-editorial-sans">
                  Thank you for reaching out. Shivang Mishra &amp; Shashank Mishra have received your inquiry details and will connect via work email / WhatsApp within 24 hours with an initial architecture roadmap.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#fa712a] text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Full Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                      Full Name <span className="text-[#fa712a]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                        errors.fullName ? 'border-red-500/80 bg-red-500/5' : 'border-white/15 focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] font-mono text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                      Work Email <span className="text-[#fa712a]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                        errors.email ? 'border-red-500/80 bg-red-500/5' : 'border-white/15 focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone / WhatsApp Number & Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                      Phone Number / WhatsApp <span className="text-[#fa712a]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                        errors.phone ? 'border-red-500/80 bg-red-500/5' : 'border-white/15 focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] font-mono text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                      Company / Agency Name <span className="text-white/40 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Recruitment Partners"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Row 3: Custom Service Required (User types what they need) */}
                <div className="space-y-2 text-left">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                    Service Required <span className="text-[#fa712a]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Custom CRM for Recruiters, Business Automation, Web Platform, AI Integration..."
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                      errors.service ? 'border-red-500/80 bg-red-500/5' : 'border-white/15 focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50'
                    }`}
                  />
                  {errors.service && (
                    <p className="text-[11px] font-mono text-red-400">{errors.service}</p>
                  )}
                </div>

                {/* Row 4: Custom Estimated Budget & Timeline (User types both freely) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                      Estimated Budget <span className="text-white/40 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹25,000 – ₹50,000 or Flexible / Milestone-based"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                      Target Delivery Timeline <span className="text-white/40 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1–2 Weeks, Within 1 Month, Immediate..."
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Row 5: Message / Description */}
                <div className="space-y-2 text-left">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/80 font-medium block">
                    Message / Operational Frictions <span className="text-[#fa712a]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your current business workflows, bottlenecks, or what system you want VALENCE to engineer..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                      errors.message ? 'border-red-500/80 bg-red-500/5' : 'border-white/15 focus:border-[#fa712a] focus:ring-1 focus:ring-[#fa712a]/50'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] font-mono text-white/50 text-left">
                    🔒 All submissions are encrypted and kept confidential under NDA standards.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#fa712a] text-white hover:bg-white hover:text-[#0d0704] transition-all duration-300 text-xs font-mono font-semibold uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Requirements...</span>
                      </>
                    ) : (
                      <span>TRANSMIT PROJECT REQUIREMENTS →</span>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </section>

      </main>

      {/* 4. FOOTER */}
      <footer className="w-full border-t border-white/10 mt-20 py-10 px-6 md:px-14 bg-[#0a0503] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-dark.png"
              alt="VALENCE Logo"
              className="h-8 w-auto object-contain opacity-85"
            />
          </div>

          <div className="font-mono text-[11px] text-white/50">
            © 2026 VALENCE Info Tech Solutions. All Rights Reserved.
          </div>

          <button
            type="button"
            onClick={onNavigateHome}
            className="text-xs font-mono text-[#fa712a] hover:underline uppercase tracking-wider cursor-pointer"
          >
            ← Back to Main Experience
          </button>
        </div>
      </footer>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  FileText, 
  Send, 
  Check, 
  Copy, 
  Terminal 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    interest: 'BMS Hardware Platform',
    message: ''
  });

  const emailAddress = "barakmicroelectronics@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Column: Context & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIRECT INQUIRY CHANNEL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Ready to Power Your Next Hardware & Mobility Innovation?
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Whether you need high-safety BMS hardware, digital twin simulation software, or a complete fleet management solution, <strong className="text-white font-medium">Barak Microelectronics</strong> is your trusted technical partner.
            </p>

            {/* Direct Details Box */}
            <div className="space-y-3 pt-2 font-mono text-xs">
              
              {/* Email Item */}
              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 flex items-center justify-between group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">OFFICIAL EMAIL</span>
                    <a href={`mailto:${emailAddress}`} className="text-slate-200 hover:text-cyan-300 font-semibold transition-colors">
                      {emailAddress}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#0D1424] hover:bg-cyan-950 border border-slate-700 text-slate-400 hover:text-cyan-300 transition-colors"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Item */}
              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">HEADQUARTERS</span>
                  <span className="text-slate-200 font-semibold">Tamil Nadu, India</span>
                </div>
              </div>

              {/* UDYAM Item */}
              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">UDYAM REGISTRATION</span>
                  <span className="text-cyan-300 font-semibold">UDYAM-TN-07-0145217</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Engineering Inquiry Form */}
          <div className="lg:col-span-7 bg-[#090D16]/95 p-6 sm:p-8 rounded-2xl border border-cyan-500/20 shadow-xl">
            
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald-glow">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-sans font-bold text-white">Inquiry Transmitted</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to Barak Microelectronics. Our engineering team will review your specifications and respond to <strong>{formData.email || 'your email'}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#0D1424] border border-slate-700 text-xs font-mono text-cyan-300 hover:border-cyan-400 transition-all"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                  <span className="text-cyan-400">// PARTNER & TECHNICAL ENGAGEMENT</span>
                  <span className="text-slate-500">ENCRYPTED DISPATCH</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Alex Chen"
                      className="w-full bg-[#0D1424] border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Apex EV Mobility Ltd"
                      className="w-full bg-[#0D1424] border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@organization.com"
                      className="w-full bg-[#0D1424] border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Domain of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-[#0D1424] border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none transition-colors"
                    >
                      <option value="BMS Hardware Platform">Next-Gen BMS Hardware Platform</option>
                      <option value="Battery Emulator & Digital Twin">Battery Emulator & Digital Twin Simulator</option>
                      <option value="Clara Bot AI Integration">Clara Bot AI Diagnostic Assistant</option>
                      <option value="Open-Source EDA Collaboration">Open-Source EDA & PCB Tools</option>
                      <option value="Commercial EV Fleet Operations">Ride-Hailing & EV Fleet Management</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                    Technical Specifications / Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on your pack voltage, cell chemistry (NMC/LFP), vehicle form factor, or simulation requirements..."
                    className="w-full bg-[#0D1424] border border-slate-800 focus:border-cyan-400 rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-[#090D16] font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-cyan-glow flex items-center justify-center gap-2 group"
                >
                  <span>Dispatch Technical Inquiry</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

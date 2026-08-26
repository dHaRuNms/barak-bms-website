import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutMission: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ON.energy style kinetic scroll scrub reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      });

      tl.fromTo([line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0.1, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.2, ease: 'power2.out' }
      )
      .fromTo(bodyRef.current,
        { opacity: 0.1, y: 20 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(cardRef.current,
        { opacity: 0.2, scale: 0.96 },
        { opacity: 1, scale: 1, ease: 'power2.out' },
        '-=0.3'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-36 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 bg-black border-b border-white/10"
    >
      <div className="space-y-16">
        
        {/* Micro-label */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
          <Compass className="w-3.5 h-3.5 text-white" />
          <span>// BRAND PHILOSOPHY & CAPABILITY SCOPE</span>
        </div>

        {/* ON.energy / Prime Intellect Light-weight Large Architectural Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-light tracking-[-0.04em] text-white leading-[1.1]">
          <span ref={line1Ref} className="block will-change-transform">
            Precision Engineering.
          </span>
          <span ref={line2Ref} className="block text-zinc-400 will-change-transform">
            Intelligent Software.
          </span>
          <span ref={line3Ref} className="block text-zinc-600 will-change-transform">
            Sustainable Future.
          </span>
        </h2>

        {/* Narrative Copy & Specification Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p 
              ref={bodyRef}
              className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-body"
            >
              <strong className="text-white font-medium">Barak Microelectronics</strong> is an innovative technology enterprise dedicated to advancing energy management systems, hardware design tooling, and smart mobility platforms. To engineer uncompromising hardware safety and open, scalable software infrastructure that powers the future of electric mobility and energy storage.
            </p>
          </div>

          {/* Registration & Domain Info Box */}
          <div ref={cardRef} className="lg:col-span-5 stark-panel p-6 rounded-xl space-y-4 border border-white/15">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              <span>ENTERPRISE SPECIFICATION</span>
              <span className="text-white font-medium">MSME VERIFIED</span>
            </div>
            
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-500">UDYAM ID:</span>
                <span className="text-white font-medium">UDYAM-TN-07-0145217</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-500">LOCATION:</span>
                <span className="text-zinc-300">Tamil Nadu, India</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">CORE FOCUS:</span>
                <span className="text-zinc-300 font-medium">Full-Stack BMS & Telematics</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

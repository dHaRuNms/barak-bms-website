import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutMission: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blur-to-focus cinematic scrubbed text reveal
      gsap.fromTo(headlineRef.current, 
        {
          filter: 'blur(16px)',
          opacity: 0.1,
          y: 40,
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(bodyRef.current,
        {
          opacity: 0.2,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 25%',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(cardRef.current,
        {
          scale: 0.94,
          opacity: 0.3,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 bg-[#050505]"
    >
      <div className="space-y-16">
        
        {/* Micro-label */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>// BRAND PHILOSOPHY & CAPABILITY SCOPE</span>
        </div>

        {/* Cinematic Blur-to-Focus Headline */}
        <h2 
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-[-0.03em] text-white leading-[1.15] will-change-transform"
        >
          Precision Engineering.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            Intelligent Software.
          </span>{' '}
          Sustainable Future.
        </h2>

        {/* Narrative Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p 
              ref={bodyRef}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed font-body"
            >
              <strong className="text-white font-semibold">Barak Microelectronics</strong> is an innovative technology enterprise dedicated to advancing energy management systems, hardware design tooling, and smart mobility platforms. To engineer uncompromising hardware safety and open, scalable software infrastructure that powers the future of electric mobility and energy storage.
            </p>
          </div>

          {/* Registration & Domain Info Box */}
          <div ref={cardRef} className="lg:col-span-5 stark-panel p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              <span>ENTERPRISE SPECIFICATION</span>
              <span className="text-emerald-400">MSME VERIFIED</span>
            </div>
            
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-500">UDYAM ID:</span>
                <span className="text-cyan-400 font-semibold">UDYAM-TN-07-0145217</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-500">LOCATION:</span>
                <span className="text-slate-200">Tamil Nadu, India</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">CORE FOCUS:</span>
                <span className="text-emerald-400">Full-Stack BMS & Telematics</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

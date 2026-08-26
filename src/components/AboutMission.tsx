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
      className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 bg-black"
    >
      <div className="space-y-16">
        
        {/* Micro-label */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
          <Compass className="w-3.5 h-3.5 text-white" />
          <span>// BRAND PHILOSOPHY & CAPABILITY SCOPE</span>
        </div>

        {/* Cinematic Blur-to-Focus Headline in solid monochrome */}
        <h2 
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-[-0.03em] text-white leading-[1.15] will-change-transform"
        >
          Precision Engineering.{' '}
          <span className="text-zinc-400">
            Intelligent Software.
          </span>{' '}
          Sustainable Future.
        </h2>

        {/* Narrative Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p 
              ref={bodyRef}
              className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed font-body"
            >
              <strong className="text-white font-semibold">Barak Microelectronics</strong> is an innovative technology enterprise dedicated to advancing energy management systems, hardware design tooling, and smart mobility platforms. To engineer uncompromising hardware safety and open, scalable software infrastructure that powers the future of electric mobility and energy storage.
            </p>
          </div>

          {/* Registration & Domain Info Box */}
          <div ref={cardRef} className="lg:col-span-5 stark-panel p-6 rounded-xl space-y-4 border border-white/15">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              <span>ENTERPRISE SPECIFICATION</span>
              <span className="text-white font-bold">MSME VERIFIED</span>
            </div>
            
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-500">UDYAM ID:</span>
                <span className="text-white font-semibold">UDYAM-TN-07-0145217</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-500">LOCATION:</span>
                <span className="text-zinc-200">Tamil Nadu, India</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">CORE FOCUS:</span>
                <span className="text-zinc-200 font-semibold">Full-Stack BMS & Telematics</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

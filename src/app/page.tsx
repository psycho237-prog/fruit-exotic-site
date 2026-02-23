"use client"
import { useRef, useEffect } from "react"
import HeroScene from "@/components/HeroScene"
import gsap from "gsap"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const textRef = useRef<HTMLHeadingElement>(null!)
  const subtextRef = useRef<HTMLParagraphElement>(null!)
  const buttonRef = useRef<HTMLButtonElement>(null!)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation for UI
      const tl = gsap.timeline({ delay: 0.5 })

      tl.from(".hero-content h1", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        skewY: 7,
      })
        .from(".hero-content p", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6")
        .from(".hero-content button", {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=0.4")
        .from("header", {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }, "-=1.2")
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-lime-500 selection:text-black">
      {/* 3D Background */}
      <HeroScene />

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none">

        {/* Top Header Placeholder (Logo / Nav) */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-10 lg:p-16 mix-blend-difference overflow-hidden">
          <div className="text-2xl font-black tracking-tighter uppercase italic">
            FR<span className="text-[#ccff00]">E</span>SH
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-0.5 bg-white" />
            <div className="w-6 h-0.5 bg-white/40" />
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-3xl mt-12 mix-blend-normal hero-content">
          <h1 ref={textRef} className="text-7xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-4 drop-shadow-2xl">
            PURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">ENERGY.</span><br />
            <span className="text-[#ccff00]">NATURAL FLAVOR.</span>
          </h1>

          <p ref={subtextRef} className="mt-8 text-xl md:text-2xl text-white/70 max-w-lg font-medium leading-relaxed drop-shadow-md">
            Experience the refreshing burst of vitality with our premium blend of nature's finest ingredients.
          </p>

          <button ref={buttonRef} className="mt-12 px-10 py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white font-bold text-lg flex items-center gap-4 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-500 pointer-events-auto shadow-2xl group uppercase tracking-widest">
            Discover Fresh
            <span className="group-hover:translate-x-2 transition-transform duration-300 italic">→</span>
          </button>
        </div>

        {/* Status indicator */}
        <div className="absolute bottom-12 left-12 flex items-center gap-4 mix-blend-difference pointer-events-auto">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-[#ccff00] font-bold">Origin</span>
            <span className="text-sm font-bold opacity-80 uppercase tracking-tighter">Amazonia / 2026</span>
          </div>
        </div>

        {/* Scroll Indicator Placeholder */}
        <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 mix-blend-difference">
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/10 via-white/50 to-transparent relative">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-[#ccff00] animate-[scroll_2s_infinite]" />
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </main>
  )
}

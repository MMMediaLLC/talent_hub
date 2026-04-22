"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 300;
      targetY = e.clientY - 300;
    };

    const animate = () => {
      // Smooth lerp towards mouse position
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-transparent">
      {/* Dynamic glow tracking mouse via ref — no state, no re-renders */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(155,224,7,0.25) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(100px)",
          opacity: 0.25,
          willChange: "transform",
        }}
      />

      {/* Floating blob 1 — pink/purple */}
      <div
        className="absolute rounded-full mix-blend-screen pointer-events-none"
        style={{
          top: "20%",
          left: "15%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle, rgba(155,224,7,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.3,
          animation: "floatA 20s ease-in-out infinite",
        }}
      />

      {/* Floating blob 2 — blue */}
      <div
        className="absolute rounded-full mix-blend-screen pointer-events-none"
        style={{
          bottom: "15%",
          right: "10%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.2,
          animation: "floatB 25s ease-in-out infinite",
        }}
      />

      {/* Floating blob 3 — green accent */}
      <div
        className="absolute rounded-full mix-blend-screen pointer-events-none"
        style={{
          top: "60%",
          left: "50%",
          width: "30vw",
          height: "30vw",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.15,
          animation: "floatC 18s ease-in-out infinite",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23ffffff' fill-opacity='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(180deg, white 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-60px, 50px) scale(1.2); }
          66% { transform: translate(30px, -30px) scale(0.8); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-50%, -30px) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

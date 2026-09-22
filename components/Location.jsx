'use client'
import { MapPin, Navigation } from 'lucide-react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const locationLandmarks = [
  { name: 'Eastern Express Highway', dist: '5 Min' },
  { name: 'Ghodbunder Road', dist: '5 Min' },
  { name: 'Upcoming Metro Station', dist: '5 Min' },
  { name: 'Thane Railway Station', dist: '15 Min' },
  { name: 'Viviana Mall', dist: '10 Min' },
  { name: 'Korum Mall', dist: '12 Min' },
  { name: 'Orchids The International School', dist: '10 Min' },
  { name: 'Lodha Business District', dist: '15 Min' },
  { name: 'Bandra Kurla Complex (BKC)', dist: '35–40 Min' },
]

const Location = () => {
  return (
    <section 
      id="location" 
      className="pt-2 sm:pt-4 md:pt-6 pb-16 md:pb-20"
      style={{
        backgroundImage: "url('/images/highlights/highlight.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">

        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-center" data-aos="fade-down" data-aos-duration="1000">
           <h2
             className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold leading-tight uppercase tracking-wider text-white"
             style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", marginBottom: '12px' }}
           >
             LOCATION ADVANTAGES
           </h2>
           {/* Decorative Line */}
           <div className="flex items-center justify-center mt-3 mb-2">
             <div className="w-16 h-[1px] bg-white/70"></div>
             <div className="w-2 h-2 rounded-full bg-white mx-3"></div>
             <div className="w-16 h-[1px] bg-white/70"></div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* RIGHT — Architectural Transit Line Card (Concept 2 - Exact Original Size) */}
          <div className="w-full lg:w-[46%] lg:order-2" data-aos="fade-left" data-aos-duration="1000">
            <div 
              className="p-3.5 sm:p-5 lg:px-6 lg:py-[18px] rounded-2xl bg-white border border-[#E8DEC8] shadow-[0_12px_32px_rgba(0,2,66,0.12)] flex flex-col h-full justify-between"
            >
              <div>
                {/* Header Title & Origin Badge */}
                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 pb-2.5 mb-3.5 border-b-2 border-[#B88A44]">
                  <h3 
                    className="text-[14.5px] sm:text-[17px] font-bold text-[#1A2024] tracking-wide uppercase flex items-center gap-1.5 sm:gap-2 m-0"
                    style={{ fontFamily: F_JOST }}
                  >
                    <MapPin size={20} className="text-[#B88A44] shrink-0" />
                    <span>SEAMLESS CONNECTIVITY</span>
                  </h3>
                  <span className="text-[11px] font-bold text-[#B88A44] bg-[#FDFBF7] px-2.5 py-0.5 rounded-full border border-[#E8DEC8] whitespace-nowrap shrink-0 inline-flex items-center gap-1 shadow-2xs">
                    📍 Prestige Thane Rising
                  </span>
                </div>

                {/* Vertical Transit Spine */}
                <div className="relative pl-6 flex flex-col justify-between py-1">
                  {/* Continuous Vertical Line */}
                  <div 
                    className="absolute left-[11px] top-2 bottom-3 w-[2px] rounded-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, #412011 0%, #B88A44 60%, #D4A762 100%)'
                    }}
                  />

                  {locationLandmarks.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center justify-between py-1.5 group cursor-default"
                    >
                      {/* Station Node Marker */}
                      <div className="absolute -left-6 w-[24px] flex items-center justify-center pointer-events-none">
                        <span className="w-[10px] h-[10px] rounded-full bg-white border-[2.5px] border-[#B88A44] group-hover:scale-125 group-hover:border-[#B88A44] transition-transform duration-200 shadow-xs" />
                      </div>

                      {/* Landmark Name */}
                      <span 
                        className="text-[14.5px] font-semibold text-gray-800 group-hover:text-[#B88A44] transition-colors pl-1"
                        style={{ fontFamily: F_SANS }}
                      >
                        {item.name}
                      </span>

                      {/* Distance Time Badge */}
                      <span 
                        className="text-[12px] font-extrabold text-[#B88A44] bg-[#FDFBF7] border border-[#E8DEC8] px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ml-3"
                        style={{ fontFamily: F_JOST }}
                      >
                        {item.dist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* LEFT — Location Aerial Map (Exact Original Size & Frame) */}
          <div className="w-full lg:flex-1 lg:order-1 flex flex-col justify-center" data-aos="fade-right" data-aos-duration="1000">
            <div style={{
              overflow: 'hidden',
              border: '1.5px solid #B88A44',
              borderRadius: '16px',
              width: '100%',
              height: '100%',
              position: 'relative',
              background: '#412011',
              boxShadow: '0 12px 32px rgba(65, 32, 17, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.723580767128!2d72.9682943!3d19.250874999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bbea7e8d549b%3A0x3cf9dddc1b6797fe!2sPrestige%20Residency!5e0!3m2!1sen!2sin!4v1790051423194!5m2!1sen!2sin" 
                className="location-responsive-map" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
              <style jsx>{`
                .location-responsive-map {
                  width: 100%;
                  height: 100%;
                  min-height: 400px;
                  border: 0;
                  display: block;
                }
                @media (max-width: 1023px) {
                  .location-responsive-map {
                    height: 400px !important;
                  }
                }
              `}</style>
              <div style={{
                position: 'absolute', bottom: '16px', left: '16px', zIndex: 10,
                background: '#412011', opacity: 0.95, backdropFilter: 'blur(6px)',
                borderRadius: '8px', padding: '6px 14px',
                display: 'flex', alignItems: 'center', gap: '6px',
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{
                  color: '#fff', fontSize: '12px', fontFamily: F_JOST,
                  fontWeight: '700', letterSpacing: '0.04em'
                }}>
                  Thane West, Mumbai
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Location

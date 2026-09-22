'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const CarouselSection = ({ setIsOpen, title = "Glimpses of Masterpiece", subtitle = "", id = "homes-designed", images = [] }) => {
  const [index, setIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)
  const [userInteracted, setUserInteracted] = useState(0)

  const numItems = images?.length || 0;
  const extendedImages = numItems > 0 ? [
    images[numItems - 1],
    ...images,
    images[0],
    images[1] || images[0],
    images[2] || images[0]
  ].filter(Boolean) : [];

  const getRealIndex = (idx) => {
    if (idx === 0) return numItems - 1;
    if (idx >= numItems + 1) return (idx - 1) % numItems;
    return idx - 1;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedImgIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImgIndex(null)
      if (e.key === 'ArrowRight') setSelectedImgIndex((prev) => (prev + 1) % (images?.length || 1))
      if (e.key === 'ArrowLeft') setSelectedImgIndex((prev) => (prev - 1 + (images?.length || 1)) % (images?.length || 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImgIndex, images?.length])

  const nextLightboxImg = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) => (prev + 1) % (images?.length || 1))
  }

  const prevLightboxImg = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) => (prev - 1 + (images?.length || 1)) % (images?.length || 1))
  }

  const nextSlide = () => {
    if (!isTransitioning) return;
    setIndex((prev) => {
      if (prev >= numItems + 1) return prev;
      return prev + 1;
    });
    setUserInteracted(Date.now());
  }

  const prevSlide = () => {
    if (!isTransitioning) return;
    setIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
    setUserInteracted(Date.now());
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= numItems + 1) return prev;
        return prev + 1;
      });
    }, 4000); // Autoplay every 4s
    return () => clearInterval(timer);
  }, [userInteracted, numItems]);

  // Handle the seamless jump
  useEffect(() => {
    let timeout;
    if (index === 0) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(numItems);
      }, 700);
    } else if (index === numItems + 1) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(1);
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [index, numItems]);

  // Re-enable transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  if (!images || images.length === 0) return null;

  return (
    <section 
      id={id} 
      className="relative"
      style={{
        scrollMarginTop: '80px',
        padding: '56px 0 84px 0',
        background: id === 'amenities' 
          ? 'linear-gradient(180deg, #1C0E07 0%, #2A160C 50%, #150904 100%)' 
          : '#FDFBF7',
        color: id === 'amenities' ? '#ffffff' : '#2A160C',
        fontFamily: '"Montserrat", var(--font-montserrat), sans-serif',
        fontSize: '15px',
        lineHeight: '150%',
        margin: 0,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* ── Ambient Luxury Deep Glow (Amenities only) ── */}
      {id === 'amenities' && (
        <>
          {/* Top-Right Soft Warm Gold Orb */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#B88A44]/20 blur-[120px] pointer-events-none" />
          
          {/* Bottom-Left Soft Warm Glow Orb */}
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#412011]/35 blur-[120px] pointer-events-none" />

          {/* Center Subtle Deep Warm Gold Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] rounded-full bg-[#B88A44]/15 blur-[100px] pointer-events-none" />
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progressLine {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .carousel-main-heading {
          color: #1A2024 !important;
          font-family: "Montserrat", var(--font-montserrat), sans-serif !important;
          font-size: 46px !important;
          font-weight: 500 !important;
          line-height: 56px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.02em !important;
          margin-bottom: 0 !important;
          text-align: center !important;
        }
        @media (max-width: 991px) {
          .carousel-main-heading {
            font-size: 32px !important;
            line-height: 40px !important;
          }
        }
        @media (max-width: 575px) {
          .carousel-main-heading {
            font-size: 24px !important;
            line-height: 32px !important;
          }
        }
        .carousel-sub-heading {
          color: #71717a !important;
          font-family: "Poppins", var(--font-poppins), sans-serif !important;
          font-size: 18px !important;
          text-align: center !important;
          margin-top: 12px !important;
          margin-bottom: 0 !important;
          font-weight: 400 !important;
          letter-spacing: 0.5px !important;
        }
        @media (max-width: 991px) {
          .carousel-sub-heading {
            font-size: 16px !important;
          }
        }
        @media (max-width: 575px) {
          .carousel-sub-heading {
            font-size: 15px !important;
            margin-top: 8px !important;
          }
        }
      `}} />
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">

        <div className="text-center mb-10 md:mb-12" data-aos="fade-up" data-aos-duration="1000">
          <h2
            className={`text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider mx-auto ${
              id === 'amenities' ? 'text-white' : 'text-gray-900'
            }`}
            style={{ 
              fontFamily: "var(--font-jost), Montserrat, sans-serif",
              textShadow: id === 'amenities' ? '0 2px 16px rgba(0,0,0,0.6)' : 'none'
            }}
          >
            {title}
          </h2>
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-4 mb-3">
            <div className="w-16 h-[1.5px] bg-[#B88A44]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#B88A44] mx-3 ring-4 ring-[#B88A44]/25"></div>
            <div className="w-16 h-[1.5px] bg-[#B88A44]"></div>
          </div>
        </div>

        {/* ── Mobile Stacked Grid (Gallery only) ── */}
        {id === 'gallery' && (
          <div className="block md:hidden">
            <div className="flex flex-col gap-4">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  className="relative w-full rounded-lg overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: '16/9', background: '#eee' }}
                  onClick={() => setSelectedImgIndex(idx)}
                >
                  <Image
                    src={img.src || img.img}
                    alt={img.alt || img.title || img.label || `Gallery Image ${idx + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)', minHeight: '40%' }}
                  >
                    <h3 
                      className="text-white text-base font-bold tracking-wide" 
                      style={{ fontFamily: F_JOST }}
                    >
                      {img.title || img.label}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Desktop Architectural Bento Grid (Gallery only) ── */}
        {id === 'gallery' && (
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-4 lg:gap-5">
              
              {/* Main Featured Hero Frame (Image 0) - Spans 8 cols, 2 rows */}
              <div 
                className="col-span-8 row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100"
                style={{ minHeight: '484px' }}
                onClick={() => setSelectedImgIndex(0)}
              >
                <Image
                  src={images[0]?.src || images[0]?.img}
                  alt={images[0]?.alt || images[0]?.title || 'Featured Villa'}
                  fill
                  sizes="(max-width: 1200px) 65vw, 800px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider border border-white/30 shadow-sm">
                      <span className="text-yellow-400">✨</span> Featured Residence
                    </span>
                    <span className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-2xl lg:text-3xl font-extrabold mb-2 tracking-wide" style={{ fontFamily: F_JOST }}>
                      {images[0]?.title || images[0]?.label}
                    </h3>
                    <p className="text-white/80 text-[13px] sm:text-[14px] max-w-xl line-clamp-2 font-normal">
                      {images[0]?.desc || 'Experience grand living spaces surrounded by verdant nature.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Side Stack Item 1 (Image 1) - Spans 4 cols */}
              <div 
                className="col-span-4 relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100"
                style={{ height: '232px' }}
                onClick={() => setSelectedImgIndex(1)}
              >
                <Image
                  src={images[1]?.src || images[1]?.img}
                  alt={images[1]?.alt || images[1]?.title || 'Gallery 2'}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-white text-[16px] font-bold tracking-wide" style={{ fontFamily: F_JOST }}>
                    {images[1]?.title || images[1]?.label}
                  </h4>
                  <span className="text-white/70 text-[11.5px] mt-0.5">Click to expand</span>
                </div>
              </div>

              {/* Side Stack Item 2 (Image 2) - Spans 4 cols */}
              <div 
                className="col-span-4 relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100"
                style={{ height: '232px' }}
                onClick={() => setSelectedImgIndex(2)}
              >
                <Image
                  src={images[2]?.src || images[2]?.img}
                  alt={images[2]?.alt || images[2]?.title || 'Gallery 3'}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-white text-[16px] font-bold tracking-wide" style={{ fontFamily: F_JOST }}>
                    {images[2]?.title || images[2]?.label}
                  </h4>
                  <span className="text-white/70 text-[11.5px] mt-0.5">Click to expand</span>
                </div>
              </div>

              {/* Bottom Row: 3 equal cards spanning 4 cols each (Images 3, 4, 5) */}
              {[3, 4, 5].map((imgIdx) => {
                const img = images[imgIdx];
                if (!img) return null;
                return (
                  <div
                    key={imgIdx}
                    className="col-span-4 relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100"
                    style={{ height: '230px' }}
                    onClick={() => setSelectedImgIndex(imgIdx)}
                  >
                    <Image
                      src={img.src || img.img}
                      alt={img.alt || img.title || `Gallery ${imgIdx + 1}`}
                      fill
                      sizes="400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                      <h4 className="text-white text-[16px] font-bold tracking-wide" style={{ fontFamily: F_JOST }}>
                        {img.title || img.label}
                      </h4>
                      <span className="text-white/70 text-[11.5px] mt-0.5">Click to expand</span>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        )}

        {/* ── Main Sliding Track Gallery (For Amenities & Other Carousels) ── */}
        {id !== 'gallery' && (
          <>
            <div className="relative w-full overflow-hidden rounded-lg carousel-container">
              <style dangerouslySetInnerHTML={{ __html: `
                .carousel-container { --slide-w: 100%; }
                @media (min-width: 768px) { .carousel-container { --slide-w: 65%; } }
              `}} />
              <div 
                className={`flex w-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{ 
                  transform: `translateX(calc(-${index} * (var(--slide-w) + 16px)))`,
                  willChange: 'transform',
                  gap: '16px'
                }}
              >
                {extendedImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex-shrink-0 group overflow-hidden cursor-pointer ${
                      id === 'amenities'
                        ? 'rounded-2xl border border-[#B88A44]/40 shadow-[0_20px_45px_rgba(0,0,0,0.65)] bg-[#2A160C]'
                        : 'bg-gray-200'
                    }`}
                    style={{ width: 'var(--slide-w)', aspectRatio: '16/9' }}
                    onClick={() => setSelectedImgIndex(getRealIndex(idx))}
                  >
                    <Image
                      src={img.src || img.img}
                      alt={img.alt || img.title || img.label || `Gallery Image ${idx + 1}`}
                      fill
                      priority={idx === 0 || idx === 1 || Math.abs(idx - index) <= 1}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 900px"
                      className={`object-cover select-none pointer-events-none transition-transform duration-[6000ms] ease-out ${getRealIndex(idx) === getRealIndex(index) ? 'scale-110' : 'scale-100'}`}
                    />
                    
                    {/* Image Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 lg:p-10 pb-5 md:pb-10 flex flex-col justify-end"
                         style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)', minHeight: '40%' }}>
                        <h3 
                          className="text-white text-base md:text-2xl font-bold mb-1 tracking-wide" 
                          style={{ 
                            fontFamily: F_JOST,
                            opacity: getRealIndex(idx) === getRealIndex(index) ? 1 : 0,
                            transform: getRealIndex(idx) === getRealIndex(index) ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.3s'
                          }}
                        >
                          {img.title || img.label}
                        </h3>
                        
                        {/* Progress Bar Container */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-white/20">
                          {getRealIndex(idx) === getRealIndex(index) && (
                            <div 
                              className="h-full bg-white" 
                              style={{
                                width: '100%',
                                animation: 'progressLine 4s linear forwards'
                              }}
                            />
                          )}
                        </div>
                    </div>

                    {/* Vertical Text */}
                    <div 
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-xs tracking-widest hidden md:block" 
                      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                    >
                      Artistic Impression
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Bottom Arrows ── */}
            <div className="flex items-center gap-3 mt-6 ml-2">
              <button 
                onClick={prevSlide} 
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  id === 'amenities'
                    ? 'border border-white/30 text-white hover:bg-[#B88A44] hover:border-[#B88A44]'
                    : 'border border-gray-400 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button 
                onClick={nextSlide} 
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  id === 'amenities'
                    ? 'border border-white/30 text-white hover:bg-[#B88A44] hover:border-[#B88A44]'
                    : 'border border-gray-400 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </>
        )}

      </div>

      {/* ── Lightbox Modal ── */}
      {selectedImgIndex !== null && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImgIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[10000] p-2 bg-black/40 rounded-full"
            onClick={() => setSelectedImgIndex(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Left Arrow */}
          <button 
            className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-[10000] p-2 bg-black/40 rounded-full"
            onClick={prevLightboxImg}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Right Arrow */}
          <button 
            className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-[10000] p-2 bg-black/40 rounded-full"
            onClick={nextLightboxImg}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Image Counter */}
          <div 
            className="absolute top-6 left-6 text-white/70 font-medium tracking-widest text-xs p-2 bg-black/40 rounded"
            style={{ fontFamily: F_JOST }}
          >
            {selectedImgIndex + 1} / {images?.length || 0}
          </div>

          {/* Center Content */}
          <div className="relative w-full max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center">
            <img 
              src={images[selectedImgIndex]?.src || images[selectedImgIndex]?.img} 
              alt={images[selectedImgIndex]?.alt || images[selectedImgIndex]?.title || images[selectedImgIndex]?.label || 'Gallery Preview'} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl transition-all duration-300 rounded"
              onClick={(e) => e.stopPropagation()} 
            />
            {/* Alt Text Caption */}
            <div 
              className="mt-4 text-center text-white/80 text-xs md:text-sm tracking-wide max-w-[80vw]"
              style={{ fontFamily: F_JOST }}
            >
              {images[selectedImgIndex]?.title || images[selectedImgIndex]?.label || images[selectedImgIndex]?.alt}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CarouselSection

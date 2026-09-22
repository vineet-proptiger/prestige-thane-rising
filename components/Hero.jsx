'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { heroImages } from '../lib/images'

const slides = [
  { img: heroImages.banner, mobileImg: heroImages.smDevice1 },
  { img: heroImages.banner2, mobileImg: heroImages.smDevice2 }
]

const Hero = ({ setIsOpen }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-container {
          position: relative;
          margin-top: 0px;
          height: auto;
          overflow: hidden;
          background-image: url('/images/hero/banner1.webp');
          background-size: cover;
          background-position: center;
          display: block;
        }

        /* Disable full-screen overlay since gradient is only behind text */
        .hero-overlay {
          display: none;
        }

        /* Content block — sits over the image */
        .hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 10;
          padding: 100px 80px 72px 44px;
          width: 100%;
          max-width: 1000px;
          background: radial-gradient(
            100% 100% at 0% 100%,
            rgba(0,0,0,0.95) 0%,
            rgba(0,0,0,0.7) 55%,
            rgba(0,0,0,0.2) 75%,
            transparent 90%
          );
        }

        /* Main title */
        .hero-title {
          font-family: var(--font-jost), Montserrat, sans-serif;
          font-size: clamp(20px, 2.4vw, 32px);
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          line-height: 1.12;
          margin: 0 0 6px;
          text-shadow: 0 2px 16px rgba(0,0,0,0.5);
        }
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 32px;
            white-space: nowrap;
          }
        }
        @media (min-width: 1280px) {
          .hero-title {
            font-size: 34px;
            white-space: nowrap;
          }
        }

        /* Subtitle */
        .hero-subtitle {
          font-family: var(--font-jost), Montserrat, sans-serif;
          font-size: clamp(11px, 1.4vw, 18px);
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 12px;
          opacity: 0.92;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        }

        /* Price line */
        .hero-price-line {
          font-family: var(--font-sans), Open Sans, sans-serif;
          font-size: clamp(13px, 1.5vw, 18px);
          color: rgba(255,255,255,0.88);
          margin: 0 0 22px;
          line-height: 1.4;
        }

        @keyframes livepulse {
          0%  { box-shadow:0 0 0 0 rgba(184, 138, 68,0.6); }
          70% { box-shadow:0 0 0 6px rgba(184, 138, 68,0); }
          100%{ box-shadow:0 0 0 0 rgba(184, 138, 68,0); }
        }
        @keyframes textBling {
          0% { opacity: 0.7; text-shadow: 0 0 4px rgba(184, 138, 68,0.5); }
          50% { opacity: 1; text-shadow: 0 0 14px rgba(184, 138, 68,1); }
          100% { opacity: 0.7; text-shadow: 0 0 4px rgba(184, 138, 68,0.5); }
        }

        @keyframes heroPriceBlink {
          0%, 75% { 
            opacity: 1; 
            text-shadow: 0 0 8px rgba(255,255,255,0.6); 
          }
          76%, 100% { 
            opacity: 0; 
            text-shadow: none; 
          }
        }

        @keyframes heroPriceBadgeBlink {
          0%, 75% { 
            opacity: 1; 
            box-shadow: 0 0 16px rgba(184, 138, 68, 0.6), inset 0 0 8px rgba(184, 138, 68, 0.3);
          }
          76%, 100% { 
            opacity: 0; 
            box-shadow: none; 
          }
        }

        .hero-price-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          vertical-align: middle;
          padding: 6px 22px 6px 16px;
          background: radial-gradient(130% 130% at 50% 30%, #412011 0%, #2A160C 65%, #180C06 100%);
          border: 1.5px solid #B88A44;
          border-radius: 9999px;
          box-shadow: 0 0 16px rgba(184, 138, 68, 0.6), inset 0 0 8px rgba(184, 138, 68, 0.3);
          animation: heroPriceBadgeBlink 1.4s infinite;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .hero-price-leaf {
          width: 28px;
          height: 28px;
          object-fit: contain;
          flex-shrink: 0;
          display: inline-block;
          filter: brightness(1.2) drop-shadow(0 0 4px rgba(184, 138, 68, 0.8));
        }

        .hero-price-amt {
          font-family: var(--font-jost), Montserrat, sans-serif;
          font-size: clamp(22px, 3.5vw, 30px);
          font-weight: 800;
          color: #fff !important;
          display: inline-block;
          line-height: 1.2;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        /* CTA Row */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Hero buttons use global btn-brand / btn-gold-outline classes */

        /* First button — white text + white border on dark hero bg */
        .hero-btn-one {
          color: #fff !important;
          border-color: rgba(255,255,255,0.9) !important;
          background: transparent !important;
        }
        .hero-btn-one:hover {
          background: var(--color-brand) !important;
          color: #fff !important;
          border-color: var(--color-brand) !important;
        }

        /* RERA text */
        .hero-rera {
          font-family: var(--font-sans), Open Sans, sans-serif;
          font-size: 11.5px;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
        }

        .hero-slider-wrapper {
          width: 100%;
          height: 100%;
        }
        .slide-layer {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          pointer-events: none;
        }
        .slide-layer.active {
          opacity: 1;
          pointer-events: auto;
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
        }

        @keyframes heroZoomInOut {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .desktop-hero-image, .mobile-hero-image {
          animation: heroZoomInOut 15s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }

        .mobile-img-wrapper { display: none; }
        @media (max-width: 767px) {
          .desktop-img-wrapper { display: none !important; }
          .mobile-img-wrapper { display: block !important; }
        }

        /* ─── Global Mobile/Tablet Margin to clear White Header ─── */
        @media (max-width: 991px) {
          .hero-container {
            margin-top: 0px !important;
          }
        }

        /* ─── Desktop & Standard Monitors ─── */
        @media (min-width: 1024px) {
          .hero-container {
            width: 100%;
            height: 100vh;
            min-height: 600px;
            max-height: 1100px;
          }
          .hero-slider-wrapper {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .slide-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 80%;
          }
          .hero-content {
            padding: 80px 80px 32px 48px !important;
          }
        }

        /* ─── Compact Mini Laptops & Ultrabooks (e.g., ASUS VivoBook, 13-inch notebooks) ─── */
        @media (min-width: 1024px) and (max-height: 720px) {
          .hero-content {
            padding: 70px 60px 20px 48px !important;
          }
          .hero-bullets {
            margin-bottom: 14px !important;
            gap: 6px !important;
          }
          .hero-price-line {
            margin-bottom: 16px !important;
          }
        }

        .carousel-dots {
          position: absolute;
          bottom: 24px;
          right: 44px;
          display: flex;
          gap: 8px;
          z-index: 20;
        }
        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: background 0.3s;
        }
        .carousel-dot.active {
          background: #fff;
        }

        /* ─── Desktop & Tablet Layer Badges (Only screen width >= 768px) ─── */
        @media (min-width: 768px) {
          .hero-title-badge {
            display: inline-block;
            background: rgba(42, 22, 12, 0.82);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 8px 22px;
            border-radius: 14px;
            border: 1.5px solid rgba(184, 138, 68, 0.65);
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(184, 138, 68, 0.3);
          }
          .hero-subtitle-badge {
            display: inline-block;
            background: rgba(42, 22, 12, 0.74);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 6px 18px;
            border-radius: 30px;
            border: 1px solid rgba(184, 138, 68, 0.45);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.38);
          }
          .hero-bullet-badge {
            background: rgba(42, 22, 12, 0.74);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 7px 18px;
            border-radius: 30px;
            border: 1px solid rgba(184, 138, 68, 0.45);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.38);
            width: fit-content;
            color: #ffffff;
          }
          .hero-bullet-text {
            color: #ffffff !important;
          }
          .hero-mobile-pill {
            display: none !important;
          }
        }

        /* ─── Tablet ─── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-container {
            width: 100%;
            height: 75vh;
            min-height: 550px;
          }
          .hero-slider-wrapper {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .slide-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 80%;
          }
          .hero-content {
            padding: 0 28px 46px !important;
          }
        }

        /* ─── Mobile ─── */
        @media (max-width: 767px) {
          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            height: auto !important;
            aspect-ratio: auto;
            background: #f8faf5 !important;
            padding-top: 56px !important;
          }
          .hero-slider-wrapper {
            position: relative;
            width: 100%;
            height: auto;
            aspect-ratio: 1/1;
          }
          .slide-layer {
            position: absolute !important;
            inset: 0 !important;
            width: 100%;
            height: 100%;
          }
          .hero-image {
            height: 100% !important;
            width: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
          }
          .hero-content {
            position: relative !important;
            background: #ffffff !important;
            border-top-left-radius: 28px !important;
            border-top-right-radius: 28px !important;
            margin-top: -24px !important;
            padding: 24px 18px 28px !important;
            z-index: 10 !important;
            box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08) !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .hero-mobile-pill {
            display: inline-flex !important;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            background: #FAF3E8;
            color: #B88A44;
            border: 1px solid #E8DEC8;
            box-shadow: 0 2px 6px rgba(65, 32, 17, 0.12);
            margin-bottom: 10px;
            width: fit-content;
          }
          /* Reset layer badges completely on mobile */
          .hero-title-badge,
          .hero-subtitle-badge {
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            display: block !important;
          }
          /* Removed leaf overlay */
          .hero-overlay {
            display: none !important;
          }
          .hero-title {
            font-size: clamp(21px, 5.8vw, 23px) !important;
            font-weight: 800 !important;
            color: #412011 !important;
            text-shadow: none !important;
            margin: 0 0 4px !important;
            line-height: 1.2 !important;
          }
          .hero-subtitle {
            font-size: 13.5px !important;
            font-weight: 600 !important;
            color: #B88A44 !important;
            text-shadow: none !important;
            margin: 0 0 16px !important;
            line-height: 1.4 !important;
          }
          .hero-subtitle span {
            color: #B88A44 !important;
            opacity: 1 !important;
          }
          /* 2x2 Feature Micro-Cards */
          .hero-bullets {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-bottom: 16px !important;
            width: 100% !important;
          }
          .hero-bullet-item,
          .hero-bullet-badge {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            padding: 10px 10px !important;
            background: #FDFBF7 !important;
            border: 1px solid #E8DEC8 !important;
            border-radius: 14px !important;
            box-shadow: 0 2px 6px rgba(11, 30, 54, 0.04) !important;
            width: 100% !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            text-align: left !important;
          }
          .hero-bullet-item svg {
            width: 18px !important;
            height: 18px !important;
            background-color: #ffffff !important;
            border: 1.5px solid #B88A44 !important;
            border-radius: 50% !important;
            padding: 2.5px !important;
            flex-shrink: 0 !important;
            stroke: #B88A44 !important;
          }
          .hero-bullet-text {
            font-size: 12px !important;
            font-weight: 600 !important;
            color: #412011 !important;
            line-height: 1.35 !important;
            text-shadow: none !important;
          }
          /* Price Card Container */
          .hero-price-line {
            background: linear-gradient(135deg, #FDFBF7 0%, #FAF3E8 100%) !important;
            border: 1.5px dashed #B88A44 !important;
            border-radius: 18px !important;
            padding: 12px 14px !important;
            margin: 0 0 16px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 8px !important;
            font-size: 13.5px !important;
            font-weight: 600 !important;
            color: #2c4114 !important;
            box-shadow: 0 3px 10px rgba(65, 32, 17, 0.08) !important;
            text-shadow: none !important;
            text-align: center !important;
          }
          .hero-price-title {
            font-size: clamp(12px, 3.5vw, 14.5px) !important;
            white-space: nowrap !important;
            display: block !important;
          }
          .hero-price-line br {
            display: none !important;
          }
          .hero-price-badge {
            padding: 6px 20px 6px 16px !important;
            gap: 10px !important;
          }
          .hero-price-leaf {
            width: 24px !important;
            height: 24px !important;
          }
          .hero-price-badge .hero-price-amt {
            font-size: 20px !important;
            color: #ffffff !important;
          }
          /* CTA Buttons */
          .hero-cta-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 10px !important;
            width: 100% !important;
            margin-top: 0 !important;
          }
          .hero-cta-row > button,
          .hero-cta-row > a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 13px 16px !important;
            font-size: 13.5px !important;
            font-weight: 700 !important;
            white-space: normal !important;
            border-radius: 50px !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }
          .hero-cta-row .hero-btn-one {
            color: #412011 !important;
            border: 1.5px solid #412011 !important;
            background: #ffffff !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04) !important;
          }
          .hero-cta-row > a.btn-brand,
          .hero-cta-row > button.btn-brand {
            background: linear-gradient(135deg, #B88A44 0%, #946B2D 100%) !important;
            color: #ffffff !important;
            border: none !important;
            box-shadow: 0 4px 14px rgba(184, 138, 68, 0.35) !important;
          }
          .hero-rera {
            font-size: 10px !important;
            color: rgba(0,0,0,0.7) !important;
          }
        }
      `}} />

      {/* ── Responsive Image Carousel (All Devices) ── */}
      <div className="hero-slider-wrapper grid">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide-layer ${index === currentSlide ? 'active' : ''}`}
            style={{ gridArea: '1 / 1 / 2 / 2' }}
          >
            <div className="desktop-img-wrapper w-full h-full">
              <Image
                src={slide.img}
                alt={`Prestige Thane Rising Banner ${index + 1}`}
                width={1920}
                height={800}
                className="hero-image desktop-hero-image"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
            {slide.mobileImg && (
              <div className="mobile-img-wrapper w-full h-full">
                <Image
                  src={slide.mobileImg}
                  alt={`Prestige Thane Rising Mobile Banner ${index + 1}`}
                  width={768}
                  height={900}
                  className="hero-image mobile-hero-image"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Dark overlay for text legibility ── */}
      <div className="hero-overlay" />

      {/* ── Content overlay ── */}
      <div className="hero-content">

        {/* Mobile Luxury New Launch Pill */}
        <div className="hero-mobile-pill">
          <span>✨</span> Exclusive Pre-Launch
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          <span className="hero-title-badge">
            Prestige Thane Rising
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          <span className="hero-subtitle-badge" style={{ fontSize: '0.9em', fontWeight: 600, textTransform: 'none' }}>
            At Thane West, Mumbai.
          </span>
        </p>
        
        {/* Bullet Points with Backdrop Layer (Desktop only via CSS) */}
        <div className="hero-bullets" style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            "Own a Prestige Address in Thane",
            "Freedom to Exit After 30 Months",
            "Exclusive EOI Window Now Open",
            "Secure Your Unit with ₹1 Lakh EOI*"
          ].map((text, i) => (
          <div 
            key={i} 
            className="hero-bullet-item hero-bullet-badge" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, backgroundColor: '#B88A44', borderRadius: '50%', padding: '2.5px' }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="hero-bullet-text" style={{ fontFamily: 'var(--font-sans), Open Sans, sans-serif', fontSize: 'clamp(13px, 1.5vw, 17px)', fontWeight: '500', letterSpacing: '0.02em' }}>
              {text}
            </span>
          </div>
          ))}
        </div>

        {/* Price Line */}
        <p className="hero-price-line w-full text-center lg:text-left" style={{ marginBottom: '0px' }}>
          <span className="hero-price-title whitespace-nowrap">
            Luxury 2/3/4 BHK Residences Starting From
          </span>
          <span className="hero-price-badge mt-2 lg:mt-0 lg:ml-3">
            <img 
              src="/leaf-transparent.png" 
              alt="Leaf" 
              className="hero-price-leaf" 
            />
            <span className="hero-price-amt">
              ₹ 1.6 Cr*
            </span>
          </span>
        </p>

        {/* CTA Row */}
        <style jsx>{`
          .hero-btn-pill {
            border-radius: 50px !important;
            -webkit-mask: none !important;
            mask: none !important;
          }
        `}</style>
        <div className="hero-cta-row" style={{ marginTop: '16px' }}>

          <button
            onClick={() => setIsOpen(true)}
            className="btn-gold-outline hero-btn-one hero-btn-pill"
            style={{ fontSize: '14px', padding: '11px 24px', fontWeight: '700', textTransform: 'none', cursor: 'pointer', display: 'inline-block' }}
          >
            Download Brochure
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="btn-brand hero-btn-pill"
            style={{ fontSize: '12px', padding: '11px 22px', textTransform: 'uppercase' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Schedule Site Visit
          </button>

        </div>

      </div>
    </section>
  )
}

export default Hero

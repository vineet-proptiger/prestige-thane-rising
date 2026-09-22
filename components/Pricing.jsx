"use client";

import React from "react";
import { Check, BedDouble, ArrowRight, Sparkles } from "lucide-react";

const F_SANS = "var(--font-sans), Open Sans, sans-serif";
const F_JOST = "var(--font-jost), Montserrat, sans-serif";

const units = [
  {
    type: "2 BHK",
    subtitle: "PREMIUM RESIDENCES",
    tagline: "Thoughtfully Designed",
    size: "700–750 Sq. Ft.",
    price: "₹ 1.6 Cr *",
    priceSub: "STARTING AT",
    btnText: "CHECK PRICE",
    features: [
      "Unlock Pricing & Floor Plans",
      "At Thane West, Mumbai",
      "Seamless Connectivity",
    ],
    isPopular: false,
  },
  {
    type: "3 BHK",
    subtitle: "LUXURY RESIDENCES",
    tagline: "Spacious & Elegant",
    size: "875–1050 Sq. Ft.",
    price: "Ask For Price",
    priceSub: "PRICE ON REQUEST",
    btnText: "CHECK PRICE",
    features: [
      "Unlock Pricing & Floor Plans",
      "At Thane West, Mumbai",
      "Seamless Connectivity",
    ],
    isPopular: true,
  },
  {
    type: "4 BHK",
    subtitle: "GRAND RESIDENCES",
    tagline: "Expansive Living",
    size: "1500 Sq. Ft.",
    price: "Ask For Price",
    priceSub: "PRICE ON REQUEST",
    btnText: "CHECK PRICE",
    features: [
      "Unlock Pricing & Floor Plans",
      "At Thane West, Mumbai",
      "Seamless Connectivity",
    ],
    isPopular: false,
  },
];

const Pricing = ({ setIsOpen }) => {
  return (
    <section
      id="pricing"
      className="pt-12 sm:pt-16 md:pt-20 pb-7 sm:pb-9 md:pb-12 px-4 md:px-8 relative overflow-hidden bg-[#FDFBF7]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#F5EADB]/50 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div
          className="relative text-center mb-14 md:mb-18"
          data-aos="fade-up"
          data-aos-duration="1000"
        > 
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900"
            style={{ fontFamily: F_JOST }}
          >
            Configurations & Pricing
          </h2>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-4 mb-3">
            <div className="w-16 h-[1px] bg-[#B88A44]"></div>
            <div className="w-2 h-2 rounded-full bg-[#B88A44] mx-3"></div>
            <div className="w-16 h-[1px] bg-[#B88A44]"></div>
          </div>
        </div>

        {/* Minimalist Arch Pedestal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch justify-items-center">
          {units.map((unit, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={idx * 150}
              className={`w-full max-w-[360px] bg-white rounded-t-[90px] rounded-b-3xl p-8 sm:p-9 flex flex-col items-center relative transition-all duration-400 hover:-translate-y-2 ${
                unit.isPopular
                  ? "border-2 border-[#B88A44] shadow-[0_20px_45px_rgba(65, 32, 17,0.12)] hover:shadow-[0_28px_55px_rgba(184, 138, 68,0.22)] ring-4 ring-[#B88A44]/15"
                  : "border border-[#E8DEC8] shadow-[0_12px_32px_rgba(11, 30, 54,0.06)] hover:shadow-[0_20px_42px_rgba(11, 30, 54,0.12)]"
              }`}
            >
              {/* Popular Crown Tag */}
              {unit.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B88A44] via-[#946B2D] to-[#B88A44] text-white text-[10.5px] font-extrabold px-5 py-1.5 rounded-full whitespace-nowrap z-20 tracking-wider shadow-md flex items-center gap-1.5 uppercase ring-2 ring-white">
                  <Sparkles size={11} className="text-yellow-300" />
                  Most Preferred Choice
                </div>
              )}

              {/* Inner Concentric Arch Portal */}
              <div
                className={`w-36 h-40 rounded-t-full rounded-b-2xl border flex flex-col items-center justify-center p-4 mb-6 shadow-xs transition-colors ${
                  unit.isPopular
                    ? "bg-gradient-to-b from-[#FDFBF7] via-[#ffffff] to-white border-[#E8DEC8]"
                    : "bg-gradient-to-b from-[#FDFBF7] via-[#ffffff] to-white border-[#E8DEC8]"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-2.5 bg-white shadow-xs border ${
                    unit.isPopular ? "border-[#E8DEC8] text-[#412011]" : "border-[#E8DEC8] text-[#412011]"
                  }`}
                >
                  <BedDouble size={20} strokeWidth={1.8} />
                </div>

                <div
                  className="text-[26px] font-extrabold leading-none text-gray-900 tracking-tight text-center"
                  style={{ fontFamily: F_JOST }}
                >
                  {unit.type}
                </div>

                <span className="text-[11px] font-bold text-[#B88A44] uppercase tracking-wider mt-1.5 text-center block w-full leading-tight">
                  {unit.subtitle}
                </span>
              </div>

              {/* Size Pill */}
              <div className="mb-5 px-3.5 py-1 rounded-full bg-[#f4f9ee] border border-[#d6e8c0] text-[12px] font-semibold text-[#2d4212] tracking-wide shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
                <span className="text-[13px]">📐</span>
                <span>
                  Carpet Area: <strong className="text-gray-900 font-extrabold">{unit.size}</strong>
                </span>
              </div>

              {/* Price Pedestal */}
              <div className="text-center mb-7 w-full py-4 px-3 rounded-2xl bg-gradient-to-b from-[#f6f9fd] to-[#e8f2fc] border border-[#d8e8f8]">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B88A44] block mb-1.5">
                  {unit.priceSub}
                </span>
                <div
                  className="text-[25px] sm:text-[28px] font-extrabold leading-none text-[#412011] tracking-tight whitespace-nowrap"
                  style={{ fontFamily: F_JOST }}
                >
                  {unit.price}
                </div>
              </div>

              {/* Features List with Clean Dividers */}
              <div className="space-y-3 mb-8 w-full px-1">
                {unit.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-3 text-[13px] text-gray-700 font-medium"
                    style={{ fontFamily: F_SANS }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FAF3E8] flex items-center justify-center flex-shrink-0 text-[#412011] border border-[#E8DEC8]">
                      <Check size={12} strokeWidth={3.5} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Minimalist Pill CTA Button */}
              <button
                onClick={() => setIsOpen(true)}
                className={`w-full py-3.5 px-6 rounded-full text-[12.5px] font-extrabold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                  unit.isPopular
                    ? "bg-gradient-to-r from-[#B88A44] to-[#946B2D] text-white hover:brightness-110 shadow-[#B88A44]/30"
                    : "bg-white border-2 border-[#B88A44] text-[#412011] hover:bg-[#B88A44] hover:text-white"
                }`}
                style={{ fontFamily: F_JOST }}
              >
                <span>{unit.btnText}</span>
                <ArrowRight size={15} />
              </button>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

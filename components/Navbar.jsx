'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { logoImages } from '../lib/images'

const Navbar = ({ setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navState, setNavState] = useState('top') // 'top', 'collapsed', 'expanded'
  const [isOverDark, setIsOverDark] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const onScroll = () => {
      const currentScrollY = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY <= 50) {
            setNavState('top')
            lastScrollY = currentScrollY
          } else {
            const diff = currentScrollY - lastScrollY
            if (Math.abs(diff) > 10) {
              if (diff > 0) {
                // Scrolling down -> collapse to hanging logo tab
                setNavState('collapsed')
              } else {
                // Scrolling up -> bring back the full 1st navbar with links
                setNavState('expanded')
              }
              lastScrollY = currentScrollY
            }
          }

          // Automatically detect if navbar is currently over a blue/dark section
          const darkSections = document.querySelectorAll('#highlights, #location, #developer, .hero-container, footer');
          let overDarkSection = false;
          const navY = 80;
          darkSections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= navY && rect.bottom >= navY) {
              overDarkSection = true;
            }
          });
          setIsOverDark(overDarkSection);

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --secondary_font: var(--font-jost), Montserrat, sans-serif;
        }

        .header_style2 {
          position: fixed;
          top: 4px;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: top 0.4s ease;
        }

        .header_style2.sticky {
          top: 4px;
        }

        .header_style2 .container-fluid {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 0 15px;
        }

        /* Nav container: Always perfectly centered flex container */
        .header_style2 .header_navigation2,
        .header_style2.scrolled-up-expanded .header_navigation2 {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 98% !important;
          max-width: 1560px !important;
          height: 68px !important;
          padding: 0 22px !important;
          margin: 0 auto;
          background: rgba(15, 23, 42, 0.45) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 50px !important;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.25) !important;
          overflow: visible !important;
          transition: width 0.55s cubic-bezier(0.16, 1, 0.3, 1), 
                      height 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      border-radius 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s ease,
                      border-color 0.4s ease,
                      box-shadow 0.4s ease,
                      padding 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Sticky Collapsed state: container shrinks smoothly to fit logo */
        .header_style2.sticky .header_navigation2 {
          width: auto !important;
          max-width: fit-content !important;
          height: 60px !important;
          border-radius: 12px !important;
          background: transparent !important;
          backdrop-filter: blur(0px) !important;
          -webkit-backdrop-filter: blur(0px) !important;
          border-color: rgba(255, 255, 255, 0) !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 auto;
          justify-content: center !important;
          overflow: visible !important;
        }

        /* Symmetric wings on Left and Right of the logo */
        .header_style2 .nav-wing {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1 1 0%;
          min-width: 0;
          overflow: hidden;
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
          transition: max-width 0.55s cubic-bezier(0.16, 1, 0.3, 1), 
                      flex 0.55s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.35s ease 0.05s, 
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header_style2 .nav-wing-left {
          justify-content: space-between;
          max-width: 580px;
        }

        .header_style2 .nav-wing-right {
          justify-content: space-between;
          max-width: 580px;
        }

        /* When sticky, wings smoothly slide into the logo and collapse */
        .header_style2.sticky .nav-wing {
          flex: 0 0 0px !important;
          max-width: 0px !important;
          opacity: 0 !important;
          pointer-events: none !important;
          transition: max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      flex 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.25s ease, 
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header_style2.sticky .nav-wing-left {
          transform: translateX(50px) !important;
        }

        .header_style2.sticky .nav-wing-right {
          transform: translateX(-50px) !important;
        }

        /* Nav Item Styles */
        .header_style2 .nav-wing li.nav-item {
          flex: 0 0 auto !important;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 2px !important;
          white-space: nowrap;
        }

        /* Logo: ALWAYS locked at 50% dead center! */
        .header_style2 .header_navigation2 .navbar-logo {
          opacity: 1 !important;
          flex: 0 0 auto !important;
          flex-shrink: 0 !important;
          min-width: unset !important;
          width: auto !important;
          max-width: fit-content !important;
          height: 52px !important;
          background-color: #fff !important;
          padding: 3px 18px !important;
          border-radius: 10px !important;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12) !important;
          margin: 0 16px !important;
          transition: box-shadow 0.3s ease, margin 0.55s cubic-bezier(0.16, 1, 0.3, 1) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transform: translateZ(0) !important;
          z-index: 20;
        }

        .header_style2.sticky .header_navigation2 .navbar-logo {
          margin: 0 !important;
        }

        .navbar-brand {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: auto !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .header_style2 .nav-wing li a {
          color: #ffffff !important;
          font-size: 13px !important;
          padding: 0px 8px !important;
          line-height: 1.5em;
          text-decoration: none;
          font-family: var(--secondary_font);
          font-weight: 500 !important;
          letter-spacing: 0.8px !important;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        
        .header_style2 .nav-wing li a:hover {
          color: #412011 !important;
        }

        /* Phone Button styling in Nav */
        .header_style2 .nav-wing li a.phone-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent !important;
          padding: 5px 13px !important;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
          color: #ffffff !important;
          font-size: 13px !important;
          box-shadow: none !important;
        }

        .header_style2 .nav-wing li a.phone-btn:hover {
          background: rgba(201, 169, 110, 0.95) !important;
          color: #ffffff !important;
          border-color: rgba(201, 169, 110, 0.95) !important;
        }

        .nav-logo,
        .header_style2.sticky .nav-logo,
        .header_style2.scrolled-up-expanded .nav-logo {
          height: 46px !important;
          min-height: 46px !important;
          max-height: 48px !important;
          max-width: none !important;
          width: auto !important;
          flex-shrink: 0 !important;
          display: block;
          object-fit: contain;
          transform: none !important;
          transition: transform 0.2s ease !important;
        }

        /* Responsive Safe-Zone for Standard Laptops (992px - 1280px) */
        @media (min-width: 992px) and (max-width: 1280px) {
          .header_style2 .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            width: 99% !important;
            padding: 0 14px !important;
            height: 56px !important;
          }
          .header_style2.sticky .header_navigation2 {
            width: 245px !important;
            height: 48px !important;
          }
          .header_style2 .nav-wing {
            max-width: 440px;
          }
          .header_style2 .nav-wing li a {
            font-size: 11.5px !important;
            padding: 0px 4px !important;
            letter-spacing: 0.4px !important;
          }
          .header_style2 .nav-wing li a.phone-btn {
            padding: 4px 8px !important;
            font-size: 11.5px !important;
            gap: 4px;
          }
          .header_style2 .header_navigation2 .navbar-logo {
            min-width: unset !important;
            width: auto !important;
            max-width: fit-content !important;
            padding: 3px 14px !important;
            height: 44px !important;
            margin: 0 8px !important;
          }
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 38px !important;
            min-height: 38px !important;
            max-width: none !important;
            width: auto !important;
            transform: none !important;
          }
        }

        /* Responsive Scaling for Mid-to-Large Screens (1281px to 1439px) */
        @media (min-width: 1281px) and (max-width: 1439px) {
          .header_style2 .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            width: 98% !important;
            padding: 0 18px !important;
            height: 64px !important;
          }
          .header_style2.sticky .header_navigation2 {
            width: auto !important;
            max-width: fit-content !important;
            height: 54px !important;
          }
          .header_style2 .nav-wing {
            max-width: 530px;
          }
          .header_style2 .nav-wing li a {
            font-size: 12.5px !important;
            padding: 0px 6px !important;
            letter-spacing: 0.6px !important;
          }
          .header_style2 .header_navigation2 .navbar-logo {
            min-width: unset !important;
            width: auto !important;
            max-width: fit-content !important;
            padding: 3px 16px !important;
            height: 48px !important;
            margin: 0 12px !important;
          }
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 42px !important;
            min-height: 42px !important;
            max-height: 44px !important;
            max-width: none !important;
            width: auto !important;
            transform: none !important;
          }
        }

        /* Responsive Scaling for Large Screens (1440px to 1679px) */
        @media (min-width: 1440px) and (max-width: 1679px) {
          .header_style2 .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            max-width: 1620px !important;
            height: 72px !important;
            padding: 0 28px !important;
          }
          .header_style2.sticky .header_navigation2 {
            width: auto !important;
            max-width: fit-content !important;
            height: 60px !important;
          }
          .header_style2 .nav-wing {
            max-width: 630px;
          }
          .header_style2 .nav-wing li a {
            font-size: 14px !important;
            padding: 0px 9px !important;
            letter-spacing: 0.9px !important;
          }
          .header_style2 .nav-wing li a.phone-btn {
            padding: 7px 16px !important;
            font-size: 14px !important;
          }
          .header_style2 .header_navigation2 .navbar-logo {
            min-width: unset !important;
            width: auto !important;
            max-width: fit-content !important;
            padding: 3px 18px !important;
            height: 54px !important;
            margin: 0 16px !important;
          }
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 48px !important;
            min-height: 48px !important;
            max-height: 50px !important;
            max-width: none !important;
            width: auto !important;
            transform: none !important;
          }
        }

        /* Responsive Scaling for Ultra-Wide / 4K Screens (1680px and above) */
        @media (min-width: 1680px) {
          .header_style2 .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            max-width: 1840px !important;
            height: 80px !important;
            padding: 0 40px !important;
          }
          .header_style2.sticky .header_navigation2 {
            width: auto !important;
            max-width: fit-content !important;
            height: 66px !important;
          }
          .header_style2 .nav-wing {
            max-width: 710px;
          }
          .header_style2 .nav-wing li a {
            font-size: 15.5px !important;
            padding: 0px 14px !important;
            letter-spacing: 1.3px !important;
          }
          .header_style2 .nav-wing li a.phone-btn {
            padding: 8px 20px !important;
            font-size: 15.5px !important;
          }
          .header_style2 .header_navigation2 .navbar-logo {
            min-width: unset !important;
            width: auto !important;
            max-width: fit-content !important;
            padding: 4px 22px !important;
            height: 58px !important;
            margin: 0 20px !important;
          }
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 52px !important;
            min-height: 52px !important;
            max-height: 54px !important;
            max-width: none !important;
            width: auto !important;
            transform: none !important;
          }
        }

        /* Reappear Full Navbar on Scroll Up (Smart Sticky Navbar) */
        .header_style2.scrolled-up-expanded {
          top: 4px;
          background: transparent !important;
          box-shadow: none !important;
        }

        .mob_nav_trigger {
          display: none;
        }

        @media (max-width: 991px) {
          .header_style2,
          .header_style2.sticky,
          .header_style2.scrolled-up-expanded {
            top: 0 !important;
            padding: 12px 0 !important;
            background: #fff !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
            transition: none !important;
          }
          
          .header_style2 .container-fluid {
            justify-content: flex-start !important;
            padding: 0 16px !important;
            margin: 0 !important;
            width: 100% !important;
          }

          .header_style2 .nav-wing {
            display: none !important;
          }
          
          .header_style2 .header_navigation2,
          .header_style2.sticky .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            width: 100% !important;
            height: auto !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            justify-content: flex-start !important;
            align-items: center !important;
            margin: 0 !important;
            padding: 0 !important;
            transition: none !important;
          }
          
          .header_style2 .header_navigation2 .navbar-logo,
          .header_style2.sticky .header_navigation2 .navbar-logo,
          .header_style2.scrolled-up-expanded .header_navigation2 .navbar-logo {
            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
            opacity: 1 !important;
            visibility: visible !important;
            padding: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
            min-width: unset !important;
            transition: none !important;
            transform: none !important;
          }
          
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 54px !important;
            min-height: 54px !important;
            max-width: 310px !important;
            width: auto !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            margin-left: 0 !important;
            transition: none !important;
            transform: none !important;
          }

          @media (max-width: 640px) {
            .nav-logo,
            .header_style2.sticky .nav-logo,
            .header_style2.scrolled-up-expanded .nav-logo {
              height: 48px !important;
              min-height: 48px !important;
              max-width: 275px !important;
            }
          }

          @media (max-width: 380px) {
            .nav-logo,
            .header_style2.sticky .nav-logo,
            .header_style2.scrolled-up-expanded .nav-logo {
              height: 42px !important;
              min-height: 42px !important;
              max-width: 235px !important;
            }
          }
          
          .mob_nav_trigger {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #412011;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 60;
            transition: all 0.3s ease;
            background: transparent;
            border-radius: 0;
          }
          
          .header_style2.sticky .mob_nav_trigger,
          .header_style2.scrolled-up-expanded .mob_nav_trigger {
            background: #B88A44;
            color: #ffffff;
          }
        }

        /* Fullscreen Popup Menu */
        .popup_menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          visibility: hidden;
          opacity: 0;
          transition: all 0.4s ease;
        }
        .popup_menu.open {
          visibility: visible;
          opacity: 1;
        }
        .popup_menu .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
        }
        .popup_menu .menu_container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
        }
        .popup_menu .close_btn {
          position: absolute;
          top: 30px;
          right: 40px;
          color: #fff;
          font-size: 16px;
          font-family: var(--secondary_font);
          text-transform: uppercase;
          cursor: pointer;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .popup_menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .popup_menu ul li {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .popup_menu ul li a {
          font-family: var(--font-jost), Montserrat, sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 2px;
          transition: color 0.3s;
        }
        .popup_menu ul li a:hover {
          color: #B88A44;
        }
      `}} />

      {/* Main Navbar */}
      <div className={`header_style2 ${navState === 'collapsed' ? 'sticky' : navState === 'expanded' ? 'scrolled-up-expanded' : ''} ${isOverDark ? 'nav-over-dark' : 'nav-over-light'}`}>
        <div className="container-fluid">
          <div className="header_navigation2">
            {/* Left Nav Wing */}
            <ul className="nav-wing nav-wing-left">
              <li className="nav-item"><a href="#overview">Overview</a></li>
              <li className="nav-item"><a href="#highlights">Highlights</a></li>
              <li className="nav-item"><a href="#gallery">Gallery</a></li>
              <li className="nav-item"><a href="#amenities">Amenities</a></li>
            </ul>
            
            {/* Center Logo - Mathematically centered at 50% at all times */}
            <div className="navbar-logo">
              <a href="/new-launch" className="navbar-brand">
                <img src={logoImages.main} alt="Prestige Thane Rising" className="nav-logo" />
              </a>
            </div>
            
            {/* Right Nav Wing */}
            <ul className="nav-wing nav-wing-right">
              <li className="nav-item"><a href="#pricing">Pricing</a></li>
              <li className="nav-item"><a href="#masterplan">Floor Plan</a></li>
              <li className="nav-item"><a href="#location">Location</a></li>
              <li className="nav-item"><a href="tel:9718344024" className="phone-btn"><Phone size={14}/> 9718344024</a></li>
            </ul>
          </div>
        </div>

        {/* Hamburger Menu Trigger */}
        <div 
          className={`mob_nav_trigger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} />
        </div>
      </div>

      {/* Fullscreen Popup Menu (for mobile or sticky state) */}
      <div className={`popup_menu ${mobileOpen ? 'open' : ''}`}>
        <div className="overlay" onClick={() => setMobileOpen(false)}></div>
        <div className="close_btn" onClick={() => setMobileOpen(false)}>
          <span>Close</span> <X size={24} />
        </div>
        <div className="menu_container">
          <ul>
            <li><a href="#overview" onClick={() => setMobileOpen(false)}>Overview</a></li>
            <li><a href="#highlights" onClick={() => setMobileOpen(false)}>Highlights</a></li>
            <li><a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a></li>
            <li><a href="#amenities" onClick={() => setMobileOpen(false)}>Amenities</a></li>
            <li><a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a></li>
            <li><a href="#masterplan" onClick={() => setMobileOpen(false)}>Floor Plan</a></li>
            <li><a href="#location" onClick={() => setMobileOpen(false)}>Location</a></li>
            <li style={{ marginTop: '40px' }}>
              <a href="tel:9718344024" style={{ color: '#B88A44', fontSize: '20px' }}>
                <Phone size={20} style={{ display: 'inline', marginRight: '8px' }}/> 9718344024
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar

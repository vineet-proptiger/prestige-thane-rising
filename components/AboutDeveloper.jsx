'use client'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'

const GOLD = 'var(--color-gold)'
const GOLD_DARK = 'var(--color-gold-dark)'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const ContactForm = () => {
  const [form, setForm] = useState({ fullname: '', phone: '', email: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault()
    
    if (form.phone.length < 10) { setError('Enter a valid mobile number'); return }
    if (form.phone.startsWith('91') && form.phone.length === 12) {
      if (!/^[6-9]\d{9}$/.test(form.phone.slice(2))) { setError('Indian number must start with 6, 7, 8, or 9'); return }
    } else if (form.phone.startsWith('91') && form.phone.length !== 12) {
      setError('Enter valid 10-digit Indian number'); return
    }

    setError(''); setLoading(true)
    const tracking = buildTrackingFields()

    // --- GCLID-SPECIFIC BROWSER LIMIT (Max 3 submissions per GCLID / 30 days) ---
    let currentCount = 0;
    let safeGclid = '';
    
    if (tracking.gclid) {
      safeGclid = tracking.gclid;
      const cookieRegex = new RegExp(`(?:^|; )lead_trk_${PROJECT_ID}_${safeGclid}=([^;]*)`);
      const cookieMatch = document.cookie.match(cookieRegex);
      const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
      
      let lsCount = 0;
      const lsKey = `lead_trk_data_${PROJECT_ID}`;
      const lsDataStr = localStorage.getItem(lsKey);
      
      if (lsDataStr) {
        try {
          const lsData = JSON.parse(lsDataStr);
          const gclidRecord = lsData[tracking.gclid];
          
          if (gclidRecord) {
            if (Date.now() - gclidRecord.firstSeen < 2592000000) {
              lsCount = gclidRecord.count || 0;
            } else {
              delete lsData[tracking.gclid];
              localStorage.setItem(lsKey, JSON.stringify(lsData));
            }
          }
        } catch (e) {}
      }
      
      currentCount = Math.max(cookieCount, lsCount);
      
      if (currentCount >= 3) {
        setSuccess(true);
        setLoading(false);
        return;
      }
    }

    const fullPhone = `+${form.phone}`

    const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('phone', fullPhone)
    payload.append('email', form.email || '')
    payload.append('website', form.website || '')
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Developer Section Form')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) {
        if (tracking.gclid) {
          const newCount = currentCount + 1;
          if (typeof document !== 'undefined') document.cookie = `lead_trk_${PROJECT_ID}_${safeGclid}=${newCount}; max-age=2592000; path=/`;
          
          if (typeof localStorage !== 'undefined') {
            const lsKey = `lead_trk_data_${PROJECT_ID}`;
            let lsData = {};
            try {
              const existing = localStorage.getItem(lsKey);
              if (existing) lsData = JSON.parse(existing);
            } catch(e) {}
            
            lsData[tracking.gclid] = {
              count: newCount,
              firstSeen: (lsData[tracking.gclid] && lsData[tracking.gclid].firstSeen) ? lsData[tracking.gclid].firstSeen : Date.now()
            };
            try { localStorage.setItem(lsKey, JSON.stringify(lsData)); } catch(e) {}
          }
        }
        setSuccess(true)
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          const nameParts = form.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: 'Developer Section Form',
            user_data: {
              email: form.email.trim() || undefined, phone: fullPhone,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            }
          })
        }
      } else setError(data.msg || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div style={{ padding: '40px 0', textAlign: 'center' }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
      }}>
        <svg width="28" height="28" fill="none" stroke={GOLD_DARK} strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p style={{ fontWeight: '700', fontSize: '18px', color: '#ffffff', fontFamily: F_SANS }}>Thank You!</p>
      <p style={{ color: '#ffffff', fontSize: '14px', marginTop: '6px', fontFamily: F_SANS }}>Our team will contact you shortly.</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {/* Honeypot field for bot protection (hidden from humans) */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handle}
        />
      </div>

      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#ffffff',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>Full Name <span style={{ color: GOLD }}>*</span></label>
        <input name="fullname" required value={form.fullname} onChange={handle} placeholder="Enter full name"
          className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
      </div>

      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#ffffff',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>Email Address</label>
        <input name="email" value={form.email} onChange={handle} placeholder="Email Id (optional)"
          className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
      </div>

      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#ffffff',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>Mobile Number <span style={{ color: GOLD }}>*</span></label>
        <PhoneInput
          country={'in'}
          value={form.phone}
          onChange={(phone) => setForm({ ...form, phone })}
          placeholder="Mobile Number"
          enableSearch={true}
          disableSearchIcon={true}
          searchPlaceholder="Search country..."
          inputStyle={{
            width: '100%',
            fontFamily: F_SANS
          }}
          inputClass="form-input !pl-[48px] !py-[10px] !h-auto"
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            borderRight: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '0 4px'
          }}
          dropdownStyle={{
            color: '#111',
            fontFamily: F_SANS,
            width: '300px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
          containerStyle={{
            width: '100%'
          }}
        />
      </div>

      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
        <input type="checkbox" required defaultChecked style={{ accentColor: GOLD, marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: '#ffffff', fontFamily: F_SANS, lineHeight: 1.5 }}>
          I authorize the developer &amp; its representatives to contact me via Email / SMS / WhatsApp / Call.
        </span>
      </label>

      <button type="submit" disabled={loading}
        className="w-full py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-none flex items-center justify-center gap-2 bg-[#B88A44] text-white border-2 border-[#B88A44] hover:bg-[#B88A44] hover:border-[#B88A44]"
        style={{ marginTop: '4px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        {loading ? 'Submitting...' : 'Submit Details'}
      </button>
    </form>
  )
}

const AboutDeveloper = ({ setIsOpen }) => (
  <section id="developer" className="py-16 sm:py-20 relative bg-fixed bg-cover bg-center border-b border-gray-100" style={{ backgroundImage: 'url(/images/about-devloper/about-dev.webp)' }}>
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">

        {/* Left — Get In Touch Text with elegant soft dark shadow card */}
        <div 
          className="text-white flex flex-col justify-center p-6 md:p-8 rounded-2xl bg-black/45 backdrop-blur-[3px] border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]" 
          data-aos="fade-right" 
          data-aos-duration="1000" 
          data-aos-delay="100"
        >
          <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold leading-tight uppercase tracking-wider text-white mb-3" style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif" }}>
            Get In Touch
          </h2>
          {/* Decorative Line */}
          <div className="flex items-center justify-start mt-2 mb-6">
            <div className="w-16 h-[1px] bg-[#B88A44]"></div>
            <div className="w-2 h-2 rounded-full bg-[#B88A44] mx-3"></div>
            <div className="w-16 h-[1px] bg-[#B88A44]"></div>
          </div>
          <p className="text-[19px] text-white font-medium leading-relaxed max-w-md drop-shadow-lg" style={{ fontFamily: F_SANS, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Let’s connect and bring your ideas to life. Reach out today for expert guidance, quick responses, and solutions tailored perfectly to your needs.
          </p>
        </div>

        {/* Right — Contact Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column', height: '100%',
        }} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">

          {/* Form Header */}
          <div style={{
            background: '#412011',
            padding: '18px 24px', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            }} />
            <h3 style={{
              fontFamily: F_JOST, fontWeight: '800', fontSize: '18px',
              color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em'
            }}>
              Book Site Visit Today
            </h3>
            <p style={{ fontFamily: F_SANS, fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Register now to get the best deal &amp; book your site visit
            </p>
          </div>

          {/* Form Body */}
          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default AboutDeveloper

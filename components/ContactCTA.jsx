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

const ContactCTA = () => {
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
    payload.append('form_name', 'Contact CTA Form')
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
        if (typeof window !== 'undefined') localStorage.setItem('_lsub_done', '1')
        setSuccess(true)
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          const nameParts = form.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: 'Contact CTA Form',
            user_data: {
              email: form.email.trim() || undefined, phone: fullPhone,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            }
          })
        }
      }
      else setError(data.msg || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <section id="contact" className="relative py-20 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(/images/Enquiry/enquiry.webp)' }}>
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white" data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-white mb-6" style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif" }}>
              Get In Touch
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed max-w-md" style={{ fontFamily: F_SANS }}>
              Let’s connect and bring your ideas to life. Reach out today for expert guidance, quick responses, and solutions tailored perfectly to your needs.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="bg-[#e9e3dc] p-8 md:p-10 rounded-2xl shadow-2xl max-w-[500px] w-full ml-auto" data-aos="fade-left" data-aos-duration="1000">
            <h3 className="text-[#1A2024] text-2xl font-semibold mb-8 uppercase tracking-wide" style={{ fontFamily: F_JOST }}>
              Enquire Now
            </h3>
            
            {success ? (
              <div style={{ padding: '32px 0', textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
                }}>
                  <svg width="28" height="28" fill="none" stroke={GOLD_DARK} strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ fontWeight: '700', fontSize: '18px', color: 'var(--color-text)', fontFamily: F_SANS }}>Thank You!</p>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '6px', fontFamily: F_SANS }}>Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-6">
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
                
                {/* Name */}
                <div>
                  <input name="fullname" required value={form.fullname} onChange={handle} placeholder="Name"
                    className="w-full bg-transparent border-0 border-b border-gray-400 py-2 px-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#1A2024] transition-colors" 
                    style={{ fontFamily: F_SANS }} />
                </div>

                {/* Email */}
                <div>
                  <input name="email" value={form.email} onChange={handle} placeholder="Email"
                    className="w-full bg-transparent border-0 border-b border-gray-400 py-2 px-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#1A2024] transition-colors" 
                    style={{ fontFamily: F_SANS }} />
                </div>

                {/* Phone */}
                <div>
                  <PhoneInput
                    country={'in'}
                    value={form.phone}
                    onChange={(phone) => setForm({ ...form, phone })}
                    placeholder="Phone Number"
                    enableSearch={true}
                    disableSearchIcon={true}
                    searchPlaceholder="Search country..."
                    inputStyle={{
                      width: '100%',
                      fontFamily: F_SANS
                    }}
                    inputClass="w-full bg-transparent border-0 border-b border-gray-400 py-2 !pl-[40px] pr-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#1A2024] transition-colors"
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: '0'
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

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', textAlign: 'left', marginTop: '4px' }}>
                  <input type="checkbox" required defaultChecked style={{ accentColor: GOLD, marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: '#666', fontFamily: F_SANS, lineHeight: 1.5 }}>
                    I authorize the developer &amp; its representatives to contact me via Email / SMS / WhatsApp / Call.
                  </span>
                </label>

                <button type="submit" disabled={loading}
                  className="w-full py-4 mt-2 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-lg bg-[#B88A44] text-white hover:bg-[#B88A44] cursor-pointer"
                  style={{ fontFamily: F_SANS }}>
                  {loading ? 'Submitting...' : 'Send'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA

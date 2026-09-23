'use client'
import React, { useState } from 'react'

import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'

const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const LeadForm = ({ formName = 'Hero Form', btnText = 'Submit Details', isTransparent = false }) => {
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '').slice(0, 10) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.phone.length !== 10) {
      setError('Enter valid 10-digit number')
      return
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError('Phone number must start with 6, 7, 8, or 9')
      return
    }

    setError(''); setLoading(true)
    const tracking = buildTrackingFields()

    // --- GCLID-SPECIFIC BROWSER LIMIT ---
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

    const fullPhone = `+91${formData.phone}`

    const payload = new FormData()
    payload.append('fullname', formData.fullname)
    payload.append('email', formData.email)
    payload.append('phone', fullPhone)
    payload.append('website', formData.website || '')
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', formName)
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
          localStorage.setItem('_lsub_done', '1')
          window.dataLayer = window.dataLayer || []
          const nameParts = formData.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: formName,
            user_data: {
              email: formData.email.trim() || undefined, phone: fullPhone,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            }
          })
        }
      } else { setError(data.msg || 'Submission failed. Please try again.') }
    } catch { setError('Network error. Please check your connection and try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div className="text-center py-6">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" 
        style={{ 
          background: isTransparent ? 'rgba(184, 138, 68, 0.15)' : 'var(--color-gold-bg)',
          border: isTransparent ? '2px solid #B88A44' : 'none',
          boxShadow: isTransparent ? '0 0 20px rgba(184, 138, 68, 0.3)' : 'none'
        }}
      >
        <svg 
          className="w-8 h-8" 
          style={{ color: isTransparent ? '#B88A44' : 'var(--color-gold-dark)' }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 className={`text-xl font-bold mb-2 ${isTransparent ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: F_SANS }}>Thank You!</h4>
      <p className={`text-sm ${isTransparent ? 'text-gray-200' : 'text-gray-500'}`} style={{ fontFamily: F_SANS }}>Our team will contact you shortly.</p>
    </div>
  )

  const dynamicInputClass = isTransparent 
    ? "w-full mb-3 px-4 py-2.5 bg-[#180C06]/70 text-white placeholder-gray-300 outline-none transition-all border rounded-lg focus:border-[#B88A44] focus:ring-1 focus:ring-[#B88A44]/50 focus:bg-[#180C06]/90 shadow-inner"
    : "w-full mb-3 px-4 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition-colors border rounded-md shadow-sm focus:border-[var(--color-gold)]";

  const wrapperClass = isTransparent
    ? "w-full mb-3 bg-[#180C06]/70 text-white transition-all border rounded-lg focus-within:border-[#B88A44] focus-within:ring-1 focus-within:ring-[#B88A44]/50 focus-within:bg-[#180C06]/90 shadow-inner overflow-visible relative"
    : "w-full mb-3 bg-white text-gray-900 transition-colors border rounded-md shadow-sm focus-within:border-[var(--color-gold)] overflow-visible relative";

  const dynamicInputStyle = isTransparent 
    ? { fontFamily: F_SANS, backgroundColor: '#200E06', borderColor: 'rgba(184, 138, 68, 0.55)', color: '#ffffff' } 
    : { fontFamily: F_SANS, borderColor: '#e5e7eb' };
    
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      {/* Honeypot field for bot protection (hidden from humans) */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <input type="text" name="fullname" required placeholder="First Name" value={formData.fullname} onChange={handleChange}
        className={dynamicInputClass} style={dynamicInputStyle} />
      <input type="email" name="email" placeholder="Email Id (optional)" value={formData.email} onChange={handleChange}
        className={dynamicInputClass} style={dynamicInputStyle} />
      
      <input type="tel" name="phone" required placeholder="10-digit mobile number" maxLength={10} value={formData.phone} onChange={handleChange}
        className={dynamicInputClass} style={dynamicInputStyle} />

      {error && <p className="text-red-500 text-xs mt-[-4px] mb-2" style={{ fontFamily: F_SANS }}>{error}</p>}

      <button type="submit" disabled={loading}
        className="btn-gold font-bold uppercase tracking-wider transition-all disabled:opacity-70 cursor-pointer"
        style={{ 
          padding: '12px 24px', 
          width: '180px', 
          margin: '10px auto 0',
          borderRadius: '50px',
          fontSize: '14px',
          fontFamily: F_JOST
        }}>
        {loading ? '...' : btnText}
      </button>


    </form>
  )
}

export default LeadForm

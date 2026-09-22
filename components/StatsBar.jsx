const stats = [
  { value: '70 Acres',    label: 'Land Parcel', icon: (
    <svg className="w-8 h-8 text-[#B88A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  ) },
  { value: '80%', label: 'Open Space', icon: (
    <svg className="w-8 h-8 text-[#B88A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
    </svg>
  ) },
  { value: '296', label: 'Total Residences', icon: (
    <svg className="w-8 h-8 text-[#B88A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>
  ) },
  { value: '70,000 Sq.Ft.',  label: 'Clubhouse', icon: (
    <svg className="w-8 h-8 text-[#B88A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M15 9a3 3 0 11-6 0 3 3 0 016 0z M9 21h6"></path>
    </svg>
  ) },
]

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const StatsBar = () => (
  <div style={{
    background: '#ffffff',
    padding: '30px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  }}>
    {stats.map((s, i) => (
      <div key={i} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px 30px',
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        minWidth: '220px',
      }}
        data-aos="fade-up"
        data-aos-delay={i * 100}
      >
        <div style={{ flexShrink: 0 }}>
          {s.icon}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <span style={{
            fontFamily: F_JOST,
            fontSize: '22px',
            fontWeight: '700',
            color: '#B88A44',
            lineHeight: 1.2,
          }}>{s.value}</span>
          <span style={{
            fontFamily: F_SANS,
            fontSize: '15px',
            color: '#666',
            lineHeight: 1.3,
          }}>{s.label}</span>
        </div>
      </div>
    ))}
  </div>
)

export default StatsBar

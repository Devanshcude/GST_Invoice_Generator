export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-tag">
        <span className="dot" />
        Free GST Tool for Indian Freelancers &amp; Businesses
      </div>
      <h1 className="hero-title">
        GST Invoice Generator<br />
        <span className="gradient-text">&amp; Calculator</span>
      </h1>
      <p className="hero-subtitle">
        Calculate CGST, SGST &amp; IGST instantly. Generate professional invoices and export to PDF — completely free, no sign-up required.
      </p>
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">₹0</div>
          <div className="stat-label">Cost Forever</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value">5</div>
          <div className="stat-label">GST Slabs</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value">PDF</div>
          <div className="stat-label">Export Ready</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value">100%</div>
          <div className="stat-label">Accurate</div>
        </div>
      </div>
    </section>
  )
}
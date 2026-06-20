import { Shield } from 'lucide-react'

export default function Tips() {
  return (
    <div className="card tips-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon green"><Shield size={15} /></div>
          <div>
            <div className="card-title">GST Filing Tips</div>
            <div className="card-subtitle">Stay compliant & save time</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="tip-item">
          <div className="tip-icon" style={{ background: 'rgba(16,185,129,0.1)' }}>⚡</div>
          <div className="tip-text">
            <strong>Intra vs Inter-State</strong>
            If seller and buyer are in the same state, apply CGST + SGST. Different states → IGST only.
          </div>
        </div>
        <div className="tip-item">
          <div className="tip-icon" style={{ background: 'rgba(99,102,241,0.1)' }}>🔑</div>
          <div className="tip-text">
            <strong>Mandatory GSTIN</strong>
            Businesses with turnover {'>'} ₹20L must register. Include both party GSTINs on invoices.
          </div>
        </div>
        <div className="tip-item">
          <div className="tip-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>📋</div>
          <div className="tip-text">
            <strong>HSN/SAC Codes</strong>
            HSN for goods, SAC for services. IT/tech services commonly use SAC 998314 (software dev).
          </div>
        </div>
        <div className="tip-item">
          <div className="tip-icon" style={{ background: 'rgba(236,72,153,0.1)' }}>📅</div>
          <div className="tip-text">
            <strong>File GSTR-1 on time</strong>
            Monthly filers: 11th of next month. Quarterly (QRMP): 13th of month after quarter end.
          </div>
        </div>
        <div className="tip-item">
          <div className="tip-icon" style={{ background: 'rgba(6,182,212,0.1)' }}>💡</div>
          <div className="tip-text">
            <strong>Input Tax Credit (ITC)</strong>
            You can claim ITC on GST paid for business purchases. Ensure your suppliers also file returns.
          </div>
        </div>
      </div>
    </div>
  )
}
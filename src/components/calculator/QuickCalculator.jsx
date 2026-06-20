import { Calculator } from 'lucide-react'

import { GST_RATES, formatNum } from '../../utils/invoice.js'

export default function QuickCalculator({ qcAmount, qcRate, qcType, quickTax, onAmountChange, onRateChange, onTypeChange }) {
  return (
    <div className="card quick-calc-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon orange"><Calculator size={15} /></div>
          <div>
            <div className="card-title">Quick GST Calculator</div>
            <div className="card-subtitle">Instant tax breakdown</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="quick-calc-inputs">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input className="form-input" type="number" value={qcAmount} onChange={(event) => onAmountChange(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">GST Rate (%)</label>
            <select className="form-select" value={qcRate} onChange={(event) => onRateChange(Number(event.target.value))}>
              {GST_RATES.map((rate) => (
                <option key={rate} value={rate}>{rate}%</option>
              ))}
            </select>
          </div>
        </div>
        <div className="gst-toggle-group" style={{ marginBottom: '1rem' }}>
          <button className={`gst-toggle-btn ${qcType === 'intra' ? 'active' : ''}`} type="button" onClick={() => onTypeChange('intra')}>
            Intra-State
          </button>
          <button className={`gst-toggle-btn ${qcType === 'inter' ? 'active' : ''}`} type="button" onClick={() => onTypeChange('inter')}>
            Inter-State
          </button>
        </div>
        <div className="quick-result-box">
          <div className="quick-result-row">
            <span className="quick-result-label">Base Amount</span>
            <span className="quick-result-value">₹{formatNum(quickTax.subtotal)}</span>
          </div>
          {qcType === 'intra' ? (
            <>
              <div className="quick-result-row">
                <span className="quick-result-label">CGST ({qcRate / 2}%)</span>
                <span className="quick-result-value">₹{formatNum(quickTax.cgst)}</span>
              </div>
              <div className="quick-result-row">
                <span className="quick-result-label">SGST ({qcRate / 2}%)</span>
                <span className="quick-result-value">₹{formatNum(quickTax.sgst)}</span>
              </div>
            </>
          ) : (
            <div className="quick-result-row">
              <span className="quick-result-label">IGST ({qcRate}%)</span>
              <span className="quick-result-value">₹{formatNum(quickTax.igst)}</span>
            </div>
          )}
          <div className="quick-result-row" style={{ paddingTop: 8 }}>
            <span className="quick-result-label" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Total Payable</span>
            <span className="quick-result-value big">₹{formatNum(quickTax.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
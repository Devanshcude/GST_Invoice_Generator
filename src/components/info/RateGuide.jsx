import { Info } from 'lucide-react'

import { QUICK_RATE_GUIDE } from '../../utils/invoice.js'

export default function RateGuide() {
  return (
    <div className="card rate-explainer-card animate-slide-up" style={{ animationDelay: '0.25s' }}>
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon cyan"><Info size={15} /></div>
          <div>
            <div className="card-title">GST Rate Guide</div>
            <div className="card-subtitle">Which slab applies to you?</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="rate-list">
          {QUICK_RATE_GUIDE.map((item) => (
            <div key={item.rate} className="rate-item">
              <div className="rate-badge">{item.rate}</div>
              <div className="rate-desc">
                <strong>{item.name}</strong>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
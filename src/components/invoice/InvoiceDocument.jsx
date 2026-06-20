import { formatNum } from '../../utils/invoice.js'

function formatDate(value, fallbackDate) {
  const date = value ? new Date(value) : fallbackDate
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function addDays(value, days) {
  const date = value ? new Date(value) : new Date()
  date.setDate(date.getDate() + days)
  return date
}

export default function InvoiceDocument({ seller, buyer, items, invoice, gstRate, txType, taxes }) {
  const today = new Date()
  const dueDate = addDays(invoice.date, 15)

  return (
    <div className="invoice-doc">
      <div className="invoice-doc-header">
        <div>
          <div className="invoice-company-name">{seller.name || 'Your Business'}</div>
          <div className="invoice-company-address">{seller.address}</div>
          {seller.gstin && <div className="invoice-company-address" style={{ marginTop: 4 }}>GSTIN: <strong>{seller.gstin}</strong></div>}
          {seller.email && <div className="invoice-company-address">{seller.email}</div>}
          {seller.phone && <div className="invoice-company-address">{seller.phone}</div>}
        </div>
        <div className="invoice-meta">
          <div className="invoice-title">INVOICE</div>
          <div className="invoice-number">#{invoice.number || 'INV-001'}</div>
          <div className="invoice-date">Date: {formatDate(invoice.date, today)}</div>
          <div className="invoice-date">Due: {formatDate(invoice.due, dueDate)}</div>
          {invoice.po && <div className="invoice-date">PO#: {invoice.po}</div>}
        </div>
      </div>

      <div className="invoice-bill-row">
        <div>
          <div className="invoice-bill-section-title">Bill To</div>
          <div className="invoice-bill-name">{buyer.name || 'Client Name'}</div>
          <div className="invoice-bill-detail">{buyer.address}</div>
          {buyer.gstin && <div className="invoice-bill-detail">GSTIN: {buyer.gstin}</div>}
        </div>
        <div>
          <div className="invoice-bill-section-title">Tax Info</div>
          <div className="invoice-bill-detail">
            GST Rate: <strong style={{ color: '#6366f1' }}>{gstRate}%</strong>
          </div>
          <div className="invoice-bill-detail">
            Transaction: <strong>{txType === 'intra' ? 'Intra-State' : 'Inter-State'}</strong>
          </div>
          <div className="invoice-bill-detail" style={{ marginTop: 4 }}>
            Seller State: {seller.state || '—'}
          </div>
          <div className="invoice-bill-detail">
            Buyer State: {buyer.state || '—'}
          </div>
        </div>
      </div>

      <table className="invoice-items-table">
        <thead>
          <tr>
            <th style={{ width: 30 }}>#</th>
            <th>Description</th>
            <th>HSN/SAC</th>
            <th style={{ textAlign: 'center' }}>Qty</th>
            <th style={{ textAlign: 'right' }}>Unit</th>
            <th style={{ textAlign: 'right' }}>Rate (₹)</th>
            <th style={{ textAlign: 'right' }}>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const qty = parseFloat(item.qty) || 0
            const rate = parseFloat(item.rate) || 0

            return (
              <tr key={item.id}>
                <td style={{ color: '#aaa' }}>{index + 1}</td>
                <td>{item.description || '—'}</td>
                <td className="mono">{item.hsn || '—'}</td>
                <td className="mono" style={{ textAlign: 'center' }}>{qty}</td>
                <td style={{ textAlign: 'right' }}>{item.unit || 'Nos'}</td>
                <td className="mono" style={{ textAlign: 'right' }}>{formatNum(rate)}</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 600 }}>{formatNum(qty * rate)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="invoice-totals">
        <div className="invoice-totals-inner">
          <div className="invoice-total-row">
            <span className="label">Subtotal</span>
            <span className="value">₹{formatNum(taxes.subtotal)}</span>
          </div>
          {txType === 'intra' ? (
            <>
              <div className="invoice-total-row">
                <span className="label">CGST ({gstRate / 2}%)</span>
                <span className="value">₹{formatNum(taxes.cgst)}</span>
              </div>
              <div className="invoice-total-row">
                <span className="label">SGST ({gstRate / 2}%)</span>
                <span className="value">₹{formatNum(taxes.sgst)}</span>
              </div>
            </>
          ) : (
            <div className="invoice-total-row">
              <span className="label">IGST ({gstRate}%)</span>
              <span className="value">₹{formatNum(taxes.igst)}</span>
            </div>
          )}
          <div className="invoice-total-row grand">
            <span className="label">Total Payable</span>
            <span className="value">₹{formatNum(taxes.total)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="invoice-notes">
          <div className="invoice-notes-label">Notes / Payment Terms</div>
          {invoice.notes}
        </div>
      )}

      <div className="invoice-footer-bar">
        <div className="invoice-footer-text">Thank you for your business! Payment due within 15 days.</div>
        <div className="invoice-footer-made">Generated with InvoiceGST — Free Forever</div>
      </div>
    </div>
  )
}
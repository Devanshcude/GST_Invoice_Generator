import { Plus, RefreshCw, Trash2 } from 'lucide-react'

import { GST_RATES, formatNum } from '../../utils/invoice.js'

export default function InvoiceBuilder({
  seller,
  buyer,
  items,
  invoice,
  gstRate,
  txType,
  taxes,
  onReset,
  onInvoiceChange,
  onSellerChange,
  onBuyerChange,
  onTxTypeChange,
  onGstRateChange,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}) {
  return (
    <div className="card invoice-builder animate-slide-up">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon purple">₹</div>
          <div>
            <div className="card-title">Invoice Builder</div>
            <div className="card-subtitle">Fill in your details below</div>
          </div>
        </div>
        <button className="btn-secondary" type="button" onClick={onReset} title="Reset form">
          <RefreshCw size={15} /> Reset
        </button>
      </div>
      <div className="card-body">
        <div className="section-label">Invoice Details</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Invoice Number</label>
            <input className="form-input" value={invoice.number} onChange={(event) => onInvoiceChange('number', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Invoice Date</label>
            <input className="form-input" type="date" value={invoice.date} onChange={(event) => onInvoiceChange('date', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input className="form-input" type="date" value={invoice.due} onChange={(event) => onInvoiceChange('due', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">PO Reference (optional)</label>
            <input className="form-input" value={invoice.po} placeholder="PO-2024-001" onChange={(event) => onInvoiceChange('po', event.target.value)} />
          </div>
        </div>

        <hr className="section-divider" />

        <div className="section-label">Your Business (Seller)</div>
        <div className="form-grid">
          <div className="form-group full">
            <label className="form-label">Business Name</label>
            <input className="form-input" value={seller.name} onChange={(event) => onSellerChange('name', event.target.value)} />
          </div>
          <div className="form-group full">
            <label className="form-label">Address</label>
            <input className="form-input" value={seller.address} onChange={(event) => onSellerChange('address', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">GSTIN</label>
            <input className="form-input" value={seller.gstin} placeholder="27AADCB2230M1ZT" onChange={(event) => onSellerChange('gstin', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">State</label>
            <input className="form-input" value={seller.state} placeholder="Maharashtra" onChange={(event) => onSellerChange('state', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={seller.email} onChange={(event) => onSellerChange('email', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" value={seller.phone} onChange={(event) => onSellerChange('phone', event.target.value)} />
          </div>
        </div>

        <hr className="section-divider" />

        <div className="section-label">Client (Buyer)</div>
        <div className="form-grid">
          <div className="form-group full">
            <label className="form-label">Client Name / Company</label>
            <input className="form-input" value={buyer.name} onChange={(event) => onBuyerChange('name', event.target.value)} />
          </div>
          <div className="form-group full">
            <label className="form-label">Client Address</label>
            <input className="form-input" value={buyer.address} onChange={(event) => onBuyerChange('address', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Client GSTIN</label>
            <input className="form-input" value={buyer.gstin} placeholder="29AABCT1332L1ZF" onChange={(event) => onBuyerChange('gstin', event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Client State</label>
            <input className="form-input" value={buyer.state} placeholder="Karnataka" onChange={(event) => onBuyerChange('state', event.target.value)} />
          </div>
        </div>

        <hr className="section-divider" />

        <div className="section-label">GST Settings</div>
        <div className="gst-toggle-group">
          <button className={`gst-toggle-btn ${txType === 'intra' ? 'active' : ''}`} type="button" onClick={() => onTxTypeChange('intra')}>
            Intra-State (CGST + SGST)
          </button>
          <button className={`gst-toggle-btn ${txType === 'inter' ? 'active' : ''}`} type="button" onClick={() => onTxTypeChange('inter')}>
            Inter-State (IGST)
          </button>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div className="form-label" style={{ marginBottom: 8 }}>GST Rate</div>
          <div className="gst-rates-grid">
            {GST_RATES.map((rate) => (
              <button key={rate} className={`gst-rate-btn ${gstRate === rate ? 'active' : ''}`} type="button" onClick={() => onGstRateChange(rate)}>
                {rate}%
              </button>
            ))}
          </div>
        </div>

        <hr className="section-divider" />

        <div className="section-label">Line Items</div>
        <div className="items-table-wrapper">
          <table className="items-table">
            <thead>
              <tr>
                <th style={{ width: 160 }}>Description</th>
                <th style={{ width: 80 }}>HSN/SAC</th>
                <th className="center" style={{ width: 55 }}>Qty</th>
                <th className="right" style={{ width: 100 }}>Rate (₹)</th>
                <th style={{ width: 70 }}>Unit</th>
                <th className="right" style={{ width: 100 }}>Amount</th>
                <th style={{ width: 36 }} />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const qty = parseFloat(item.qty) || 0
                const rate = parseFloat(item.rate) || 0

                return (
                  <tr key={item.id}>
                    <td>
                      <input className="item-input" value={item.description} placeholder="Service/Product" onChange={(event) => onUpdateItem(item.id, 'description', event.target.value)} />
                    </td>
                    <td>
                      <input className="item-input mono" value={item.hsn} placeholder="998314" onChange={(event) => onUpdateItem(item.id, 'hsn', event.target.value)} />
                    </td>
                    <td>
                      <input className="item-input mono right" type="number" value={item.qty} min="1" onChange={(event) => onUpdateItem(item.id, 'qty', event.target.value)} />
                    </td>
                    <td>
                      <input className="item-input mono right" type="number" value={item.rate} min="0" onChange={(event) => onUpdateItem(item.id, 'rate', event.target.value)} />
                    </td>
                    <td>
                      <input className="item-input" value={item.unit} placeholder="Nos" onChange={(event) => onUpdateItem(item.id, 'unit', event.target.value)} />
                    </td>
                    <td className="item-amount">₹{formatNum(qty * rate)}</td>
                    <td>
                      <button className="btn-remove-item" type="button" onClick={() => onRemoveItem(item.id)} title="Remove item">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <button className="btn-add-item" type="button" onClick={onAddItem}>
          <Plus size={16} /> Add Line Item
        </button>

        <hr className="section-divider" />

        <div className="form-group">
          <label className="form-label">Notes / Payment Terms</label>
          <textarea className="form-textarea" value={invoice.notes} onChange={(event) => onInvoiceChange('notes', event.target.value)} placeholder="Add payment terms, bank details, etc." />
        </div>

        <hr className="section-divider" />

        <div className="section-label">Tax Breakdown</div>
        <div className="tax-breakdown">
          <div className="tax-row">
            <span className="tax-row-label">Subtotal (before tax)</span>
            <span className="tax-row-value">₹{formatNum(taxes.subtotal)}</span>
          </div>
          {txType === 'intra' ? (
            <>
              <div className="tax-row">
                <span className="tax-row-label">CGST @ {gstRate / 2}%</span>
                <span className="tax-row-value">₹{formatNum(taxes.cgst)}</span>
              </div>
              <div className="tax-row">
                <span className="tax-row-label">SGST @ {gstRate / 2}%</span>
                <span className="tax-row-value">₹{formatNum(taxes.sgst)}</span>
              </div>
            </>
          ) : (
            <div className="tax-row">
              <span className="tax-row-label">IGST @ {gstRate}%</span>
              <span className="tax-row-value">₹{formatNum(taxes.igst)}</span>
            </div>
          )}
          <hr className="tax-divider" />
          <div className="tax-row">
            <span className="tax-row-label bold">Total Payable</span>
            <span className="tax-row-value highlight">₹{formatNum(taxes.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
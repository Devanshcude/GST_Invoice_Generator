import { Download, Eye } from 'lucide-react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import InvoiceDocument from './InvoiceDocument.jsx'

export default function InvoicePreview({ seller, buyer, items, invoice, gstRate, txType, taxes }) {
  const printRef = useRef(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice-${invoice.number}`,
  })

  return (
    <div className="card invoice-preview-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon green"><Eye size={15} /></div>
          <div>
            <div className="card-title">Invoice Preview</div>
            <div className="card-subtitle">Live preview — click Print to export PDF</div>
          </div>
        </div>
        <div className="preview-actions">
          <button className="btn-primary" type="button" onClick={handlePrint} id="print-invoice-btn">
            <Download size={15} /> Print / PDF
          </button>
        </div>
      </div>
      <div className="card-body">
        <div ref={printRef}>
          <InvoiceDocument
            seller={seller}
            buyer={buyer}
            items={items}
            invoice={invoice}
            gstRate={gstRate}
            txType={txType}
            taxes={taxes}
          />
        </div>
      </div>
    </div>
  )
}
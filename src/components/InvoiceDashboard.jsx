import { useState } from 'react'

import Footer from './layout/Footer.jsx'
import Header from './layout/Header.jsx'
import Hero from './layout/Hero.jsx'
import InvoiceBuilder from './invoice/InvoiceBuilder.jsx'
import InvoicePreview from './invoice/InvoicePreview.jsx'
import QuickCalculator from './calculator/QuickCalculator.jsx'
import RateGuide from './info/RateGuide.jsx'
import Tips from './info/Tips.jsx'
import { DEFAULT_BUYER, DEFAULT_ITEMS, DEFAULT_SELLER, createInvoiceDefaults, calcTax, formatINR } from '../utils/invoice.js'

export default function InvoiceDashboard() {
  const [seller, setSeller] = useState(DEFAULT_SELLER)
  const [buyer, setBuyer] = useState(DEFAULT_BUYER)
  const [items, setItems] = useState(DEFAULT_ITEMS)
  const [gstRate, setGstRate] = useState(18)
  const [txType, setTxType] = useState('intra')
  const [invoice, setInvoice] = useState(createInvoiceDefaults())
  const [qcAmount, setQcAmount] = useState(10000)
  const [qcRate, setQcRate] = useState(18)
  const [qcType, setQcType] = useState('intra')

  const taxes = calcTax(items, gstRate, txType)
  const quickTax = calcTax([{ qty: 1, rate: Number.parseFloat(qcAmount) || 0 }], Number.parseFloat(qcRate) || 0, qcType)

  const updateRecord = (setter) => (field, value) => {
    setter((previous) => ({ ...previous, [field]: value }))
  }

  const updateSeller = updateRecord(setSeller)
  const updateBuyer = updateRecord(setBuyer)
  const updateInvoice = updateRecord(setInvoice)

  const addItem = () => {
    setItems((previous) => [...previous, { id: Date.now(), description: '', hsn: '', qty: 1, rate: 0, unit: 'Nos' }])
  }

  const removeItem = (id) => {
    setItems((previous) => (previous.length > 1 ? previous.filter((item) => item.id !== id) : previous))
  }

  const updateItem = (id, field, value) => {
    setItems((previous) => previous.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const resetForm = () => {
    setSeller(DEFAULT_SELLER)
    setBuyer(DEFAULT_BUYER)
    setItems(DEFAULT_ITEMS)
    setGstRate(18)
    setTxType('intra')
    setInvoice(createInvoiceDefaults())
  }

  return (
    <div className="app">
      <Header />
      <Hero />
      <main className="main-content">
        <div className="bento-summary">
          <div className="summary-card green">
            <div className="summary-card-label">Subtotal (Pre-Tax)</div>
            <div className="summary-card-value">{formatINR(taxes.subtotal)}</div>
            <div className="summary-card-sub">{items.length} line item{items.length !== 1 ? 's' : ''}</div>
          </div>
          <div className="summary-card purple">
            <div className="summary-card-label">Total GST ({gstRate}%)</div>
            <div className="summary-card-value">{formatINR(taxes.taxAmount)}</div>
            <div className="summary-card-sub">{txType === 'intra' ? `CGST ${gstRate / 2}% + SGST ${gstRate / 2}%` : `IGST ${gstRate}%`}</div>
          </div>
          <div className="summary-card orange">
            <div className="summary-card-label">Total Payable</div>
            <div className="summary-card-value">{formatINR(taxes.total)}</div>
            <div className="summary-card-sub">Including all taxes</div>
          </div>
          <div className="summary-card cyan">
            <div className="summary-card-label">Transaction Type</div>
            <div className="summary-card-value" style={{ fontSize: '1.2rem' }}>{txType === 'intra' ? 'Intra-State' : 'Inter-State'}</div>
            <div className="summary-card-sub">{txType === 'intra' ? 'CGST + SGST applies' : 'IGST applies'}</div>
          </div>
        </div>

        <div className="bento-grid">
          <InvoiceBuilder
            seller={seller}
            buyer={buyer}
            invoice={invoice}
            items={items}
            gstRate={gstRate}
            txType={txType}
            taxes={taxes}
            onReset={resetForm}
            onInvoiceChange={updateInvoice}
            onSellerChange={updateSeller}
            onBuyerChange={updateBuyer}
            onTxTypeChange={setTxType}
            onGstRateChange={setGstRate}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onUpdateItem={updateItem}
          />
          <InvoicePreview
            seller={seller}
            buyer={buyer}
            items={items}
            invoice={invoice}
            gstRate={gstRate}
            txType={txType}
            taxes={taxes}
          />
        </div>

        <div className="bento-grid">
          <QuickCalculator
            qcAmount={qcAmount}
            qcRate={qcRate}
            qcType={qcType}
            quickTax={quickTax}
            onAmountChange={setQcAmount}
            onRateChange={setQcRate}
            onTypeChange={setQcType}
          />
          <RateGuide />
          <Tips />
        </div>
      </main>
      <Footer />
    </div>
  )
}
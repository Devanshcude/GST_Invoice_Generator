export const GST_RATES = [0, 5, 12, 18, 28]

export const DEFAULT_ITEMS = [
  { id: 1, description: 'Web Development Services', hsn: '998314', qty: 1, rate: 50000, unit: 'Lump Sum' },
  { id: 2, description: 'UI/UX Design', hsn: '998313', qty: 1, rate: 15000, unit: 'Lump Sum' },
]

export const DEFAULT_SELLER = {
  name: 'Your Business Name',
  address: '123, Business Park, Mumbai, Maharashtra - 400001',
  gstin: '27AADCB2230M1ZT',
  email: 'business@example.com',
  phone: '+91 98765 43210',
  state: 'Maharashtra',
}

export const DEFAULT_BUYER = {
  name: 'Client Company Pvt. Ltd.',
  address: '456, Client Office, Bengaluru, Karnataka - 560001',
  gstin: '29AABCT1332L1ZF',
  state: 'Karnataka',
}

export const DEFAULT_INVOICE_NOTES = 'Payment to be made via NEFT/IMPS within 15 days of invoice date. Late payment may attract 18% per annum interest.'

export const QUICK_RATE_GUIDE = [
  { rate: '0%', name: 'Exempt / Zero-Rated', desc: 'Essential goods: fresh food, milk, books, healthcare, education' },
  { rate: '5%', name: '5% Slab', desc: 'Mass-use items: packaged foods, fabrics, small restaurants' },
  { rate: '12%', name: '12% Slab', desc: 'Computers, furniture, mobile phones, processed foods' },
  { rate: '18%', name: '18% Slab', desc: 'IT services, professional services, most SaaS, consulting' },
  { rate: '28%', name: '28% Slab', desc: 'Luxury goods, tobacco, automobiles, gaming, hospitality' },
]

export const createInvoiceDate = () => new Date().toISOString().split('T')[0]

export const createInvoiceDefaults = () => ({
  number: 'INV-001',
  date: createInvoiceDate(),
  due: '',
  po: '',
  notes: DEFAULT_INVOICE_NOTES,
})

export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount)

export const formatNum = (amount) =>
  new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)

export function calcTax(items, gstRate, txType) {
  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0
    const rate = parseFloat(item.rate) || 0
    return sum + qty * rate
  }, 0)

  const taxAmount = (subtotal * gstRate) / 100

  if (txType === 'intra') {
    return {
      subtotal,
      taxAmount,
      cgst: taxAmount / 2,
      sgst: taxAmount / 2,
      igst: 0,
      total: subtotal + taxAmount,
    }
  }

  return {
    subtotal,
    taxAmount,
    cgst: 0,
    sgst: 0,
    igst: taxAmount,
    total: subtotal + taxAmount,
  }
}
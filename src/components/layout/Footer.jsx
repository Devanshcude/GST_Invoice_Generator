import { Star } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-author">
          <span className="footer-name" id="author-name">Devansh Khanna</span>
          <a href="mailto:devanskhanna.9f.2020@gmail.com" className="footer-email" id="author-email">
            devanskhanna.9f.2020@gmail.com
          </a>
        </div>
        <div className="footer-center">
          <div>Built with React + Vite · Zero dependencies on paid services</div>
          <div style={{ marginTop: 4, color: 'var(--text-accent)' }}>
            InvoiceGST — Free GST Invoice Generator
          </div>
        </div>
        <div className="footer-links">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dhero"
            style={{ fontSize: '0.75rem', padding: '6px 14px' }}
          >
            <Star size={14} /> Built for Digital Heroes
          </a>
        </div>
      </div>
    </footer>
  )
}
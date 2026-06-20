import { Star } from 'lucide-react'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo">
          <div className="logo-icon">₹G</div>
          <span className="logo-text">Invoice<span>GST</span></span>
        </a>
        <div className="header-right">
          <span className="badge-free">Free Forever</span>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dhero"
            id="built-for-digital-heroes-btn"
          >
            <Star size={14} />
            <span>Built for Digital Heroes</span>
          </a>
        </div>
      </div>
    </header>
  )
}
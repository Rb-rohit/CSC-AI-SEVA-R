import {
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa'

const SOCIAL_LINKS = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/',
    icon: FaWhatsapp,
    className: 'whatsapp',
  },

  {
    name: 'Facebook',
    url: 'https://www.facebook.com/',
    icon: FaFacebook,
    className: 'facebook',
  },

  {
    name: 'Instagram',
    url: 'https://www.instagram.com/',
    icon: FaInstagram,
    className: 'instagram',
  },
]

export default function SocialMediaCard() {
  return (
    <section
      className="card social-card dashboard-hover-card"
    >
      <div className="section-title">
        Social media
      </div>

      <p className="insight-sub">
        Share service updates with your
        community.
      </p>

      <div className="social-links">
        {SOCIAL_LINKS.map(
          ({
            name,
            url,
            icon: Icon,
            className,
          }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <i
                className={`social-icon ${className}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'center',
                }}
              >
                <Icon size={18} />
              </i>

              <span className="social-copy">
                {name}

                <small>
                  Open
                </small>
              </span>

              <ExternalLink
                size={13}
                style={{
                  marginLeft: 'auto',
                  color:
                    'var(--muted)',
                }}
              />
            </a>
          )
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary btn-sm"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        Manage links
        <ChevronRight size={14} />
      </button>
    </section>
  )
}
'use client'

import Link from 'next/link'
import {motion, AnimatePresence} from 'motion/react'
import {useState, useCallback, useMemo} from 'react'

const FOOTER_CONTACT = {
  phone: '+44 (0) 207 730 2122',
  address: {
    line1: '95-97 Pimlico Rd',
    line2: 'London SW1W 8PH',
  },
  email: 'hello@jamb.co.uk',
}

const footerStructure = [
  {
    sections: [
      {
        title: 'Reproduction Chimneypieces',
        links: [
          {label: 'Marble', href: '/fireplaces/marble'},
          {label: 'Stone', href: '/fireplaces/stone'},
          {label: 'Grates & Accessories', href: '/fireplaces/accessories'},
          {label: 'Guide to Jamb Marbles', href: '/fireplaces/marbles-guide'},
        ],
      },
      {
        title: 'Antique Chimneypieces',
        links: [
          {label: 'French & Italian', href: '/fireplaces/antique/french-italian'},
          {label: 'Georgian', href: '/fireplaces/antique/georgian'},
          {label: 'Regency', href: '/fireplaces/antique/regency'},
        ],
      },
      {
        title: 'Sell an Antique Chimneypiece',
        links: [],
        singleLinkOnly: true,
      },
    ],
  },
  {
    sections: [
      {
        title: 'Reproduction Lighting',
        links: [
          {label: 'Hanging Globes', href: '/lighting/globes'},
          {label: 'Hanging Lanterns', href: '/lighting/lanterns'},
          {label: 'Wall Lights', href: '/lighting/wall'},
          {label: 'Dish Lights', href: '/lighting/dish'},
          {label: 'Table Lamps', href: '/lighting/table'},
          {label: 'Chains & Brackets', href: '/lighting/accessories'},
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Reproduction Furniture',
        links: [
          {label: 'Seating', href: '/furniture/seating'},
          {label: 'Tables', href: '/furniture/tables'},
          {label: 'Mirrors', href: '/furniture/mirrors'},
          {label: 'The Pantry Collection', href: '/furniture/pantry'},
        ],
      },
      {
        title: 'Antique Furniture',
        links: [
          {label: 'Seating', href: '/furniture/antique/seating'},
          {label: 'Tables', href: '/furniture/antique/tables'},
          {label: 'Desks', href: '/furniture/antique/desks'},
          {label: 'Bookcases & Cabinets', href: '/furniture/antique/bookcases'},
          {label: 'Chests', href: '/furniture/antique/chests'},
          {label: 'Mirrors', href: '/furniture/antique/mirrors'},
          {label: 'Fire Accessories', href: '/furniture/antique/accessories'},
          {label: 'Objects', href: '/furniture/antique/objects'},
          {label: 'Works of Arts', href: '/furniture/antique/art'},
          {label: 'Lighting', href: '/furniture/antique/lighting'},
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Journal',
        links: [
          {label: 'Latest Stories', href: '/journal'},
          {label: 'Design Guides', href: '/journal/design-guides'},
          {label: 'Our Craft', href: '/journal/craft'},
          {label: 'News', href: '/journal/news'},
          {label: 'Events', href: '/journal/events'},
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'About',
        links: [
          {label: 'Founders', href: '/about/founders'},
          {label: 'Team', href: '/about/team'},
          {label: 'History', href: '/about/history'},
          {label: 'Galleries', href: '/galleries'},
          {label: 'Workshops', href: '/about/workshops'},
          {label: 'Showrooms', href: '/showrooms'},
          {label: 'Terms & Conditions', href: '/terms'},
          {label: 'Privacy Policy', href: '/privacy'},
        ],
      },
    ],
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

function FooterSection({
  title,
  links,
  singleLinkOnly = false,
}: {
  title: string
  links: {label: string; href: string}[]
  singleLinkOnly?: boolean
}) {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const showToggle =
    !singleLinkOnly && links.length > 0 && typeof window !== 'undefined' && window.innerWidth < 1024

  const showAsPlainTitle = singleLinkOnly && links.length === 0

  if (showAsPlainTitle) {
    return (
      <div className="flex flex-col gap-4">
        <h5 className="footer-text leading-normal m-0 p-0 whitespace-nowrap">{title}</h5>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full text-left lg:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-expanded={isOpen}
        aria-controls={`footer-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        disabled={!showToggle}
      >
        <h5 className="footer-text leading-normal m-0 p-0">{title}</h5>
        {showToggle && (
          <motion.svg
            animate={{rotate: isOpen ? 180 : 0}}
            transition={{duration: 0.2}}
            className="w-4 h-4 flex-shrink-0 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        )}
      </button>
      <AnimatePresence mode="wait">
        {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) &&
          links.length > 0 && (
            <motion.ul
              key={`footer-list-${title}`}
              id={`footer-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.2}}
              className="flex flex-col gap-2 list-none m-0 p-0 overflow-hidden"
              role="list"
              aria-label={title}
            >
              {links.map((link, index) => (
                <li key={`${link.label}-${index}`} className="m-0 p-0">
                  <Link
                    href={link.href}
                    className="footer-text hover:text-foreground transition-colors no-underline block hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                    style={{color: '#9C9C9D'}}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
      </AnimatePresence>
    </div>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setErrorMessage('')

      if (!email.trim()) {
        setErrorMessage('Please enter your email address')
        setFormState('error')
        return
      }

      if (!validateEmail(email)) {
        setErrorMessage('Please enter a valid email address')
        setFormState('error')
        return
      }

      if (!agreed) {
        setErrorMessage('Please agree to our Privacy Policy')
        setFormState('error')
        return
      }

      setFormState('loading')

      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormState('success')
      setEmail('')
      setAgreed(false)
    },
    [email, agreed, validateEmail],
  )

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      if (formState === 'error') {
        setFormState('idle')
        setErrorMessage('')
      }
    },
    [formState],
  )

  const handleAgreementChange = useCallback(() => {
    setAgreed((prev) => !prev)
    if (formState === 'error') {
      setFormState('idle')
      setErrorMessage('')
    }
  }, [formState])

  const contactInfo = useMemo(() => FOOTER_CONTACT, [])

  return (
    <footer
      style={{backgroundColor: '#E3E3E3'}}
      className="py-12 md:py-16 lg:py-24"
      role="contentinfo"
      data-testid="footer"
    >
      <div className="container-jamb">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 md:mb-16 lg:mb-20">
          <address
            className="not-italic space-y-1 min-w-[160px] md:min-w-[200px]"
            data-testid="footer-contact"
          >
            <p
              className="text-[13px] md:text-[15px] font-primary"
              style={{color: '#9C9C9D'}}
              aria-label={`Telephone: ${contactInfo.phone}`}
            >
              Tel: {contactInfo.phone}
            </p>
            <p className="text-[13px] md:text-[15px] font-primary" style={{color: '#9C9C9D'}}>
              {contactInfo.address.line1}
            </p>
            <p className="text-[13px] md:text-[15px] font-primary" style={{color: '#9C9C9D'}}>
              {contactInfo.address.line2}
            </p>
          </address>

          <a
            href={`mailto:${contactInfo.email}`}
            className="text-[13px] md:text-[15px] font-primary hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            style={{color: '#9C9C9D'}}
            aria-label={`Email: ${contactInfo.email}`}
          >
            {contactInfo.email}
          </a>

          <div
            className="w-full md:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px]"
            data-testid="footer-newsletter"
          >
            <p className="text-[13px] md:text-[15px] font-primary mb-3 md:mb-4 text-[#9C9C9D] leading-tight text-left">
              Newsletter
            </p>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4" noValidate>
              <div className="flex border border-[#9C9C9D]/30 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-accent focus-within:border-transparent transition-shadow">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email address"
                  className="flex-1 px-3 sm:px-4 py-2.5 text-[14px] md:text-[15px] font-primary focus:outline-none min-w-0"
                  disabled={formState === 'loading' || formState === 'success'}
                  aria-invalid={formState === 'error' && errorMessage.includes('email')}
                  data-testid="newsletter-email-input"
                />
                <motion.button
                  type="submit"
                  disabled={formState === 'loading' || formState === 'success'}
                  whileHover={
                    formState !== 'loading' && formState !== 'success' ? {scale: 1.02} : {}
                  }
                  whileTap={formState !== 'loading' && formState !== 'success' ? {scale: 0.98} : {}}
                  className="px-4 sm:px-6 py-2.5 text-[13px] sm:text-[14px] md:text-[15px] font-primary border-l border-[#9C9C9D]/30 hover:bg-gray-50 transition-colors text-[#9C9C9D] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  data-testid="newsletter-submit"
                >
                  {formState === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Subscribing...
                    </span>
                  ) : formState === 'success' ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Subscribed
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {errorMessage && (
                  <motion.p
                    key="error-message"
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    className="text-[12px] font-primary text-red-600"
                    role="alert"
                    data-testid="newsletter-error"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAgreementChange}
                  className="w-5 h-5 rounded-full border border-[#9C9C9D] flex items-center justify-center transition-all duration-700 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  style={{
                    backgroundColor: agreed ? '#9C9C9D' : 'transparent',
                    borderColor: agreed ? '#9C9C9D' : undefined,
                  }}
                  aria-pressed={agreed}
                  aria-label="I agree to our Privacy Policy"
                  data-testid="newsletter-privacy-checkbox"
                >
                  <AnimatePresence mode="wait">
                    {agreed && (
                      <motion.svg
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0, opacity: 0}}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 20,
                          duration: 0.6,
                        }}
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </button>
                <label
                  htmlFor="privacy-policy"
                  className="text-[12px] md:text-[13px] font-primary cursor-pointer select-none"
                  style={{color: '#9C9C9D'}}
                >
                  <span className="sr-only">Privacy Policy agreement. </span>I agree to our{' '}
                  <Link
                    href="/privacy"
                    className="hover:text-foreground underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    Privacy Policy
                  </Link>
                </label>
                <input
                  type="checkbox"
                  id="privacy-policy"
                  checked={agreed}
                  onChange={handleAgreementChange}
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            </form>
          </div>
        </div>

        <nav
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 sm:gap-y-12 gap-x-6 lg:gap-x-8"
          role="navigation"
          aria-label="Footer navigation"
        >
          {footerStructure.map((column, colIndex) => (
            <div
              key={`footer-column-${colIndex}`}
              className="flex flex-col gap-8 sm:gap-10"
              data-testid={`footer-column-${colIndex}`}
            >
              {column.sections.map((section, secIndex) => (
                <div
                  key={`footer-section-${colIndex}-${secIndex}`}
                  className="flex flex-col gap-4"
                  data-testid={`footer-section-${colIndex}-${secIndex}`}
                >
                  <FooterSection
                    title={section.title}
                    links={section.links}
                    singleLinkOnly={section.singleLinkOnly}
                  />
                  {secIndex < column.sections.length - 1 && (
                    <div
                      className="mt-2 border-b border-[#9C9C9D] w-full hidden sm:block"
                      style={{borderBottomWidth: '1px', borderBottomStyle: 'solid'}}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-16 pt-8 border-t border-[#9C9C9D] flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[12px] font-primary text-[#9C9C9D]">
            © {new Date().getFullYear()} Jamb. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-[12px] font-primary text-[#9C9C9D] hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-[12px] font-primary text-[#9C9C9D] hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-[12px] font-primary text-[#9C9C9D] hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

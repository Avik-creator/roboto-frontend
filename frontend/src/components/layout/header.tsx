'use client'

import Link from 'next/link'
import {motion, AnimatePresence} from 'motion/react'
import {useEffect} from 'react'
import {
  DURATIONS,
  EASINGS,
  useSearchForm,
  useNewsletterForm,
  useMenuState,
  useModal,
} from '@/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function SearchModal({isOpen, onClose}: SearchModalProps) {
  const {query, handleSubmit, handleQueryChange} = useSearchForm(onClose)
  const inputRef =
    typeof window !== 'undefined'
      ? (document.querySelector('#search-input') as HTMLInputElement)
      : null

  useEffect(() => {
    if (isOpen && inputRef) {
      inputRef.focus()
    }
  }, [isOpen, inputRef])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{opacity: 0, y: -50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -50}}
            transition={{duration: 0.3, ease: 'easeOut'}}
            className="fixed top-0 left-0 right-0 z-[70] bg-background border-b border-border/40"
            role="dialog"
            aria-label="Search"
            aria-modal="true"
          >
            <div className="container-jamb py-6">
              <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    id="search-input"
                    type="search"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Search products, categories, stories..."
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-lg font-primary focus:outline-none placeholder:text-muted"
                  />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  aria-label="Close search"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

function NewsletterModal({isOpen, onClose}: NewsletterModalProps) {
  const {
    email,
    agreed,
    status,
    handleSubmit: handleFormSubmit,
    handleEmailChange,
    handleAgreementChange,
    resetForm,
  } = useNewsletterForm()

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
    }
  }, [status, onClose, resetForm])

  const handleSubmit = async (e: React.FormEvent) => {
    await handleFormSubmit(e)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.95}}
            transition={{duration: 0.3, ease: 'easeOut'}}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md bg-background shadow-xl"
            role="dialog"
            aria-label="Newsletter signup"
            aria-modal="true"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-primary mb-2">Subscribe to our Journal</h2>
                  <p className="text-muted text-sm">
                    Be the first to know about new collections and stories.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  aria-label="Close newsletter popup"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  className="text-center py-8"
                >
                  <svg
                    className="w-12 h-12 mx-auto text-green-600 mb-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="font-primary">Thank you for subscribing!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newsletter-email-modal" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email-modal"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border border-[#9C9C9D]/30 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                      required
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={handleAgreementChange}
                      className={`w-5 h-5 rounded border border-[#9C9C9D] flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm ${
                        agreed ? 'bg-foreground' : ''
                      }`}
                      aria-pressed={agreed}
                    >
                      {agreed && (
                        <svg
                          className="w-3 h-3 text-white"
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
                      )}
                    </button>
                    <label
                      htmlFor="newsletter-privacy-modal"
                      className="text-sm text-muted cursor-pointer select-none"
                    >
                      I agree to receive email communications and accept the{' '}
                      <Link
                        href="/privacy"
                        className="underline hover:text-foreground"
                        onClick={onClose}
                      >
                        Privacy Policy
                      </Link>
                    </label>
                    <input
                      type="checkbox"
                      id="newsletter-privacy-modal"
                      checked={agreed}
                      onChange={handleAgreementChange}
                      className="sr-only"
                      tabIndex={-1}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3 bg-foreground text-background font-primary hover:opacity-90 transition-opacity disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function Header() {
  const {isMenuOpen, toggleMenu, closeMenu} = useMenuState()
  const {isOpen: isSearchOpen, open: openSearch, close: closeSearch} = useModal()
  const {isOpen: isNewsletterOpen, open: openNewsletter, close: closeNewsletter} = useModal()

  return (
    <>
      <motion.header
        initial={{opacity: 0, y: -25}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: DURATIONS.medium, ease: EASINGS.elegant}}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40"
        role="banner"
      >
        <div className="container-jamb flex items-center justify-between py-4 md:py-5">
          <Link
            href="/"
            className="font-primary text-[28px] md:text-[32px] tracking-tight leading-none text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
            aria-label="Jamb - Home"
            onClick={closeMenu}
          >
            Jamb.
          </Link>

          <nav
            className="flex items-center gap-2 md:gap-6"
            role="navigation"
            aria-label="Header navigation"
          >
            <button
              onClick={openSearch}
              className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Open search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              onClick={openNewsletter}
              className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Subscribe to newsletter"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="0" />
                <path d="m22 7-10 7L2 7" />
              </svg>
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm flex flex-col gap-[5px]"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <motion.span
                animate={{rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0}}
                className="w-7 h-px bg-muted block"
                aria-hidden="true"
              />
              <motion.span
                animate={{opacity: isMenuOpen ? 0 : 1}}
                className="w-7 h-px bg-muted block"
                aria-hidden="true"
              />
              <motion.span
                animate={{rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0}}
                className="w-7 h-px bg-muted block"
                aria-hidden="true"
              />
            </button>
          </nav>
        </div>

        {isMenuOpen && (
          <motion.div
            id="main-menu"
            role="region"
            aria-label="Main menu"
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: DURATIONS.medium, ease: EASINGS.elegant}}
            className="lg:hidden border-t border-border/40 bg-background"
          >
            <nav className="container-jamb py-8 space-y-4" aria-label="Mobile menu">
              <Link
                href="/fireplaces"
                className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                onClick={closeMenu}
              >
                Fireplaces
              </Link>
              <Link
                href="/lighting"
                className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                onClick={closeMenu}
              >
                Lighting
              </Link>
              <Link
                href="/furniture"
                className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                onClick={closeMenu}
              >
                Furniture
              </Link>
              <Link
                href="/journal"
                className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                onClick={closeMenu}
              >
                Journal
              </Link>
              <Link
                href="/about"
                className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                onClick={closeMenu}
              >
                About
              </Link>
            </nav>
          </motion.div>
        )}
      </motion.header>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      <NewsletterModal isOpen={isNewsletterOpen} onClose={closeNewsletter} />
    </>
  )
}

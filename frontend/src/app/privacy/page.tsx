import {Header} from '@/components/layout/header'
import {Footer} from '@/components/layout/footer'

export const metadata = {
  title: 'Privacy Policy | Jamb',
  description: 'Privacy policy for the Jamb website.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="pt-14 md:pt-16">
        <section className="py-20 md:py-32">
          <div className="container-jamb max-w-4xl">
            <h1 className="text-heading mb-12 md:mb-16">Privacy Policy</h1>

            <div className="space-y-8 text-paragraph">
              <section>
                <h2 className="text-xl font-primary font-medium mb-4">1. Introduction</h2>
                <p className="text-muted">
                  At Jamb, we are committed to protecting your personal information and your right
                  to privacy. This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website jamb.co.uk.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">2. Information We Collect</h2>
                <p className="text-muted mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>Register on our website</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Make a purchase</li>
                  <li>Contact us with an inquiry</li>
                  <li>Participate in a survey or promotion</li>
                </ul>
                <p className="text-muted mt-4">This information may include:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>Name and contact information</li>
                  <li>Email address and telephone number</li>
                  <li>Billing and delivery addresses</li>
                  <li>Payment information</li>
                  <li>Account preferences and communication choices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>Process and fulfil your orders</li>
                  <li>Send you order confirmations and updates</li>
                  <li>Manage your account and provide customer support</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">
                  4. Information Sharing and Disclosure
                </h2>
                <p className="text-muted mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>Service providers who assist in our operations</li>
                  <li>Payment processors for transaction handling</li>
                  <li>Delivery partners for order fulfilment</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                <p className="text-muted mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">
                  5. Cookies and Tracking Technologies
                </h2>
                <p className="text-muted">
                  Our website uses cookies and similar tracking technologies to track activity on
                  our website and hold certain information. You can instruct your browser to refuse
                  all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">6. Data Security</h2>
                <p className="text-muted">
                  We have implemented appropriate technical and organizational security measures
                  designed to protect the security of any personal information we process. However,
                  please note that no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">7. Your Rights</h2>
                <p className="text-muted mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>Right to access your personal information</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure of your personal information</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">8. Contact Us</h2>
                <p className="text-muted">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 space-y-1 text-muted">
                  <p>Jamb</p>
                  <p>95-97 Pimlico Road</p>
                  <p>London SW1W 8PH</p>
                  <p>Email: hello@jamb.co.uk</p>
                  <p>Tel: +44 (0) 207 730 2122</p>
                </div>
              </section>

              <section className="pt-8 border-t border-border/40">
                <p className="text-muted text-sm">Last updated: January 2026</p>
              </section>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

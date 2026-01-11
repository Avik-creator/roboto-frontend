import {Header} from '@/components/layout/header'
import {Footer} from '@/components/layout/footer'

export const metadata = {
  title: 'Terms & Conditions | Jamb',
  description: 'Terms and conditions for using the Jamb website.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="pt-14 md:pt-16">
        <section className="py-20 md:py-32">
          <div className="container-jamb max-w-4xl">
            <h1 className="text-heading mb-12 md:mb-16">Terms & Conditions</h1>

            <div className="space-y-8 text-paragraph">
              <section>
                <h2 className="text-xl font-primary font-medium mb-4">1. Introduction</h2>
                <p className="text-muted">
                  Welcome to Jamb. These terms and conditions outline the rules and regulations for
                  the use of Jamb&apos;s website, located at jamb.co.uk. By accessing this website
                  we assume you accept these terms and conditions. Do not continue to use Jamb if
                  you do not agree to take all of the terms and conditions stated on this page.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">
                  2. Intellectual Property Rights
                </h2>
                <p className="text-muted">
                  Other than the content you own, under these Terms, Jamb and/or its licensors own
                  all the intellectual property rights and materials contained in this Website. You
                  are granted limited license only for purposes of viewing the material contained on
                  this Website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">3. Restrictions</h2>
                <p className="text-muted mb-4">
                  You are specifically restricted from all of the following:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>Publishing any Website material in any other media</li>
                  <li>
                    Selling, sublicensing and/or otherwise commercializing any Website material
                  </li>
                  <li>Publicly performing and/or showing any Website material</li>
                  <li>Using this Website in any way that is or may be damaging to this Website</li>
                  <li>Using this Website in any way that impacts user access to this Website</li>
                  <li>
                    Engaging in any data mining, data harvesting, data extracting or any other
                    similar activity in relation to this Website
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">4. Products and Services</h2>
                <p className="text-muted">
                  All products and services offered through this Website are subject to
                  availability. We reserve the right to discontinue any product or service at any
                  time. Prices for our products are subject to change without notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="text-muted">
                  In no event shall Jamb, nor any of its officers, directors and employees, be held
                  liable for anything arising out of or in any way connected with your use of this
                  Website whether such liability is under contract. Jamb, including its officers,
                  directors and employees shall not be held liable for any indirect, consequential
                  or special liability arising out of or in any way related to your use of this
                  Website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">6. Governing Law</h2>
                <p className="text-muted">
                  These terms and conditions are governed by and construed in accordance with the
                  laws of England and Wales and you irrevocably submit to the exclusive jurisdiction
                  of the courts in that State or location.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">7. Contact Information</h2>
                <p className="text-muted">
                  If you have any questions about these Terms & Conditions, please contact us at
                  hello@jamb.co.uk or by telephone at +44 (0) 207 730 2122.
                </p>
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

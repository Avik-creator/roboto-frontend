import {Header} from '@/components/layout/header'
import {Footer} from '@/components/layout/footer'

export const metadata = {
  title: 'Cookie Policy | Jamb',
  description: 'Cookie policy for the Jamb website.',
}

export default function CookiesPage() {
  return (
    <>
      <Header />
      <div className="pt-14 md:pt-16">
        <section className="py-20 md:py-32">
          <div className="container-jamb max-w-4xl">
            <h1 className="text-heading mb-12 md:mb-16">Cookie Policy</h1>

            <div className="space-y-8 text-paragraph">
              <section>
                <h2 className="text-xl font-primary font-medium mb-4">1. What Are Cookies</h2>
                <p className="text-muted">
                  Cookies are small text files that are stored on your computer or mobile device
                  when you visit a website. They are widely used to make websites work more
                  efficiently and provide information to the owners of the site. Cookies help us
                  provide you with a better experience when you browse our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">
                  2. Types of Cookies We Use
                </h2>

                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-primary font-medium mb-2">Essential Cookies</h3>
                    <p className="text-muted">
                      These cookies are necessary for the website to function properly. They enable
                      core functionality such as page navigation, secure areas, and shopping cart
                      functionality. You cannot switch off these cookies as the website cannot
                      function without them.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-primary font-medium mb-2">Performance Cookies</h3>
                    <p className="text-muted">
                      These cookies help us understand how visitors interact with our website by
                      collecting and reporting information anonymously. They help us improve the
                      performance of our website by showing us which pages are most popular.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-primary font-medium mb-2">Functionality Cookies</h3>
                    <p className="text-muted">
                      These cookies allow the website to remember choices you make (such as your
                      language preferences, region, or username) and provide enhanced, more personal
                      features.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-primary font-medium mb-2">
                      Targeting/Advertising Cookies
                    </h3>
                    <p className="text-muted">
                      These cookies are used to deliver advertisements that are relevant to you and
                      your interests. They may be used by advertising networks to build a profile of
                      your interests and show you relevant adverts on other sites.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">3. How We Use Cookies</h2>
                <p className="text-muted mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>To remember your preferences and settings</li>
                  <li>To keep you signed in to your account</li>
                  <li>To process your shopping cart and checkout</li>
                  <li>To analyze website traffic and performance</li>
                  <li>To personalize content and advertisements</li>
                  <li>To provide social media features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">4. Managing Cookies</h2>
                <p className="text-muted mb-4">
                  Most web browsers allow you to control cookies through their settings. You can
                  typically:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted">
                  <li>View cookies stored on your device</li>
                  <li>Delete all or specific cookies</li>
                  <li>Block cookies from all or specific websites</li>
                  <li>Set preferences for first-party and third-party cookies</li>
                </ul>
                <p className="text-muted mt-4">
                  Please note that if you block or delete cookies, some features of our website may
                  not work properly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">5. Cookie Categories</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm mt-4">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="text-left py-3 px-4 font-primary font-medium">
                          Cookie Name
                        </th>
                        <th className="text-left py-3 px-4 font-primary font-medium">Purpose</th>
                        <th className="text-left py-3 px-4 font-primary font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted">
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4">session_id</td>
                        <td className="py-3 px-4">Essential - User session</td>
                        <td className="py-3 px-4">Session</td>
                      </tr>
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4">cart</td>
                        <td className="py-3 px-4">Essential - Shopping cart</td>
                        <td className="py-3 px-4">30 days</td>
                      </tr>
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4">preferences</td>
                        <td className="py-3 px-4">Functionality - User preferences</td>
                        <td className="py-3 px-4">1 year</td>
                      </tr>
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4">analytics</td>
                        <td className="py-3 px-4">Performance - Website analytics</td>
                        <td className="py-3 px-4">2 years</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">marketing</td>
                        <td className="py-3 px-4">Advertising - Targeted ads</td>
                        <td className="py-3 px-4">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">6. Third-Party Cookies</h2>
                <p className="text-muted">
                  Some cookies are placed by third-party services that appear on our pages. We do
                  not control these cookies. You should check the third-party websites for more
                  information about their cookie practices.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">7. Updates to This Policy</h2>
                <p className="text-muted">
                  We may update this Cookie Policy from time to time to reflect changes in
                  technology, legislation, or our business practices. We encourage you to review
                  this page periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-primary font-medium mb-4">8. Contact Us</h2>
                <p className="text-muted">
                  If you have any questions about our use of cookies, please contact us at
                  hello@jamb.co.uk or +44 (0) 207 730 2122.
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

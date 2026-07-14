import type { Metadata } from 'next';
import Layout from '../../components/layout/Layout';

export const metadata: Metadata = {
  title: 'Terms of Service · ArtUnity Youth',
  description: 'The terms for using the ArtUnity Youth website and participating in our programs.',
};

const LAST_UPDATED = 'July 14, 2026';

export default function TermsPage() {
  return (
    <Layout>
      <section className="pt-36 pb-16 bg-cream texture-dots">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <span className="label-accent block mb-3">The fine print</span>
          <h1 className="font-display text-display-lg text-ink mb-3">TERMS OF SERVICE</h1>
          <p className="font-body text-ink/50 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-10">
          <div>
            <p className="font-body text-ink/70 leading-relaxed">
              Welcome to ArtUnity Youth. By using this website or taking part in our programs and events, you
              agree to these Terms of Service. ArtUnity Youth is a nonprofit 501(c)(3) organization.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Using our website</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              You may use this site to learn about our work, sign up for events, volunteer, and support our
              mission. Please use it lawfully and respectfully, and do not attempt to disrupt, misuse, or gain
              unauthorized access to the site or its systems.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Events and sign-ups</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              When you RSVP or register for an event, you agree to provide accurate information. Event details
              such as dates, times, and locations may change; we will do our best to keep them current. Some
              activities are geared toward youth, and a parent or guardian should supervise where appropriate.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Photography and media</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              Photos and video may be taken at our events and used to share and promote our work. If you or your
              child appear in a photo and you would like it removed, please email us and we will honor your
              request.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Donations</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              Donations support our youth programs, supplies, and community art events. Contributions are
              generally non-refundable. If you believe a donation was made in error, contact us and we will do our
              best to help.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Artwork and content</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              Artwork, logos, text, and images on this site belong to ArtUnity Youth or the young artists we work
              with, and may not be reused without permission. Artwork created by participants is celebrated as
              part of our community programs.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Disclaimer and liability</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              This website and our programs are provided on an &quot;as is&quot; basis. To the fullest extent
              permitted by law, ArtUnity Youth is not liable for any indirect or incidental damages arising from
              your use of the site or participation in events.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Changes to these terms</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              We may update these Terms from time to time. Continued use of the site after changes means you
              accept the updated Terms. The &quot;Last updated&quot; date above reflects the latest version.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Contact us</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              Questions about these Terms? Email{' '}
              <a href="mailto:artunityyouth@gmail.com" className="text-rust hover:text-ink underline underline-offset-2">
                artunityyouth@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

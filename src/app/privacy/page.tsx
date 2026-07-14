import type { Metadata } from 'next';
import Layout from '../../components/layout/Layout';

export const metadata: Metadata = {
  title: 'Privacy Policy · ArtUnity Youth',
  description: 'How ArtUnity Youth collects, uses, and protects your information.',
};

const LAST_UPDATED = 'July 14, 2026';

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="pt-36 pb-16 bg-cream texture-dots">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <span className="label-accent block mb-3">Your privacy matters</span>
          <h1 className="font-display text-display-lg text-ink mb-3">PRIVACY POLICY</h1>
          <p className="font-body text-ink/50 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-10">
          <div>
            <p className="font-body text-ink/70 leading-relaxed">
              ArtUnity Youth (&quot;ArtUnity Youth,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a
              nonprofit 501(c)(3) organization. This Privacy Policy explains what information we collect
              when you use our website or take part in our programs, how we use it, and the choices you have.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Information we collect</h2>
            <ul className="list-disc pl-5 space-y-2 font-body text-ink/70 leading-relaxed">
              <li>
                <strong>Information you give us.</strong> When you RSVP to a session, fill out a volunteer or
                contact form, or reach out to us, we collect the details you provide — typically your name and
                email address, and any message you choose to send.
              </li>
              <li>
                <strong>Event photos.</strong> We take photographs at our events (for example, group photos and
                candid shots of activities) that may be shared on this website and our materials.
              </li>
              <li>
                <strong>Basic technical data.</strong> Like most websites, our hosting provider may log standard
                information such as browser type and general location for security and performance. We do not use
                advertising trackers.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">How we use your information</h2>
            <ul className="list-disc pl-5 space-y-2 font-body text-ink/70 leading-relaxed">
              <li>To organize events and let you know when and where sessions take place.</li>
              <li>To respond to your messages and volunteer or partnership inquiries.</li>
              <li>To show a count of how many people are attending an upcoming session.</li>
              <li>To share the story of our work through event photos on our site.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">How your information is stored and shared</h2>
            <p className="font-body text-ink/70 leading-relaxed mb-3">
              We store form submissions and content using trusted service providers, including Supabase (database
              and authentication) and Resend (email notifications to our team). These providers process data only
              on our behalf.
            </p>
            <p className="font-body text-ink/70 leading-relaxed">
              We do <strong>not</strong> sell, rent, or trade your personal information. We only share information
              when required by law or to protect the safety of our community.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Children and youth</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              Our programs are designed for young people and families. If your child participates in an event and
              you would prefer that their photo not be used, or you would like any information removed, just email
              us and we will take care of it.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Cookies</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              We use only the essential cookies needed for the site to function, such as keeping an administrator
              signed in. We do not use cookies for advertising.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Your choices</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              You can ask us to access, correct, or delete the personal information we hold about you at any time.
              To make a request, email us at{' '}
              <a href="mailto:artunityyouth@gmail.com" className="text-rust hover:text-ink underline underline-offset-2">
                artunityyouth@gmail.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Changes to this policy</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last
              updated&quot; date above.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-ink mb-3">Contact us</h2>
            <p className="font-body text-ink/70 leading-relaxed">
              Questions about this policy? Email{' '}
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

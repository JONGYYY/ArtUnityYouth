'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import SmartImage from '../../components/common/SmartImage';
import { useForm } from 'react-hook-form';
import { HandRaisedIcon, HeartIcon, UserGroupIcon } from '@heroicons/react/24/outline';

type VolunteerForm = {
  name: string;
  email: string;
  interest: string;
  message?: string;
};

export default function GetInvolvedPage() {
  const [active, setActive] = useState<'volunteer' | 'donate' | 'partner'>('volunteer');
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<VolunteerForm>();

  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const onSubmit = async (data: VolunteerForm) => {
    try {
      setSubmitState('loading');
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitState('success');
      reset();
    } catch (_e) {
      setSubmitState('error');
    }
  };

  const TabButton = ({ id, label, Icon }: { id: 'volunteer'|'donate'|'partner'; label: string; Icon: any }) => (
    <button
      onClick={() => setActive(id)}
      className={`flex items-center gap-2 px-5 py-2 rounded-full font-body transition-all border
        ${active === id ? 'bg-primary-coral text-white border-transparent shadow-glow' : 'bg-white text-secondary-dark border-primary-coral/40 hover:border-primary-coral'}`}
      aria-pressed={active === id}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-lavender/10 via-primary-coral/10 to-primary-teal/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl sm:text-5xl text-secondary-dark mb-4">
              Get Involved
            </h1>
            <p className="font-body text-lg text-secondary-dark/80">
              Your support brings art, healing, and connection to young people.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <TabButton id="volunteer" label="Volunteer" Icon={HandRaisedIcon} />
            <TabButton id="donate" label="Donate" Icon={HeartIcon} />
            <TabButton id="partner" label="Partner" Icon={UserGroupIcon} />
          </div>

          {active === 'volunteer' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="order-2 lg:order-1">
                <h2 className="font-heading text-2xl text-secondary-dark mb-4">Volunteer With Us</h2>
                <p className="font-body text-secondary-dark/80 mb-6">
                  Mentor youth, help facilitate workshops, or support our events. Tell us how you’d like to be involved.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="font-body text-sm text-secondary-dark/80">Name</label>
                    <input
                      className="mt-1 w-full rounded-xl border-secondary-dark/20 focus-visible:focus"
                      {...register('name', { required: 'Please enter your name' })}
                    />
                    {errors.name && <p className="text-primary-coral text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="font-body text-sm text-secondary-dark/80">Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border-secondary-dark/20 focus-visible:focus"
                      {...register('email', {
                        required: 'Please enter your email',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
                      })}
                    />
                    {errors.email && <p className="text-primary-coral text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="font-body text-sm text-secondary-dark/80">Area of Interest</label>
                    <select
                      className="mt-1 w-full rounded-xl border-secondary-dark/20 focus-visible:focus"
                      {...register('interest', { required: 'Please select an interest' })}
                    >
                      <option value="">Select…</option>
                      <option value="workshops">Workshops</option>
                      <option value="events">Events</option>
                      <option value="mentorship">Mentorship</option>
                      <option value="operations">Operations</option>
                    </select>
                    {errors.interest && <p className="text-primary-coral text-sm mt-1">{errors.interest.message}</p>}
                  </div>
                  <div>
                    <label className="font-body text-sm text-secondary-dark/80">Message (optional)</label>
                    <textarea
                      rows={4}
                      className="mt-1 w-full rounded-xl border-secondary-dark/20 focus-visible:focus"
                      {...register('message')}
                    />
                  </div>
                  <Button type="submit" disabled={submitState === 'loading'}>
                    {submitState === 'loading' ? 'Sending…' : 'Submit'}
                  </Button>
                  {submitState === 'success' && (
                    <p className="text-primary-teal font-body mt-2">
                      Thanks! We’ll be in touch soon.
                    </p>
                  )}
                  {submitState === 'error' && (
                    <p className="text-primary-coral font-body mt-2">
                      Sorry—something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-ink/10">
                  <SmartImage
                    src="/images/about/mission.jpg"
                    alt="Youth creating art together"
                    placeholderText="Get Involved"
                    className="object-cover"
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          )}

          {active === 'donate' && (
            <div className="grid grid-cols-1 gap-10">
              <div className="">
                <h2 className="font-heading text-2xl text-secondary-dark mb-4">Donate</h2>
                <p className="font-body text-secondary-dark/80 mb-4">
                  Your gift sustains programs that bridge divides, nurture creativity, and uplift youth voices through art.
                </p>
                <div className="flex justify-center">
                  <SmartImage
                    src="/images/venmo/venmo.png"
                    alt="Donate via Venmo"
                    placeholderText="Donate"
                    width={360}
                    height={360}
                    className="mx-auto"
                  />
                </div>
                <p className="font-body text-sm text-secondary-dark/70 mt-4">
                  Disclaimer: ArtUnity Youth is a nonprofit organization. All donations are used exclusively to support our youth programs, supplies, and community art events.
                </p>
              </div>
            </div>
          )}

          {active === 'partner' && (
            <div className="grid grid-cols-1 gap-10">
              <div>
                <h2 className="font-heading text-2xl text-secondary-dark mb-4">Partner With Us</h2>
                <p className="font-body text-secondary-dark/80 mb-4">
                  Schools, nonprofits, and community groups: let’s co-create art experiences that spark change.
                </p>
                <ul className="space-y-2 font-body text-secondary-dark/80 mb-6">
                  <li>• Host a workshop or showcase</li>
                  <li>• Provide space or supplies</li>
                  <li>• Sponsor an event or program</li>
                </ul>
                <Button href="/contact" variant="outline">Contact Us</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}



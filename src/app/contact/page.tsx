'use client';

import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import SmartImage from '../../components/common/SmartImage';
import Button from '../../components/common/Button';
import { useForm } from 'react-hook-form';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<ContactForm>();
  const onSubmit = (data: ContactForm) => {
    console.log('Contact form submitted', data);
    reset();
  };

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
              Contact Us
            </h1>
            <p className="font-body text-lg text-secondary-dark/80">
              We’d love to hear from you. Reach out with questions, ideas, or partnerships.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-heading text-2xl text-secondary-dark mb-4">Send a Message</h2>
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
                  <label className="font-body text-sm text-secondary-dark/80">Message</label>
                  <textarea
                    rows={5}
                    className="mt-1 w-full rounded-xl border-secondary-dark/20 focus-visible:focus"
                    {...register('message', { required: 'Please enter a message' })}
                  />
                  {errors.message && <p className="text-primary-coral text-sm mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit">Send</Button>
                {isSubmitSuccessful && (
                  <p className="text-primary-teal font-body mt-2">Thanks! We’ll reply soon.</p>
                )}
              </form>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-secondary-dark mb-4">Connect</h2>
              <div className="space-y-4 font-body text-secondary-dark/80 mb-6">
                <p className="flex items-center gap-2">
                  <EnvelopeIcon className="h-5 w-5 text-primary-coral" />
                  contact@artunityyouth.org
                </p>
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary-teal" />
                  123 Community Ave, Suite 100, Your City
                </p>
                <div className="flex gap-4">
                  <a className="hover:text-primary-coral transition-colors" href="#" aria-label="Instagram">Instagram</a>
                  <a className="hover:text-primary-coral transition-colors" href="#" aria-label="Facebook">Facebook</a>
                  <a className="hover:text-primary-coral transition-colors" href="#" aria-label="Twitter">Twitter/X</a>
                </div>
              </div>
              {/* Map intentionally removed per request */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}



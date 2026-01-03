import { motion } from 'framer-motion';
import Button from '../common/Button';

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-lavender/20 via-primary-coral/10 to-primary-teal/20" />
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-primary-coral/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-primary-teal/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-secondary-dark mb-6">
            <span className="text-primary-coral">Uniting</span> Diverse Youth Through the{' '}
            <span className="text-primary-teal">Power of Art</span>
          </h1>
          
          <p className="font-body text-lg sm:text-xl text-secondary-dark/80 mb-8">
            Join us in fostering creativity, celebrating diversity, and building a more inclusive
            community through art-based events for children.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/events">
              Join an Event
            </Button>
            <Button size="lg" variant="outline" href="/get-involved">
              Volunteer With Us
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
            {[
              { number: '1000+', label: 'People Impacted' },
              { number: '25+', label: 'Art Events' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-80 sm:w-96 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft"
              >
                <div className="font-heading text-3xl text-primary-coral mb-2">
                  {stat.number}
                </div>
                <div className="font-body text-secondary-dark/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 
'use client';

import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import { useInView } from 'react-intersection-observer';
import SmartImage from '../../components/common/SmartImage';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const officerMembers = [
  {
    name: 'Jonathan Shan',
    role: 'Founder and President',
    image: '/images/team/Jonathan.jpg',
    bio: 'Jonathan is the Founder and President of ArtUnity Youth and a student at Poolesville High School. As the organization\u2019s Executive Lead, he sets the vision and yearly goals for ArtUnity\u2019s impact, leads team planning and decision\u2011making, and ensures programs meet high standards for quality, safety, and inclusion. He also drives fundraising and partnerships with schools, sponsors, and community organizations to expand youth\u2011led, hands\u2011on, healing\u2011centered art experiences. Outside of ArtUnity, Jonathan is an award\u2011winning artist and an app designer who has competed and placed in multiple national\u2011level app competitions.',
  },
  {
    name: 'Saranzul (Sara) Boskov',
    role: 'Vice President',
    image: '/images/team/sara.jpg',
    bio: 'Saranzul (Sara) Boskov is Vice President of ArtUnity Youth and a student at Richard Montgomery High School. As the Programs & Operations Lead, she designs and teaches workshops, plans materials and lesson flow, and manages event logistics from registration and staffing to day\u2011of coordination. She also supports volunteer onboarding and multilingual outreach to ensure every program is welcoming, accessible, and youth\u2011centered. Sara loves helping students build confidence through art and creativity.',
  },
  {
    name: 'Daveon Williams',
    role: 'Vice President',
    image: '/images/team/Daveon.png',
    bio: 'Daveon Williams is Vice President of ArtUnity Youth and a student at Richard Montgomery High School. As the Community & Engagement Lead, he helps grow participation and builds a welcoming event environment through outreach, mentorship, and hands\u2011on creative activities. He\u2019s passionate about creating safe spaces where youth feel supported, challenged, and inspired to lead. Daveon is also a dedicated boxer who values discipline and resilience.',
  },
];

const eventLeadMembers = [
  {
    name: 'Samia Guled',
    role: 'Event Lead',
    image: '/images/team/samia.png',
    bio: 'Samia Guled is a ninth-grade student at Magruder High School. She enjoys meeting new people, making friends, and helping others. Samia loves drawing, creating art, and making DIY projects. In her free time, she enjoys listening to music, playing games with family and friends, and watching web series. She is excited to bring her creativity, positive energy, and collaborative spirit to the team.',
  },
  {
    name: 'Savannah Charles',
    role: 'Event Lead',
    image: '/images/team/savannah.png',
    bio: 'Savannah Charles is a ninth-grade student at Walter Johnson High School. She is passionate about learning, staying active, and encouraging others to reach their full potential. Outside of school, she enjoys playing tennis and volleyball. Savannah has held several leadership roles and takes pride in approaching each responsibility with care and dedication. She looks forward to continuing to learn, grow, and use her leadership skills to make a positive impact in her community.',
  },
  {
    name: 'Adya Karthik Bharadwaaj',
    role: 'Youth Event Lead',
    image: '/images/team/adya.png',
    bio: 'Hi! I\u2019m Adya Karthik Bharadwaaj, a sophomore at Wootton High School who enjoys sketching, dancing, reading, and connecting with others. Teaching my younger sister how to draw, dance, and solve puzzles helped me discover how much I enjoy supporting children as they learn and grow. ArtUnity Youth has given me a wonderful opportunity to combine my love of art with my passion for mentoring young people. As a Youth Event Lead, I help guide young artists, build their confidence, and create a welcoming environment where everyone feels comfortable exploring their creativity. I\u2019m excited to continue developing as a leader while showing how art can spread kindness, encouragement, and meaningful connections.',
  },
];

const ambassadorMembers = [
  {
    name: 'Mingdi Chen',
    role: 'Outreach & Youth Ambassador',
    image: '/images/team/didi.jpg',
    bio: 'Mingdi Chen is a student at Cabin John Middle School. As an Outreach & Youth Ambassador, he helps connect ArtUnity with younger students by spreading the word about workshops, supporting youth\u2011focused outreach, and helping create creative promotional materials. Mingdi is also an award\u2011winning young artist and loves inspiring other students to grow through art.',
  },
  {
    name: 'Nadia Guled',
    role: 'Outreach & Youth Ambassador',
    image: '/images/team/nadia.png',
    bio: 'Nadia Guled is a sixth-grade student at Shady Grove Middle School. She enjoys helping others and creating art independently, with friends, and with her siblings. Nadia is excited to collaborate with the team, use her creativity to support the community, and continue learning and growing in her role as an Outreach & Youth Ambassador.',
  },
];

const advisorMembers = [
  {
    name: 'Jierui Fang',
    role: 'Advisor',
    image: '/images/team/Jierui.png',
    bio: 'Ms. Fang is a multidisciplinary designer who focuses on living systems across human and environmental scales. She is an MIT graduate in art and design with minors in computer science and biomedical engineering, and a Stanford Product Design graduate. As an Advisor to ArtUnity Youth, she brings an impact-focused lens to our work, supporting program design, outcomes measurement, and community partnerships so our initiatives stay grounded, effective, and sustainable.',
  },
  {
    name: 'Laura Leigh Palmer',
    role: 'Advisor',
    image: '/images/team/palmer.png',
    bio: 'Ms. Palmer is a graphic and web designer and an adjunct professor at Montgomery College. As ArtUnity Youth\u2019s Curatorial Advisor and arts educator, she helps shape our visual identity and guides exhibitions and showcases that elevate youth storytelling and amplify young artists\u2019 voices. She also provides art direction and exhibition guidance for our year-round mural painting project, helping students strengthen concept, composition, and presentation from start to finish.',
  },
  {
    name: 'Xiaojin Bao',
    role: 'Art Advisor, Art Teacher',
    image: '/images/team/bao.png',
    bio: 'Ms. Bao is a UCLA graduate and an experienced concept artist, graphic designer, and animator in the entertainment industry, including interactive games and film. With over 20 years of teaching experience and an extensive fine arts background, she supports ArtUnity Youth as an arts educator and advisor, helping students strengthen their skills, creative confidence, and visual storytelling.',
  },
];

function MemberCard({ member }: { member: { name: string; role: string; image: string; bio: string } }) {
  return (
    /*
     * CSS-only hover lift — no motion.div wrapping the image.
     * This avoids framer-motion re-renders that cause next/image fill to flash.
     */
    <div className="group bg-cream border border-ink/8 rounded-sm overflow-hidden shadow-card
                    transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-card-hover">
      {/* Image container: explicit relative + aspect-ratio so fill never collapses */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-parch">
        <SmartImage
          src={member.image}
          alt={member.name}
          placeholderText={member.name}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl text-ink mb-1">{member.name}</h3>
        <div className="label-accent text-sm mb-3">{member.role}</div>
        <p className="font-body text-sm text-ink/60 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

export default function About() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef,    teamInView]    = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Layout>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 bg-cream texture-dots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="label-accent block mb-3">Who We Are</span>
            <h1 className="font-display text-display-lg text-ink mb-5 leading-none">OUR STORY</h1>
            <p className="font-body text-base text-ink/60 leading-relaxed">
              Building bridges through art, one brushstroke at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <motion.section
        ref={missionRef}
        variants={stagger}
        initial="hidden"
        animate={missionInView ? 'visible' : 'hidden'}
        className="py-24 bg-cream"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={{
                hidden:  { opacity: 0, x: -28, rotate: -2 },
                visible: { opacity: 1, x: 0,   rotate: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 shadow-card">
                <SmartImage
                  src="/images/about/mission.jpg"
                  alt="Youth working on an art project together"
                  placeholderText="Mission"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-rust/40" />
            </motion.div>

            <div>
              <motion.span variants={fadeUp} className="label-accent block mb-3">Our Mission</motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-ink mb-6 leading-tight">
                Art as a Bridge,<br /><em>Not a Wall</em>
              </motion.h2>
              <div className="space-y-4 font-body text-base text-ink/70 leading-relaxed max-w-prose">
                <motion.p variants={fadeUp}>
                  At ArtUnity Youth, we believe in the transformative power of art to break down
                  barriers and build understanding across diverse communities.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Our mission is to nurture young minds through art, fostering creativity,
                  celebrating diversity, and promoting inclusivity while organizing enriching
                  art-based events for children.
                </motion.p>
                <motion.p variants={fadeUp}>
                  As a nonprofit 501(c)(3) youth charity organization, we rely on community support to
                  sustain and expand our programs for the young people we serve.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Through our programs, we aim to bridge gaps between different racial, cultural,
                  and socioeconomic backgrounds, creating a more connected and empathetic community.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section ref={teamRef} className="py-24 bg-parch texture-dots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="label-accent block mb-3">The People</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-ink">
              Meet Our Team
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
          >
            <motion.h3 variants={fadeUp} className="font-display text-2xl tracking-widest text-ink/40 uppercase mb-8">
              Officers
            </motion.h3>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {officerMembers.map((member) => (
                <motion.div key={member.name} variants={fadeUp}>
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>

            <motion.h3 variants={fadeUp} className="font-display text-2xl tracking-widest text-ink/40 uppercase mb-8">
              Event Leads
            </motion.h3>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {eventLeadMembers.map((member) => (
                <motion.div key={member.name} variants={fadeUp}>
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>

            <motion.h3 variants={fadeUp} className="font-display text-2xl tracking-widest text-ink/40 uppercase mb-8">
              Youth Ambassadors
            </motion.h3>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {ambassadorMembers.map((member) => (
                <motion.div key={member.name} variants={fadeUp}>
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>

            <motion.h3 variants={fadeUp} className="font-display text-2xl tracking-widest text-ink/40 uppercase mb-8">
              Advisors
            </motion.h3>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {advisorMembers.map((member) => (
                <motion.div key={member.name} variants={fadeUp}>
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-ink py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="label-accent text-rust block mb-4">Join the Movement</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-cream mb-6 leading-tight">
            Help us create a more<br />
            <em className="text-rust">inclusive community.</em>
          </h2>
          <p className="font-body text-base text-cream/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Volunteer your time, donate to our programs, or reach out to partner with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/get-involved">Get Involved →</Button>
            <Button size="lg" variant="outline" href="/contact"
              className="border-cream/30 text-cream hover:border-rust hover:text-rust">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

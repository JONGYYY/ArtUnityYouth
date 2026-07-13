# ArtUnity Youth Website

A modern, responsive website for ArtUnity Youth, a nonprofit organization empowering youth through art to build community, fight discrimination, and promote diversity.

## 🎨 Features

- **Modern Design**: Artistic and professional layout with smooth animations
- **Responsive**: Fully optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Built with Next.js for optimal loading speeds
- **Interactive**: Engaging user experience with Framer Motion animations

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Forms**: React Hook Form
- **Maps**: Google Maps React

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/artunity-youth.git
   cd artunity-youth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
```bash
npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file in the project root (see `.env.example`).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (safe for the browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable / anon key (safe for the browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — **server only**, never expose to the browser. Powers admin writes, uploads, and RSVP counts |
| `ADMIN_EMAIL` | The single Google account allowed into `/admin` (e.g. `jshan7423@gmail.com`) |
| `RESEND_API_KEY` | Sends notification emails via Resend (optional; forms log to console if unset) |
| `NOTIFY_TO_EMAIL` | Address that receives form notifications (defaults to `artunityyouth@gmail.com`) |
| `RESEND_FROM` | Verified "from" address (defaults to `onboarding@resend.dev`) |

> Public pages fall back to built-in seed content if Supabase is unreachable, so the site renders even before the database is set up.

## 🛠 Supabase & Admin Setup

The site content (events, Friday sessions, RSVPs) lives in Supabase. A single admin (you) signs in with Google at `/admin` to add and edit everything. Regular visitors have no account — they just RSVP with a name + email.

### 1. Create the database

In the Supabase dashboard → **SQL Editor** → New query, paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql). This creates the `events`, `friday_sessions`, `session_info`, and `friday_signups` tables, sets up row-level security (public read, no public writes to content), and seeds the current content.

### 2. Create the storage bucket

Dashboard → **Storage** → New bucket → name it `event-photos` → mark it **Public**. This is where admin photo uploads are stored.

### 3. Enable Google sign-in (admin login)

1. Dashboard → **Authentication → Providers → Google** → enable it.
2. In the [Google Cloud Console](https://console.cloud.google.com/apis/credentials): create an **OAuth 2.0 Client ID** (type: Web application). Under **Authorized redirect URIs**, add:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. Copy the Google **Client ID** and **Client Secret** into the Supabase Google provider settings and save.
4. Dashboard → **Authentication → URL Configuration** → add redirect URLs:
   `http://localhost:3000/auth/callback` (and your production URL, e.g. `https://yourdomain.com/auth/callback`).

Only the account matching `ADMIN_EMAIL` can reach `/admin`; any other Google account is signed out with an "unauthorized" notice. Access is enforced in three layers: middleware, per-API email checks, and RLS.

### ⚠️ Rotate your keys

If your Supabase secret / service role key was ever shared (chat, screenshots, commits), rotate it: Dashboard → **Settings → API → Rotate**, then update `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. The `.env*` files are git-ignored and never committed.

### Admin dashboard

- `/admin` — overview with counts
- `/admin/events` — add/edit/delete events, upload cover + gallery photos
- `/admin/friday-sessions` — add/edit dated sessions with categorized photos, and edit the "Next Session" schedule
- `/admin/rsvps` — read-only list of Friday RSVP sign-ups

## 📄 Pages

- **Home**: Landing page with hero section, mission statement, and impact metrics
- **About**: Organization history, team members, and detailed mission
- **Events**: Upcoming and past art events
- **Friday Sessions** (`/events/friday-sessions`): Dedicated landing page for the weekly get-well card sessions — next-session details, live RSVP sign-up, and photo galleries
- **Get Involved**: Volunteer opportunities, donation options, and partnership info
- **Contact**: Contact form and location information

## 🎯 Design Choices

- **Color Palette**:
  - Coral: #FF6B6B
  - Teal: #4ECDC4
  - Yellow: #FFE66D
  - Lavender: #A06CD5

- **Typography**:
  - Display: Pacifico
  - Headings: Gloria Hallelujah
  - Body: Poppins

## 🛠 Development

### Commands

- `npm run dev`: Start development server
- `npm run build`: Build production bundle
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Project Structure

```
artunity-youth/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   └── layout/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── public/
│   └── images/
└── package.json
```

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern nonprofit websites
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Next.js team for the amazing framework

## 📧 Contact

For questions or support, please email [contact@artunityyouth.org](mailto:contact@artunityyouth.org)

# Portal Project

A modern, modular web application built with SvelteKit, designed to serve as an extensible portal system. Currently featuring a Learning Management System (LMS) module with plans for future expansion.

## Overview

This project is currently a work in progress, built with modularity at its core. The initial focus is on developing a robust Learning Management System, while maintaining an architecture that allows for seamless integration of additional modules in the future.

### Current Module
- 📚 Learning Management System (LMS) - In Development

### Planned Features
- Modular architecture for easy integration of new features
- Plug-and-play module system
- Extensible core framework

## Tech Stack

### Core
- [SvelteKit](https://kit.svelte.dev/) - Full-stack web framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

### Backend & Database
- [Supabase](https://supabase.com/) - Backend as a Service (BaaS)
- [DrizzleORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Database (via Supabase)

### Authentication
- Google OAuth
- Supabase Auth

### UI Components
- [shadcn-svelte](https://www.shadcn-svelte.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Project Status

This project is under active development. The current focus is on:
- Building the core portal infrastructure
- Developing the LMS module
- Establishing patterns for future module integration

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, pnpm, or yarn
- Supabase account
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your environment variables with your Supabase and Google OAuth credentials.

### Development

Start the development server:
```bash
npm run dev
# or
npm run dev -- --open
```

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Features

- 🔐 Secure authentication with Google OAuth
- 📊 Database management with DrizzleORM
- 🎨 Beautiful UI components from shadcn-svelte
- 🚀 Backend powered by Supabase
- 📱 Responsive design with Tailwind CSS
- 🧩 Modular architecture for extensibility

## Project Structure

```
src/
├── lib/
│   ├── components/    # UI components
│   ├── database/      # Database models and queries
│   ├── modules/       # Portal modules (LMS, etc.)
│   └── utils/         # Utility functions
├── routes/            # SvelteKit routes
└── app.d.ts          # TypeScript declarations
```

## Module Development

The portal is designed to support additional modules. Each module should:
- Be self-contained
- Follow established patterns for integration
- Include its own documentation
- Maintain consistency with the core portal design

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. If you're interested in developing new modules, please check our module development guidelines (coming soon).

## License

[MIT](LICENSE)

# Project Germany - Education Consultancy Platform

A modern full-stack web application for managing education consultancy enquiries, built with React and Convex.

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Convex (Serverless backend with real-time database)
- **Authentication**: JWT-based admin authentication
- **Deployment**: Vercel (Frontend) + Convex (Backend)

## ✨ Features

- **Public Website**: Beautiful landing page with contact form
- **Admin Dashboard**: Secure admin panel for managing enquiries
- **Real-time Updates**: Automatic real-time synchronization via Convex
- **Enquiry Management**: Full CRUD operations with status tracking
- **Analytics**: Dashboard with statistics and insights
- **Notes System**: Track progress with admin notes

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Convex account (free tier available)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# Root directory
npm install

# Client directory
cd client
npm install
cd ..
```

### 2. Initialize Convex

```bash
# Login/create Convex account
npx convex dev

# This will:
# - Create a Convex project
# - Generate deployment URL
# - Watch for changes and deploy automatically
```

### 3. Set Environment Variables

After running `npx convex dev`, you'll get a Convex URL. Add it to `client/.env`:

```env
VITE_CONVEX_URL=https://your-project.convex.cloud
```

### 4. Create Admin Account

After Convex is set up, create your first admin account using the Convex HTTP action:

```bash
curl -X POST https://your-project.convex.cloud/http/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "YourSecurePassword123!",
    "email": "admin@projectgermany.com"
  }'
```

### 5. Start Development Server

```bash
cd client
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
Project Germany/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── convex/      # Convex client setup
│   │   └── App.jsx      # Main app component
│   └── package.json
│
├── convex/              # Convex backend
│   ├── schema.ts        # Database schema
│   ├── auth.ts          # Auth helpers
│   ├── http.ts          # HTTP actions (auth)
│   ├── enquiries.ts     # Enquiry mutations/queries
│   └── enquiriesHttp.ts # Protected HTTP actions
│
└── package.json         # Root dependencies
```

## 🔐 Admin Access

- **Login URL**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin`

## 🌐 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set Root Directory to `client`
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Add environment variable: `VITE_CONVEX_URL`

### Backend (Convex)

```bash
npx convex deploy
```

Convex automatically handles:
- Database hosting
- Serverless functions
- Real-time synchronization
- Scaling

## 📚 Documentation

- `CONVEX_SETUP.md` - Detailed Convex setup guide
- `FRONTEND_MIGRATION_COMPLETE.md` - Migration details
- `VERCEL_DEPLOYMENT.md` - Vercel deployment guide

## 🎯 Key Features

### Public Features
- Responsive landing page
- Contact/enquiry form
- Service information

### Admin Features
- Secure login system
- Enquiry management (view, edit, delete)
- Status tracking (pending, contacted, resolved)
- Notes system for progress tracking
- Analytics dashboard
- Real-time updates

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Secure HTTP actions

## 📝 License

ISC

## 🤝 Contributing

This is a private project. For questions or issues, please contact the project maintainer.


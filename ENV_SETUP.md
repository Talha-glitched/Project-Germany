# Environment Variables Setup Guide

This guide explains how to set up environment variables for the Project Germany application.

## 📁 Required Files

You need to create the following `.env` files manually (they are in `.gitignore` for security):

### 1. Client Environment File

**Location:** `client/.env`

**Content:**
```env
# API Configuration
# Development (local)
VITE_API_URL=http://localhost:6001

# Production (replace with your backend URL when deploying)
# VITE_API_URL=https://your-api-domain.com
```

### 2. Server Environment File

**Location:** `server/.env`

**Content:**
```env
# Server Configuration
PORT=6001

# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/project_germany

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project_germany?retryWrites=true&w=majority

# JWT Secret (IMPORTANT: Use a strong, random string in production)
# Generate a secure secret: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🚀 Quick Setup

### For Development:

1. **Create `client/.env`:**
   ```bash
   cd client
   echo "VITE_API_URL=http://localhost:6001" > .env
   ```

2. **Create `server/.env`:**
   ```bash
   cd server
   echo "PORT=6001" > .env
   echo "MONGODB_URI=mongodb://localhost:27017/project_germany" >> .env
   echo "JWT_SECRET=your-super-secret-jwt-key-change-this-in-production" >> .env
   ```

### For Production:

1. **Update `client/.env`:**
   - Change `VITE_API_URL` to your production backend URL
   - Example: `VITE_API_URL=https://api.projectgermany.com`

2. **Update `server/.env`:**
   - Change `MONGODB_URI` to your production MongoDB connection string
   - Generate a strong `JWT_SECRET` (use: `openssl rand -base64 32`)
   - Set `PORT` to your server's port (or let hosting service set it)

## ⚠️ Important Notes

1. **Never commit `.env` files to Git** - They are already in `.gitignore`

2. **Vite Environment Variables:**
   - Must be prefixed with `VITE_` to be exposed to the client
   - Restart dev server after changing `.env`

3. **Server Environment Variables:**
   - Loaded automatically by `dotenv` package
   - Restart server after changing `.env`

4. **Security:**
   - Use strong, random strings for `JWT_SECRET` in production
   - Never share your `.env` files publicly
   - Use different secrets for development and production

## 🔍 Verify Setup

After creating the `.env` files:

1. **Restart your development servers:**
   ```bash
   # Stop current servers (Ctrl+C)
   # Then restart:
   cd server && npm start
   cd client && npm run dev
   ```

2. **Check if variables are loaded:**
   - Frontend: Check browser console for API calls
   - Backend: Check server logs for MongoDB connection

## 📝 Example Production Values

```env
# client/.env (Production)
VITE_API_URL=https://api.projectgermany.com

# server/.env (Production)
PORT=6001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/project_germany
JWT_SECRET=super-secure-random-string-generated-with-openssl-rand-base64-32
```


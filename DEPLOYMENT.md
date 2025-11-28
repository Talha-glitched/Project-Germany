# Deployment Guide - Project Germany

This guide will help you deploy the Project Germany application to production.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database (local or cloud like MongoDB Atlas)
- A hosting service (Vercel, Netlify, Heroku, etc.)

## 🔧 Environment Variables Setup

### Client (Frontend) Environment Variables

Create a `.env` file in the `client/` directory:

```env
# API Configuration
# For development (local)
VITE_API_URL=http://localhost:6001

# For production, replace with your backend URL
# VITE_API_URL=https://your-api-domain.com
```

**Important:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

### Server (Backend) Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=6001

# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/project_germany

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project_germany?retryWrites=true&w=majority

# JWT Secret (IMPORTANT: Use a strong, random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🚀 Deployment Steps

### Option 1: Deploy to Vercel (Recommended for Frontend)

#### Frontend Deployment:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to client directory:**
   ```bash
   cd client
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Add `VITE_API_URL` with your backend URL

#### Backend Deployment (Vercel or Railway):

1. **For Vercel:**
   - Create `vercel.json` in server directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "index.js"
       }
     ]
   }
   ```

2. **For Railway/Render:**
   - Connect your GitHub repository
   - Set environment variables in the dashboard
   - Deploy automatically

### Option 2: Deploy to Netlify (Frontend) + Heroku (Backend)

#### Frontend (Netlify):

1. **Build the project:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `dist` folder to Netlify
   - Or connect GitHub and auto-deploy

3. **Set Environment Variables:**
   - Go to Site settings > Environment variables
   - Add `VITE_API_URL`

#### Backend (Heroku):

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login and create app:**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set PORT=6001
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 3: Deploy to DigitalOcean/Railway (Full Stack)

1. **Create a Droplet/App**
2. **SSH into server or use their dashboard**
3. **Clone repository:**
   ```bash
   git clone your-repo-url
   cd Project\ Germany
   ```

4. **Install dependencies:**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

5. **Set up environment variables:**
   - Create `.env` files in both directories

6. **Build frontend:**
   ```bash
   cd client
   npm run build
   ```

7. **Start server:**
   ```bash
   cd server
   npm start
   ```

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` to a strong, random string
- [ ] Use HTTPS in production
- [ ] Set up CORS properly for your domain
- [ ] Use environment variables (never commit `.env` files)
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting
- [ ] Use a production MongoDB database (not local)

## 📝 Post-Deployment

1. **Update Frontend `.env`:**
   - Change `VITE_API_URL` to your production backend URL
   - Rebuild and redeploy frontend

2. **Test the application:**
   - Test login functionality
   - Test contact form submission
   - Test admin dashboard

3. **Create Admin Account:**
   - Use the update script or API to create admin account
   - Change default password immediately

## 🌐 CORS Configuration

If deploying frontend and backend to different domains, update CORS in `server/index.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## 📦 Build Commands

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 🐛 Troubleshooting

### Frontend can't connect to backend:
- Check `VITE_API_URL` is set correctly
- Verify backend is running and accessible
- Check CORS settings
- Check firewall/network settings

### Environment variables not working:
- Make sure variables are prefixed with `VITE_` for frontend
- Restart development server after changing `.env`
- Rebuild after changing production `.env`

### MongoDB connection issues:
- Verify `MONGODB_URI` is correct
- Check MongoDB is running (if local)
- Verify network access (if cloud)
- Check authentication credentials

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)
- [Heroku Deployment](https://devcenter.heroku.com/)


# Render Deployment Guide - Project Germany

## 🚀 Quick Deployment Steps

### Backend (Web Service)

1. **Create New Web Service:**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Select the repository

2. **Configuration:**
   - **Name:** `project-germany-api`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `server`
   - **Build Command:** (leave empty - no build needed)
   - **Start Command:** `node index.js`

3. **Environment Variables:**
   ```
   PORT=6001
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-strong-random-secret-key
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

4. **Deploy** and note the URL (e.g., `https://project-germany-api.onrender.com`)

### Frontend (Static Site)

1. **Create New Static Site:**
   - Go to Render Dashboard → New → Static Site
   - Connect the same GitHub repository

2. **Configuration:**
   - **Name:** `project-germany`
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL)

4. **Important - SPA Routing Fix:**
   - After deployment, go to your Static Site settings
   - Look for "Redirects/Rewrites" or "Headers" section
   - Add a redirect rule:
     ```
     Source: /*
     Destination: /index.html
     Status Code: 200
     ```
   - OR use the `_redirects` file (already created in `client/public/`)

5. **Deploy** and test

## 🔧 Fixing 404 Errors on Routes

If you're getting 404 errors when visiting routes like `/admin` directly:

### Option 1: Render Dashboard (Recommended)
1. Go to your Static Site settings
2. Find "Redirects" or "Headers" section
3. Add redirect rule:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Status Code:** `200`

### Option 2: Using _redirects file
The `_redirects` file has been created in `client/public/` and will be copied to `dist/` during build. This should work automatically.

### Option 3: If above don't work
You may need to contact Render support or use HashRouter (changes URLs to use `#`):

Update `client/src/App.jsx`:
```javascript
import { HashRouter as Router } from 'react-router-dom';
```

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] SPA routing configured (redirects set up)
- [ ] Test `/admin` route directly
- [ ] Test `/admin/login` route directly
- [ ] Create admin account
- [ ] Test login functionality
- [ ] Test contact form

## 🐛 Troubleshooting

### 404 Error on Routes:
- Ensure redirects are configured in Render dashboard
- Check that `_redirects` file exists in `client/public/`
- Rebuild and redeploy frontend

### API Connection Issues:
- Verify `VITE_API_URL` matches backend URL exactly
- Check CORS settings in backend
- Ensure backend is running (not spun down)

### Build Failures:
- Check Root Directory is set to `client` for frontend
- Verify `package.json` has correct build script
- Check build logs for specific errors


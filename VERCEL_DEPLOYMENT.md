# Vercel Deployment Guide - Project Germany

## 🚀 Frontend Deployment on Vercel

### Step 1: Deploy to Vercel

1. **Connect Repository:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Project (CRITICAL - Must be set correctly):**
   - **Framework Preset:** Vite (or leave blank/Other)
   - **Root Directory:** `client` ⚠️ **MUST BE SET TO `client`**
   - **Build Command:** `npm run build` (do NOT use `vite build` directly)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)
   
   ⚠️ **IMPORTANT:** If Root Directory is not set to `client`, the build will fail!
   To fix: Go to Project Settings → General → Root Directory → Set to `client`

3. **Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```
   - Replace with your actual backend URL

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

### Step 2: Fix SPA Routing (Already Done ✅)

The `vercel.json` file has been created in the `client/` directory with the correct rewrite rules:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that all routes (like `/admin`, `/admin/login`) are handled by React Router.

### Step 3: Verify Deployment

1. **Test Routes:**
   - Visit your Vercel URL: `https://your-app.vercel.app`
   - Visit `/admin` directly: `https://your-app.vercel.app/admin`
   - Visit `/admin/login`: `https://your-app.vercel.app/admin/login`

2. **All routes should work now!**

## 🔧 Backend on Render

Since your backend is on Render, make sure:

1. **CORS is configured** in `server/index.js`:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'https://your-app.vercel.app',
     credentials: true
   }));
   ```

2. **Environment Variables on Render:**
   ```
   PORT=6001
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   FRONTEND_URL=https://your-app.vercel.app
   ```

3. **Frontend Environment Variable on Vercel:**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

## 📝 Post-Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] Environment variables set correctly
- [ ] `vercel.json` file in place (✅ already done)
- [ ] Test `/admin` route directly - should work now
- [ ] Test `/admin/login` route directly
- [ ] CORS configured on backend
- [ ] Create admin account
- [ ] Test login functionality
- [ ] Test contact form

## 🐛 Troubleshooting

### Still getting 404 on `/admin`?
- Make sure `vercel.json` is in the `client/` directory
- Redeploy on Vercel (the file should be picked up automatically)
- Check Vercel deployment logs for any errors

### API Connection Issues?
- Verify `VITE_API_URL` in Vercel environment variables matches your Render backend URL
- Check CORS settings on backend
- Ensure backend is running (not spun down on free tier)

### Build Failures - "vite: command not found" Error?
- **Root Directory MUST be set to `client`** in Vercel project settings
  - Go to Project Settings → General → Root Directory → Set to `client`
- **Build Command MUST be `npm run build`** (NOT `vite build`)
  - Go to Project Settings → General → Build & Development Settings
  - Ensure Build Command is set to `npm run build`
- Verify `vite` is in `dependencies` (not just `devDependencies`)
  - This has been fixed in the latest version of `client/package.json`
- After fixing settings, trigger a new deployment

### Build Failures - "Could not resolve ../convex/_generated/api" Error?
This error occurs when Convex generated files are not available during build. Solutions:

1. **Generate Convex files locally before deploying:**
   ```bash
   # From root directory
   npx convex codegen --output client/src/convex/_generated
   ```
   Then commit the generated files to git (the build script will handle this automatically).

2. **Ensure Convex is configured for your project:**
   - Make sure `npx convex dev` has been run at least once
   - Verify `convex/_generated/` exists in the root directory
   - The build script will automatically copy/generate files during build

3. **If files are missing during build:**
   - The build script will create minimal stub files to prevent build errors
   - However, you'll need to properly configure Convex for the app to work at runtime
   - Add `VITE_CONVEX_URL` environment variable in Vercel with your Convex deployment URL

4. **Check Vercel Build Logs:**
   - Look for "Convex files generated successfully" or "Creating stub files" messages
   - If you see stub file warnings, ensure Convex is properly set up and run codegen locally

## 🎉 You're All Set!

Your frontend is now properly configured for Vercel with SPA routing support. The `/admin` route should work correctly now!


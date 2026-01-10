# Convex Backend Migration - Complete Setup Guide

## ✅ What's Been Created

### Backend Files:
1. **`convex/schema.ts`** - Database schema for admins and enquiries
2. **`convex/auth.ts`** - Helper queries for authentication
3. **`convex/http.ts`** - HTTP actions for login/register/verify (uses bcrypt & jwt)
4. **`convex/enquiries.ts`** - All enquiry CRUD operations
5. **`convex.json`** - Convex configuration

### Frontend Files:
1. **`client/src/convex/client.ts`** - Convex React client setup
2. **`client/src/convex/useConvexAuth.ts`** - Custom auth hook (needs completion)

## 🚀 Setup Steps

### 1. Install Dependencies

```bash
# Root directory
npm install

# Client directory  
cd client
npm install convex react
cd ..
```

### 2. Initialize Convex

```bash
# Login/create account
npx convex dev

# This will:
# - Create Convex project
# - Generate deployment URL
# - Watch for changes and deploy automatically
```

### 3. Set Environment Variables

After `npx convex dev`, you'll get a URL. Add to `client/.env`:

```env
VITE_CONVEX_URL=https://your-project.convex.cloud
```

### 4. Update Frontend to Use Convex

The frontend still uses REST API calls. You need to:

1. **Update `client/src/main.jsx`:**
```jsx
import { ConvexProvider } from "convex/react";
import { convex } from "./convex/client";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
)
```

2. **Update Auth Context** - Replace fetch calls with Convex HTTP actions
3. **Update Login Page** - Use HTTP actions for auth
4. **Update EnquiryForm** - Use Convex mutations
5. **Update AdminDashboard** - Use Convex queries/mutations

## 📝 API Endpoints Mapping

### Auth (HTTP Actions):
- `POST /http/register` → `convex/http.register`
- `POST /http/login` → `convex/http.login`  
- `GET /http/verify` → `convex/http.verify`

### Enquiries (Mutations/Queries):
- `POST /enquiries/create` → `convex/enquiries.create`
- `GET /enquiries/list` → `convex/enquiries.list`
- `GET /enquiries/get` → `convex/enquiries.get`
- `PATCH /enquiries/update` → `convex/enquiries.update`
- `DELETE /enquiries/remove` → `convex/enquiries.remove`
- `GET /enquiries/stats` → `convex/enquiries.stats`

## 🔒 Authentication Flow

1. **Login**: HTTP action returns JWT token
2. **Store token**: In localStorage (same as before)
3. **Protected calls**: Pass token to HTTP actions or use in mutations

## ⚠️ Important Notes

1. **HTTP Actions**: Auth endpoints use HTTP actions (can use npm packages)
2. **Mutations/Queries**: Enquiries use regular Convex functions
3. **Real-time**: Convex provides real-time updates automatically!
4. **No Express Server**: Convex handles everything

## 🐛 Next Steps

1. Complete frontend migration (update components)
2. Test authentication
3. Test enquiry operations
4. Deploy to production

## 📚 Resources

- [Convex Docs](https://docs.convex.dev)
- [Convex React](https://docs.convex.dev/client/react)
- [Convex HTTP Actions](https://docs.convex.dev/functions/http-actions)


# 🚀 Deployment Guide - Firebase Authentication Fix

## ⚠️ Critical Issue Fixed

**Problem:** Your app was configured with `output: "export"` in `next.config.mjs`, which creates a **static HTML export**. This is incompatible with Firebase authentication and causes login/signup to fail in production.

**Solution:** Removed `output: "export"` to enable server-side features required for Firebase authentication.

---

## 🔧 What Changed

### Before (Broken in Production)
```javascript
const nextConfig = {
  output: "export",  // ❌ This breaks Firebase auth in production
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}
```

### After (Works in Production)
```javascript
const nextConfig = {
  // ✅ No static export - enables server-side features
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}
```

---

## 📋 Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For Production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

### Option 3: Manual Build & Deploy

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. Deploy the `.next` folder and run `npm start` on your hosting platform.

---

## 🔐 Firebase Configuration Checklist

Before deploying, ensure Firebase is properly configured:

### 1. Enable Authentication Methods
Go to [Firebase Console](https://console.firebase.google.com/project/sporitech/authentication/providers) and enable:
- ✅ Email/Password authentication
- ✅ Google Sign-In

### 2. Add Authorized Domains
In Firebase Console → Authentication → Settings → Authorized domains, add:
- Your production domain (e.g., `yourdomain.com`)
- Your Vercel/Netlify domain (e.g., `yourapp.vercel.app`)

### 3. Update OAuth Redirect URIs (for Google Sign-In)
Add your production domain to Google Cloud Console OAuth settings.

---

## 🌐 Environment Variables

Your Firebase config is currently hardcoded in `lib/firebase.ts`. For better security, consider using environment variables:

### Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCwgjaz5GbdCfbSiX9_nsaJvEeXl0o9pi0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sporitech.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sporitech
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sporitech.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=595575325042
NEXT_PUBLIC_FIREBASE_APP_ID=1:595575325042:web:2c487ab1ded69676cd9deb
```

### Update `lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
```

---

## ✅ Testing Checklist

After deployment, test the following:

- [ ] Login with email/password works
- [ ] Signup with email/password works
- [ ] Google Sign-In works
- [ ] Redirect to dashboard after login works
- [ ] Protected routes require authentication
- [ ] Logout functionality works

---

## 🐛 Common Issues & Solutions

### Issue: "Firebase: Error (auth/operation-not-allowed)"
**Solution:** Enable Email/Password authentication in Firebase Console.

### Issue: "Firebase: Error (auth/unauthorized-domain)"
**Solution:** Add your production domain to Firebase authorized domains.

### Issue: Google Sign-In popup blocked
**Solution:** Ensure your domain is added to Google Cloud Console OAuth settings.

### Issue: WebSocket errors in production
**Solution:** These are normal - HMR (Hot Module Replacement) only works in development.

---

## 📊 Monitoring

After deployment, monitor your app:
- Check Vercel/Netlify deployment logs
- Monitor Firebase Authentication dashboard
- Check browser console for errors

---

## 🎯 Next Steps

1. ✅ Configuration fixed - `output: "export"` removed
2. 🔄 Rebuild your app: `npm run build`
3. 🚀 Deploy using one of the methods above
4. ✅ Test authentication in production
5. 🔐 (Optional) Move Firebase config to environment variables

---

## 📞 Support

If you encounter issues:
1. Check Firebase Console for authentication errors
2. Review deployment platform logs
3. Check browser console for client-side errors
4. Ensure all authorized domains are configured

---

**Last Updated:** 2026-01-07
**Status:** ✅ Ready for deployment

# 🔥 FIREBASE AUTHENTICATION FIX - REQUIRED STEPS

## ⚠️ CRITICAL ISSUE
Your signup and login pages are getting **400 Bad Request** errors because **Email/Password authentication is NOT enabled** in Firebase.

---

## ✅ STEP-BY-STEP FIX (5 minutes)

### Step 1: Open Firebase Console
1. Go to: **https://console.firebase.google.com/**
2. Sign in with your Google account

### Step 2: Select Your Project
1. Click on your project: **"sporitech"**
2. You should see your project dashboard

### Step 3: Navigate to Authentication
1. In the left sidebar, click **"Build"**
2. Click **"Authentication"**
3. Click on the **"Sign-in method"** tab at the top

### Step 4: Enable Email/Password
1. Look for **"Email/Password"** in the list of providers
2. Click on it to expand the settings
3. You'll see two toggles:
   - **Email/Password** - Toggle this to **ENABLED** (blue)
   - **Email link (passwordless sign-in)** - Leave this disabled
4. Click **"Save"** button

### Step 5: (Optional) Enable Google Sign-In
1. In the same "Sign-in method" tab
2. Find **"Google"** provider
3. Click on it
4. Toggle **Enable**
5. Add your support email (your Gmail)
6. Click **"Save"**

---

## 🧪 TEST THE FIX

After enabling authentication:

1. **Refresh your browser** at `http://localhost:3000/login`
2. **Try to Sign Up** with a new account:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123! (must have uppercase, number, special char)
3. Check if signup works without 400 error
4. **Try to Login** with the same credentials
5. You should be redirected to the dashboard

---

## 🐛 OTHER ERRORS (Can be ignored for now)

### Vercel Analytics Error
```
Failed to load script from /_vercel/insights/script.js
```
**Fix:** This is normal in local development. It only works when deployed to Vercel.

### Favicon Error
```
fsvicon.svg:1 Failed to load resource: 404
```
**Fix:** There's a typo in your `app/layout.tsx` - it says "fsvicon.svg" instead of "favicon.svg"

---

## 📸 VISUAL GUIDE

When you open Firebase Console → Authentication → Sign-in method, you should see:

```
Native providers:
┌─────────────────────────────────────────┐
│ Email/Password              [ENABLED ✓] │
│ Phone                       [DISABLED]   │
│ Google                      [ENABLED ✓]  │  (optional)
│ ...                                      │
└─────────────────────────────────────────┘
```

---

## ❓ STILL NOT WORKING?

If you still get 400 errors after enabling:

1. **Wait 1-2 minutes** for Firebase to propagate changes
2. **Clear browser cache** (Ctrl + Shift + Delete)
3. **Hard refresh** the page (Ctrl + Shift + R)
4. Check Firebase Console → Authentication → Users tab to see if users are being created

---

## 📝 YOUR FIREBASE PROJECT INFO

- **Project ID:** sporitech
- **Auth Domain:** sporitech.firebaseapp.com
- **API Key:** AIzaSyCwgjaz5GbdCfbSiX9_nsaJvEeXl0o9pi0

**Console Link:** https://console.firebase.google.com/project/sporitech/authentication/providers

---

## ⚡ QUICK CHECKLIST

- [ ] Opened Firebase Console
- [ ] Selected "sporitech" project
- [ ] Navigated to Authentication → Sign-in method
- [ ] Enabled Email/Password provider
- [ ] Clicked Save
- [ ] Refreshed browser
- [ ] Tested signup with new account
- [ ] Tested login with same account

---

**After completing these steps, your authentication should work!**

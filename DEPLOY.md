# 🚀 Deploy Backend to Vercel - SUPER SIMPLE

## Step 1: Install Vercel CLI

Open terminal:
```bash
npm install -g vercel
```

---

## Step 2: Go to Backend Folder

```bash
cd c:\Data\programming\flutter_app\ai_resume_backend
```

---

## Step 3: Login to Vercel

```bash
vercel login
```

- Choose **Continue with GitHub** (or Google/Email)
- Login in browser
- Return to terminal

---

## Step 4: Deploy

```bash
vercel
```

**Answer the prompts:**

1. `Set up and deploy "ai_resume_backend"?` → **Y** (press Enter)
2. `Which scope?` → Choose your account (press Enter)
3. `Link to existing project?` → **N** (press Enter)
4. `What's your project's name?` → **ai-resume-backend** (press Enter)
5. `In which directory is your code located?` → **./** (press Enter)
6. `Want to override the settings?` → **N** (press Enter)

**Wait 30 seconds...**

You'll get a URL like:
```
https://ai-resume-backend-xxxxx.vercel.app
```

**COPY THIS URL!** You'll need it.

---

## Step 5: Add API Key Secret

```bash
vercel env add GEMINI_API_KEY
```

1. `What's the value of GEMINI_API_KEY?` → Paste: `AIzaSyCVoJ7IV20jts4chfGuA061BWBZF1q9bdM`
2. `Add to environment:` → Press **Space** on all 3 (Production, Preview, Development), then **Enter**

---

## Step 6: Redeploy with Secret

```bash
vercel --prod
```

**Wait 30 seconds...**

Done! Your backend is live! 🎉

---

## Step 7: Update Flutter App

Open: `lib/services/backend_gemini_service.dart`

Change this line:
```dart
static const String baseUrl = 'http://localhost:3000';
```

To your Vercel URL:
```dart
static const String baseUrl = 'https://ai-resume-backend-xxxxx.vercel.app';
```

---

## Step 8: Test Your App

```bash
cd ../ai_resume_analyzer
flutter run
```

Upload a resume and it should work! ✅

---

## 🧪 Test Backend Directly

Visit your URL in browser:
```
https://your-backend-url.vercel.app
```

You should see:
```json
{
  "status": "ok",
  "message": "AI Resume Analyzer Backend API",
  "version": "1.0.0"
}
```

---

## ✅ That's It!

**Your API key is now secure!**
- ✅ Not in your Flutter APK
- ✅ Stored as Vercel secret
- ✅ Only accessible by your backend

---

## 💰 Cost

**FREE** for:
- 100 GB bandwidth/month
- 100 hours execution/month
- Perfect for your app!

---

## 🔄 Update Backend (Future)

If you change backend code:

```bash
cd ai_resume_backend
vercel --prod
```

That's it!

---

## 🆘 Troubleshooting

**Error: Command not found: vercel**
→ Run: `npm install -g vercel`

**Backend returns error**
→ Check: `vercel logs` to see what happened

**API key not working**
→ Run: `vercel env add GEMINI_API_KEY` again

---

## 📝 Summary Commands

```bash
# Deploy
vercel

# Add secret
vercel env add GEMINI_API_KEY

# Deploy to production
vercel --prod

# View logs
vercel logs

# Remove deployment
vercel remove
```

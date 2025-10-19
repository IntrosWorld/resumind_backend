# 🐙 Deploy from GitHub to Vercel

## Option 1: Use Vercel Website (EASIEST)

### Step 1: Push to GitHub

```bash
cd ai_resume_backend
git init
git add .
git commit -m "Initial backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-backend.git
git push -u origin main
```

### Step 2: Deploy on Vercel Website

1. Go to: https://vercel.com/
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your repository: **ai-resume-backend**
5. Click **"Import"**
6. **IMPORTANT**: Set Framework Preset to **"Other"**
7. Click **"Deploy"**

### Step 3: Add Environment Variable

1. After deployment, click **"Go to Dashboard"**
2. Click **"Settings"** tab
3. Click **"Environment Variables"**
4. Add new variable:
   - Name: `GEMINI_API_KEY`
   - Value: `AIzaSyCVoJ7IV20jts4chfGuA061BWBZF1q9bdM`
   - Environments: Select **all 3** (Production, Preview, Development)
5. Click **"Save"**

### Step 4: Redeploy

1. Go to **"Deployments"** tab
2. Click **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"**
5. Click **"Redeploy"**

**Done!** Copy your URL: `https://ai-resume-backend-xxx.vercel.app`

---

## Option 2: Use Vercel CLI (from GitHub)

### Step 1: Push to GitHub (same as above)

### Step 2: Clone and deploy

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-backend.git
cd ai-resume-backend
npm install
vercel
```

Follow prompts, then:

```bash
vercel env add GEMINI_API_KEY
vercel --prod
```

---

## 🐛 Troubleshooting

### "Build failed"
**Check:**
- Make sure `package.json` exists
- Make sure `index.js` exists
- Framework preset is "Other" or blank

### "Function timeout"
**Fix:** Vercel free tier has 10s timeout, should be fine

### "Environment variable not found"
**Fix:**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add `GEMINI_API_KEY`
4. Redeploy

### "Cannot find module"
**Fix:** Make sure `node_modules` is in `.gitignore` (it is)

---

## ✅ Verify Deployment

Visit: `https://your-backend-url.vercel.app`

Should see:
```json
{
  "status": "ok",
  "message": "AI Resume Analyzer Backend API",
  "version": "1.0.0"
}
```

---

## 🔄 Auto-Deploy (Bonus)

Once connected to GitHub:
- Every `git push` to main branch = **auto-deploys**!
- You just code and push, Vercel handles rest!

---

## 📝 Files That MUST Be There

```
ai_resume_backend/
├── index.js          ✅ Main server file
├── package.json      ✅ Dependencies
├── vercel.json       ✅ Vercel config
├── .gitignore        ✅ Don't commit secrets
└── .vercelignore     ✅ Don't upload node_modules
```

All these exist! You're good to go!

# AI Resume Analyzer Backend

Simple Express.js backend for AI Resume Analyzer app. Proxies requests to Gemini API to keep API key secure.

## 🚀 Quick Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd ai_resume_backend
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? (your account)
- Link to existing project? **N**
- Project name? **ai-resume-backend**
- Directory? **./**  (press Enter)
- Override settings? **N**

### Step 4: Add API Key Secret
```bash
vercel env add GEMINI_API_KEY
```

Paste your key: `AIzaSyCVoJ7IV20jts4chfGuA061BWBZF1q9bdM`

Select environments: **Production**, **Preview**, **Development** (use space, then Enter)

### Step 5: Redeploy with Secret
```bash
vercel --prod
```

**Done!** You'll get a URL like: `https://ai-resume-backend-xxx.vercel.app`

---

## 🧪 Test Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Run server
```bash
npm start
```

### 3. Test endpoint
```bash
curl http://localhost:3000
```

---

## 📡 API Endpoints

### Health Check
```
GET /
```

Response:
```json
{
  "status": "ok",
  "message": "AI Resume Analyzer Backend API",
  "version": "1.0.0"
}
```

### Analyze Resume
```
POST /api/analyze-resume
```

Request body:
```json
{
  "resumeText": "Your resume text here...",
  "atsScore": {
    "totalScore": 85,
    "summary": "Good resume...",
    "criteria": {...},
    "strengths": [...],
    "improvements": [...]
  }
}
```

Response:
```json
{
  "success": true,
  "aiAnalysis": "Analysis text...",
  "detailedFeedback": {
    "sections": {...},
    "fullText": "..."
  }
}
```

---

## 🔧 Update Flutter App

After deploying, update your Flutter app to use the backend URL:

In `lib/services/backend_gemini_service.dart`:
```dart
final baseUrl = 'https://your-backend-url.vercel.app';
```

---

## 💰 Cost

**Vercel Free Tier:**
- 100 GB bandwidth/month
- 100 hours execution/month
- Unlimited deployments

**Gemini API:**
- $1-2/month for 1000 users

**Total: ~$2/month**

---

## 🔒 Security

✅ API key stored as Vercel secret
✅ CORS enabled for your Flutter app
✅ Request validation (size, format)
✅ Rate limiting by Vercel

---

## 📝 Notes

- Backend URL will be: `https://ai-resume-backend-[random].vercel.app`
- Free tier is more than enough for testing
- Upgrade to Pro ($20/month) for production with high traffic

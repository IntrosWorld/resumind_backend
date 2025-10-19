import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AI Resume Analyzer Backend API',
    version: '1.0.0'
  });
});

// Analyze resume endpoint
app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { resumeText, atsScore } = req.body;

    // Validate input
    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({
        error: 'resumeText is required and must be a string'
      });
    }

    if (!atsScore || typeof atsScore.totalScore !== 'number') {
      return res.status(400).json({
        error: 'atsScore is required'
      });
    }

    // Check text length
    if (resumeText.length < 50) {
      return res.status(400).json({
        error: 'Resume text is too short (minimum 50 characters)'
      });
    }

    if (resumeText.length > 20000) {
      return res.status(400).json({
        error: 'Resume text is too long (maximum 20,000 characters)'
      });
    }

    // Build the analysis prompt
    const prompt = buildAnalysisPrompt(resumeText, atsScore);

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiAnalysis = response.text();

    // Parse the response
    const detailedFeedback = parseGeminiResponse(aiAnalysis);

    // Return the analysis
    res.json({
      success: true,
      aiAnalysis,
      detailedFeedback
    });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({
      error: 'Failed to analyze resume',
      message: error.message
    });
  }
});

/**
 * Build the analysis prompt for Gemini
 */
function buildAnalysisPrompt(resumeText, atsScore) {
  return `You are an expert resume coach. Analyze this resume and provide concise, actionable improvement advice.

RESUME TEXT:
${resumeText}

CURRENT ATS SCORE: ${atsScore.totalScore}/100

CONTEXT:
${atsScore.summary}

YOUR TASK:
Write a brief, focused analysis (250-350 words max) that tells the candidate exactly what to improve. Use this structure:

OVERVIEW
[One paragraph: What's working well and the main issue holding this resume back]

TOP 3 IMPROVEMENTS

1. [Title]
What to do: [Specific action in 1-2 sentences]
Example: [Quick before/after or concrete example]

2. [Title]
What to do: [Specific action in 1-2 sentences]
Example: [Quick before/after or concrete example]

3. [Title]
What to do: [Specific action in 1-2 sentences]
Example: [Quick before/after or concrete example]

QUICK WINS
[One short paragraph listing 2-3 easy changes they can make today]

WRITING GUIDELINES:
- NO emojis, keep it professional
- Use UPPERCASE for section headers only
- Write in clear, short paragraphs (3-4 lines max)
- Be direct and specific - focus on WHAT TO CHANGE, not explanations
- Reference actual content from the resume
- Skip generic advice - make it personal to this resume
- Keep total response under 350 words
- Use conversational but professional tone

Focus on the highest-impact changes that will improve their ATS score and get them interviews.`;
}

/**
 * Parse Gemini response into structured format
 */
function parseGeminiResponse(response) {
  const sections = {};
  const lines = response.split('\n');
  let currentSection = 'general';
  let currentContent = [];

  for (const line of lines) {
    if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
      if (currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      currentSection = line.replaceAll('**', '').trim().toLowerCase();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return {
    sections,
    fullText: response
  };
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/analyze-resume`);
});

export default app;

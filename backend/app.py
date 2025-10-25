import os
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
from pdfminer.high_level import extract_text
from dotenv import load_dotenv
from openai import OpenAI

app = Flask(__name__)
# CORS(app, origins=["https://ai-career-coach-one-rho.vercel.app"])
CORS(app)

load_dotenv()

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

# --- Helper: Parse resume PDF ---
def parse_resume(pdf_file):
    pdf_bytes = pdf_file.read()
    pdf_stream = BytesIO(pdf_bytes)
    text = extract_text(pdf_stream)
    return text[:12000] # limit for simplicity

# --- Route 1: Analyze Resume (using DeepSeek/DeepSeek-v3.2 Exp) ---
@app.route("/analyze_resume", methods=["POST"])
def analyze_resume():
    file = request.files["resume"]
    text = parse_resume(file)

    # --- Build the analysis prompt ---
    prompt = f"""
You are a professional career coach and resume reviewer.
Analyze the following resume text and provide:
1. A summary of the candidate’s background.
2. Key strengths and technical skills.
3. Potential weaknesses or missing areas.
4. Actionable suggestions for improvement.
DO NOT INCLUDE ANYTHING ELSE
Resume:
{text[:12000]}
"""

    # --- Send to model ---
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V3.2-Exp:novita",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
        max_tokens=1200
    )

    # --- Extract and clean response ---
    analysis = completion.choices[0].message.content

    # --- Return JSON ---
    return jsonify({"analysis": analysis, "resume_text": text})

@app.route("/generate_resume_score", methods=["POST"])
def generate_resume_score():
    data = request.get_json()
    resume_text = data.get("resume_text", "")
    # --- Prompt for scoring ---
    prompt = f"""
You are a professional career coach.
Score the following resume out of 100 using this rubric:
- Formatting & Structure (20)
- Skills & Technical Knowledge (20)
- Experience & Projects (20)
- Clarity & Readability (20)
- Impact & Results (20)

Provide:
1. A JSON object ONLY with:
   - "score_breakdown": {{}}
   - "overall_score": number
Resume:
{resume_text[:3000]}

Respond with ONLY valid JSON. No text, no explanations.
"""
    
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V3.2-Exp:novita",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
        max_tokens=400
    )

    response_text = completion.choices[0].message.content

    import json
    try:
        score_data = json.loads(response_text)
    except:
        # fallback if AI returns text
        print("Model returned invalid JSON:", response_text)
        score_data = {"score_breakdown": {}, "overall_score": None}

    return jsonify(score_data)


# --- Route 2: Generate Cover Letter (using DeepSeek/DeepSeek-v3.2 Exp) ---
@app.route("/generate_cover_letter", methods=["POST"])
def generate_cover_letter():
    data = request.get_json()
    resume_text = data.get("resume_text", "")
    job_title = data.get("job_title", "")

    # --- Build a strong prompt ---
    prompt = f"""
You are an expert career coach and professional copywriter.
Write a polished, professional, and engaging cover letter for the position of '{job_title}' at XYZ company.
Use the following resume information:

{resume_text}

The cover letter should:
- Be tailored to the company and role.
- Highlight the candidate's skills mentioned in resume information.
- Emphasize relevant experience and accomplishments.
- Show enthusiasm and cultural fit for the company.
- Be concise, clear, and persuasive, around 250-300 words.
- Include a strong opening, middle, and closing paragraph.

Generate it in a formal but friendly professional tone.
"""

    # Call Hugging Face DeepSeek API
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V3.2-Exp:novita",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=500
    )

    # Extract the response
    cover_letter = completion.choices[0].message.content

    # Return JSON
    return jsonify({"cover_letter": cover_letter})

# --- Route 3: Generate Interview Questions (using DeepSeek/DeepSeek-v3.2 Exp) ---
@app.route("/generate_interview_questions", methods=["POST"])
def generate_interview_questions():
    data = request.get_json()
    job_title = data.get("job_title", "")

    # --- Build prompt ---
    prompt = f"""
You are an experienced technical interviewer.
Generate 5 thoughtful, role-specific interview questions for a {job_title} position.
Questions should:
- Test both technical and problem-solving skills.
- Include a mix of conceptual and practical topics.
- Be concise and clear (no answers needed).
- Just the questions. Do not include anything else in your response.
"""

    # --- Call DeepSeek API ---
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V3.2-Exp:novita",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=300
    )

    # --- Extract and clean result ---
    questions = completion.choices[0].message.content

    # --- Return as JSON ---
    return jsonify({"questions": questions})

if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=PORT, debug=True)
    #app.run(debug=True)
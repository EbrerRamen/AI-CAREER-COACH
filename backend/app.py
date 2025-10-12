from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from pdfminer.high_level import extract_text

app = Flask(__name__)
CORS(app)

# --- Load AI models locally ---
resume_analysis_model = pipeline("text-classification", model="facebook/bart-large-mnli")
cover_letter_model = pipeline("text-generation", model="gpt2")
interview_qa_model = pipeline("text-generation", model="gpt2")

# --- Helper: Parse resume PDF ---
def parse_resume(pdf_file):
    text = extract_text(pdf_file)
    return text[:3000] # limit for simplicity

# --- Route 1: Analyze Resume ---
@app.route("/analyze_resume", methods=["POST"])
def analyze_resume():
    file = request.files["resume"]
    text = parse_resume(file)
    result = resume_analysis_model(text, truncation=True)
    return jsonify({"analysis": result})

# --- Route 2: Generate Cover Letter ---
@app.route("/generate_cover_letter", methods=["POST"])
def generate_cover_letter():
    data = request.get_json()
    resume_text = data.get("resume_text", "")
    job_title = data.get("job_title", "")
    prompt = f"Write a professional cover letter for a {job_title} position based on this resume:\n{resume_text}"
    result = cover_letter_model(prompt, max_length=250, do_sample=True)
    return jsonify({"cover_letter": result[0]["generated_text"]})

# --- Route 3: Generate Interview Questions ---
@app.route("/generate_interview_questions", methods=["POST"])
def generate_interview_questions():
    data = request.get_json()
    job_title = data.get("job_title", "")
    prompt = f"Generate 5 interview questions for a {job_title} candidate."
    result = interview_qa_model(prompt, max_length=100, do_sample=True)
    return jsonify({"questions": result[0]["generated_text"]})

if __name__ == "__main__":
    app.run(debug=True)
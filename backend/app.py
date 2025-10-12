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


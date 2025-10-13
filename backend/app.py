import os
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from pdfminer.high_level import extract_text
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from dotenv import load_dotenv
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# --- Load AI models locally ---
resume_analysis_model = pipeline("text-classification", model="facebook/bart-large-mnli")
cover_letter_model = pipeline("text-generation", model="gpt2")
interview_qa_model = pipeline("text-generation", model="gpt2")

tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")

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
    return text[:3000] # limit for simplicity

# --- Route 1: Analyze Resume ---
@app.route("/analyze_resume", methods=["POST"])
def analyze_resume():
    file = request.files["resume"]
    text = parse_resume(file)
    result = resume_analysis_model(text, truncation=True)
    return jsonify({"analysis": result})

# --- Route 2: Generate Cover Letter (using facebook/bart-large-mnli) ---
# @app.route("/generate_cover_letter", methods=["POST"])
# def generate_cover_letter():
#     data = request.get_json()
#     resume_text = data.get("resume_text", "")
#     job_title = data.get("job_title", "")
#     prompt = f"Write a professional cover letter for a {job_title} position based on this resume:\n{resume_text}"
#     result = cover_letter_model(prompt, max_length=250, do_sample=True)
#     return jsonify({"cover_letter": result[0]["generated_text"]})

# # --- Route 2: Generate Cover Letter (using google/flan-t5-small) ---
# @app.route("/generate_cover_letter", methods=["POST"])
# def generate_cover_letter():
#     data = request.get_json()
#     resume_text = data.get("resume_text", "")
#     job_title = data.get("job_title", "")

#     prompt = f"""
# You are a professional career coach. 
# Write a clear and concise cover letter for a {job_title} position based on the following resume:
# {resume_text}

# The cover letter should highlight the candidate’s strengths, relevant experience, and enthusiasm for the role. 
# Make it professional, friendly, and tailored to the job.
# """
#     inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
#     outputs = model.generate(**inputs, max_new_tokens=400, do_sample=True, top_k=50, top_p=0.95, temperature=0.7, repetition_penalty=2.0)
#     return tokenizer.decode(outputs[0], skip_special_tokens=True)

# --- Route 2: Generate Cover Letter (using DeepSeek/DeepSeek-v3.2 Exp) ---
@app.route("/generate_cover_letter", methods=["POST"])
def generate_cover_letter():
    data = request.get_json()
    resume_text = data.get("resume_text", "")
    job_title = data.get("job_title", "")

    # --- Build a strong prompt ---
    prompt = f"""
You are a professional career coach and expert in writing cover letters.
Write a polished, detailed, and professional cover letter for the position of '{job_title}' at XYZ company.
Use the following resume information:

{resume_text}

The cover letter should:
- Be tailored to the company and role.
- Highlight the candidate's skills mentioned in resume information.
- Emphasize relevant experience and accomplishments.
- Show enthusiasm and cultural fit for the company.
- Be concise, clear, and persuasive, around 250-300 words.
- Include a strong opening, middle, and closing paragraph.

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
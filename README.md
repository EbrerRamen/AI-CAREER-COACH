# AI Resume Analyzer

An AI-powered web application that analyzes resumes using Large Language Models (LLMs) and provides detailed feedback including:  
✅ Overall score  
✅ Breakdown analysis  
✅ Grammar improvements  
✅ Suggestions for better clarity & impact  
✅ Cover letter and interview questions for desired role
---

## 🚀 Live Demo

🔹 **Frontend:** ai-career-coach-one-rho.vercel.app
🔹 **Backend API:** https://ai-career-coach-3x1f.onrender.com

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite) |
| Backend | Flask (Python) |
| AI Model | Hugging Face Inference API |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 📂 Project Structure

root/  
├── backend/  
│ ├── app.py  
│ ├── requirements.txt  
│ ├── .env (not included in repo)  
├── public/  
├── src/  
│ ├── components/  
│ ├── App.jsx  
│ ├── main.jsx  
├── .env (not included in repo)  
├── package.json  
└── README.md  

---

## 🔑 Environment Variables

### ✅ Frontend `.env`

```bash
REACT_APP_API_URL=https://<your-render-api-url>
```

### ✅ Backend `.env`

```bash
HF_TOKEN=<your_huggingface_api_key>
FLASK_ENV=production
PORT=5000
```
> ⚠️ Never share your API keys publicly.

## 🏃‍♂️ Run Locally

Clone the project:

```bash
git clone https://github.com/EbrerRamen/AI-CAREER-COACH.git
cd <your-repo>
```

# ✅ Install and run frontend
```bash
npm install
npm start
```

# ✅ Install and run backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

# 🧪 Testing

Upload a resume PDF and click "Analyze Resume"
You should see:

✅ AI evaluation report

✅ Key strengths & weaknesses

✅ Score breakdown

Provide your desired role and click "Generate Cover Letter"  
You shoul see: 

✅ AI generated cover letter for that role

Provide your desired role and click "Generate Interview Questions"  
You shoul see: 

✅ AI generated interview questions for that role

# ⭐ Contributions
Pull requests are welcome!  
If you like this project, please ⭐ star the repository!

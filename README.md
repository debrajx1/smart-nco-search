<p align="center">
  <img src="frontend/public/assets/emblem.png" alt="Emblem of India" width="80" />
</p>

<h1 align="center">Smart NCO Search</h1>

<p align="center">
  <strong>AI-Powered Occupational Code Search Engine</strong><br/>
  <em>National Classification of Occupations — 2015</em>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/AI-Semantic_Search-blue?style=for-the-badge&logo=tensorflow" alt="Semantic Search" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/FAISS-Vector_DB-FF6F00?style=for-the-badge&logo=meta" alt="FAISS" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-All_Rights_Reserved-red?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  Search <strong>NCO-2015</strong> occupational codes using <strong>natural language</strong> — powered by Facebook AI Similarity Search (FAISS) and SentenceTransformer embeddings for lightning-fast semantic matching.
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Pages & Routes](#-pages--routes)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Semantic Search** | Search jobs by meaning, not just keywords. Uses SentenceTransformer embeddings for intelligent matching. |
| ⚡ **Real-Time Index Rebuild** | New jobs added via Admin Panel are instantly indexed and searchable. |
| 📄 **Multi-PDF Parsing** | Import and merge multiple NCO-2015 PDF volumes into a unified dataset. |
| 🛡️ **Admin Panel** | Full CRUD operations — add, edit, and delete NCO job codes and titles. |
| 📊 **Search Logs** | Automatic query logging with timestamps for audit and analytics. |
| 🎙️ **Voice Search** | Built-in microphone support for voice-powered search queries. |
| 🎨 **Government UI/UX** | Indian tricolor design system with official emblem, responsive layout, and Framer Motion animations. |
| 📱 **Responsive Design** | Fully responsive across desktop, tablet, and mobile devices. |

---

## 🖥️ Demo

### Search Portal
> Natural language search with AI-powered semantic matching and voice input support.

### Admin Panel
> Manage NCO-2015 job codes — add new entries, view all codes, and delete entries with live FAISS index rebuild.

### Search Logs
> Complete audit trail of all search queries with timestamps and reference IDs.

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **[FastAPI](https://fastapi.tiangolo.com/)** | High-performance async API framework |
| **[FAISS](https://github.com/facebookresearch/faiss)** | Facebook AI Similarity Search — vector similarity engine |
| **[SentenceTransformers](https://www.sbert.net/)** | `paraphrase-MiniLM-L6-v2` model for text embeddings |
| **[SQLAlchemy](https://www.sqlalchemy.org/)** | ORM for database operations |
| **[SQLite](https://www.sqlite.org/)** | Lightweight relational database |
| **[Uvicorn](https://www.uvicorn.org/)** | ASGI server with hot-reload |
| **[Pydantic](https://docs.pydantic.dev/)** | Data validation and settings management |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **[React 18](https://react.dev/)** | Component-based UI library |
| **[Vite 5](https://vitejs.dev/)** | Next-generation frontend build tool |
| **[Tailwind CSS 3](https://tailwindcss.com/)** | Utility-first CSS framework |
| **[Framer Motion](https://www.framer.com/motion/)** | Production-ready animations |
| **[React Router v7](https://reactrouter.com/)** | Client-side routing |
| **[Lucide React](https://lucide.dev/)** | Icon library |
| **[Axios](https://axios-http.com/)** | HTTP client |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│   React + Vite + Tailwind CSS (Port 5173)                │
│                                                          │
│   ┌──────────┐  ┌────────────┐  ┌──────────────────┐    │
│   │   Home   │  │   Admin    │  │   Search Logs    │    │
│   │ (Search) │  │   Panel    │  │     Portal       │    │
│   └────┬─────┘  └─────┬──────┘  └────────┬─────────┘    │
│        │               │                  │              │
└────────┼───────────────┼──────────────────┼──────────────┘
         │               │                  │
     HTTP (CORS)     HTTP (CORS)        HTTP (CORS)
         │               │                  │
┌────────┼───────────────┼──────────────────┼──────────────┐
│        ▼               ▼                  ▼              │
│   ┌──────────┐  ┌────────────┐  ┌──────────────────┐    │
│   │ /search  │  │   /admin   │  │ /admin/search-   │    │
│   │   API    │  │    API     │  │      logs        │    │
│   └────┬─────┘  └─────┬──────┘  └────────┬─────────┘    │
│        │               │                  │              │
│   ┌────▼─────┐  ┌──────▼──────┐  ┌───────▼────────┐    │
│   │  FAISS   │  │  SQLAlchemy │  │   SQLAlchemy   │    │
│   │  Index   │  │    CRUD     │  │     Query      │    │
│   └────┬─────┘  └──────┬──────┘  └───────┬────────┘    │
│        │               │                  │              │
│   ┌────▼─────┐  ┌──────▼──────────────────▼────────┐    │
│   │Sentence  │  │          SQLite (nco.db)          │    │
│   │Transformer│  │  ┌──────────┐  ┌──────────────┐  │    │
│   │  Model   │  │  │ JobCodes │  │  SearchLogs  │  │    │
│   └──────────┘  │  └──────────┘  └──────────────┘  │    │
│                 └──────────────────────────────────┘    │
│                      BACKEND                            │
│        FastAPI + Uvicorn (Port 8000)                     │
└──────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
smart-nco-search/
├── backend/                          # Server-side application
│   ├── app/
│   │   ├── api/v1/                   # Versioned API routes
│   │   │   ├── routes_search.py      # POST /api/v1/search
│   │   │   └── routes_admin.py       # CRUD /api/v1/admin
│   │   ├── core/                     # Business logic
│   │   │   ├── config.py             # App settings & env config
│   │   │   ├── search_engine.py      # FAISS search logic
│   │   │   └── index_builder.py      # FAISS index builder
│   │   ├── db/                       # Database layer
│   │   │   ├── models.py             # SQLAlchemy models
│   │   │   ├── crud.py               # Database operations
│   │   │   └── database.py           # Engine & session setup
│   │   ├── schemas/                  # Pydantic schemas
│   │   │   ├── job.py                # Job input/output schemas
│   │   │   └── search.py             # Search log schema
│   │   ├── utils/                    # Utilities
│   │   │   ├── embedder.py           # SentenceTransformer loader
│   │   │   └── parser.py             # PDF → CSV parser
│   │   ├── data/                     # Data files
│   │   │   ├── nco2015_job_reference.csv
│   │   │   ├── nco2015_faiss.index
│   │   │   └── NCO-2015-Vol*.pdf
│   │   └── main.py                   # FastAPI entrypoint
│   ├── scripts/
│   │   └── prepare_data.py           # One-time data preparation
│   ├── requirements.txt
│   └── venv/                         # Python virtual environment
│
├── frontend/                         # Client-side application
│   ├── public/assets/                # Static assets (emblem, PDFs)
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── SearchBox.jsx         # Search input with voice
│   │   │   ├── ResultsList.jsx       # Search results display
│   │   │   ├── AdminPanel.jsx        # Admin CRUD interface
│   │   │   └── PageWrapper.jsx       # Layout wrapper
│   │   ├── pages/                    # Route-level pages
│   │   │   ├── Home.jsx              # Landing + search page
│   │   │   ├── SearchLogPage.jsx     # Query history viewer
│   │   │   ├── About.jsx             # About the portal
│   │   │   ├── Contact.jsx           # Contact information
│   │   │   ├── Disclaimer.jsx        # Legal disclaimer
│   │   │   └── Privacy.jsx           # Privacy policy
│   │   ├── App.jsx                   # Root component + routing
│   │   ├── index.jsx                 # React entry point
│   │   └── index.css                 # Global styles
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.10
- **npm** ≥ 9.x

### 1. Clone the Repository

```bash
git clone https://github.com/debrajx1/smart-nco-search.git
cd smart-nco-search
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Prepare CSV & FAISS index (first time only)
python -m scripts.prepare_data

# Start the API server
uvicorn app.main:app --reload --port 8000
```

> The backend will be available at **http://localhost:8000**  
> Interactive API docs at **http://localhost:8000/docs**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

> The frontend will be available at **http://localhost:5173**

### 4. Run Both Together (VS Code)

Press `F5` in VS Code and select **"Full Stack (Frontend + Backend)"** to launch both servers simultaneously.

---

## 📡 API Reference

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/search/` | Semantic search for NCO job codes |

**Request Body:**
```json
{
  "query": "software engineer"
}
```

**Response:**
```json
[
  {
    "nco_code": "2512.0100",
    "title": "Software Developer",
    "score": 0.342
  }
]
```

---

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/admin/` | List all job codes |
| `POST` | `/api/v1/admin/` | Add a new job code |
| `PUT` | `/api/v1/admin/{id}` | Update a job code |
| `DELETE` | `/api/v1/admin/{id}` | Delete a job code |
| `GET` | `/api/v1/admin/search-logs` | Get search query logs |

---

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/healthz` | Server health status |

---

## 🗺 Pages & Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Main search portal with voice input |
| `/admin` | Admin Panel | Job code management (CRUD) |
| `/search-logs` | Search Logs | Historical search query viewer |
| `/about` | About | Portal information |
| `/contact` | Contact | Contact details & form |
| `/disclaimer` | Disclaimer | Legal disclaimer |
| `/privacy` | Privacy | Privacy policy |

---

## 🔧 Environment Variables

Create a `.env` file in `backend/` directory:

```env
DATABASE_URL=sqlite:///./app/data/nco.db
MODEL_NAME=sentence-transformers/paraphrase-MiniLM-L6-v2
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

**© 2025 Smart NCO Search™** — Created and maintained by **Mephisto X**.  
All rights reserved.

---

<p align="center">
  <strong>Government of India</strong><br/>
  Ministry of Labour & Employment<br/><br/>
  <em>Made with ❤️ in India</em>
</p>